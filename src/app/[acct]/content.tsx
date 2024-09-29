"use client";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@vex/api";
import type { Doc } from "@vex/dataModel";
import { ListContent } from "./comp";
import { useCryptoCtx } from "../ctx/crypto";
import { cn } from "@/lib/utils";
import { Midbar } from "./midbar";
import { Wallet } from "./wallet";

export const AcctContent = (props: { acct: string | undefined }) => {
  const users = useQuery(api.account.user.get);
  // const { logout } = useAuth0();

  const { list } = useCryptoCtx();

  // const handleLogout = () => logout();

  const [user, setUser] = useState<Doc<"account"> | undefined>();

  useEffect(() => {
    if (props.acct) {
      const current = users?.find((user) => user.acct === props.acct);
      setUser(current);
    }
  }, [props.acct, users]);

  return (
    <div className={cn("h-screen bg-[#1e1e1e]", { "h-fit": !!list })}>
      <div className="h-[210px] w-full px-2 pt-3">
        <Wallet balance={user?.balance ?? 999999} />
      </div>
      <Midbar />
      <ListContent list={list} />
    </div>
  );
};
