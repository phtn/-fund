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
    favorite_merchants: v.optional(v.array(v.string())),
    favorite_procducts: v.optional(v.array(v.string())),
    favorite_events: v.optional(v.array(v.string())),
    verification_method: v.optional(v.string()),
    chat_rooms: v.optional(v.array(v.string())),
    is_merchant: v.optional(v.boolean()),
    links: v.optional(v.array(v.string())),
    wallets: v.optional(v.array(v.string())),
    updated_at: v.float64(),
  })
    .index("by_uid", ["uid"])
    .index("by_account_number", ["account_number"]),

  merchant: defineTable({
    merchant_id: v.string(),
    account_number: v.string(),
    merchant_name: v.string(),
    merchant_phone_number: v.optional(v.string()),
    merchant_email: v.optional(v.string()),
    merchant_logo_url: v.optional(v.string()),
    merchant_logo_format: v.optional(v.string()),
    year_opened: v.optional(v.number()),
    merchant_reward_balance: v.number(),
    merchant_premium_balance: v.number(),
    total_reward_amount_issued: v.optional(v.number()),
    total_reward_amount_claimed: v.optional(v.number()),
    total_reward_count_issued: v.optional(v.number()),
    total_reward_count_claimed: v.optional(v.number()),
    merchant_rank: v.optional(v.number()),
    category: v.optional(v.string()),
    owner_name: v.optional(v.string()),
    address_id: v.optional(v.string()),
    troves: v.optional(v.array(v.string())),
    products: v.optional(v.array(v.string())),
    events: v.optional(v.array(v.string())),
    c_granted: v.optional(v.array(v.string())),
    c_redeemed: v.optional(v.array(v.string())),
    c_replied: v.optional(v.array(v.string())),
    uid: v.string(),
    photo_url: v.optional(v.string()),
    slogan: v.optional(v.string()),
    mission_statement: v.optional(v.string()),
    is_active: v.boolean(),
    is_verified: v.boolean(),
    chat_rooms: v.optional(v.array(v.string())),
    verification_method: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    description: v.optional(v.string()),
    updated_at: v.float64(),
  })
    .index("by_merchant_id", ["merchant_id"])
    .index("by_merchant_name", ["merchant_name"])
    .index("by_uid", ["uid"]),

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

  chats: defineTable({
    chat_id: v.string(),
    author_uid: v.string(),
    author_name: v.string(),
    room_id: v.string(),
    body: v.string(),
    is_read: v.boolean(),
    updated_at: v.float64(),
  })
    .index("by_chat_id", ["chat_id"])
    .index("by_author_uid", ["author_uid"])
    .index("by_author_name", ["author_name"])
    .index("by_room_id", ["room_id"]),

  message_likes: defineTable({
    chat_id: v.string(),
    liker_uid: v.string(),
    updated_at: v.float64(),
  })
    .index("by_chat_id", ["chat_id"])
    .index("by_liker_uid", ["liker_uid"]),

  rooms: defineTable({
    room_id: v.string(),
    room_name: v.optional(v.string()),
    photo_url: v.optional(v.string()),
    theme: v.optional(v.string()),
    owners: v.array(v.string()),
    updated_at: v.float64(),
  })
    .index("by_room_id", ["room_id"])
    .index("by_room_name", ["room_name"]),

  notifications: defineTable({
    notification_id: v.string(),
    notification_type: v.union(
      v.literal("send"),
      v.literal("receive"),
      v.literal("redeem"),
      v.literal("deposit"),
      v.literal("withdraw"),
    ),
    from_id: v.string(),
    from_name: v.string(),
    to_uid: v.string(),
    body: v.string(),
    updated_at: v.float64(),
  })
    .index("by_notification_id", ["notification_id"])
    .index("by_from_id", ["from_id"])
    .index("by_from_name", ["from_name"])
    .index("by_to_uid", ["to_uid"]),

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
