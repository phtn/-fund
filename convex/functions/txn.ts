import type { DataModel, Doc, Id } from "@vex/dataModel";
import { mutation } from "@vex/server";
import { type GenericDatabaseWriter } from "convex/server";
import { ConvexError, v } from "convex/values";

export const transfer = mutation({
  args: {
    from: v.id("account"),
    to: v.id("account"),
    amount: v.number(),
  },
  handler: async ({ db }, { from, to, amount }) => {
    const fromAccount = await query(db, from);
    const toAccount = await query(db, to);

    if (!fromAccount || !toAccount) {
      throw new ConvexError("Account mismatch.");
    }

    if (fromAccount.balance < amount) {
      throw new ConvexError("Insufficient funds.");
    }

    await debit(db, fromAccount, amount);
    await credit(db, toAccount, amount);

    return "success";
  },
});

const query = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  holder: Id<"account">,
) =>
  await db
    .query("account")
    .withIndex("by_id", (q) => q.eq("_id", holder))
    .first();

const credit = async <
  DB extends GenericDatabaseWriter<DataModel>,
  THolder extends Doc<"account">,
  TAmount extends number,
>(
  db: DB,
  holder: THolder,
  amount: TAmount,
) => await db.patch(holder._id, { balance: holder.balance + amount });

const debit = async <
  DB extends GenericDatabaseWriter<DataModel>,
  THolder extends Doc<"account">,
  TAmount extends number,
>(
  db: DB,
  holder: THolder,
  amount: TAmount,
) => await db.patch(holder._id, { balance: holder.balance - amount });
