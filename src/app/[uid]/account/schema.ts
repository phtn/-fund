import { z } from "zod";

export const CreateMerchantSchema = z.object({
  uid: z.string(),
  merchant_email: z.optional(z.string()),
  merchant_name: z.optional(z.string()),
  merchant_phone_number: z.optional(z.string()),
  merchant_logo_url: z.optional(z.string()),
  merchant_year_opened: z.optional(z.number()),
  merchant_slogan: z.optional(z.string()),
  merchant_mission_statement: z.optional(z.string()),
  merchant_description: z.optional(z.string()),
  merchant_tags: z.optional(z.array(z.string())),
});
