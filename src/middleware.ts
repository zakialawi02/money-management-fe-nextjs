import { NextRequest, NextResponse } from "next/server";
import { getStoredUserData } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = ["/dashboard"].some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // 🚫 If the route is protected and there is no token, redirect to login
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      getStoredUserData().then((user) => {
        if (!user) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      });
    } catch (e) {
      console.error("Failed to verify token:", e);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ If the route is auth and there is a token, redirect to dashboard
  if (isAuthRoute && token) {
    try {
      const res = await fetch(
        `${process.env.API_URL ?? "http://127.0.0.1:8000"}/api/v1/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (e) {
      // Do nothing
      console.error("Failed to verify token:", e);
    }
  }

  return NextResponse.next();
}
