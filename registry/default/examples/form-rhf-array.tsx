"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "blode-icons-react";
import type * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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

export default function FormRhfArray() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [{ address: "" }, { address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
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
    <Card className="w-full sm:max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Contact Emails</CardTitle>
        <CardDescription>Manage your contact email addresses.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="gap-4">
            <FieldLegend variant="label">Email Addresses</FieldLegend>
            <FieldDescription>
              Add up to 5 email addresses where we can contact you.
            </FieldDescription>
            <FieldGroup className="gap-4">
              {fields.map((field, index) => (
                <Controller
                  control={form.control}
                  key={field.id}
                  name={`emails.${index}.address`}
                  render={({ field: controllerField, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            aria-invalid={fieldState.invalid}
                            autoComplete="email"
                            id={`form-rhf-array-email-${index}`}
                            placeholder="name@example.com"
                            type="email"
                          />
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                aria-label={`Remove email ${index + 1}`}
                                onClick={() => remove(index)}
                                size="icon-xs"
                                type="button"
                                variant="ghost"
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
              <Button
                disabled={fields.length >= 5}
                onClick={() => append({ address: "" })}
                size="sm"
                type="button"
                variant="outline"
              >
                Add Email Address
              </Button>
            </FieldGroup>
            {form.formState.errors.emails?.root && (
              <FieldError errors={[form.formState.errors.emails.root]} />
            )}
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button form="form-rhf-array" type="submit">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
