import { z } from "zod";

export const formSchema = z.object({
  plan: z.enum(["basic", "pro"], {
    error: "Please select a subscription plan",
  }),
  billingPeriod: z.enum(["monthly", "yearly"], {
    error: "Please select a billing period",
  }),
  addons: z
    .array(z.string())
    .min(1, "Please select at least one add-on")
    .max(3, "You can select up to 3 add-ons")
    .refine(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      {
        message: "You selected an invalid add-on",
      }
    ),
  emailNotifications: z.boolean(),
});

export interface FormState {
  errors: null | Partial<Record<keyof z.infer<typeof formSchema>, string[]>>;
  success: boolean;
  values: z.infer<typeof formSchema>;
}

export const addons = [
  {
    id: "analytics",
    title: "Analytics",
    description: "Advanced analytics and reporting",
  },
  {
    id: "backup",
    title: "Backup",
    description: "Automated daily backups",
  },
  {
    id: "support",
    title: "Priority Support",
    description: "24/7 premium customer support",
  },
] as const;
