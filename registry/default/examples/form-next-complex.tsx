"use client";

import Form from "next/form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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
import { Spinner } from "@/registry/default/ui/spinner";
import { Switch } from "@/registry/default/ui/switch";

import { complexFormAction } from "./form-next-complex-action";
import { addons, type FormState } from "./form-next-complex-schema";

export default function FormNextComplex() {
  const [formState, formAction, pending] = useActionState<FormState, FormData>(
    complexFormAction,
    {
      values: {
        plan: "basic",
        billingPeriod: "monthly",
        addons: [],
        emailNotifications: false,
      },
      errors: null,
      success: false,
    }
  );

  useEffect(() => {
    if (formState.success) {
      toast.success("Preferences saved", {
        description: "Your subscription plan has been updated.",
      });
    }
  }, [formState.success]);

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <Form action={formAction} id="subscription-form">
          <FieldGroup>
            <FieldSet data-invalid={!!formState.errors?.plan?.length}>
              <FieldLegend>Subscription Plan</FieldLegend>
              <FieldDescription>
                Choose your subscription plan.
              </FieldDescription>
              <RadioGroup
                aria-invalid={!!formState.errors?.plan?.length}
                defaultValue={formState.values.plan}
                disabled={pending}
                name="plan"
              >
                <FieldLabel htmlFor="basic">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Basic</FieldTitle>
                      <FieldDescription>
                        For individuals and small teams
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem id="basic" value="basic" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="pro">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Pro</FieldTitle>
                      <FieldDescription>
                        For businesses with higher demands
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem id="pro" value="pro" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
              {formState.errors?.plan && (
                <FieldError>{formState.errors.plan[0]}</FieldError>
              )}
            </FieldSet>
            <FieldSeparator />
            <Field data-invalid={!!formState.errors?.billingPeriod?.length}>
              <FieldLabel htmlFor="billingPeriod">Billing Period</FieldLabel>
              <Select
                aria-invalid={!!formState.errors?.billingPeriod?.length}
                defaultValue={formState.values.billingPeriod}
                disabled={pending}
                name="billingPeriod"
              >
                <SelectTrigger id="billingPeriod">
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
              {formState.errors?.billingPeriod && (
                <FieldError>{formState.errors.billingPeriod[0]}</FieldError>
              )}
            </Field>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Add-ons</FieldLegend>
              <FieldDescription>
                Select additional features you&apos;d like to include.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                {addons.map((addon) => (
                  <Field
                    data-invalid={!!formState.errors?.addons?.length}
                    key={addon.id}
                    orientation="horizontal"
                  >
                    <Checkbox
                      aria-invalid={!!formState.errors?.addons?.length}
                      defaultChecked={formState.values.addons.includes(
                        addon.id
                      )}
                      disabled={pending}
                      id={addon.id}
                      name="addons"
                      value={addon.id}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={addon.id}>{addon.title}</FieldLabel>
                      <FieldDescription>{addon.description}</FieldDescription>
                    </FieldContent>
                  </Field>
                ))}
              </FieldGroup>
              {formState.errors?.addons && (
                <FieldError>{formState.errors.addons[0]}</FieldError>
              )}
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="emailNotifications">
                  Email Notifications
                </FieldLabel>
                <FieldDescription>
                  Receive email updates about your subscription
                </FieldDescription>
              </FieldContent>
              <Switch
                aria-invalid={!!formState.errors?.emailNotifications?.length}
                defaultChecked={formState.values.emailNotifications}
                disabled={pending}
                id="emailNotifications"
                name="emailNotifications"
              />
            </Field>
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter>
        <Field className="justify-end" orientation="horizontal">
          <Button disabled={pending} form="subscription-form" type="submit">
            {pending && <Spinner />}
            Save Preferences
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
