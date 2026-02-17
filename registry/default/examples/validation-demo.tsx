"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Validation } from "@/registry/default/ui/validation";
import { cn } from "@/lib/utils";

// Define the form schema with validation rules
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ValidationDemo() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Form with Validation</h2>
        <p className="text-sm text-muted-foreground">
          This form demonstrates the Validation component for displaying form
          errors.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="mb-2">
            <Label htmlFor="name">Name</Label>
          </div>
          <Input
            id="name"
            placeholder="Enter your name"
            {...form.register("name")}
            className={cn(form.formState.errors.name && "border-destructive")}
          />
          <Validation>{form.formState.errors.name?.message}</Validation>
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            {...form.register("email")}
            className={cn(form.formState.errors.email && "border-destructive")}
          />
          <Validation>{form.formState.errors.email?.message}</Validation>
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...form.register("password")}
            className={cn(
              form.formState.errors.password && "border-destructive",
            )}
          />
          <Validation>{form.formState.errors.password?.message}</Validation>
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...form.register("confirmPassword")}
            className={cn(
              form.formState.errors.confirmPassword && "border-destructive",
            )}
          />
          <Validation>
            {form.formState.errors.confirmPassword?.message}
          </Validation>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>

        {submitSuccess && (
          <div className="p-3 rounded-md bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
}
