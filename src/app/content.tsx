"use client";

import { useAuth } from "@/lib/auth/useAuth";
import { Button, Image } from "@nextui-org/react";

export const MainContent = () => {
  const { signIn, loading } = useAuth();
  const handleSignin = () => signIn();
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center overflow-clip bg-gray-950 text-white">
      <Image
        isBlurred
        alt="logo"
        src="/svg/logo.svg"
        width={100}
        height={100}
      />
      <div className="flex h-40 w-full items-center justify-center">
        <Button
          size="lg"
          isLoading={loading}
          onPress={handleSignin}
          className="flex w-fit gap-6 bg-gray-800 font-inst text-sm text-gray-200"
        >
          <p>Continue with Google</p>
          {loading ? null : (
            <Image alt="google" src="/svg/google.svg" width={20} height={20} />
          )}
        </Button>
      </div>
    </main>
  );
};
