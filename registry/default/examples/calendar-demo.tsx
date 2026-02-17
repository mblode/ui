"use client";

import { useState } from "react";

import { Calendar } from "@/registry/default/ui/calendar";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      captionLayout="dropdown"
      className="rounded-md border shadow-sm"
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
