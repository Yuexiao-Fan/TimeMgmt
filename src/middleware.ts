// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  // 你可以自定义 publicRoutes 和 afterAuth
  publicRoutes: ["/", "/login", "/signup"],
  afterAuth(auth, req) {
    const { userId, orgId, isPublicRoute } = auth;

    if (!userId && !isPublicRoute) {
      const signInUrl = new URL("/login", req.url);
      return NextResponse.redirect(signInUrl);
    }

    if (userId && !orgId && req.nextUrl.pathname !== "/create-workspace") {
      return NextResponse.redirect(new URL("/create-workspace", req.url));
    }

    if (userId && orgId && ["/", "/login", "/signup"].includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(`/w/${orgId}/home`, req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
