import { NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const tokenValidFlag = req.cookies.get("tokenValid")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuthPage = ["/login", "/register"].includes(pathname);
  const isProtectedPage = [
    "/",
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/settings",
  ].some((p) => pathname.startsWith(p));

  // Not logged in, accessing protected route
  if (!token && isProtectedPage && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Already logged in → validate token in backend
  if (token && isProtectedPage && !tokenValidFlag) {
    const valid = await isTokenValid(token);
    if (!valid) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("authToken");
      response.cookies.delete("tokenValid");
      return response;
    }

    // Token valid → set tokenValid cookie (cache 10 menit)
    const response = NextResponse.next();
    response.cookies.set("tokenValid", "true", { maxAge: 60 * 60 });
    return response;
  }

  // Already logged in & accessing login/register → redirect to /
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};
