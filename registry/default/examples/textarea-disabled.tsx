import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Textarea } from "@/registry/default/ui/textarea";

export const TextareaDisabled = () => (
  <Field data-disabled>
    <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
    <Textarea disabled id="textarea-disabled" placeholder="Type your message here." />
  </Field>
);
