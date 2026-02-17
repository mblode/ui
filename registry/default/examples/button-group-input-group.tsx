"use client";

import { AudioLinesIcon, PlusIcon } from "blode-icons-react";
import { useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { ButtonGroup } from "@/registry/default/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <ButtonGroup className="[--radius:9999rem]">
      <ButtonGroup>
        <Button size="icon" variant="outline">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            disabled={voiceEnabled}
            placeholder={
              voiceEnabled ? "Record and send audio..." : "Send a message..."
            }
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  aria-pressed={voiceEnabled}
                  className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                  data-active={voiceEnabled}
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  size="icon-xs"
                >
                  <AudioLinesIcon />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  );
}
