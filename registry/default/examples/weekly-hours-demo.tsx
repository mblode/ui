"use client";

import { useState } from "react";

import { WeeklyHours } from "@/registry/default/ui/weekly-hours";
import type { WeeklyHoursValue } from "@/registry/default/ui/weekly-hours";

const OPENING_HOURS: WeeklyHoursValue = {
  friday: [{ end: "21:00", start: "08:00" }],
  monday: [{ end: "17:00", start: "09:00" }],
  saturday: [{ end: "16:00", start: "10:00" }],
  sunday: [],
  thursday: [{ end: "17:00", start: "09:00" }],
  tuesday: [{ end: "17:00", start: "09:00" }],
  wednesday: [
    { end: "12:30", start: "09:00" },
    { end: "17:00", start: "13:30" },
  ],
};

export const WeeklyHoursDemo = () => {
  const [hours, setHours] = useState<WeeklyHoursValue>(OPENING_HOURS);

  return (
    <div className="w-full max-w-2xl">
      <WeeklyHours onValueChange={setHours} value={hours} />
    </div>
  );
};
