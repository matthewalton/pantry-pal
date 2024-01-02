import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const newHeaders = new Headers(req.headers);
  newHeaders.set("x-session-token", JSON.stringify(req.nextauth.token));

  return NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
});

export const config = {
  matcher: ["/profile"],
};
