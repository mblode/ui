"use client";

import { GlobeIcon, MicrophoneIcon, Paperclip2Icon } from "blode-icons-react";
import { useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { InputMessage } from "@/registry/default/ui/input-message";

export default function InputMessageWithSlots() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-md">
      <InputMessage
        leftSlot={
          <>
            <Button aria-label="Attach files" size="icon-sm" type="button" variant="ghost">
              <Paperclip2Icon />
            </Button>
            <Button aria-label="Search the web" size="icon-sm" type="button" variant="ghost">
              <GlobeIcon />
            </Button>
          </>
        }
        onSend={() => setValue("")}
        onValueChange={setValue}
        rightSlot={
          <Button aria-label="Dictate" size="icon-sm" type="button" variant="ghost">
            <MicrophoneIcon />
          </Button>
        }
        value={value}
      />
    </div>
  );
}
