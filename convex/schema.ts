import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  account: defineTable({
    account_number: v.string(),
    uid: v.string(),
    name: v.string(),
    email: v.string(),
    phone_number: v.string(),
    photo_url: v.string(),
    balance: v.float64(),
    active: v.boolean(),
    verified: v.boolean(),
    links: v.optional(v.array(v.string())),
    wallets: v.optional(v.array(v.string())),
    updated_at: v.float64(),
  })
    .index("by_uid", ["uid"])
    .index("by_account_number", ["account_number"]),

  wallet: defineTable({
    wallet_number: v.string(),
    public_key: v.string(),
    private_key: v.string(),
    address_hex: v.string(),
    address_b58: v.string(),
    type: v.string(),
    owner: v.string(),
    active: v.boolean(),
    balance: v.float64(),
    name: v.string(),
    updated_at: v.float64(),
  }).index("by_owner", ["owner"]),

  link: defineTable({
    link_id: v.string(),
    link_status: v.union(
      v.literal("accepted"),
      v.literal("rejected"),
      v.literal("pending"),
      v.literal("disabled"),
    ),
    parties: v.string(),
    creator: v.string(),
    uid: v.string(),
    name: v.string(),
    email: v.string(),
    updated_at: v.float64(),
  })
    .index("by_link_id", ["link_id"])
    .index("by_creator", ["creator"]),

  trove: defineTable({
    trove_id: v.string(),
    account_number: v.string(),
    merchant_name: v.string(),
    quantity: v.number(),
    address_id: v.string(),
    uid: v.string(),
    title: v.string(),
    value: v.string(),
    label: v.string(),
    tags: v.array(v.string()),
    description: v.string(),
    expiration: v.float64(),
    duration: v.float64(),
    updated_at: v.float64(),
  })
    .index("by_trove_number", ["trove_id"])
    .index("by_merchant_name", ["merchant_name"])
    .index("by_uid", ["uid"]),

  shop: defineTable({
    shop_id: v.string(),
    account_number: v.string(),
    merchant_name: v.string(),
    quantity: v.number(),
    address_id: v.string(),
    uid: v.string(),
    title: v.string(),
    value: v.string(),
    label: v.string(),
    tags: v.array(v.string()),
    description: v.string(),
    expiration: v.optional(v.float64()),
    duration: v.optional(v.float64()),
    updated_at: v.float64(),
  })
    .index("by_shop_id", ["shop_id"])
    .index("by_merchant_name", ["merchant_name"])
    .index("by_uid", ["uid"]),

  event: defineTable({
    event_id: v.string(),
    account_number: v.string(),
    merchant_name: v.string(),
    quantity: v.number(),
    address_id: v.string(),
    uid: v.string(),
    title: v.string(),
    value: v.string(),
    label: v.string(),
    tags: v.array(v.string()),
    description: v.string(),
    expiration: v.optional(v.float64()),
    duration: v.optional(v.float64()),
    updated_at: v.float64(),
  })
    .index("by_event_id", ["event_id"])
    .index("by_merchant_name", ["merchant_name"])
    .index("by_uid", ["uid"]),

  feed: defineTable({
    feed_id: v.string(),
    uid: v.string(),
    title: v.string(),
    content: v.string(),
    label: v.string(),
    tags: v.array(v.string()),
    description: v.string(),
    updated_at: v.float64(),
  })
    .index("by_feed_number", ["feed_id"])
    .index("by_tag", ["tags"])
    .index("by_title", ["title"])
    .index("by_uid", ["uid"]),

  message: defineTable({
    message_id: v.string(),
    sender_uid: v.string(),
    sender_name: v.string(),
    receiver_uid: v.string(),
    receiver_name: v.string(),
    channel_id: v.string(),
    channel_name: v.string(),
    content: v.string(),
    updated_at: v.float64(),
  })
    .index("by_message_number", ["message_id"])
    .index("by_sender_uid", ["sender_uid"])
    .index("by_sender_name", ["sender_name"])
    .index("by_receiver_uid", ["receiver_uid"])
    .index("by_receiver_name", ["receiver_name"])
    .index("by_channel_id", ["channel_id"])
    .index("by_channel_name", ["channel_name"]),

  channel: defineTable({
    channel_id: v.string(),
    channel_name: v.string(),
    photo_url: v.string(),
    owners: v.array(v.string()),
    updated_at: v.float64(),
  })
    .index("by_channel_id", ["channel_id"])
    .index("by_channel_name", ["channel_name"]),

  transaction: defineTable({
    transaction_id: v.string(),
    transaction_type: v.union(
      v.literal("send"),
      v.literal("receive"),
      v.literal("redeem"),
      v.literal("deposit"),
      v.literal("withdraw"),
    ),
    transaction_status: v.union(
      v.literal("success"),
      v.literal("pending"),
      v.literal("failed"),
      v.literal("error"),
      v.literal("voided"),
    ),
    amount: v.string(),
    sender_id: v.string(),
    sender_name: v.string(),
    receiver_id: v.string(),
    receiver_name: v.string(),
    owners: v.array(v.string()),
    updated_at: v.float64(),
  })
    .index("by_transaction_id", ["transaction_id"])
    .index("by_sender_id", ["sender_id"])
    .index("by_sender_name", ["sender_name"])
    .index("by_receiver_id", ["receiver_id"])
    .index("by_receiver_name", ["receiver_name"])
    .index("by_amount", ["amount"]),
});
