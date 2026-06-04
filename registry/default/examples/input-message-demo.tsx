"use client";

import { useState } from "react";

import { InputMessage } from "@/registry/default/ui/input-message";

export default function InputMessageDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-md">
      <InputMessage onSend={() => setValue("")} onValueChange={setValue} value={value} />
    </div>
  );
}
