"use client";

import { useState } from "react";
import { Calendar } from "@/registry/default/ui/calendar";

const DEMO_DATE = new Date(2026, 6, 15);

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(DEMO_DATE);

  return (
    <Calendar
      captionLayout="dropdown"
      className="rounded-lg border"
      defaultMonth={DEMO_DATE}
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
