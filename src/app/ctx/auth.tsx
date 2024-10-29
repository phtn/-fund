"use client";

import { auth } from "@/lib/auth";
import { useAuth } from "@/lib/auth/useAuth";
import { api } from "@vex/api";
import { type Doc } from "@vex/dataModel";
import { useQuery } from "convex/react";
import { type AuthError, onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface AuthCtxValues {
  user: User | null;
  account: Doc<"account"> | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  error: AuthError | undefined;
  // authKey: string | undefined;
  // setAuthKey: (key: string) => Promise<string>;
}

const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Doc<"account"> | null>(null);
  const router = useRouter();

  const { signIn, signOut, loading, error } = useAuth();

  const get_account = useQuery(api.account.user.getByUid, {
    uid: user?.uid ?? "test_account_01",
  });

  useEffect(() => {
    if (!get_account) return;
    if (get_account) {
      setAccount(get_account);
    }
  }, [get_account, user?.uid]);

  const authState = useCallback(() => {
    onAuthStateChanged(auth, (current) => {
      if (!current) {
        router.push("/");
        return;
      }
      setUser(current);
    });
  }, [router]);

  useEffect(() => {
    authState();
  }, [authState]);

  const stableValues = useMemo(
    () => ({
      user: user ?? null,
      account,
      loading,
      signIn,
      signOut,
      error,
    }),
    [user, account, loading, signIn, signOut, error],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("User context is null");
  return context;
};
