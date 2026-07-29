import { NextRequest, NextResponse } from "next/server";
import { COCKPIT_COOKIE, cockpitUrl, verifySessionToken } from "@/lib/cockpit/auth";
import { addPassage } from "@/lib/cockpit/db";

export async function POST(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(COCKPIT_COOKIE)?.value)) {
    return NextResponse.redirect(cockpitUrl(request, "/cockpit/login"), 303);
  }
  addPassage(await request.formData());
  return NextResponse.redirect(cockpitUrl(request, "/cockpit#passages"), 303);
}
