import fs from "node:fs";
import path from "node:path";
import type { UnistNode, UnistTree } from "types/unist";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { Index } from "../__registry__";
import { styles } from "../registry/registry-styles";

interface RegistryComponent {
  files?: Array<
    | string
    | {
        path?: string;
      }
  >;
}

type RegistryByStyle = Record<string, Record<string, RegistryComponent>>;
const registryIndex = Index as RegistryByStyle;

function getFilePath(
  file: NonNullable<RegistryComponent["files"]>[number] | undefined
) {
  if (!file) {
    return undefined;
  }

  return typeof file === "string" ? file : file.path;
}

export function rehypeComponent() {
  return (tree: UnistTree) => {
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This visitor handles multiple MDX component transformations in one traversal.
    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      const { value: srcPath } =
        (getNodeAttributeByName(node, "src") as {
          name: string;
          value?: string;
          type?: string;
        }) || {};

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        if (!(name || srcPath)) {
          return null;
        }

        try {
          for (const style of styles) {
            let src = "";

            if (srcPath) {
              src = path.join(process.cwd(), srcPath);
            } else {
              const component = registryIndex[style.name]?.[name];
              if (!component?.files) {
                console.warn(
                  `Component "${name}" not found in registry or has no files.`
                );
                return;
              }
              if (fileName) {
                const matchedFile = component.files.find((file) => {
                  const filePath = getFilePath(file);

                  return Boolean(
                    filePath &&
                      (filePath.endsWith(`${fileName}.tsx`) ||
                        filePath.endsWith(`${fileName}.ts`))
                  );
                });
                src =
                  getFilePath(matchedFile) ??
                  getFilePath(component.files[0]) ??
                  "";
              } else {
                src = getFilePath(component.files[0]) ?? "";
              }

              if (!src) {
                console.warn(
                  `Could not resolve source path for component "${name}".`
                );
                return;
              }
            }

            // Read the source file.
            const filePath = src;
            let source = "";
            try {
              source = fs.readFileSync(filePath, "utf8");
            } catch (error) {
              console.warn(`Could not read file: ${filePath}`, error);
              return;
            }

            // Replace imports.
            // TODO: Use @swc/core and a visitor to replace this.
            // For now a simple regex should do.
            source = source.replaceAll(
              `@/registry/${style.name}/`,
              "@/components/"
            );
            source = source.replaceAll("export default", "export");

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src,
                  __style__: style.name,
                },
                attributes: [
                  {
                    name: "styleName",
                    type: "mdxJsxAttribute",
                    value: style.name,
                  },
                ],
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"],
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      }

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          for (const style of styles) {
            const component = registryIndex[style.name]?.[name];
            if (!component?.files?.length) {
              console.warn(
                `Component "${name}" not found in registry or has no files.`
              );
              continue;
            }
            const src = getFilePath(component.files[0]);

            if (!src) {
              console.warn(
                `Could not resolve source path for component "${name}".`
              );
              continue;
            }

            // Read the source file.
            const filePath = src;
            let source = "";
            try {
              source = fs.readFileSync(filePath, "utf8");
            } catch (error) {
              console.warn(`Could not read file: ${filePath}`, error);
              continue;
            }

            // Replace imports.
            // TODO: Use @swc/core and a visitor to replace this.
            // For now a simple regex should do.
            source = source.replaceAll(
              `@/registry/${style.name}/`,
              "@/components/"
            );
            source = source.replaceAll("export default", "export");

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: src,
                },
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"],
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      }

      // if (node.name === "ComponentExample") {
      //   const source = getComponentSourceFileContent(node)
      //   if (!source) {
      //     return
      //   }

      //   // Replace the Example component with a pre element.
      //   node.children?.push(
      //     u("element", {
      //       tagName: "pre",
      //       properties: {
      //         __src__: src,
      //       },
      //       children: [
      //         u("element", {
      //           tagName: "code",
      //           properties: {
      //             className: ["language-tsx"],
      //           },
      //           children: [
      //             {
      //               type: "text",
      //               value: source,
      //             },
      //           ],
      //         }),
      //       ],
      //     })
      //   )

      //   const extractClassname = getNodeAttributeByName(
      //     node,
      //     "extractClassname"
      //   )
      //   if (
      //     extractClassname &&
      //     typeof extractClassname.value !== "undefined" &&
      //     extractClassname.value !== "false"
      //   ) {
      //     // Extract className from string
      //     // TODO: Use @swc/core and a visitor to extract this.
      //     // For now, a simple regex should do.
      //     const values = source.match(/className="(.*)"/)
      //     const className = values ? values[1] : ""

      //     // Add the className as a jsx prop so we can pass it to the copy button.
      //     node.attributes?.push({
      //       name: "extractedClassNames",
      //       type: "mdxJsxAttribute",
      //       value: className,
      //     })

      //     // Add a pre element with the className only.
      //     node.children?.push(
      //       u("element", {
      //         tagName: "pre",
      //         properties: {},
      //         children: [
      //           u("element", {
      //             tagName: "code",
      //             properties: {
      //               className: ["language-tsx"],
      //             },
      //             children: [
      //               {
      //                 type: "text",
      //                 value: className,
      //               },
      //             ],
      //           }),
      //         ],
      //       })
      //     )
      //   }
      // }

      // if (node.name === "ComponentSource") {
      //   const source = getComponentSourceFileContent(node)
      //   if (!source) {
      //     return
      //   }

      //   // Replace the Source component with a pre element.
      //   node.children?.push(
      //     u("element", {
      //       tagName: "pre",
      //       properties: {
      //         __src__: src,
      //       },
      //       children: [
      //         u("element", {
      //           tagName: "code",
      //           properties: {
      //             className: ["language-tsx"],
      //           },
      //           children: [
      //             {
      //               type: "text",
      //               value: source,
      //             },
      //           ],
      //         }),
      //       ],
      //     })
      //   )
      // }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

function _getComponentSourceFileContent(node: UnistNode) {
  const src = getNodeAttributeByName(node, "src")?.value as string;

  if (!src) {
    return null;
  }

  // Read the source file.
  const filePath = path.join(process.cwd(), src);
  const source = fs.readFileSync(filePath, "utf8");

  return source;
}
