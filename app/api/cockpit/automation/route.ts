import { NextRequest, NextResponse } from "next/server";
import {
  addInteraction,
  addPassage,
  addProspect,
  confirmPayment,
  getDashboardData,
  updateOpportunity,
} from "@/lib/cockpit/db";

function authorised(request: NextRequest) {
  const expected = process.env.COCKPIT_AUTOMATION_TOKEN;
  return Boolean(expected && request.headers.get("authorization") === `Bearer ${expected}`);
}

function toFormData(payload: Record<string, unknown>) {
  const form = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null) form.set(key, String(value));
  }
  return form;
}

export async function GET(request: NextRequest) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, cockpit: getDashboardData() });
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json() as {
    action?: string;
    opportunity_id?: number;
    data?: Record<string, unknown>;
  };
  const data = { ...(body.data || {}) };
  const dashboard = getDashboardData();

  if (body.action === "prospect") {
    if (!data.offer_id && data.offer_slug) {
      data.offer_id = dashboard.offers.find((offer) => offer.slug === data.offer_slug)?.id;
    }
    addProspect(toFormData(data));
  } else if (body.action === "interaction" && body.opportunity_id) {
    addInteraction(body.opportunity_id, toFormData(data));
  } else if (body.action === "update" && body.opportunity_id) {
    updateOpportunity(body.opportunity_id, toFormData(data));
  } else if (body.action === "payment" && body.opportunity_id) {
    confirmPayment(body.opportunity_id, toFormData(data));
  } else if (body.action === "passage") {
    if (!data.offer_id && data.offer_slug) {
      data.offer_id = dashboard.offers.find((offer) => offer.slug === data.offer_slug)?.id;
    }
    addPassage(toFormData(data));
  } else {
    return NextResponse.json({ error: "Action invalide ou identifiant manquant" }, { status: 400 });
  }

  const updated = getDashboardData();
  return NextResponse.json({
    ok: true,
    summary: {
      goal: updated.goal,
      collected: updated.collected,
      remaining: updated.remaining,
      opportunities: updated.opportunityCount,
      hot: updated.hotCount,
      due: updated.dueCount,
    },
  });
}
