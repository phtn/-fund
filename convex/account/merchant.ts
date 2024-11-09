import { generateAccountNumber, guid } from "@/utils/helpers";
import type { DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import type { GenericDatabaseWriter } from "convex/server";
import { query } from "@vex/server";
import { type Infer, v } from "convex/values";
import { createWallet } from "./wallet";

export const MerchantSchema = v.object({
  uid: v.string(),
  merchant_email: v.optional(v.string()),
  merchant_name: v.optional(v.string()),
  merchant_phone_number: v.optional(v.string()),
  merchant_logo_url: v.optional(v.string()),
  merchant_year_opened: v.optional(v.number()),
  merchant_slogan: v.optional(v.string()),
  merchant_mission_statement: v.optional(v.string()),
  merchant_description: v.optional(v.string()),
  merchant_tags: v.optional(v.array(v.string())),
});
export type NewMerchantArgs = Infer<typeof MerchantSchema>;

export const create = mutation({
  args: MerchantSchema,
  handler: async (
    { db },
    { uid, merchant_name, merchant_email, merchant_phone_number },
  ) => {
    const merchant = await checkMerchant(db, uid);

    if (merchant !== null) {
      if (merchant.merchant_name !== merchant_name) {
        await db.patch(merchant._id, { merchant_name });
      }
      await db.patch(merchant._id, { updated_at: Date.now() });
      return merchant._id;
    }

    await createWallet(db, "merchant_tron", uid);

    return await db.insert("merchant", {
      merchant_id: guid(),
      account_number: generateAccountNumber(),
      uid: uid,
      merchant_name: merchant_name ?? "",
      merchant_email: merchant_email,
      merchant_phone_number: merchant_phone_number,
      merchant_reward_balance: 0,
      merchant_premium_balance: 0,
      updated_at: Date.now(),
      is_active: true,
      is_verified: false,
    });
  },
});

export const generateLogoUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const setMerchantLogo = mutation({
  args: { storageId: v.id("_storage"), uid: v.string() },
  handler: async (ctx, args) => {
    const merchant = await checkMerchant(ctx.db, args.uid);
    if (!merchant) {
      return;
    }
    await ctx.db.patch(merchant._id, {
      merchant_logo_url: args.storageId,
      uid: args.uid,
    });
  },
});

const checkMerchant = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  uid: string,
) =>
  await db
    .query("merchant")
    .withIndex("by_uid", (q) => q.eq("uid", uid))
    .unique();

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("merchant").collect();
  },
});

export const getByUid = query({
  args: { uid: v.string() },
  handler: async ({ db }, { uid }) => {
    return await db
      .query("merchant")
      .withIndex("by_uid", (q) => q.eq("uid", uid))
      .first();
  },
});

export const getByName = query({
  args: { merchant_name: v.string() },
  handler: async ({ db }, { merchant_name }) => {
    return await db
      .query("merchant")
      .withIndex("by_merchant_name", (q) =>
        q.eq("merchant_name", merchant_name),
      )
      .first();
  },
});

export const update = mutation({
  args: MerchantSchema,
  handler: async (
    { db },
    {
      uid,
      merchant_name,
      merchant_email,
      merchant_phone_number,
      merchant_logo_url,
    },
  ) => {
    const merchant = await checkMerchant(db, uid);

    if (merchant === null) {
      throw new Error("Merchant not found");
    }

    if (merchant.merchant_name !== merchant_name) {
      await db.patch(merchant._id, { merchant_name });
    }

    if (merchant.merchant_email !== merchant_email) {
      await db.patch(merchant._id, { merchant_email });
    }

    if (merchant.merchant_phone_number !== merchant_phone_number) {
      await db.patch(merchant._id, { merchant_phone_number });
    }

    if (merchant.merchant_logo_url !== merchant_logo_url) {
      await db.patch(merchant._id, { merchant_logo_url });
    }

    await db.patch(merchant._id, { updated_at: Date.now() });
    return merchant._id;
  },
});
