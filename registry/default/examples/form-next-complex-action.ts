"use server";

import { formSchema } from "./form-next-complex-schema";
import type { FormState } from "./form-next-complex-schema";

export async function complexFormAction(_prevState: FormState, formData: FormData) {
  // Sleep for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const values = {
    addons: formData.getAll("addons") as string[],
    billingPeriod: formData.get("billingPeriod") as string,
    emailNotifications: formData.get("emailNotifications") === "on",
    plan: formData.get("plan") as FormState["values"]["plan"],
  };

  const result = formSchema.safeParse(values);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
      values,
    };
  }

  // Do something with the values.
  // Call your database or API here.

  return {
    errors: null,
    success: true,
    values,
  };
}
