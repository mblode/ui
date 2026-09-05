import { ArrowRightIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

interface SignInCardProps {
  forgotPasswordUrl?: string;
}

export const SignInCard = ({ forgotPasswordUrl }: SignInCardProps) => (
  <Card className="mx-auto w-full max-w-md">
    <CardHeader>
      <CardTitle>Welcome back</CardTitle>
      <CardDescription>Sign in to continue to your workspace.</CardDescription>
    </CardHeader>
    <CardContent>
      <form id="sign-in-form">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input autoComplete="email" id="email" name="email" required type="email" />
          </Field>
          <Field>
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              {forgotPasswordUrl ? (
                <Button asChild size="xs" variant="link">
                  <a href={forgotPasswordUrl}>Forgot password?</a>
                </Button>
              ) : null}
            </div>
            <Input
              autoComplete="current-password"
              id="password"
              minLength={8}
              name="password"
              required
              type="password"
            />
            <FieldDescription>Use at least 8 characters.</FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Button className="w-full" form="sign-in-form" type="submit">
        Sign in
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </CardFooter>
  </Card>
);
