import type { Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    dependencies: ["@base-ui/react", "motion"],
    description:
      "A vertically stacked set of interactive headings that reveal or hide associated content.",
    files: [
      {
        path: "ui/accordion.tsx",
        type: "registry:ui",
      },
    ],
    name: "accordion",
    title: "Accordion",
    type: "registry:ui",
  },
  {
    description: "A callout that displays a short, important message to attract attention.",
    files: [
      {
        path: "ui/alert.tsx",
        type: "registry:ui",
      },
    ],
    name: "alert",
    title: "Alert",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    files: [
      {
        path: "ui/alert-dialog.tsx",
        type: "registry:ui",
      },
    ],
    name: "alert-dialog",
    registryDependencies: ["button"],
    title: "Alert Dialog",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A component that maintains a consistent width-to-height ratio.",
    files: [
      {
        path: "ui/aspect-ratio.tsx",
        type: "registry:ui",
      },
    ],
    name: "aspect-ratio",
    title: "Aspect Ratio",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "An input that suggests matching values while typing.",
    files: [
      {
        path: "ui/autocomplete.tsx",
        type: "registry:ui",
      },
    ],
    name: "autocomplete",
    title: "Autocomplete",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "An image element with a fallback for representing the user.",
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:ui",
      },
    ],
    name: "avatar",
    title: "Avatar",
    type: "registry:ui",
  },
  {
    description: "A compact comparison list that visualises values as horizontal bars.",
    files: [
      {
        path: "ui/bar-list.tsx",
        type: "registry:ui",
      },
    ],
    name: "bar-list",
    title: "Bar List",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A small status indicator for labelling and categorising items.",
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui",
      },
    ],
    name: "badge",
    title: "Badge",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A navigation aid that shows the current page location within a hierarchy.",
    files: [
      {
        path: "ui/breadcrumb.tsx",
        type: "registry:ui",
      },
    ],
    name: "breadcrumb",
    title: "Breadcrumb",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "An interactive element that triggers an action when clicked.",
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
    name: "button",
    title: "Button",
    type: "registry:ui",
  },
  {
    description: "A container that groups related buttons together with shared styling.",
    files: [
      {
        path: "ui/button-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "button-group",
    registryDependencies: ["button", "separator"],
    title: "Button Group",
    type: "registry:ui",
  },
  {
    dependencies: ["react-day-picker@latest", "date-fns"],
    description: "A date field component that allows users to pick dates.",
    files: [
      {
        path: "ui/calendar.tsx",
        type: "registry:ui",
      },
    ],
    name: "calendar",
    registryDependencies: ["button"],
    title: "Calendar",
    type: "registry:ui",
  },
  {
    description: "A container for grouping related content and actions.",
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:ui",
      },
    ],
    name: "card",
    title: "Card",
    type: "registry:ui",
  },
  {
    dependencies: ["embla-carousel-react"],
    description: "A slideshow component for cycling through a set of content.",
    files: [
      {
        path: "ui/carousel.tsx",
        type: "registry:ui",
      },
    ],
    name: "carousel",
    registryDependencies: ["button"],
    title: "Carousel",
    type: "registry:ui",
  },
  {
    description: "A circular indicator that shows the progress of a task.",
    files: [
      {
        path: "ui/circular-progress.tsx",
        type: "registry:ui",
      },
    ],
    name: "circular-progress",
    title: "Circular Progress",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A control that allows the user to toggle between checked and unchecked states.",
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
    name: "checkbox",
    title: "Checkbox",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A grouped set of related checkboxes managed with shared state.",
    files: [
      {
        path: "ui/checkbox-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "checkbox-group",
    registryDependencies: ["checkbox"],
    title: "Checkbox Group",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "An interactive component that expands and collapses a panel of content.",
    files: [
      {
        path: "ui/collapsible.tsx",
        type: "registry:ui",
      },
    ],
    name: "collapsible",
    title: "Collapsible",
    type: "registry:ui",
  },
  {
    dependencies: ["blode-icons-react", "react-currency-input-field"],
    description: "A formatted input field for entering monetary values.",
    files: [
      {
        path: "ui/currency-input.tsx",
        type: "registry:ui",
      },
    ],
    name: "currency-input",
    title: "Currency Input",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react", "blode-icons-react"],
    description:
      "An autocomplete input that combines a text field with a filterable dropdown list.",
    files: [
      {
        path: "ui/combobox.tsx",
        type: "registry:ui",
      },
    ],
    name: "combobox",
    registryDependencies: ["button", "input-group"],
    title: "Combobox",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react", "downshift", "lodash", "blode-icons-react"],
    description: "A combobox that allows selecting multiple items with tag-style badges.",
    files: [
      {
        path: "ui/multi-combobox.tsx",
        type: "registry:ui",
      },
    ],
    name: "multi-combobox",
    registryDependencies: ["badge"],
    title: "Multi Combobox",
    type: "registry:ui",
  },
  {
    dependencies: ["cmdk"],
    description: "A command palette for fast, keyboard-driven searching and navigation.",
    files: [
      {
        path: "ui/command.tsx",
        type: "registry:ui",
      },
    ],
    name: "command",
    registryDependencies: ["dialog"],
    title: "Command",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A menu that appears on right-click, providing contextual actions.",
    files: [
      {
        path: "ui/context-menu.tsx",
        type: "registry:ui",
      },
    ],
    name: "context-menu",
    title: "Context Menu",
    type: "registry:ui",
  },
  {
    dependencies: ["blode-icons-react", "motion"],
    description: "A button that copies text to the clipboard with animated feedback.",
    files: [
      {
        path: "ui/copy-button.tsx",
        type: "registry:ui",
      },
    ],
    name: "copy-button",
    registryDependencies: ["button", "@blode/use-copy-to-clipboard"],
    title: "Copy Button",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A modal window that overlays the main content and requires user interaction.",
    files: [
      {
        path: "ui/dialog.tsx",
        type: "registry:ui",
      },
    ],
    name: "dialog",
    registryDependencies: ["button"],
    title: "Dialog",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A panel that slides in from the edge of the screen.",
    files: [
      {
        path: "ui/drawer.tsx",
        type: "registry:ui",
      },
    ],
    name: "drawer",
    title: "Drawer",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A menu that opens from a trigger button, displaying a list of actions.",
    files: [
      {
        path: "ui/dropdown-menu.tsx",
        type: "registry:ui",
      },
    ],
    name: "dropdown-menu",
    title: "Dropdown Menu",
    type: "registry:ui",
  },
  {
    description: "A placeholder displayed when there is no content or data to show.",
    files: [
      {
        path: "ui/empty.tsx",
        type: "registry:ui",
      },
    ],
    name: "empty",
    title: "Empty",
    type: "registry:ui",
  },
  {
    description: "A form field wrapper that pairs a label, input, and helper text.",
    files: [
      {
        path: "ui/field.tsx",
        type: "registry:ui",
      },
    ],
    name: "field",
    registryDependencies: ["label", "separator"],
    title: "Field",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react", "@hookform/resolvers", "zod", "react-hook-form"],
    description: "A form component with validation powered by React Hook Form and Zod.",
    files: [
      {
        path: "ui/form.tsx",
        type: "registry:ui",
      },
    ],
    name: "form",
    registryDependencies: ["button", "label"],
    title: "Form",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A popup card that appears when hovering over a trigger element.",
    files: [
      {
        path: "ui/hover-card.tsx",
        type: "registry:ui",
      },
    ],
    name: "hover-card",
    title: "Hover Card",
    type: "registry:ui",
  },
  {
    dependencies: ["blode-icons-react"],
    description: "A text input field for capturing user data.",
    files: [
      {
        path: "ui/input.tsx",
        type: "registry:ui",
      },
    ],
    name: "input",
    title: "Input",
    type: "registry:ui",
  },
  {
    description: "A wrapper that combines an input with addons like icons or buttons.",
    files: [
      {
        path: "ui/input-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "input-group",
    registryDependencies: ["button", "input", "textarea"],
    title: "Input Group",
    type: "registry:ui",
  },
  {
    dependencies: ["input-otp"],
    description: "A one-time password input with individual character fields.",
    files: [
      {
        path: "ui/input-otp.tsx",
        type: "registry:ui",
      },
    ],
    name: "input-otp",
    title: "Input OTP",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A flexible list item component for menus, settings, and data rows.",
    files: [
      {
        path: "ui/item.tsx",
        type: "registry:ui",
      },
    ],
    name: "item",
    registryDependencies: ["separator"],
    title: "Item",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "An accessible label that associates text with a form control.",
    files: [
      {
        path: "ui/label.tsx",
        type: "registry:ui",
      },
    ],
    name: "label",
    title: "Label",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description:
      "A horizontal menu bar with dropdown menus, commonly used for application navigation.",
    files: [
      {
        path: "ui/menubar.tsx",
        type: "registry:ui",
      },
    ],
    name: "menubar",
    title: "Menubar",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A meter that shows a scalar value within a bounded range.",
    files: [
      {
        path: "ui/meter.tsx",
        type: "registry:ui",
      },
    ],
    name: "meter",
    title: "Meter",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A responsive navigation component with support for dropdown panels.",
    files: [
      {
        path: "ui/navigation-menu.tsx",
        type: "registry:ui",
      },
    ],
    name: "navigation-menu",
    title: "Navigation Menu",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A numeric input with increment, decrement, and scrubbing interactions.",
    files: [
      {
        path: "ui/number-field.tsx",
        type: "registry:ui",
      },
    ],
    name: "number-field",
    title: "Number Field",
    type: "registry:ui",
  },
  {
    description: "A navigation component for paging through content across multiple pages.",
    files: [
      {
        path: "ui/pagination.tsx",
        type: "registry:ui",
      },
    ],
    name: "pagination",
    registryDependencies: ["button"],
    title: "Pagination",
    type: "registry:ui",
  },
  {
    dependencies: ["blode-icons-react"],
    description: "A password input with a toggle button to show or hide the password.",
    files: [
      {
        path: "ui/password-input.tsx",
        type: "registry:ui",
      },
    ],
    name: "password-input",
    registryDependencies: ["input"],
    title: "Password Input",
    type: "registry:ui",
  },
  {
    dependencies: ["blode-icons-react", "react-phone-number-input"],
    description: "An international phone number input with country code selector.",
    files: [
      {
        path: "ui/phone-input.tsx",
        type: "registry:ui",
      },
    ],
    name: "phone-input",
    registryDependencies: ["button", "command", "input", "popover", "scroll-area"],
    title: "Phone Input",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A floating panel that appears next to a trigger element.",
    files: [
      {
        path: "ui/popover.tsx",
        type: "registry:ui",
      },
    ],
    name: "popover",
    title: "Popover",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A horizontal bar that indicates the completion progress of a task.",
    files: [
      {
        path: "ui/progress.tsx",
        type: "registry:ui",
      },
    ],
    name: "progress",
    title: "Progress",
    type: "registry:ui",
  },
  {
    dependencies: ["blode-icons-react"],
    description: "A vertical list of progress items with completed and pending states.",
    files: [
      {
        path: "ui/progress-list.tsx",
        type: "registry:ui",
      },
    ],
    name: "progress-list",
    title: "Progress List",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A confirmation dialog that asks the user for input before proceeding.",
    files: [
      {
        path: "ui/prompt.tsx",
        type: "registry:ui",
      },
    ],
    name: "prompt",
    registryDependencies: ["button"],
    title: "Prompt",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A set of mutually exclusive options where only one can be selected.",
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "radio-group",
    title: "Radio Group",
    type: "registry:ui",
  },
  {
    dependencies: ["react-resizable-panels@^4"],
    description: "A layout component with draggable handles for resizing panels.",
    files: [
      {
        path: "ui/resizable.tsx",
        type: "registry:ui",
      },
    ],
    name: "resizable",
    title: "Resizable",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A scrollable container with custom styled scrollbars.",
    files: [
      {
        path: "ui/scroll-area.tsx",
        type: "registry:ui",
      },
    ],
    name: "scroll-area",
    title: "Scroll Area",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A dropdown control for choosing a single value from a list of options.",
    files: [
      {
        path: "ui/select.tsx",
        type: "registry:ui",
      },
    ],
    name: "select",
    title: "Select",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A visual divider that separates content into distinct sections.",
    files: [
      {
        path: "ui/separator.tsx",
        type: "registry:ui",
      },
    ],
    name: "separator",
    title: "Separator",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A panel that slides in from the edge of the viewport with an overlay.",
    files: [
      {
        path: "ui/sheet.tsx",
        type: "registry:ui",
      },
    ],
    name: "sheet",
    title: "Sheet",
    type: "registry:ui",
  },
  {
    cssVars: {
      dark: {
        "sidebar-accent": "240 3.7% 15.9%",
        "sidebar-accent-foreground": "240 4.8% 95.9%",
        "sidebar-background": "240 5.9% 10%",
        "sidebar-border": "240 3.7% 15.9%",
        "sidebar-foreground": "240 4.8% 95.9%",
        "sidebar-primary": "224.3 76.3% 48%",
        "sidebar-primary-foreground": "0 0% 100%",
        "sidebar-ring": "217.2 91.2% 59.8%",
      },
      light: {
        "sidebar-accent": "240 4.8% 95.9%",
        "sidebar-accent-foreground": "240 5.9% 10%",
        "sidebar-background": "0 0% 98%",
        "sidebar-border": "220 13% 91%",
        "sidebar-foreground": "240 5.3% 26.1%",
        "sidebar-primary": "240 5.9% 10%",
        "sidebar-primary-foreground": "0 0% 98%",
        "sidebar-ring": "217.2 91.2% 59.8%",
      },
    },
    dependencies: ["@base-ui/react", "class-variance-authority", "blode-icons-react"],
    description: "A collapsible side navigation component with multiple layout variants.",
    files: [
      {
        path: "ui/sidebar.tsx",
        type: "registry:ui",
      },
    ],
    name: "sidebar",
    registryDependencies: [
      "button",
      "separator",
      "sheet",
      "tooltip",
      "input",
      "@blode/use-mobile",
      "skeleton",
    ],
    title: "Sidebar",
    type: "registry:ui",
  },
  {
    description: "A placeholder animation that indicates content is loading.",
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "registry:ui",
      },
    ],
    name: "skeleton",
    title: "Skeleton",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A draggable control for selecting a numeric value within a range.",
    files: [
      {
        path: "ui/slider.tsx",
        type: "registry:ui",
      },
    ],
    name: "slider",
    title: "Slider",
    type: "registry:ui",
  },
  {
    dependencies: ["sonner", "next-themes"],
    description: "A toast notification component powered by Sonner.",
    files: [
      {
        path: "ui/sonner.tsx",
        type: "registry:ui",
      },
    ],
    name: "sonner",
    title: "Sonner",
    type: "registry:ui",
  },
  {
    description: "An animated loading indicator for asynchronous operations.",
    files: [
      {
        path: "ui/spinner.tsx",
        type: "registry:ui",
      },
    ],
    name: "spinner",
    title: "Spinner",
    type: "registry:ui",
  },
  {
    description: "A compact metric card for showing a headline value and label.",
    files: [
      {
        path: "ui/stat.tsx",
        type: "registry:ui",
      },
    ],
    name: "stat",
    title: "Stat",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A toggle control for switching between on and off states.",
    files: [
      {
        path: "ui/switch.tsx",
        type: "registry:ui",
      },
    ],
    name: "switch",
    title: "Switch",
    type: "registry:ui",
  },
  {
    description: "A responsive table for displaying structured data in rows and columns.",
    files: [
      {
        path: "ui/table.tsx",
        type: "registry:ui",
      },
    ],
    name: "table",
    title: "Table",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react", "class-variance-authority", "merge-refs"],
    description: "A tabbed interface that organises content into switchable panels.",
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui",
      },
    ],
    name: "tabs",
    registryDependencies: ["@blode/use-tab-observer"],
    title: "Tabs",
    type: "registry:ui",
  },
  {
    description: "A multi-line text input field for longer form content.",
    files: [
      {
        path: "ui/textarea.tsx",
        type: "registry:ui",
      },
    ],
    name: "textarea",
    title: "Textarea",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A two-state button that can be toggled on or off.",
    files: [
      {
        path: "ui/toggle.tsx",
        type: "registry:ui",
      },
    ],
    name: "toggle",
    title: "Toggle",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A set of toggle buttons where one or more can be active.",
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "toggle-group",
    registryDependencies: ["toggle"],
    title: "Toggle Group",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A popup that displays helpful information when hovering or focusing an element.",
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
    name: "tooltip",
    title: "Tooltip",
    type: "registry:ui",
  },
  {
    description: "A styled keyboard key indicator for displaying shortcuts and key combinations.",
    files: [
      {
        path: "ui/kbd.tsx",
        type: "registry:ui",
      },
    ],
    name: "kbd",
    title: "Kbd",
    type: "registry:ui",
  },
  {
    description: "A styled wrapper around the native HTML select element.",
    files: [
      {
        path: "ui/native-select.tsx",
        type: "registry:ui",
      },
    ],
    name: "native-select",
    title: "Native Select",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    description: "A context provider for managing text direction (LTR/RTL) across components.",
    files: [
      {
        path: "ui/direction.tsx",
        type: "registry:ui",
      },
    ],
    name: "direction",
    title: "Direction",
    type: "registry:ui",
  },
];
