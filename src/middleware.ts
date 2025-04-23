import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const protectedPaths = ["/dashboard", "/sendmoney"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  const token = request.cookies.get("token")?.value;

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sendmoney/:path*"], // protect these paths
};
