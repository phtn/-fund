import { onError, onSuccess, onWarn } from "@/app/ctx/toast";
import type { Dispatch, SetStateAction, ReactElement } from "react";

export function generateAccountNumber() {
  // Ensure bankCode and branchCode are 2 digits

  const bankCode = 80; // Represents a specific bank
  const branchCode = new Date().getFullYear() - 2000; // Represents a specific branch
  const formattedBankCode = bankCode.toString().padStart(2, "0");
  const formattedBranchCode = branchCode.toString().padStart(2, "0");

  // Generate a random 4-digit unique identifier (between 1000 and 9999)
  const uniqueId = Math.floor(1000 + Math.random() * 9000);
  const midId = Math.floor(1000 + Math.random() * 9000);
  const lastId = Math.floor(1000 + Math.random() * 9000);

  // Combine all parts to form the 8-digit account number
  const accountNumber = `${formattedBankCode}${formattedBranchCode}-${uniqueId}-${midId}-${lastId}`;

  return accountNumber;
}

export const opts = (...args: ReactElement[]) => {
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};

export const toggleState = (
  setState: Dispatch<SetStateAction<boolean>>,
): void => {
  setState((prevState) => !prevState);
};

export const prettyDate = (datestring: string | undefined): string => {
  if (!datestring) return "";
  const date = new Date(datestring);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleString("en-US", options);
};

export const charlimit = (
  text: string | undefined,
  chars?: number,
): string | undefined => {
  if (!text) return;
  return text.substring(0, chars ?? 12);
};

export type CopyFnParams = {
  name: string;
  text: string;
  limit?: number;
};
type CopyFn = (params: CopyFnParams) => Promise<boolean>; // Return success

export const copyFn: CopyFn = async ({ name, text }) => {
  if (!navigator?.clipboard) {
    onWarn("Clipboard not supported");
    return false;
  }
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    onSuccess(`${name ? "Copied: " + name : "Copied."}`);
    return true;
  } catch (err) {
    const error = err as Error;
    onError(error.message);
    return false;
  }
};

export const getInitials = (name: string | undefined) => {
  if (!name) return;

  const words = name.split(" ");

  if (words.length === 1) {
    return name.slice(0, 2);
  }

  if (words.length === 2) {
    return words[0]!.charAt(0) + words[1]!.charAt(0);
  }

  if (words.length >= 3) {
    return words[0]!.charAt(0) + words[words.length - 1]!.charAt(0);
  }
};

const s = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const guid = () =>
  `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
