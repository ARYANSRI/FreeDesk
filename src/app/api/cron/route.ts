import { NextResponse } from "next/server";

export async function GET() {
  // Phase 3 & 5 will implement scheduled invoice generation & reminder dispatch
  return NextResponse.json({ message: "Cron endpoint scaffold ready" }, { status: 200 });
}
