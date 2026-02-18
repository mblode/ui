import { Toggle } from "@/registry/default/ui/toggle"
import { ItalicIcon } from "blode-icons-react"

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
