import { NextResponse } from "next/server";

export async function POST() {
  // Phase 4 will implement signature verification, event deduplication, and database settlement
  return NextResponse.json(
    { message: "Razorpay webhook endpoint scaffold ready (Phase 4)" },
    { status: 200 }
  );
}
