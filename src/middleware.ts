import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
