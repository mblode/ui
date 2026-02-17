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

export default function FormRhfComplex() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "basic",
      billingPeriod: "",
      addons: [],
      emailNotifications: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
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
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>You&apos;re almost there!</CardTitle>
        <CardDescription>
          Choose your subscription plan and billing period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-complex" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="plan"
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid;
                return (
                  <FieldSet data-invalid={isInvalid}>
                    <FieldLegend variant="label">Subscription Plan</FieldLegend>
                    <FieldDescription>
                      Choose your subscription plan.
                    </FieldDescription>
                    <RadioGroup
                      aria-invalid={isInvalid}
                      name={field.name}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FieldLabel htmlFor="form-rhf-complex-basic">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Basic</FieldTitle>
                            <FieldDescription>
                              For individuals and small teams
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            id="form-rhf-complex-basic"
                            value="basic"
                          />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="form-rhf-complex-pro">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Pro</FieldTitle>
                            <FieldDescription>
                              For businesses with higher demands
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            id="form-rhf-complex-pro"
                            value="pro"
                          />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {isInvalid && <FieldError errors={[fieldState.error]} />}
                  </FieldSet>
                );
              }}
            />
            <FieldSeparator />
            <Controller
              control={form.control}
              name="billingPeriod"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                    Billing Period
                  </FieldLabel>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      id="form-rhf-complex-billingPeriod"
                    >
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldSeparator />
            <Controller
              control={form.control}
              name="addons"
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend>Add-ons</FieldLegend>
                  <FieldDescription>
                    Select additional features you&apos;d like to include.
                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    {addons.map((addon) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        key={addon.id}
                        orientation="horizontal"
                      >
                        <Checkbox
                          aria-invalid={fieldState.invalid}
                          checked={field.value.includes(addon.id)}
                          id={`form-rhf-complex-${addon.id}`}
                          name={field.name}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, addon.id]
                              : field.value.filter(
                                  (value) => value !== addon.id
                                );
                            field.onChange(newValue);
                            field.onBlur();
                          }}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor={`form-rhf-complex-${addon.id}`}>
                            {addon.title}
                          </FieldLabel>
                          <FieldDescription>
                            {addon.description}
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    ))}
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <FieldSeparator />
            <Controller
              control={form.control}
              name="emailNotifications"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-complex-emailNotifications">
                      Email Notifications
                    </FieldLabel>
                    <FieldDescription>
                      Receive email updates about your subscription
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    aria-invalid={fieldState.invalid}
                    checked={field.value}
                    id="form-rhf-complex-emailNotifications"
                    name={field.name}
                    onCheckedChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field>
          <Button form="form-rhf-complex" type="submit">
            Save Preferences
          </Button>
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
