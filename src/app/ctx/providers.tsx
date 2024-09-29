import { TRPCProvider as TRPC } from "@/trpc/react";
import { NextUIProvider as NextUI } from "@nextui-org/react";
import { type PropsWithChildren } from "react";
import { Auth0 } from "./auth0";
import { Crypto } from "./crypto";

export const Providers = ({ children }: PropsWithChildren) => (
  <Auth0>
    <TRPC>
      <Crypto>
        <NextUI>{children}</NextUI>
      </Crypto>
    </TRPC>
  </Auth0>
);
