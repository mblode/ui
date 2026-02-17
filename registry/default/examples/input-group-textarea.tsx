import {
  CodeIcon,
  CopyIcon,
  CornerDownLeftIcon,
  RefreshCwIcon,
} from "blode-icons-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/default/ui/input-group";

export default function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          className="min-h-[200px]"
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton className="ml-auto" size="sm" variant="default">
            Run <CornerDownLeftIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-medium font-mono">
            <CodeIcon />
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <RefreshCwIcon />
          </InputGroupButton>
          <InputGroupButton size="icon-xs" variant="ghost">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
