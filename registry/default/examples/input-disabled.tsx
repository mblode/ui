import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function InputDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
      <Input
        disabled
        id="input-demo-disabled"
        placeholder="Email"
        type="email"
      />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  );
}
