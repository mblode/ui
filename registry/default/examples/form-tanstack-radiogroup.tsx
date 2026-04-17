/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/default/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

const plans = [
  {
    description: "For everyday use with basic features.",
    id: "starter",
    title: "Starter (100K tokens/month)",
  },
  {
    description: "For advanced AI usage with more features.",
    id: "pro",
    title: "Pro (1M tokens/month)",
  },
  {
    description: "For large teams and heavy usage.",
    id: "enterprise",
    title: "Enterprise (Unlimited tokens)",
  },
] as const;

const formSchema = z.object({
  plan: z.string().min(1, "You must select a subscription plan to continue."),
});

export default function FormTanstackRadioGroup() {
  const form = useForm({
    defaultValues: {
      plan: "",
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        classNames: {
          content: "flex flex-col gap-2",
        },
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>See pricing and features for each plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-radiogroup"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldLegend>Plan</FieldLegend>
                    <FieldDescription>
                      You can upgrade or downgrade your plan at any time.
                    </FieldDescription>
                    <RadioGroup
                      name={field.name}
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      {plans.map((plan) => (
                        <FieldLabel htmlFor={`form-tanstack-radiogroup-${plan.id}`} key={plan.id}>
                          <Field data-invalid={isInvalid} orientation="horizontal">
                            <FieldContent>
                              <FieldTitle>{plan.title}</FieldTitle>
                              <FieldDescription>{plan.description}</FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              aria-invalid={isInvalid}
                              id={`form-tanstack-radiogroup-${plan.id}`}
                              value={plan.id}
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldSet>
                );
              }}
              name="plan"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button form="form-tanstack-radiogroup" type="submit">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
