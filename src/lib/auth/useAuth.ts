import type { AuthError, User } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from ".";
import { useMutation, useQuery } from "convex/react";
import { api } from "@vex/api";
import { type NewUserArgs } from "convex/account/user";
import { deleteUID, setUID } from "@/app/actions";

export const useAuth = () => {
  const [error, setError] = useState<AuthError>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const account = useQuery(api.account.user.getByUid, {
    uid: user?.uid ?? "x",
  });

  const new_user = useMutation(api.account.user.create);

  const createUser = useCallback(
    async (current: User | null) => {
      if (!current) return;
      const { displayName, email, phoneNumber, photoURL, uid } = current;
      const payload = {
        name: displayName,
        email: email,
        photo_url: photoURL,
        phone_number: phoneNumber ?? "+63",
        uid,
      } as NewUserArgs;

      return await new_user(payload);
    },
    [new_user],
  );

  const router = useRouter();
  const signIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError(undefined);
    const result = await signInWithPopup(auth, provider);
    if (!result) {
      setError(result);
      setLoading(false);
      return;
    }
    setUser(result.user);
    const id_token = await result.user?.getIdToken();
    if (id_token) {
      if (!account) {
        // console.log(result.user.displayName);
        await createUser(result.user);
        await setUID(result.user.uid);
      }
      setLoading(false);
      router.push(`/dashboard`);
    }
  }, [router, account, createUser]);

  const signOut = useCallback(async () => {
    setLoading(true);
    await auth.signOut();
    await deleteUID();
    setLoading(false);
  }, []);

  return { signIn, signOut, user, loading, error };
};
