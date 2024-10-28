import { generateAccountNumber } from "@/utils/helpers";
import type { DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import type { GenericDatabaseWriter } from "convex/server";
import { query } from "@vex/server";
import { type Infer, v } from "convex/values";
import { createWallet } from "./wallet";

export const UserSchema = v.object({
  uid: v.string(),
  email: v.string(),
  name: v.string(),
  phone_number: v.string(),
  photo_url: v.string(),
});
export type NewUserArgs = Infer<typeof UserSchema>;

export const create = mutation({
  args: UserSchema,
  handler: async ({ db }, { uid, name, email, photo_url, phone_number }) => {
    const user = await checkUser(db, uid);

    if (user !== null) {
      if (user.name !== name) {
        await db.patch(user._id, { name });
      }
      await db.patch(user._id, { updated_at: Date.now() });
      return user._id;
    }

    await createWallet(db, "tron", uid);

    return await db.insert("account", {
      account_number: generateAccountNumber(),
      uid: uid,
      name: name,
      email: email,
      phone_number: phone_number,
      photo_url: photo_url,
      balance: 0,
      updated_at: Date.now(),
      active: true,
      verified: false,
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("account").collect();
  },
});
export const getByUid = query({
  args: { uid: v.string() },
  handler: async ({ db }, { uid }) => {
    return await db
      .query("account")
      .withIndex("by_uid", (q) => q.eq("uid", uid))
      .first();
  },
});

const checkUser = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  uid: string,
) =>
  await db
    .query("account")
    .withIndex("by_uid", (q) => q.eq("uid", uid))
    .unique();
