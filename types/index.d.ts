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
