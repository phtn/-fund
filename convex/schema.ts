import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  account: defineTable({
    acct: v.string(),
    active: v.boolean(),
    balance: v.float64(),
    email: v.optional(v.string()),
    links: v.array(v.any()),
    name: v.string(),
    phone: v.string(),
    updated_at: v.float64(),
    verified: v.boolean(),
    wallets: v.array(v.any()),
    tokenIdentifier: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_acct", ["acct"]),
});
