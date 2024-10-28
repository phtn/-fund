import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const re = /^\/([^/]+)$/;
  const match = re.exec(pathname);

  if (match) {
    const uid = match[1];
    console.log("extracted uid", uid);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:uid*"],
};
