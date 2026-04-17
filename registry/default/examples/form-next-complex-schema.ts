import { z } from "zod";

export const formSchema = z.object({
  addons: z
    .array(z.string())
    .min(1, "Please select at least one add-on")
    .max(3, "You can select up to 3 add-ons")
    .refine((value) => value.every((addon) => addons.some((a) => a.id === addon)), {
      message: "You selected an invalid add-on",
    }),
  billingPeriod: z.string().min(1, "Please select a billing period"),
  emailNotifications: z.boolean(),
  plan: z.enum(["basic", "pro"]),
});

export interface FormState {
  errors: null | Partial<Record<keyof z.infer<typeof formSchema>, string[]>>;
  success: boolean;
  values: z.infer<typeof formSchema>;
}

export const addons = [
  {
    description: "Advanced analytics and reporting",
    id: "analytics",
    title: "Analytics",
  },
  {
    description: "Automated daily backups",
    id: "backup",
    title: "Backup",
  },
  {
    description: "24/7 premium customer support",
    id: "support",
    title: "Priority Support",
  },
] as const;
