import { registryItemSchema } from "shadcn/schema";
import { z } from "zod";

export const examples: z.infer<typeof registryItemSchema>[] = [
  {
    name: "spinner-demo",
    type: "registry:example",
    registryDependencies: ["spinner"],
    files: [
      {
        path: "examples/spinner-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "spinner-size",
    type: "registry:example",
    registryDependencies: ["spinner"],
    files: [
      {
        path: "examples/spinner-size.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "spinner-stroke-width",
    type: "registry:example",
    registryDependencies: ["spinner"],
    files: [
      {
        path: "examples/spinner-stroke-width.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "glass-label-demo",
    type: "registry:example",
    registryDependencies: ["glass-label"],
    files: [
      {
        path: "examples/glass-label-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "copy-demo",
    type: "registry:example",
    registryDependencies: ["copy", "tabs", "card", "label", "input", "button"],
    files: [
      {
        path: "examples/copy-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "currency-input-demo",
    type: "registry:example",
    registryDependencies: ["currency-input", "label"],
    files: [
      {
        path: "examples/currency-input-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-range-dropdown-demo",
    type: "registry:example",
    registryDependencies: [
      "date-range-dropdown",
      "button",
      "calendar",
      "popover",
      "select",
    ],
    files: [
      {
        path: "examples/date-range-dropdown-demo.tsx",
        type: "registry:example",
      },
    ],
    dependencies: ["date-fns"],
  },
  {
    name: "multi-select-demo",
    type: "registry:example",
    registryDependencies: [
      "multi-select",
      "badge",
      "command",
      "button",
      "checkbox",
      "label",
    ],
    files: [
      {
        path: "examples/multi-select-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-list-demo",
    type: "registry:example",
    registryDependencies: ["progress-list"],
    files: [
      {
        path: "examples/progress-list-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "form-control-demo",
    type: "registry:example",
    registryDependencies: ["form-control", "input"],
    files: [
      {
        path: "examples/form-control-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "scroll-menu-demo",
    type: "registry:example",
    registryDependencies: ["scroll-menu", "button"],
    files: [
      {
        path: "examples/scroll-menu-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "search-demo",
    type: "registry:example",
    registryDependencies: ["search", "input", "form-control"],
    files: [
      {
        path: "examples/search-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "share-demo",
    type: "registry:example",
    registryDependencies: ["share", "button"],
    files: [
      {
        path: "examples/share-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "stat-demo",
    type: "registry:example",
    registryDependencies: ["stat"],
    files: [
      {
        path: "examples/stat-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toolbar-demo",
    type: "registry:example",
    registryDependencies: ["toolbar", "button", "tooltip"],
    files: [
      {
        path: "examples/toolbar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "sticker-demo",
    type: "registry:example",
    registryDependencies: ["sticker"],
    files: [
      {
        path: "examples/sticker-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "validation-demo",
    type: "registry:example",
    registryDependencies: ["validation", "button", "input", "label"],
    files: [
      {
        path: "examples/validation-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "color-picker-demo",
    type: "registry:example",
    registryDependencies: ["color-picker", "label"],
    files: [
      {
        path: "examples/color-picker-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "bottom-sheet-demo",
    type: "registry:example",
    registryDependencies: ["bottom-sheet", "button"],
    files: [
      {
        path: "examples/bottom-sheet-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "bar-list-demo",
    type: "registry:example",
    registryDependencies: ["bar-list"],
    files: [
      {
        path: "examples/bar-list-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "accordion-demo",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "alert-demo",
    type: "registry:example",
    registryDependencies: ["alert"],
    files: [
      {
        path: "examples/alert-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "alert-destructive",
    type: "registry:example",
    registryDependencies: ["alert"],
    files: [
      {
        path: "examples/alert-destructive.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "alert-dialog-demo",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/alert-dialog-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "aspect-ratio-demo",
    type: "registry:example",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "examples/aspect-ratio-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "avatar-demo",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "badge-demo",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "badge-destructive",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-destructive.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "badge-outline",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-outline.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "badge-green",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/badge-green.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "breadcrumb-demo",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "breadcrumb-separator",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-separator.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "breadcrumb-dropdown",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-dropdown.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "breadcrumb-ellipsis",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-ellipsis.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "breadcrumb-link",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/breadcrumb-link.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-secondary",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-secondary.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-muted",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-muted.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-destructive",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-destructive.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-ghost",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-ghost.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-link",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-link.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-loading",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-loading.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-as-child",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-as-child.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "calendar-demo",
    type: "registry:example",
    registryDependencies: ["calendar"],
    files: [
      {
        path: "examples/calendar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "card-demo",
    type: "registry:example",
    registryDependencies: ["card", "button", "switch"],
    files: [
      {
        path: "examples/card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "carousel-demo",
    type: "registry:example",
    registryDependencies: ["carousel"],
    files: [
      {
        path: "examples/carousel-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "carousel-size",
    type: "registry:example",
    registryDependencies: ["carousel"],
    files: [
      {
        path: "examples/carousel-size.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "carousel-spacing",
    type: "registry:example",
    registryDependencies: ["carousel"],
    files: [
      {
        path: "examples/carousel-spacing.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "carousel-orientation",
    type: "registry:example",
    registryDependencies: ["carousel"],
    files: [
      {
        path: "examples/carousel-orientation.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "carousel-api",
    type: "registry:example",
    registryDependencies: ["carousel"],
    files: [
      {
        path: "examples/carousel-api.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "carousel-plugin",
    type: "registry:example",
    registryDependencies: ["carousel"],
    files: [
      {
        path: "examples/carousel-plugin.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-demo",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-disabled",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-with-text",
    type: "registry:example",
    registryDependencies: ["checkbox"],
    files: [
      {
        path: "examples/checkbox-with-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "collapsible-demo",
    type: "registry:example",
    registryDependencies: ["collapsible"],
    files: [
      {
        path: "examples/collapsible-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-demo",
    type: "registry:example",
    registryDependencies: ["command"],
    files: [
      {
        path: "examples/combobox-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "multi-combobox-demo",
    type: "registry:example",
    registryDependencies: ["command", "popover", "badge"],
    files: [
      {
        path: "examples/multi-combobox-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "command-demo",
    type: "registry:example",
    registryDependencies: ["command"],
    files: [
      {
        path: "examples/command-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "command-dialog",
    type: "registry:example",
    registryDependencies: ["command", "dialog"],
    files: [
      {
        path: "examples/command-dialog.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "data-table-demo",
    type: "registry:example",
    registryDependencies: ["data-table"],
    files: [
      {
        path: "examples/data-table-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-picker-demo",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "popover"],
    files: [
      {
        path: "examples/date-picker-demo.tsx",
        type: "registry:example",
      },
    ],
    dependencies: ["date-fns"],
  },
  {
    name: "date-picker-with-presets",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "popover", "select"],
    files: [
      {
        path: "examples/date-picker-with-presets.tsx",
        type: "registry:example",
      },
    ],
    dependencies: ["date-fns"],
  },
  {
    name: "date-picker-with-range",
    type: "registry:example",
    registryDependencies: ["button", "calendar", "popover"],
    files: [
      {
        path: "examples/date-picker-with-range.tsx",
        type: "registry:example",
      },
    ],
    dependencies: ["date-fns"],
  },
  {
    name: "dialog-demo",
    type: "registry:example",
    registryDependencies: ["dialog"],
    files: [
      {
        path: "examples/dialog-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dialog-close-button",
    type: "registry:example",
    registryDependencies: ["dialog", "button"],
    files: [
      {
        path: "examples/dialog-close-button.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dropdown-menu-demo",
    type: "registry:example",
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "examples/dropdown-menu-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dropdown-menu-checkboxes",
    type: "registry:example",
    registryDependencies: ["dropdown-menu", "checkbox"],
    files: [
      {
        path: "examples/dropdown-menu-checkboxes.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-demo",
    type: "registry:example",
    registryDependencies: ["radio-group", "label"],
    files: [
      {
        path: "examples/radio-group-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dropdown-menu-radio-group",
    type: "registry:example",
    registryDependencies: ["dropdown-menu", "radio-group"],
    files: [
      {
        path: "examples/dropdown-menu-radio-group.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-demo",
    type: "registry:example",
    registryDependencies: ["input"],
    files: [
      {
        path: "examples/input-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-disabled",
    type: "registry:example",
    registryDependencies: ["input"],
    files: [
      {
        path: "examples/input-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-file",
    type: "registry:example",
    registryDependencies: ["input"],
    files: [
      {
        path: "examples/input-file.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-with-button",
    type: "registry:example",
    registryDependencies: ["input", "button"],
    files: [
      {
        path: "examples/input-with-button.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-with-label",
    type: "registry:example",
    registryDependencies: ["input", "button", "label"],
    files: [
      {
        path: "examples/input-with-label.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-with-text",
    type: "registry:example",
    registryDependencies: ["input", "button", "label"],
    files: [
      {
        path: "examples/input-with-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-demo",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-pattern",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-pattern.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-separator",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-separator.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-controlled",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/input-otp-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "phone-input-demo",
    type: "registry:example",
    registryDependencies: ["phone-input"],
    files: [
      {
        path: "examples/phone-input-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "phone-input-disabled",
    type: "registry:example",
    registryDependencies: ["phone-input"],
    files: [
      {
        path: "examples/phone-input-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "phone-input-clearable",
    type: "registry:example",
    registryDependencies: ["phone-input"],
    files: [
      {
        path: "examples/phone-input-clearable.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "kbd-demo",
    type: "registry:example",
    registryDependencies: ["kbd"],
    files: [
      {
        path: "examples/kbd-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "label-demo",
    type: "registry:example",
    registryDependencies: ["label"],
    files: [
      {
        path: "examples/label-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "menubar-demo",
    type: "registry:example",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "examples/menubar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "popover-demo",
    type: "registry:example",
    registryDependencies: ["popover"],
    files: [
      {
        path: "examples/popover-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "circular-progress-demo",
    type: "registry:example",
    registryDependencies: ["circular-progress", "button", "slider"],
    files: [
      {
        path: "examples/circular-progress-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progress-demo",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/progress-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "scroll-area-demo",
    type: "registry:example",
    registryDependencies: ["scroll-area"],
    files: [
      {
        path: "examples/scroll-area-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "scroll-area-horizontal-demo",
    type: "registry:example",
    registryDependencies: ["scroll-area"],
    files: [
      {
        path: "examples/scroll-area-horizontal-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "select-demo",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/select-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "select-scrollable",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/select-scrollable.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "separator-demo",
    type: "registry:example",
    registryDependencies: ["separator"],
    files: [
      {
        path: "examples/separator-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "sheet-demo",
    type: "registry:example",
    registryDependencies: ["sheet"],
    files: [
      {
        path: "examples/sheet-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "sheet-side",
    type: "registry:example",
    registryDependencies: ["sheet"],
    files: [
      {
        path: "examples/sheet-side.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "responsive-sheet-demo",
    type: "registry:example",
    registryDependencies: ["responsive-sheet", "button", "input", "label"],
    files: [
      {
        path: "examples/responsive-sheet-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "skeleton-demo",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "skeleton-card",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/skeleton-card.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "slider-demo",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/slider-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "sonner-demo",
    type: "registry:example",
    registryDependencies: ["sonner"],
    files: [
      {
        path: "examples/sonner-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "switch-demo",
    type: "registry:example",
    registryDependencies: ["switch"],
    files: [
      {
        path: "examples/switch-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "table-demo",
    type: "registry:example",
    registryDependencies: ["table"],
    files: [
      {
        path: "examples/table-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tabs-demo",
    type: "registry:example",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "examples/tabs-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-demo",
    type: "registry:example",
    registryDependencies: ["textarea"],
    files: [
      {
        path: "examples/textarea-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-disabled",
    type: "registry:example",
    registryDependencies: ["textarea"],
    files: [
      {
        path: "examples/textarea-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-with-button",
    type: "registry:example",
    registryDependencies: ["textarea", "button"],
    files: [
      {
        path: "examples/textarea-with-button.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-with-label",
    type: "registry:example",
    registryDependencies: ["textarea", "label"],
    files: [
      {
        path: "examples/textarea-with-label.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-with-text",
    type: "registry:example",
    registryDependencies: ["textarea", "label"],
    files: [
      {
        path: "examples/textarea-with-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-group-demo",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-group-disabled",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-group-lg",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-lg.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-group-outline",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-outline.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-group-sm",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-sm.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-group-single",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/toggle-group-single.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-demo",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-disabled",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-lg",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-lg.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-secondary",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-secondary.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-sm",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-sm.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "toggle-with-text",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/toggle-with-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tooltip-demo",
    type: "registry:example",
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "examples/tooltip-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "stepper-demo",
    type: "registry:example",
    registryDependencies: ["stepper", "button"],
    files: [
      {
        path: "examples/stepper-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "stepper-vertical",
    type: "registry:example",
    registryDependencies: ["stepper", "button"],
    files: [
      {
        path: "examples/stepper-vertical.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "list-demo",
    type: "registry:example",
    registryDependencies: ["list"],
    files: [
      {
        path: "examples/list-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "render-prompt-demo",
    type: "registry:example",
    registryDependencies: ["render-prompt", "button", "prompt"],
    files: [
      {
        path: "examples/render-prompt-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "prompt-demo",
    type: "registry:example",
    registryDependencies: ["prompt", "button"],
    files: [
      {
        path: "examples/prompt-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
