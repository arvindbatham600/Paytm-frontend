// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard", "/sendmoney"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sendmoney/:path*"], // all routes that need protection
};
