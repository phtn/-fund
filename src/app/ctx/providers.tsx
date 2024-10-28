import { NextUIProvider as NextUI } from "@nextui-org/react";
import { type PropsWithChildren } from "react";
// import { Auth0 } from "./auth0";
import { Crypto } from "./crypto";
import { Convex } from "./convex";
import { AuthProvider } from "./auth";

export const Providers = ({ children }: PropsWithChildren) => (
  <Convex>
    <AuthProvider>
      <Crypto>
        <NextUI>{children}</NextUI>
      </Crypto>
    </AuthProvider>
  </Convex>
);
