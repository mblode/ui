import type { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Docs",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/components",
    },
    {
      title: "Icons",
      href: "https://icons.blode.co",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [
            {
              title: "Next.js",
              href: "/docs/installation/next",
              items: [],
            },
            {
              title: "Vite",
              href: "/docs/installation/vite",
              items: [],
            },
            {
              title: "Remix",
              href: "/docs/installation/remix",
              items: [],
            },
            {
              title: "Astro",
              href: "/docs/installation/astro",
              items: [],
            },
            {
              title: "Laravel",
              href: "/docs/installation/laravel",
              items: [],
            },
            {
              title: "Gatsby",
              href: "/docs/installation/gatsby",
              items: [],
            },
            {
              title: "Manual",
              href: "/docs/installation/manual",
              items: [],
            },
          ],
        },
        {
          title: "Typography",
          href: "/docs/typography",
          items: [],
        },
        {
          title: "Tailwind v4",
          href: "/docs/tailwind-v4",
          items: [],
        },
        {
          title: "Icons",
          href: "https://icons.blode.co",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Accordion",
          href: "/docs/components/accordion",
          items: [],
        },
        {
          title: "Alert",
          href: "/docs/components/alert",
          items: [],
        },
        {
          title: "Alert Dialog",
          href: "/docs/components/alert-dialog",
          items: [],
        },
        {
          title: "Aspect Ratio",
          href: "/docs/components/aspect-ratio",
          items: [],
        },
        {
          title: "Avatar",
          href: "/docs/components/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/docs/components/badge",
          items: [],
        },
        {
          title: "Breadcrumb",
          href: "/docs/components/breadcrumb",
          items: [],
        },
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          items: [],
        },
        {
          title: "Card",
          href: "/docs/components/card",
          items: [],
        },
        {
          title: "Carousel",
          href: "/docs/components/carousel",
          items: [],
        },
        {
          title: "Circular Progress",
          href: "/docs/components/circular-progress",
          items: [],
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox",
          items: [],
        },
        {
          title: "Collapsible",
          href: "/docs/components/collapsible",
          items: [],
        },
        {
          title: "Combobox",
          href: "/docs/components/combobox",
          items: [],
        },
        {
          title: "Multi Combobox",
          href: "/docs/components/multi-combobox",
          items: [],
        },
        {
          title: "Command",
          href: "/docs/components/command",
          items: [],
        },
        {
          title: "Currency Input",
          href: "/docs/components/currency-input",
          items: [],
        },
        {
          title: "Data Table",
          href: "/docs/components/data-table",
          items: [],
        },
        {
          title: "Date Picker",
          href: "/docs/components/date-picker",
          items: [],
        },
        {
          title: "Dialog",
          href: "/docs/components/dialog",
          items: [],
        },
        {
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu",
          items: [],
        },
        {
          title: "Input",
          href: "/docs/components/input",
          items: [],
        },
        {
          title: "Input OTP",
          href: "/docs/components/input-otp",
          items: [],
        },
        {
          title: "Phone Input",
          href: "/docs/components/phone-input",
          items: [],
        },
        {
          title: "Kbd",
          href: "/docs/components/kbd",
          items: [],
        },
        {
          title: "Label",
          href: "/docs/components/label",
          items: [],
        },
        {
          title: "Menubar",
          href: "/docs/components/menubar",
          items: [],
        },
        {
          title: "Popover",
          href: "/docs/components/popover",
          items: [],
        },
        {
          title: "Progress",
          href: "/docs/components/progress",
          items: [],
        },
        {
          title: "Prompt",
          href: "/docs/components/prompt",
          items: [],
        },
        {
          title: "Radio Group",
          href: "/docs/components/radio-group",
          items: [],
        },
        {
          title: "Scroll Area",
          href: "/docs/components/scroll-area",
          items: [],
        },
        {
          title: "Select",
          href: "/docs/components/select",
          items: [],
        },
        {
          title: "Separator",
          href: "/docs/components/separator",
          items: [],
        },
        {
          title: "Sheet",
          href: "/docs/components/sheet",
          items: [],
        },
        {
          title: "Skeleton",
          href: "/docs/components/skeleton",
          items: [],
        },
        {
          title: "Slider",
          href: "/docs/components/slider",
          items: [],
        },
        {
          title: "Sonner",
          href: "/docs/components/sonner",
          items: [],
        },
        {
          title: "Spinner",
          href: "/docs/components/spinner",
          items: [],
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
        },
        {
          title: "Table",
          href: "/docs/components/table",
          items: [],
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
        },
        {
          title: "Textarea",
          href: "/docs/components/textarea",
          items: [],
        },
        {
          title: "Toggle",
          href: "/docs/components/toggle",
          items: [],
        },
        {
          title: "Toggle Group",
          href: "/docs/components/toggle-group",
          items: [],
        },
        {
          title: "Tooltip",
          href: "/docs/components/tooltip",
          items: [],
        },
      ],
    },
  ],
};
