/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as account_merchant from "../account/merchant.js";
import type * as account_user from "../account/user.js";
import type * as account_wallet from "../account/wallet.js";
import type * as chats_chat from "../chats/chat.js";
import type * as functions_txn from "../functions/txn.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "account/merchant": typeof account_merchant;
  "account/user": typeof account_user;
  "account/wallet": typeof account_wallet;
  "chats/chat": typeof chats_chat;
  "functions/txn": typeof functions_txn;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
