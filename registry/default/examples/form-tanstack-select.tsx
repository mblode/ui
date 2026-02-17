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
} from "@/registry/default/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const spokenLanguages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const;

const formSchema = z.object({
  language: z
    .string()
    .min(1, "Please select your spoken language.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
});

export default function FormTanstackSelect() {
  const form = useForm({
    defaultValues: {
      language: "",
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
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Language Preferences</CardTitle>
        <CardDescription>
          Select your preferred spoken language.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-select"
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
                  <Field data-invalid={isInvalid} orientation="responsive">
                    <FieldContent>
                      <FieldLabel htmlFor="form-tanstack-select-language">
                        Spoken Language
                      </FieldLabel>
                      <FieldDescription>
                        For best results, select the language you speak.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      <SelectTrigger
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                        id="form-tanstack-select-language"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectSeparator />
                        {spokenLanguages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
              name="language"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <Button form="form-tanstack-select" type="submit">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
