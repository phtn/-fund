import { guid } from "@/utils/helpers";
import { type DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import { query } from "@vex/server";
import { type GenericDatabaseWriter } from "convex/server";
import { v } from "convex/values";

export const getChatRooms = query({
  args: {},
  handler: async ({ db }) => {
    // Grab the most recent messages.
    const chat_rooms = await db.query("rooms").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return chat_rooms.reverse();
  },
});

export const send = mutation({
  args: {
    body: v.string(),
    author_uid: v.string(),
    author_name: v.string(),
    room_id: v.string(),
  },
  handler: async ({ db }, { body, author_uid, author_name, room_id }) => {
    await db.insert("chats", {
      room_id,
      body,
      author_uid,
      author_name,
      chat_id: guid(),
      is_read: false,
      updated_at: Date.now(),
    });
  },
});

export const getMessages = query({
  args: { room_id: v.string() },
  handler: async ({ db }, { room_id }) => {
    const messages = await db
      .query("chats")
      .withIndex("by_room_id", (q) => q.eq("room_id", room_id))
      .order("desc")
      .take(100);

    const with_likes = Promise.all(
      messages.map(async (message) => {
        const likes = await db
          .query("message_likes")
          .withIndex("by_chat_id", (q) => q.eq("chat_id", message.chat_id))
          .collect();
        return { ...message, likes: likes.length };
      }),
    );
    return (await with_likes).reverse().map((message) => ({
      ...message,
      likes: message.likes,
    }));
  },
});

const checkChatRoom = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  room_id: string,
) =>
  await db
    .query("rooms")
    .withIndex("by_room_id", (q) => q.eq("room_id", room_id))
    .unique();

const checkChat = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  chat_id: string,
) =>
  await db
    .query("chats")
    .withIndex("by_chat_id", (q) => q.eq("chat_id", chat_id))
    .unique();

export const updateMessage = mutation({
  args: {
    chat_id: v.string(),
    body: v.optional(v.string()),
    is_read: v.optional(v.boolean()),
  },
  handler: async ({ db }, { chat_id, body }) => {
    const chat = await checkChat(db, chat_id);

    if (chat === null) {
      return null;
    }
    if (chat.body !== undefined) {
      await db.patch(chat._id, { body });
    }
  },
});

export const messageRead = mutation({
  args: {
    chat_id: v.string(),
    is_read: v.boolean(),
  },
  handler: async ({ db }, { chat_id, is_read }) => {
    const chat = await checkChat(db, chat_id);

    if (chat === null) {
      return null;
    }
    if (chat.body !== undefined) {
      await db.patch(chat._id, { is_read });
    }
  },
});

export const likeMessage = mutation({
  args: {
    chat_id: v.string(),
    liker_uid: v.string(),
  },
  handler: async ({ db }, { chat_id, liker_uid }) => {
    const chat = await checkChat(db, chat_id);

    if (chat === null) {
      return null;
    }
    if (chat.chat_id !== undefined) {
      await db.insert("message_likes", {
        liker_uid,
        chat_id,
        updated_at: Date.now(),
      });
    }
  },
});
