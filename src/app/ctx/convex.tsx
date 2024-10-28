"use client";

import { env } from "@/env";
import { api } from "@vex/api";
import type { Doc } from "@vex/dataModel";
import {
  ConvexProvider,
  ConvexReactClient,
  useQuery,
  useMutation,
} from "convex/react";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { useAuthCtx } from "./auth";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export function Convex({ children }: PropsWithChildren) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export const useConvex = () => {
  const { user } = useAuthCtx();
  const [account, setAccount] = useState<Doc<"account"> | undefined>();
  const sendFn = useMutation(api.functions.txn.transfer);
  const get_user = useQuery(api.account.user.getByUid, {
    uid: user?.uid ?? "test_account_01",
  });

  useEffect(() => {
    if (!get_user) return;
    if (get_user) {
      setAccount(get_user);
    }
  }, [get_user, user?.uid]);

  const from = useMemo(() => user?.uid ?? "test_account_01", [user?.uid]);
  const transfer = (to: string, amount: number) => sendFn({ from, to, amount });

  return { transfer, account };
};
