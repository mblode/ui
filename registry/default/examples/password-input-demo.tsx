import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { PasswordInput } from "@/registry/default/ui/password-input";

export default function PasswordInputDemo() {
  return (
    <Field>
      <FieldLabel htmlFor="password-input-demo">Password</FieldLabel>
      <PasswordInput
        autoComplete="current-password"
        id="password-input-demo"
        placeholder="Enter your password"
      />
      <FieldDescription>Click the eye icon to reveal your password.</FieldDescription>
    </Field>
  );
}
