"use client";

import { useEffect } from "react";
import { Button, Image } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useConvexStore } from "./hook";
import { useQuery } from "convex/react";
import { api } from "@vex/api";
import { useRouter } from "next/navigation";

export const MainContent = () => {
  const { user, loginWithRedirect, logout } = useAuth0();
  const { userId, isLoading, isAuthenticated } = useConvexStore();

  const handleLogin = () => loginWithRedirect();
  const handleLogout = () => logout();
  const users = useQuery(api.account.user.get);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const current = users?.find(({ _id }) => _id === userId);
      if (current) {
        router.push(`/${current.acct}`);
      }
    }
  }, [isAuthenticated, router, userId, users]);
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center overflow-clip bg-[#1e1e1e] bg-gradient-to-b via-slate-950 via-[10%] to-black text-white">
      <Image isBlurred alt="mikako" src="/svg/mikako.svg" />
      <div className="flex h-40 w-full items-center justify-center">
        <Button
          isLoading={isLoading}
          className="w-1/2 bg-[#2f2f2f] text-pink-100/60"
          onPress={handleLogin}
          size="lg"
        >
          {isLoading ? user?.name : "Sign in"}
        </Button>
      </div>
      <Button
        className="w-1/2 bg-[#2f2f2f] text-pink-100/60"
        onPress={handleLogout}
        size="lg"
        color="warning"
      >
        {userId}
      </Button>
    </main>
  );
};
