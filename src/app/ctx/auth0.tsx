"use client";

import { env } from "@/env";
import { Auth0Provider } from "@auth0/auth0-react";
import type { PropsWithChildren } from "react";
import { Convex } from "./convex";
export const Auth0 = ({ children }: PropsWithChildren) => (
  <Auth0Provider
    domain={env.NEXT_PUBLIC_AUTH0_DOMAIN}
    clientId={env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <Convex>{children}</Convex>
  </Auth0Provider>
);
