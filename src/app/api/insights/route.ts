import { NextRequest, NextResponse } from "next/server"
import { getDemoInsights } from "@/lib/demo-data"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const businessId = searchParams.get("businessId")

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 })
  }

  return NextResponse.json(getDemoInsights())
}
