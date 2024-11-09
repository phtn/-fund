import { NextUIProvider as NextUI } from "@nextui-org/react";
import { type PropsWithChildren } from "react";
import { AuthProvider } from "./auth";
import { Convex } from "./convex";
import { Crypto } from "./crypto";
import { Toasts } from "./toast";
import { Theme } from "./theme";
import { ScrollProvider } from "./scroll";

export const Providers = ({ children }: PropsWithChildren) => (
  <Theme>
    <Convex>
      <AuthProvider>
        <Crypto>
          <NextUI>
            <ScrollProvider>{children}</ScrollProvider>
          </NextUI>
        </Crypto>
        <Toasts />
      </AuthProvider>
    </Convex>
  </Theme>
);
