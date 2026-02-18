import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Switch } from "@/registry/default/ui/switch";

export default function FieldSwitch() {
  return (
    <Field className="w-fit" orientation="horizontal">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  );
}
