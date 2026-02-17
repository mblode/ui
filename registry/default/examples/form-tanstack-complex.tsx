/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import type * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/registry/default/ui/button";
import { Card, CardContent, CardFooter } from "@/registry/default/ui/card";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/default/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Switch } from "@/registry/default/ui/switch";

const addons = [
  {
    id: "analytics",
    title: "Analytics",
    description: "Advanced analytics and reporting",
  },
  {
    id: "backup",
    title: "Backup",
    description: "Automated daily backups",
  },
  {
    id: "support",
    title: "Priority Support",
    description: "24/7 premium customer support",
  },
] as const;

const formSchema = z.object({
  plan: z.enum(["basic", "pro"], {
    error: "Please select a subscription plan",
  }),
  billingPeriod: z
    .string({
      error: "Please select a billing period",
    })
    .min(1, "Please select a billing period"),
  addons: z
    .array(z.string())
    .min(1, "Please select at least one add-on")
    .max(3, "You can select up to 3 add-ons")
    .refine(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      {
        message: "You selected an invalid add-on",
      }
    ),
  emailNotifications: z.boolean(),
});

export default function FormTanstackComplex() {
  const form = useForm({
    defaultValues: {
      plan: "basic",
      billingPeriod: "monthly",
      addons: [] as string[],
      emailNotifications: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form
          id="subscription-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldLegend>Subscription Plan</FieldLegend>
                    <FieldDescription>
                      Choose your subscription plan.
                    </FieldDescription>
                    <RadioGroup
                      name={field.name}
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      <FieldLabel htmlFor="basic">
                        <Field
                          data-invalid={isInvalid}
                          orientation="horizontal"
                        >
                          <FieldContent>
                            <FieldTitle>Basic</FieldTitle>
                            <FieldDescription>
                              For individuals and small teams
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            aria-invalid={isInvalid}
                            id="basic"
                            value="basic"
                          />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="pro">
                        <Field
                          data-invalid={isInvalid}
                          orientation="horizontal"
                        >
                          <FieldContent>
                            <FieldTitle>Pro</FieldTitle>
                            <FieldDescription>
                              For businesses with higher demands
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            aria-invalid={isInvalid}
                            id="pro"
                            value="pro"
                          />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                );
              }}
              name="plan"
            />
            <FieldSeparator />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Billing Period</FieldLabel>
                    <Select
                      aria-invalid={isInvalid}
                      name={field.name}
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Choose how often you want to be billed.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="billingPeriod"
            />
            <FieldSeparator />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldLegend>Add-ons</FieldLegend>
                    <FieldDescription>
                      Select additional features you&apos;d like to include.
                    </FieldDescription>
                    <FieldGroup data-slot="checkbox-group">
                      {addons.map((addon) => (
                        <Field
                          data-invalid={isInvalid}
                          key={addon.id}
                          orientation="horizontal"
                        >
                          <Checkbox
                            aria-invalid={isInvalid}
                            checked={field.state.value.includes(addon.id)}
                            id={addon.id}
                            name={field.name}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.pushValue(addon.id);
                              } else {
                                const index = field.state.value.indexOf(
                                  addon.id
                                );
                                if (index > -1) {
                                  field.removeValue(index);
                                }
                              }
                            }}
                          />
                          <FieldContent>
                            <FieldLabel htmlFor={addon.id}>
                              {addon.title}
                            </FieldLabel>
                            <FieldDescription>
                              {addon.description}
                            </FieldDescription>
                          </FieldContent>
                        </Field>
                      ))}
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                );
              }}
              mode="array"
              name="addons"
            />
            <FieldSeparator />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        Email Notifications
                      </FieldLabel>
                      <FieldDescription>
                        Receive email updates about your subscription
                      </FieldDescription>
                    </FieldContent>
                    <Switch
                      aria-invalid={isInvalid}
                      checked={field.state.value}
                      id={field.name}
                      name={field.name}
                      onCheckedChange={field.handleChange}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="emailNotifications"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field className="justify-end" orientation="horizontal">
          <Button form="subscription-form" type="submit">
            Save Preferences
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
