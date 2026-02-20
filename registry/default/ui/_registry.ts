import type { Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "accordion",
    type: "registry:ui",
    title: "Accordion",
    description:
      "A vertically stacked set of interactive headings that reveal or hide associated content.",
    dependencies: ["@base-ui/react", "motion"],
    files: [
      {
        path: "ui/accordion.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "alert",
    type: "registry:ui",
    title: "Alert",
    description:
      "A callout that displays a short, important message to attract attention.",
    files: [
      {
        path: "ui/alert.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "alert-dialog",
    type: "registry:ui",
    title: "Alert Dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/alert-dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "aspect-ratio",
    type: "registry:ui",
    title: "Aspect Ratio",
    description:
      "A component that maintains a consistent width-to-height ratio.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/aspect-ratio.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "autocomplete",
    type: "registry:ui",
    title: "Autocomplete",
    description: "An input that suggests matching values while typing.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/autocomplete.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "bar-list",
    type: "registry:ui",
    title: "Bar List",
    description:
      "A compact comparison list that visualises values as horizontal bars.",
    files: [
      {
        path: "ui/bar-list.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description:
      "A small status indicator for labelling and categorising items.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "breadcrumb",
    type: "registry:ui",
    title: "Breadcrumb",
    description:
      "A navigation aid that shows the current page location within a hierarchy.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/breadcrumb.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "An interactive element that triggers an action when clicked.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group",
    type: "registry:ui",
    title: "Button Group",
    description:
      "A container that groups related buttons together with shared styling.",
    registryDependencies: ["button", "separator"],
    files: [
      {
        path: "ui/button-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "calendar",
    type: "registry:ui",
    title: "Calendar",
    description: "A date field component that allows users to pick dates.",
    dependencies: ["react-day-picker@latest", "date-fns"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/calendar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "card",
    type: "registry:ui",
    title: "Card",
    description: "A container for grouping related content and actions.",
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "carousel",
    type: "registry:ui",
    title: "Carousel",
    description: "A slideshow component for cycling through a set of content.",
    files: [
      {
        path: "ui/carousel.tsx",
        type: "registry:ui",
      },
    ],
    registryDependencies: ["button"],
    dependencies: ["embla-carousel-react"],
  },
  {
    name: "circular-progress",
    type: "registry:ui",
    title: "Circular Progress",
    description: "A circular indicator that shows the progress of a task.",
    files: [
      {
        path: "ui/circular-progress.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    title: "Checkbox",
    description:
      "A control that allows the user to toggle between checked and unchecked states.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/checkbox.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/checkbox.css",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkbox-group",
    type: "registry:ui",
    title: "Checkbox Group",
    description:
      "A grouped set of related checkboxes managed with shared state.",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "ui/checkbox-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "collapsible",
    type: "registry:ui",
    title: "Collapsible",
    description:
      "An interactive component that expands and collapses a panel of content.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/collapsible.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "currency-input",
    type: "registry:ui",
    title: "Currency Input",
    description: "A formatted input field for entering monetary values.",
    dependencies: ["blode-icons-react", "react-currency-input-field"],
    files: [
      {
        path: "ui/currency-input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "combobox",
    type: "registry:ui",
    title: "Combobox",
    description:
      "An autocomplete input that combines a text field with a filterable dropdown list.",
    dependencies: ["@base-ui/react", "blode-icons-react"],
    registryDependencies: ["button", "input-group"],
    files: [
      {
        path: "ui/combobox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "multi-combobox",
    type: "registry:ui",
    title: "Multi Combobox",
    description:
      "A combobox that allows selecting multiple items with tag-style badges.",
    dependencies: [
      "@base-ui/react",
      "downshift",
      "lodash",
      "blode-icons-react",
    ],
    registryDependencies: ["badge"],
    files: [
      {
        path: "ui/multi-combobox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "command",
    type: "registry:ui",
    title: "Command",
    description:
      "A command palette for fast, keyboard-driven searching and navigation.",
    dependencies: ["cmdk"],
    registryDependencies: ["dialog"],
    files: [
      {
        path: "ui/command.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "context-menu",
    type: "registry:ui",
    title: "Context Menu",
    description:
      "A menu that appears on right-click, providing contextual actions.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/context-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description:
      "A modal window that overlays the main content and requires user interaction.",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "drawer",
    type: "registry:ui",
    title: "Drawer",
    description: "A panel that slides in from the edge of the screen.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/drawer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    title: "Dropdown Menu",
    description:
      "A menu that opens from a trigger button, displaying a list of actions.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/dropdown-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "empty",
    type: "registry:ui",
    title: "Empty",
    description:
      "A placeholder displayed when there is no content or data to show.",
    files: [
      {
        path: "ui/empty.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "field",
    type: "registry:ui",
    title: "Field",
    description:
      "A form field wrapper that pairs a label, input, and helper text.",
    registryDependencies: ["label", "separator"],
    files: [
      {
        path: "ui/field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "form",
    type: "registry:ui",
    title: "Form",
    description:
      "A form component with validation powered by React Hook Form and Zod.",
    dependencies: [
      "@base-ui/react",
      "@hookform/resolvers",
      "zod",
      "react-hook-form",
    ],
    registryDependencies: ["button", "label"],
    files: [
      {
        path: "ui/form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "hover-card",
    type: "registry:ui",
    title: "Hover Card",
    description:
      "A popup card that appears when hovering over a trigger element.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/hover-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description: "A text input field for capturing user data.",
    dependencies: ["blode-icons-react"],
    files: [
      {
        path: "ui/input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group",
    type: "registry:ui",
    title: "Input Group",
    description:
      "A wrapper that combines an input with addons like icons or buttons.",
    registryDependencies: ["button", "input", "textarea"],
    files: [
      {
        path: "ui/input-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp",
    type: "registry:ui",
    title: "Input OTP",
    description: "A one-time password input with individual character fields.",
    dependencies: ["input-otp"],
    files: [
      {
        path: "ui/input-otp.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "item",
    type: "registry:ui",
    title: "Item",
    description:
      "A flexible list item component for menus, settings, and data rows.",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["separator"],
    files: [
      {
        path: "ui/item.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "label",
    type: "registry:ui",
    title: "Label",
    description:
      "An accessible label that associates text with a form control.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/label.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menubar",
    type: "registry:ui",
    title: "Menubar",
    description:
      "A horizontal menu bar with dropdown menus, commonly used for application navigation.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/menubar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "meter",
    type: "registry:ui",
    title: "Meter",
    description: "A meter that shows a scalar value within a bounded range.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/meter.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "navigation-menu",
    type: "registry:ui",
    title: "Navigation Menu",
    description:
      "A responsive navigation component with support for dropdown panels.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/navigation-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "number-field",
    type: "registry:ui",
    title: "Number Field",
    description:
      "A numeric input with increment, decrement, and scrubbing interactions.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/number-field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "pagination",
    type: "registry:ui",
    title: "Pagination",
    description:
      "A navigation component for paging through content across multiple pages.",
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/pagination.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "phone-input",
    type: "registry:ui",
    title: "Phone Input",
    description:
      "An international phone number input with country code selector.",
    dependencies: ["blode-icons-react", "react-phone-number-input"],
    registryDependencies: [
      "button",
      "command",
      "input",
      "popover",
      "scroll-area",
    ],
    files: [
      {
        path: "ui/phone-input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover",
    type: "registry:ui",
    title: "Popover",
    description: "A floating panel that appears next to a trigger element.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "progress",
    type: "registry:ui",
    title: "Progress",
    description:
      "A horizontal bar that indicates the completion progress of a task.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/progress.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "progress-list",
    type: "registry:ui",
    title: "Progress List",
    description:
      "A vertical list of progress items with completed and pending states.",
    dependencies: ["blode-icons-react"],
    files: [
      {
        path: "ui/progress-list.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "prompt",
    type: "registry:ui",
    title: "Prompt",
    description:
      "A confirmation dialog that asks the user for input before proceeding.",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/prompt.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "radio-group",
    type: "registry:ui",
    title: "Radio Group",
    description:
      "A set of mutually exclusive options where only one can be selected.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "resizable",
    type: "registry:ui",
    title: "Resizable",
    description:
      "A layout component with draggable handles for resizing panels.",
    dependencies: ["react-resizable-panels@^4"],
    files: [
      {
        path: "ui/resizable.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-area",
    type: "registry:ui",
    title: "Scroll Area",
    description: "A scrollable container with custom styled scrollbars.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/scroll-area.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description:
      "A dropdown control for choosing a single value from a list of options.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "separator",
    type: "registry:ui",
    title: "Separator",
    description:
      "A visual divider that separates content into distinct sections.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/separator.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sheet",
    type: "registry:ui",
    title: "Sheet",
    description:
      "A panel that slides in from the edge of the viewport with an overlay.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/sheet.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sidebar",
    type: "registry:ui",
    title: "Sidebar",
    description:
      "A collapsible side navigation component with multiple layout variants.",
    dependencies: [
      "@base-ui/react",
      "class-variance-authority",
      "blode-icons-react",
    ],
    registryDependencies: [
      "button",
      "separator",
      "sheet",
      "tooltip",
      "input",
      "@blode/use-mobile",
      "skeleton",
    ],
    files: [
      {
        path: "ui/sidebar.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      light: {
        "sidebar-background": "0 0% 98%",
        "sidebar-foreground": "240 5.3% 26.1%",
        "sidebar-primary": "240 5.9% 10%",
        "sidebar-primary-foreground": "0 0% 98%",
        "sidebar-accent": "240 4.8% 95.9%",
        "sidebar-accent-foreground": "240 5.9% 10%",
        "sidebar-border": "220 13% 91%",
        "sidebar-ring": "217.2 91.2% 59.8%",
      },
      dark: {
        "sidebar-background": "240 5.9% 10%",
        "sidebar-foreground": "240 4.8% 95.9%",
        "sidebar-primary": "224.3 76.3% 48%",
        "sidebar-primary-foreground": "0 0% 100%",
        "sidebar-accent": "240 3.7% 15.9%",
        "sidebar-accent-foreground": "240 4.8% 95.9%",
        "sidebar-border": "240 3.7% 15.9%",
        "sidebar-ring": "217.2 91.2% 59.8%",
      },
    },
  },
  {
    name: "skeleton",
    type: "registry:ui",
    title: "Skeleton",
    description: "A placeholder animation that indicates content is loading.",
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "slider",
    type: "registry:ui",
    title: "Slider",
    description:
      "A draggable control for selecting a numeric value within a range.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/slider.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sonner",
    type: "registry:ui",
    title: "Sonner",
    description: "A toast notification component powered by Sonner.",
    dependencies: ["sonner", "next-themes"],
    files: [
      {
        path: "ui/sonner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "spinner",
    type: "registry:ui",
    title: "Spinner",
    description: "An animated loading indicator for asynchronous operations.",
    files: [
      {
        path: "ui/spinner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "stat",
    type: "registry:ui",
    title: "Stat",
    description:
      "A compact metric card for showing a headline value and label.",
    files: [
      {
        path: "ui/stat.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description: "A toggle control for switching between on and off states.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/switch.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "table",
    type: "registry:ui",
    title: "Table",
    description:
      "A responsive table for displaying structured data in rows and columns.",
    files: [
      {
        path: "ui/table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description:
      "A tabbed interface that organises content into switchable panels.",
    dependencies: ["@base-ui/react", "class-variance-authority", "merge-refs"],
    registryDependencies: ["@blode/use-tab-observer"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    title: "Textarea",
    description: "A multi-line text input field for longer form content.",
    files: [
      {
        path: "ui/textarea.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggle",
    type: "registry:ui",
    title: "Toggle",
    description: "A two-state button that can be toggled on or off.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/toggle.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    title: "Toggle Group",
    description: "A set of toggle buttons where one or more can be active.",
    dependencies: ["@base-ui/react"],
    registryDependencies: ["toggle"],
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    title: "Tooltip",
    description:
      "A popup that displays helpful information when hovering or focusing an element.",
    dependencies: ["@base-ui/react"],
    docs: `The \`tooltip\` component has been added. Remember to wrap your app with the \`TooltipProvider\` component.

\`\`\`tsx title="app/layout.tsx"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
\`\`\`
`,
    files: [
      {
        path: "ui/tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "kbd",
    type: "registry:ui",
    title: "Kbd",
    description:
      "A styled keyboard key indicator for displaying shortcuts and key combinations.",
    files: [
      {
        path: "ui/kbd.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "native-select",
    type: "registry:ui",
    title: "Native Select",
    description: "A styled wrapper around the native HTML select element.",
    files: [
      {
        path: "ui/native-select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "direction",
    type: "registry:ui",
    title: "Direction",
    description:
      "A context provider for managing text direction (LTR/RTL) across components.",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/direction.tsx",
        type: "registry:ui",
      },
    ],
  },
];
