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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Textarea } from "@/registry/default/ui/textarea";

const formSchema = z.object({
  about: z
    .string()
    .min(10, "Please provide at least 10 characters.")
    .max(200, "Please keep it under 200 characters."),
});

export default function FormTanstackTextarea() {
  const form = useForm({
    defaultValues: {
      about: "",
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
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Personalization</CardTitle>
        <CardDescription>
          Customize your experience by telling us more about yourself.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-textarea"
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
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-textarea-about">
                      More about you
                    </FieldLabel>
                    <Textarea
                      aria-invalid={isInvalid}
                      className="min-h-[120px]"
                      id="form-tanstack-textarea-about"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="I'm a software engineer..."
                      value={field.state.value}
                    />
                    <FieldDescription>
                      Tell us more about yourself. This will be used to help us
                      personalize your experience.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="about"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button form="form-tanstack-textarea" type="submit">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
