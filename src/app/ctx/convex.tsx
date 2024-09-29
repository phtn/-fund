"use client";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { type PropsWithChildren } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Convex({ children }: PropsWithChildren) {
  return (
    <ConvexProviderWithAuth0 client={convex}>
      {children}
    </ConvexProviderWithAuth0>
  );
}
