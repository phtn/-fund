import { generateAccountNumber } from "@/utils/helpers";
import type { DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import type { GenericDatabaseWriter } from "convex/server";
import { query } from "@vex/server";

export const store = mutation({
  args: {},
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const user = await checkUser(db, identity.tokenIdentifier);

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await db.insert("account", {
      acct: generateAccountNumber(),
      active: true,
      balance: 0,
      email: identity.email!,
      links: [],
      name: identity.name ?? "Anonymous",
      phone: identity.phoneNumber ?? "0000",
      updated_at: Date.now(),
      verified: false,
      wallets: [],
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("account").collect();
  },
});

const checkUser = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  tokenIdentifier: string,
) =>
  await db
    .query("account")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
    .unique();
