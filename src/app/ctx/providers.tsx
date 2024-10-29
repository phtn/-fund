import { NextUIProvider as NextUI } from "@nextui-org/react";
import { type PropsWithChildren } from "react";
// import { Auth0 } from "./auth0";
import { Crypto } from "./crypto";
import { Convex } from "./convex";
import { AuthProvider } from "./auth";
import { Toasts } from "./toast";

export const Providers = ({ children }: PropsWithChildren) => (
  <Convex>
    <AuthProvider>
      <Crypto>
        <NextUI>{children}</NextUI>
      </Crypto>
      <Toasts />
    </AuthProvider>
  </Convex>
);
