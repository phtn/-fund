"use client";

import { env } from "@/env";
import { api } from "@vex/api";
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { useMemo, type PropsWithChildren } from "react";
import { useAuthCtx } from "./auth";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export function Convex({ children }: PropsWithChildren) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export const useConvex = () => {
  const { user, account } = useAuthCtx();

  const sendFn = useMutation(api.functions.txn.transfer);
  const from = useMemo(() => user?.uid ?? "", [user?.uid]);

  const transfer = (to: string, amount: number) => sendFn({ from, to, amount });

  const generateLogoUrl = useMutation(api.account.merchant.generateLogoUrl);
  const createMerchant = useMutation(api.account.merchant.create);

  return { transfer, account, generateLogoUrl, createMerchant };
};
