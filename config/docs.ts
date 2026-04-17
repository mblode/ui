import type { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      href: "/docs",
      title: "Docs",
    },
    {
      href: "/components",
      title: "Components",
    },
    {
      href: "/docs/icons",
      title: "Icons",
    },
  ],
  sidebarNav: [
    {
      items: [
        {
          href: "/docs",
          items: [],
          title: "Introduction",
        },
        {
          href: "/docs/installation",
          items: [
            {
              href: "/docs/installation/next",
              items: [],
              title: "Next.js",
            },
            {
              href: "/docs/installation/vite",
              items: [],
              title: "Vite",
            },
            {
              href: "/docs/installation/remix",
              items: [],
              title: "Remix",
            },
            {
              href: "/docs/installation/astro",
              items: [],
              title: "Astro",
            },
            {
              href: "/docs/installation/laravel",
              items: [],
              title: "Laravel",
            },
            {
              href: "/docs/installation/gatsby",
              items: [],
              title: "Gatsby",
            },
            {
              href: "/docs/installation/manual",
              items: [],
              title: "Manual",
            },
          ],
          title: "Installation",
        },
        {
          href: "/docs/skills",
          items: [],
          title: "Skills",
        },
        {
          href: "/docs/font",
          items: [],
          title: "Font",
        },
        {
          href: "/docs/tailwind-v4",
          items: [],
          title: "Tailwind v4",
        },
        {
          href: "/docs/theming",
          items: [],
          title: "Theming",
        },
        {
          href: "/docs/icons",
          items: [],
          title: "Icons",
        },
      ],
      title: "Sections",
    },
    {
      items: [
        {
          href: "/docs/components/accordion",
          items: [],
          title: "Accordion",
        },
        {
          href: "/docs/components/alert",
          items: [],
          title: "Alert",
        },
        {
          href: "/docs/components/alert-dialog",
          items: [],
          title: "Alert Dialog",
        },
        {
          href: "/docs/components/aspect-ratio",
          items: [],
          title: "Aspect Ratio",
        },
        {
          href: "/docs/components/autocomplete",
          items: [],
          title: "Autocomplete",
        },
        {
          href: "/docs/components/avatar",
          items: [],
          title: "Avatar",
        },
        {
          href: "/docs/components/bar-list",
          items: [],
          title: "Bar List",
        },
        {
          href: "/docs/components/badge",
          items: [],
          title: "Badge",
        },
        {
          href: "/docs/components/breadcrumb",
          items: [],
          title: "Breadcrumb",
        },
        {
          href: "/docs/components/button",
          items: [],
          title: "Button",
        },
        {
          href: "/docs/components/button-group",
          items: [],
          title: "Button Group",
        },
        {
          href: "/docs/components/calendar",
          items: [],
          title: "Calendar",
        },
        {
          href: "/docs/components/card",
          items: [],
          title: "Card",
        },
        {
          href: "/docs/components/carousel",
          items: [],
          title: "Carousel",
        },
        {
          href: "/docs/components/circular-progress",
          items: [],
          title: "Circular Progress",
        },
        {
          href: "/docs/components/checkbox",
          items: [],
          title: "Checkbox",
        },
        {
          href: "/docs/components/checkbox-group",
          items: [],
          title: "Checkbox Group",
        },
        {
          href: "/docs/components/collapsible",
          items: [],
          title: "Collapsible",
        },
        {
          href: "/docs/components/combobox",
          items: [],
          title: "Combobox",
        },
        {
          href: "/docs/components/multi-combobox",
          items: [],
          title: "Multi Combobox",
        },
        {
          href: "/docs/components/command",
          items: [],
          title: "Command",
        },
        {
          href: "/docs/components/context-menu",
          items: [],
          title: "Context Menu",
        },
        {
          href: "/docs/components/copy-button",
          items: [],
          title: "Copy Button",
        },
        {
          href: "/docs/components/currency-input",
          items: [],
          title: "Currency Input",
        },
        {
          href: "/docs/components/data-table",
          items: [],
          title: "Data Table",
        },
        {
          href: "/docs/components/date-picker",
          items: [],
          title: "Date Picker",
        },
        {
          href: "/docs/components/dialog",
          items: [],
          title: "Dialog",
        },
        {
          href: "/docs/components/drawer",
          items: [],
          title: "Drawer",
        },
        {
          href: "/docs/components/dropdown-menu",
          items: [],
          title: "Dropdown Menu",
        },
        {
          href: "/docs/components/empty",
          items: [],
          title: "Empty",
        },
        {
          href: "/docs/components/field",
          items: [],
          title: "Field",
        },
        {
          href: "/docs/components/hover-card",
          items: [],
          title: "Hover Card",
        },
        {
          href: "/docs/components/input",
          items: [],
          title: "Input",
        },
        {
          href: "/docs/components/input-group",
          items: [],
          title: "Input Group",
        },
        {
          href: "/docs/components/input-otp",
          items: [],
          title: "Input OTP",
        },
        {
          href: "/docs/components/item",
          items: [],
          title: "Item",
        },
        {
          href: "/docs/components/phone-input",
          items: [],
          title: "Phone Input",
        },
        {
          href: "/docs/components/kbd",
          items: [],
          title: "Kbd",
        },
        {
          href: "/docs/components/label",
          items: [],
          title: "Label",
        },
        {
          href: "/docs/components/menubar",
          items: [],
          title: "Menubar",
        },
        {
          href: "/docs/components/native-select",
          items: [],
          title: "Native Select",
        },
        {
          href: "/docs/components/navigation-menu",
          items: [],
          title: "Navigation Menu",
        },
        {
          href: "/docs/components/meter",
          items: [],
          title: "Meter",
        },
        {
          href: "/docs/components/number-field",
          items: [],
          title: "Number Field",
        },
        {
          href: "/docs/components/popover",
          items: [],
          title: "Popover",
        },
        {
          href: "/docs/components/pagination",
          items: [],
          title: "Pagination",
        },
        {
          href: "/docs/components/progress",
          items: [],
          title: "Progress",
        },
        {
          href: "/docs/components/progress-list",
          items: [],
          title: "Progress List",
        },
        {
          href: "/docs/components/prompt",
          items: [],
          title: "Prompt",
        },
        {
          href: "/docs/components/radio-group",
          items: [],
          title: "Radio Group",
        },
        {
          href: "/docs/components/resizable",
          items: [],
          title: "Resizable",
        },
        {
          href: "/docs/components/scroll-area",
          items: [],
          title: "Scroll Area",
        },
        {
          href: "/docs/components/select",
          items: [],
          title: "Select",
        },
        {
          href: "/docs/components/separator",
          items: [],
          title: "Separator",
        },
        {
          href: "/docs/components/sheet",
          items: [],
          title: "Sheet",
        },
        {
          href: "/docs/components/sidebar",
          items: [],
          title: "Sidebar",
        },
        {
          href: "/docs/components/skeleton",
          items: [],
          title: "Skeleton",
        },
        {
          href: "/docs/components/slider",
          items: [],
          title: "Slider",
        },
        {
          href: "/docs/components/sonner",
          items: [],
          title: "Sonner",
        },
        {
          href: "/docs/components/spinner",
          items: [],
          title: "Spinner",
        },
        {
          href: "/docs/components/stat",
          items: [],
          title: "Stat",
        },
        {
          href: "/docs/components/switch",
          items: [],
          title: "Switch",
        },
        {
          href: "/docs/components/table",
          items: [],
          title: "Table",
        },
        {
          href: "/docs/components/tabs",
          items: [],
          title: "Tabs",
        },
        {
          href: "/docs/components/textarea",
          items: [],
          title: "Textarea",
        },
        {
          href: "/docs/components/toggle",
          items: [],
          title: "Toggle",
        },
        {
          href: "/docs/components/toggle-group",
          items: [],
          title: "Toggle Group",
        },
        {
          href: "/docs/components/tooltip",
          items: [],
          title: "Tooltip",
        },
        {
          href: "/docs/components/typography",
          items: [],
          title: "Typography",
        },
      ],
      title: "Components",
    },
  ],
};
