import { builtinModules } from "node:module";
import path from "node:path";
import { registrySchema } from "shadcn/schema";
import { Project, SyntaxKind } from "ts-morph";

import { registry } from "../registry/index";
import {
  STYLE_BASE_DEPENDENCIES,
  STYLE_BASE_REGISTRY_DEPENDENCIES,
} from "../registry/style-base";

const CHECKED_TYPES = new Set([
  "registry:ui",
  "registry:lib",
  "registry:block",
]);
const IGNORED_PACKAGES = new Set(["next", "react", "react-dom"]);

const NODE_PREFIX_RE = /^node:/;
const LEADING_AT_RE = /^@/;
const HTTP_URL_RE = /^https?:\/\//;
const SCOPED_WITH_VERSION_RE = /^(@[^/]+\/[^/@]+)(?:@.*)?$/;
const UNSCOPED_DECLARED_WITH_VERSION_RE = /^([^/@]+)(?:@.*)?$/;
const UNSCOPED_REGISTRY_WITH_VERSION_RE = /^([^@]+)(?:@.*)?$/;

const NODE_BUILTINS = new Set(
  builtinModules.flatMap((mod) => [mod, mod.replace(NODE_PREFIX_RE, "")])
);

type AliasMatcher = (specifier: string) => boolean;
type RegistryItem = (typeof registry.items)[number];
interface DependencyIssue {
  item: string;
  missing: Array<{ dependency: string; files: string[] }>;
  type: string;
}

function createAliasMatchers(project: Project): AliasMatcher[] {
  const paths = project.getCompilerOptions().paths ?? {};
  const matchers: AliasMatcher[] = [];

  for (const alias of Object.keys(paths)) {
    if (alias.includes("*")) {
      const [prefix, suffix] = alias.split("*");
      matchers.push(
        (specifier) =>
          specifier.startsWith(prefix) && specifier.endsWith(suffix ?? "")
      );
      continue;
    }

    matchers.push(
      (specifier) => specifier === alias || specifier.startsWith(`${alias}/`)
    );
  }

  return matchers;
}

function normalizeDeclaredDependency(dependency: string): string {
  let value = dependency.trim();
  if (value.startsWith("npm:")) {
    value = value.slice(4);
  }

  if (value.startsWith("@")) {
    const scoped = value.match(SCOPED_WITH_VERSION_RE);
    if (scoped?.[1]) {
      return scoped[1];
    }

    const [scope, name] = value.split("/");
    return scope && name ? `${scope}/${name}` : value;
  }

  const unscoped = value.match(UNSCOPED_DECLARED_WITH_VERSION_RE);
  if (unscoped?.[1]) {
    return unscoped[1];
  }

  return value.split("/")[0] ?? value;
}

function normalizeRegistryReference(reference: string): string {
  let value = reference.trim();
  if (value.startsWith("npm:")) {
    value = value.slice(4);
  }

  if (value.startsWith("@")) {
    const scoped = value.match(SCOPED_WITH_VERSION_RE);
    if (scoped?.[1]) {
      return scoped[1];
    }
    return value;
  }

  const unscoped = value.match(UNSCOPED_REGISTRY_WITH_VERSION_RE);
  return unscoped?.[1] ?? value;
}

function extractPackageName(specifier: string): string | null {
  if (specifier.startsWith("@")) {
    const [scope, name] = specifier.split("/");
    return scope && name ? `${scope}/${name}` : null;
  }

  const [name] = specifier.split("/");
  return name || null;
}

function resolveExternalPackage(
  specifier: string,
  aliasMatchers: AliasMatcher[]
): string | null {
  if (
    !specifier ||
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("data:")
  ) {
    return null;
  }

  if (specifier.startsWith("node:")) {
    return null;
  }

  if (NODE_BUILTINS.has(specifier)) {
    return null;
  }

  if (aliasMatchers.some((matches) => matches(specifier))) {
    return null;
  }

  const packageName = extractPackageName(specifier);
  if (!packageName || NODE_BUILTINS.has(packageName)) {
    return null;
  }

  if (IGNORED_PACKAGES.has(packageName)) {
    return null;
  }

  return packageName;
}

function collectSpecifiers(
  sourceFile: import("ts-morph").SourceFile
): Set<string> {
  const specifiers = new Set<string>();

  for (const declaration of sourceFile.getImportDeclarations()) {
    specifiers.add(declaration.getModuleSpecifierValue());
  }

  for (const declaration of sourceFile.getExportDeclarations()) {
    const moduleSpecifier = declaration.getModuleSpecifierValue();
    if (moduleSpecifier) {
      specifiers.add(moduleSpecifier);
    }
  }

  for (const call of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression
  )) {
    const [firstArg] = call.getArguments();
    if (!firstArg?.isKind(SyntaxKind.StringLiteral)) {
      continue;
    }

    const expression = call.getExpression();
    const isDynamicImport = expression.isKind(SyntaxKind.ImportKeyword);
    const isRequireCall =
      expression.isKind(SyntaxKind.Identifier) &&
      expression.getText() === "require";

    if (isDynamicImport || isRequireCall) {
      specifiers.add(firstArg.getLiteralText());
    }
  }

  return specifiers;
}

function createRegistryItemLookup(items: RegistryItem[], registryName: string) {
  const lookup = new Map<string, RegistryItem>();
  const [rawScope] = registryName.split("/");
  const scope = rawScope ? rawScope.replace(LEADING_AT_RE, "") : "";
  const scopedPrefix = scope ? `@${scope}/` : "";

  for (const item of items) {
    lookup.set(item.name, item);

    if (scopedPrefix) {
      lookup.set(`${scopedPrefix}${item.name}`, item);
    }

    if (item.name.startsWith("@")) {
      const slashIndex = item.name.indexOf("/");
      if (slashIndex > 0 && slashIndex < item.name.length - 1) {
        lookup.set(item.name.slice(slashIndex + 1), item);
      }
    }
  }

  return lookup;
}

function resolveRegistryItem(
  reference: string,
  lookup: Map<string, RegistryItem>
): RegistryItem | null {
  const normalized = normalizeRegistryReference(reference);
  if (!normalized || HTTP_URL_RE.test(normalized)) {
    return null;
  }

  const candidates = [normalized];
  const slashIndex = normalized.indexOf("/");
  if (slashIndex > 0 && slashIndex < normalized.length - 1) {
    candidates.push(normalized.slice(slashIndex + 1));
  }

  for (const candidate of candidates) {
    const item = lookup.get(candidate);
    if (item) {
      return item;
    }
  }

  return null;
}

function collectDeclaredDependencies(
  item: RegistryItem,
  lookup: Map<string, RegistryItem>,
  cache: Map<string, Set<string>>,
  visiting: Set<string> = new Set()
): Set<string> {
  const cached = cache.get(item.name);
  if (cached) {
    return new Set(cached);
  }

  if (visiting.has(item.name)) {
    return new Set();
  }

  visiting.add(item.name);

  const collected = new Set(
    [...(item.dependencies ?? []), ...(item.devDependencies ?? [])].map(
      normalizeDeclaredDependency
    )
  );

  for (const registryDependency of item.registryDependencies ?? []) {
    const dependencyItem = resolveRegistryItem(registryDependency, lookup);
    if (!dependencyItem) {
      continue;
    }

    const transitiveDependencies = collectDeclaredDependencies(
      dependencyItem,
      lookup,
      cache,
      visiting
    );
    for (const dependency of transitiveDependencies) {
      collected.add(dependency);
    }
  }

  visiting.delete(item.name);
  cache.set(item.name, new Set(collected));
  return collected;
}

function collectSharedStyleDependencies(
  lookup: Map<string, RegistryItem>,
  cache: Map<string, Set<string>>
): Set<string> {
  const shared = new Set(
    STYLE_BASE_DEPENDENCIES.map((dependency) =>
      normalizeDeclaredDependency(dependency)
    )
  );

  for (const registryDependency of STYLE_BASE_REGISTRY_DEPENDENCIES) {
    const dependencyItem = resolveRegistryItem(registryDependency, lookup);
    if (!dependencyItem) {
      continue;
    }

    const transitiveDependencies = collectDeclaredDependencies(
      dependencyItem,
      lookup,
      cache
    );
    for (const dependency of transitiveDependencies) {
      shared.add(dependency);
    }
  }

  return shared;
}

function collectImportedPackagesForItem(
  item: RegistryItem,
  project: Project,
  aliasMatchers: AliasMatcher[]
): Map<string, Set<string>> {
  const packageToFiles = new Map<string, Set<string>>();

  for (const rawFile of item.files ?? []) {
    const filePath = typeof rawFile === "string" ? rawFile : rawFile.path;
    const absolutePath = path.join(
      process.cwd(),
      "registry",
      "default",
      filePath
    );
    const sourceFile = project.addSourceFileAtPathIfExists(absolutePath);

    if (!sourceFile) {
      continue;
    }

    for (const specifier of collectSpecifiers(sourceFile)) {
      const externalPackage = resolveExternalPackage(specifier, aliasMatchers);
      if (!externalPackage) {
        continue;
      }

      if (!packageToFiles.has(externalPackage)) {
        packageToFiles.set(externalPackage, new Set());
      }
      packageToFiles.get(externalPackage)?.add(`registry/default/${filePath}`);
    }
  }

  return packageToFiles;
}

function findIssueForItem(
  item: RegistryItem,
  project: Project,
  aliasMatchers: AliasMatcher[],
  itemLookup: Map<string, RegistryItem>,
  dependencyCache: Map<string, Set<string>>,
  sharedStyleDependencies: Set<string>
): DependencyIssue | null {
  if (!CHECKED_TYPES.has(item.type)) {
    return null;
  }

  const declaredDependencies = collectDeclaredDependencies(
    item,
    itemLookup,
    dependencyCache
  );
  for (const dependency of sharedStyleDependencies) {
    declaredDependencies.add(dependency);
  }

  const packageToFiles = collectImportedPackagesForItem(
    item,
    project,
    aliasMatchers
  );

  const missing = Array.from(packageToFiles.entries())
    .filter(([dependency]) => !declaredDependencies.has(dependency))
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([dependency, files]) => ({
      dependency,
      files: Array.from(files).sort(),
    }));

  if (missing.length === 0) {
    return null;
  }

  return {
    item: item.name,
    type: item.type,
    missing,
  };
}

function collectIssues(
  items: RegistryItem[],
  project: Project,
  aliasMatchers: AliasMatcher[],
  itemLookup: Map<string, RegistryItem>,
  dependencyCache: Map<string, Set<string>>,
  sharedStyleDependencies: Set<string>
): DependencyIssue[] {
  const issues: DependencyIssue[] = [];

  for (const item of items) {
    const issue = findIssueForItem(
      item,
      project,
      aliasMatchers,
      itemLookup,
      dependencyCache,
      sharedStyleDependencies
    );

    if (issue) {
      issues.push(issue);
    }
  }

  return issues;
}

function reportIssues(issues: DependencyIssue[]): void {
  if (issues.length === 0) {
    console.log("✅ Registry dependency declarations are in sync.");
    return;
  }

  console.error("❌ Registry dependency check failed.");
  for (const issue of issues) {
    console.error(`\n- ${issue.item} (${issue.type})`);
    for (const missing of issue.missing) {
      console.error(
        `  - missing "${missing.dependency}" imported by: ${missing.files.join(", ")}`
      );
    }
  }

  console.error(
    "\nAdd missing packages to the relevant item `dependencies` in its `_registry.ts` entry."
  );
  process.exit(1);
}

function run(): void {
  const parsedRegistry = registrySchema.parse(registry);
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  const aliasMatchers = createAliasMatchers(project);

  const itemLookup = createRegistryItemLookup(
    parsedRegistry.items,
    parsedRegistry.name
  );
  const dependencyCache = new Map<string, Set<string>>();
  const sharedStyleDependencies = collectSharedStyleDependencies(
    itemLookup,
    dependencyCache
  );

  const issues = collectIssues(
    parsedRegistry.items,
    project,
    aliasMatchers,
    itemLookup,
    dependencyCache,
    sharedStyleDependencies
  );

  reportIssues(issues);
}

try {
  run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
