import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  return NextResponse.next();
});

export const config = {
  matcher: ["/profile"],
};
