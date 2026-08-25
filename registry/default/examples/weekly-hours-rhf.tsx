"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/registry/default/ui/field";
import { WeeklyHours } from "@/registry/default/ui/weekly-hours";

const timeRangeSchema = z
  .object({
    end: z.string(),
    start: z.string(),
  })
  .refine((range) => range.end > range.start, {
    message: "End time must be later in the day than the start time.",
  });

const formSchema = z.object({
  hours: z.object({
    friday: z.array(timeRangeSchema),
    monday: z.array(timeRangeSchema),
    saturday: z.array(timeRangeSchema),
    sunday: z.array(timeRangeSchema),
    thursday: z.array(timeRangeSchema),
    tuesday: z.array(timeRangeSchema),
    wednesday: z.array(timeRangeSchema),
  }),
});

const onSubmit = (data: z.infer<typeof formSchema>) => {
  toast("You submitted the following values:", {
    classNames: {
      content: "flex flex-col gap-2",
    },
    description: (
      <pre className="mt-2 w-80 overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
    position: "bottom-right",
    style: {
      "--border-radius": "calc(var(--radius)  + 4px)",
    } as React.CSSProperties,
  });
};

export default function WeeklyHoursRhf() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      hours: {
        friday: [{ end: "17:00", start: "09:00" }],
        monday: [{ end: "17:00", start: "09:00" }],
        saturday: [],
        sunday: [],
        thursday: [{ end: "17:00", start: "09:00" }],
        tuesday: [{ end: "17:00", start: "09:00" }],
        wednesday: [{ end: "17:00", start: "09:00" }],
      },
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="border-b">
        <CardTitle>Opening Hours</CardTitle>
        <CardDescription>When customers can book an appointment with you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="weekly-hours-rhf" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="gap-4">
            <FieldLegend variant="label">Weekly Schedule</FieldLegend>
            <FieldDescription>
              Turn a day off to mark it closed. Add a second range to cover a lunch break.
            </FieldDescription>
            <FieldGroup className="gap-4">
              <Controller
                control={form.control}
                name="hours"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <WeeklyHours
                      onValueChange={(next) => field.onChange(next)}
                      value={field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError>Fix the highlighted hours before saving.</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button form="weekly-hours-rhf" type="submit">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
