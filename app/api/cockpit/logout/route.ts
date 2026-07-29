import { NextRequest, NextResponse } from "next/server";
import { COCKPIT_COOKIE, cockpitUrl, sessionCookieOptions } from "@/lib/cockpit/auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(cockpitUrl(request, "/cockpit/login"), 303);
  response.cookies.set(COCKPIT_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
