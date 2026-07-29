import { NextRequest, NextResponse } from "next/server";
import { COCKPIT_COOKIE, cockpitUrl, verifySessionToken } from "@/lib/cockpit/auth";
import { confirmPayment } from "@/lib/cockpit/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifySessionToken(request.cookies.get(COCKPIT_COOKIE)?.value)) {
    return NextResponse.redirect(cockpitUrl(request, "/cockpit/login"), 303);
  }
  const { id } = await params;
  confirmPayment(Number(id), await request.formData());
  return NextResponse.redirect(cockpitUrl(request, `/cockpit/prospects/${id}`), 303);
}
