import { generateAccountNumber } from "@/utils/helpers";
import type { DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import type { GenericDatabaseWriter } from "convex/server";
// import { query } from "@vex/server";
import { v } from "convex/values";

import { createTronWallet } from "@/lib/tron/create";
import { query } from "@vex/server";

export const create = mutation({
  args: {
    type: v.string(),
    uid: v.string(),
  },
  handler: async ({ db }, { type, uid }) => {
    return await createWallet(db, type, uid);
  },
});

export const createWallet = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  type: string,
  uid: string,
) => {
  const { public_key, private_key, address_hex, address_b58 } =
    await createTronWallet();
  return await db.insert("wallet", {
    wallet_number: generateAccountNumber(),
    public_key,
    private_key,
    address_hex,
    address_b58,
    type,
    owner: uid,
    active: true,
    balance: 0,
    name: "New Wallet",
    updated_at: Date.now(),
  });
};

export const get = query({
  args: { uid: v.string() },
  handler: async ({ db }, { uid }) =>
    await db
      .query("wallet")
      .withIndex("by_owner", (q) => q.eq("owner", uid))
      .collect(),
});
