"use server";

import { formSchema } from "./form-next-demo-schema";
import type { FormState } from "./form-next-demo-schema";

export async function demoFormAction(_prevState: FormState, formData: FormData) {
  const values = {
    description: formData.get("description") as string,
    title: formData.get("title") as string,
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
    values: {
      description: "",
      title: "",
    },
  };
}
