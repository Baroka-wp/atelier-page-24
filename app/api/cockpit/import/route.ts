import { NextRequest, NextResponse } from "next/server";
import { importNotionData } from "@/lib/cockpit/db";

export async function POST(request: NextRequest) {
  const expected = process.env.COCKPIT_IMPORT_TOKEN;
  const received = request.headers.get("authorization");
  if (!expected || received !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const result = importNotionData(await request.json());
  return NextResponse.json({ ok: true, imported: result });
}
