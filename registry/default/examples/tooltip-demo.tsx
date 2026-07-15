import { Button } from "@/registry/default/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/default/ui/tooltip";

export const TooltipDemo = () => (
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
);
