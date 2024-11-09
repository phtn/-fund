import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const re = /^\/([^/]+)$/;
  // const match = re.exec(pathname);
  const uid = req.cookies.get("re-up-codes--uid")?.value;

  if (!uid) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.rewrite(new URL(`/${uid}`, req.url));

  // if (pathname.startsWith("/dashboard")){
  //   return NextResponse.rewrite(new URL("/authed/", req.url));
  // }

  // if (match) {
  //   const uid = match[1];
  //   console.log("extracted uid", uid);
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
