"use client";

import { auth } from "@/lib/auth";
import { useAuth } from "@/lib/auth/useAuth";
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
  // const [authKey, setAuthKeyState] = useState<string | undefined>();
  const router = useRouter();

  const { signIn, signOut, loading, error } = useAuth();

  const authState = useCallback(() => {
    onAuthStateChanged(auth, (current) => {
      setUser(current);
      if (!current) {
        router.push("/");
        return;
      }
    });
  }, [router]);

  useEffect(() => {
    authState();
  }, [authState]);

  const stableValues = useMemo(
    () => ({
      user: user ?? null,
      loading,
      signIn,
      signOut,
      error,
    }),
    [user, loading, signIn, signOut, error],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("User context is null");
  return context;
};
