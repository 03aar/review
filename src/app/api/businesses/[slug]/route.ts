import { NextRequest, NextResponse } from "next/server"
import { DEMO_BUSINESS } from "@/lib/demo-data"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (slug !== DEMO_BUSINESS.slug) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  return NextResponse.json({
    id: DEMO_BUSINESS.id,
    name: DEMO_BUSINESS.name,
    slug: DEMO_BUSINESS.slug,
    category: DEMO_BUSINESS.category,
    description: DEMO_BUSINESS.description,
    primaryColor: DEMO_BUSINESS.primaryColor,
    googleConnected: DEMO_BUSINESS.googleConnected,
  })
}
