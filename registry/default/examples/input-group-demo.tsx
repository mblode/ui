import { Search } from "blode-icons-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/default/ui/input-group";

export const InputGroupDemo = () => (
  <InputGroup className="max-w-xs">
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <Search />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
  </InputGroup>
);
