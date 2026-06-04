"use client";

import { Paperclip2Icon } from "blode-icons-react";
import { useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { InputMessage } from "@/registry/default/ui/input-message";

export default function InputMessageWithAttachments() {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="w-full max-w-md">
      <InputMessage
        files={files}
        // biome-ignore lint/correctness/noNestedComponentDefinitions: leftSlot is a render prop, not a component
        // eslint-disable-next-line react/no-unstable-nested-components -- leftSlot is a render prop, not a component
        leftSlot={({ openFilePicker }) => (
          <Button
            aria-label="Attach files"
            onClick={() => openFilePicker()}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <Paperclip2Icon />
          </Button>
        )}
        onFilesChange={setFiles}
        onSend={() => {
          setValue("");
          setFiles([]);
        }}
        onValueChange={setValue}
        value={value}
      />
    </div>
  );
}
