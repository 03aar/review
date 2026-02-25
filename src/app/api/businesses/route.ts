import { NextRequest, NextResponse } from "next/server"
import { DEMO_BUSINESS } from "@/lib/demo-data"

export async function GET() {
  return NextResponse.json([DEMO_BUSINESS])
}

export async function POST(req: NextRequest) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { name, category } = body
  return NextResponse.json({
    ...DEMO_BUSINESS,
    name: name || DEMO_BUSINESS.name,
    category: category || DEMO_BUSINESS.category,
  }, { status: 201 })
}
