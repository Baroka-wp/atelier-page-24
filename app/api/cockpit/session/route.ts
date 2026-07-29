import { NextRequest, NextResponse } from "next/server";
import {
  COCKPIT_COOKIE,
  cockpitUrl,
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/cockpit/auth";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const state = attempts.get(ip);
  if (state && state.resetAt > now && state.count >= 8) {
    return NextResponse.redirect(cockpitUrl(request, "/cockpit/login?error=blocked"), 303);
  }

  const form = await request.formData();
  const password = String(form.get("password") || "");
  if (!verifyPassword(password)) {
    const current = state && state.resetAt > now ? state : { count: 0, resetAt: now + 15 * 60 * 1000 };
    current.count += 1;
    attempts.set(ip, current);
    return NextResponse.redirect(cockpitUrl(request, "/cockpit/login?error=invalid"), 303);
  }

  attempts.delete(ip);
  const response = NextResponse.redirect(cockpitUrl(request, "/cockpit"), 303);
  response.cookies.set(COCKPIT_COOKIE, createSessionToken(), sessionCookieOptions());
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.redirect(cockpitUrl(request, "/cockpit/login"), 303);
  response.cookies.set(COCKPIT_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
