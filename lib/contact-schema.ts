import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(200),
  phone: z
    .string()
    .trim()
    .max(40, "That phone number is too long.")
    .optional()
    .or(z.literal("")),
  service: z.string().trim().min(1, "Please choose a service."),
  city: z.string().trim().min(1, "Please choose a location."),
  message: z
    .string()
    .trim()
    .min(20, "Please give us a little more detail — 20 characters minimum.")
    .max(4000, "That message is too long."),
  /**
   * Honeypot. Real users never see this field, so any value means a bot.
   *
   * Deliberately permissive: the route checks it after parsing and accepts the
   * request silently. Rejecting it here would return a validation error, which
   * tells the bot exactly which field to leave blank on its next attempt.
   */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
