/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import { XIcon } from "blode-icons-react";
import type * as React from "react";
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
  FieldLegend,
  FieldSet,
} from "@/registry/default/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
});

export default function FormTanstackArray() {
  const form = useForm({
    defaultValues: {
      emails: [{ address: "" }],
    },
    validators: {
      onBlur: formSchema,
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
    <Card className="w-full sm:max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Contact Emails</CardTitle>
        <CardDescription>Manage your contact email addresses.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-array"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field mode="array" name="emails">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <FieldSet className="gap-4">
                  <FieldLegend variant="label">Email Addresses</FieldLegend>
                  <FieldDescription>
                    Add up to 5 email addresses where we can contact you.
                  </FieldDescription>
                  <FieldGroup className="gap-4">
                    {field.state.value.map((_, index) => (
                      <form.Field
                        children={(subField) => {
                          const isSubFieldInvalid =
                            subField.state.meta.isTouched &&
                            !subField.state.meta.isValid;
                          return (
                            <Field
                              data-invalid={isSubFieldInvalid}
                              orientation="horizontal"
                            >
                              <FieldContent>
                                <InputGroup>
                                  <InputGroupInput
                                    aria-invalid={isSubFieldInvalid}
                                    autoComplete="email"
                                    id={`form-tanstack-array-email-${index}`}
                                    name={subField.name}
                                    onBlur={subField.handleBlur}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                    placeholder="name@example.com"
                                    type="email"
                                    value={subField.state.value}
                                  />
                                  {field.state.value.length > 1 && (
                                    <InputGroupAddon align="inline-end">
                                      <InputGroupButton
                                        aria-label={`Remove email ${index + 1}`}
                                        onClick={() => field.removeValue(index)}
                                        size="icon-xs"
                                        type="button"
                                        variant="ghost"
                                      >
                                        <XIcon />
                                      </InputGroupButton>
                                    </InputGroupAddon>
                                  )}
                                </InputGroup>
                                {isSubFieldInvalid && (
                                  <FieldError
                                    errors={subField.state.meta.errors}
                                  />
                                )}
                              </FieldContent>
                            </Field>
                          );
                        }}
                        key={index}
                        name={`emails[${index}].address`}
                      />
                    ))}
                    <Button
                      disabled={field.state.value.length >= 5}
                      onClick={() => field.pushValue({ address: "" })}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      Add Email Address
                    </Button>
                  </FieldGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldSet>
              );
            }}
          </form.Field>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button form="form-tanstack-array" type="submit">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
