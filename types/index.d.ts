export interface NavItem {
  disabled?: boolean;
  event?: string;
  external?: boolean;
  href?: string;
  icon?: keyof typeof Icons;
  label?: string;
  paid?: boolean;
  title: string;
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export interface DashboardConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

declare module "next/link" {
  // biome-ignore lint/suspicious/noExplicitAny: declaration merging requires the
  // type parameter list to match next/link's own, defaults included.
  // oxlint-disable-next-line typescript/no-explicit-any
  interface LinkProps<RouteInferType = any> {
    /**
     * Upgrades this link's prefetch from the App Shell to the full payload on
     * pointer intent. Enabled by `experimental.dynamicOnHover` in
     * `next.config.ts`; see the comment there for why the docs routes need it.
     *
     * Declared here because `next/link`'s shipped types are the Pages Router
     * shape — the package entry resolves to `dist/client/link`, which has no
     * such prop. App Router builds alias the module to
     * `dist/client/app-dir/link` (`dist/build/create-compiler-aliases.js:262`),
     * and that is where the prop is both typed and read. So it works at runtime
     * and does not type-check without this. Drop the block once Next ships the
     * prop on the public entry.
     */
    unstable_dynamicOnHover?: boolean;
  }
}
