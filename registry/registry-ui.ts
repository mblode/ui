import { registryItemSchema } from "shadcn/schema";
import { z } from "zod";

export const ui: z.infer<typeof registryItemSchema>[] = [
  {
    name: "alert-dialog",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-alert-dialog", "class-variance-authority"],
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
    dependencies: ["@radix-ui/react-aspect-ratio"],
    files: [
      {
        path: "ui/aspect-ratio.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "avatar",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-avatar"],
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
    files: [
      {
        path: "ui/bar-list.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "bottom-sheet",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-dialog"],
    files: [
      {
        path: "ui/bottom-sheet.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "breadcrumb",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot", "@fingertip/icons"],
    files: [
      {
        path: "ui/breadcrumb.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "glass-label",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    files: [
      {
        path: "ui/glass-label.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "accordion",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-accordion"],
    files: [
      {
        path: "ui/accordion.tsx",
        type: "registry:ui",
      },
    ],
    tailwind: {
      config: {
        theme: {
          extend: {
            keyframes: {
              "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
              },
              "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
              },
            },
            animation: {
              "accordion-down": "accordion-down 0.2s ease-out",
              "accordion-up": "accordion-up 0.2s ease-out",
            },
          },
        },
      },
    },
  },
  {
    name: "alert",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    files: [
      {
        path: "ui/alert.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "form-control",
    type: "registry:ui",
    dependencies: ["label", "validation"],
    files: [
      {
        path: "ui/form-control.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-checkbox"],
    files: [
      {
        path: "ui/checkbox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "circular-progress",
    type: "registry:ui",
    files: [
      {
        path: "ui/circular-progress.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    registryDependencies: ["spinner"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "card",
    type: "registry:ui",
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "collapsible",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-collapsible"],
    files: [
      {
        path: "ui/collapsible.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "command",
    type: "registry:ui",
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
    name: "dialog",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-dialog"],
    files: [
      {
        path: "ui/dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-dropdown-menu"],
    files: [
      {
        path: "ui/dropdown-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "calendar",
    type: "registry:ui",
    dependencies: ["react-day-picker", "date-fns"],
    files: [
      {
        path: "ui/calendar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "carousel",
    type: "registry:ui",
    dependencies: ["embla-carousel-react"],
    files: [
      {
        path: "ui/carousel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "color-picker",
    type: "registry:ui",
    dependencies: ["@fingertip/icons"],
    registryDependencies: ["button", "label", "popover"],
    files: [
      {
        path: "ui/color-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "combobox",
    type: "registry:ui",
    dependencies: ["@fingertip/icons", "downshift", "@radix-ui/react-popover"],
    registryDependencies: ["input"],
    files: [
      {
        path: "ui/combobox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "copy",
    type: "registry:ui",
    dependencies: [
      "@fingertip/icons",
      "@radix-ui/react-slot",
      "copy-to-clipboard",
    ],
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "ui/copy.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "currency-input",
    type: "registry:ui",
    dependencies: ["@fingertip/icons", "react-currency-input-field"],
    files: [
      {
        path: "ui/currency-input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-table",
    type: "registry:ui",
    dependencies: ["@tanstack/react-table"],
    files: [
      {
        path: "ui/data-table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "date-picker",
    type: "registry:ui",
    dependencies: ["react-day-picker", "date-fns", "@fingertip/icons"],
    registryDependencies: ["button", "calendar", "popover"],
    files: [
      {
        path: "ui/date-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "date-range-dropdown",
    type: "registry:ui",
    dependencies: ["@fingertip/icons", "date-fns"],
    registryDependencies: ["button", "calendar", "popover", "select"],
    files: [
      {
        path: "ui/date-range-dropdown.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "date-range-picker",
    type: "registry:ui",
    dependencies: ["react-day-picker", "date-fns", "@fingertip/icons"],
    registryDependencies: ["button", "calendar", "popover"],
    files: [
      {
        path: "ui/date-range-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "heading",
    type: "registry:ui",
    files: [
      {
        path: "ui/heading.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    files: [
      {
        path: "ui/input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "kbd",
    type: "registry:ui",
    files: [
      {
        path: "ui/kbd.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp",
    type: "registry:ui",
    dependencies: ["input-otp"],
    files: [
      {
        path: "ui/input-otp.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "label",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-label"],
    files: [
      {
        path: "ui/label.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "list",
    type: "registry:ui",
    files: [
      {
        path: "ui/list.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menubar",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-menubar"],
    files: [
      {
        path: "ui/menubar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "multi-combobox",
    type: "registry:ui",
    dependencies: [
      "@fingertip/icons",
      "@radix-ui/react-popover",
      "downshift",
      "lodash",
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
    name: "multi-select",
    type: "registry:ui",
    dependencies: ["@fingertip/icons", "@radix-ui/react-popover"],
    registryDependencies: ["badge", "button", "checkbox", "command", "label"],
    files: [
      {
        path: "ui/multi-select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "phone-input",
    type: "registry:ui",
    dependencies: ["@fingertip/icons", "react-phone-number-input"],
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
    dependencies: ["@radix-ui/react-popover"],
    files: [
      {
        path: "ui/popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-area",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-scroll-area"],
    files: [
      {
        path: "ui/scroll-area.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-menu",
    type: "registry:ui",
    dependencies: ["@fingertip/icons"],
    files: [
      {
        path: "ui/scroll-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-select"],
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
    dependencies: ["@radix-ui/react-separator"],
    files: [
      {
        path: "ui/separator.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "progress",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-progress"],
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
    dependencies: ["@fingertip/icons"],
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
    dependencies: ["@radix-ui/react-alert-dialog"],
    registryDependencies: ["button", "heading"],
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
    dependencies: ["@radix-ui/react-radio-group"],
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "render-prompt",
    type: "registry:ui",
    registryDependencies: ["prompt", "input", "label"],
    files: [
      {
        path: "ui/render-prompt.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "responsive-sheet",
    type: "registry:ui",
    registryDependencies: ["dialog", "sheet"],
    files: [
      {
        path: "ui/responsive-sheet.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "responsive-sheet-content",
    type: "registry:ui",
    registryDependencies: ["dialog", "sheet"],
    files: [
      {
        path: "ui/responsive-sheet-content.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "search",
    type: "registry:ui",
    dependencies: ["@fingertip/icons"],
    registryDependencies: ["form-control", "input"],
    files: [
      {
        path: "ui/search.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "share",
    type: "registry:ui",
    dependencies: [
      "@fingertip/icons",
      "@radix-ui/react-slot",
      "copy-to-clipboard",
    ],
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "ui/share.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sheet",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-dialog"],
    files: [
      {
        path: "ui/sheet.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton",
    type: "registry:ui",
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sonner",
    type: "registry:ui",
    dependencies: ["sonner", "next-themes"],
    files: [
      {
        path: "ui/sonner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-switch"],
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
    dependencies: ["@radix-ui/react-tabs", "merge-refs"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "slider",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slider"],
    files: [
      {
        path: "ui/slider.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "spinner",
    type: "registry:ui",
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
    files: [
      {
        path: "ui/stat.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "stepper",
    type: "registry:ui",
    files: [
      {
        path: "ui/stepper.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sticker",
    type: "registry:ui",
    files: [
      {
        path: "ui/sticker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "text",
    type: "registry:ui",
    files: [
      {
        path: "ui/text.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    dependencies: ["@fingertip/icons", "react-textarea-autosize"],
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
    dependencies: ["@radix-ui/react-toggle"],
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
    dependencies: ["@radix-ui/react-toggle-group"],
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toolbar",
    type: "registry:ui",
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "ui/toolbar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-tooltip"],
    files: [
      {
        path: "ui/tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "validation",
    type: "registry:ui",
    files: [
      {
        path: "ui/validation.tsx",
        type: "registry:ui",
      },
    ],
  },
];
