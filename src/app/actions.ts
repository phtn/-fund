"use server";

import { cookies } from "next/headers";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/lib/auth";
import { env } from "@/env";

export type Modes = "light" | "dark" | "system";

const defaultOpts = {
  secure: env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax" as const,
};

export const setTheme = async (theme: Modes) => {
  cookies().set("re-up-codes--mode", theme, { ...defaultOpts, path: "/" });
  return `mode set to ${theme}`;
};

export const getTheme = async (): Promise<Modes> => {
  const light = "light";
  const mode = cookies().get("re-up-codes--mode")?.value as Modes;
  return mode ?? light;
};

export const setUID = async (uid: string) => {
  cookies().set("re-up-codes--uid", uid, { ...defaultOpts, path: "/" });
};

export const getUID = async (): Promise<string | undefined> => {
  const value = cookies().get("re-up-codes--uid")?.value;
  return value;
};

export const deleteUID = async () => {
  cookies().delete("re-up-codes--uid");
};
