import { NextRequest, NextResponse } from "next/server"
import { DEMO_BUSINESS } from "@/lib/demo-data"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!slug || slug.length < 1) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  // Accept any valid slug - return demo business data with the slug's name
  // This allows user-created businesses to work with the review collection page
  const businessName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return NextResponse.json({
    id: DEMO_BUSINESS.id,
    name: slug === DEMO_BUSINESS.slug ? DEMO_BUSINESS.name : businessName,
    slug,
    category: DEMO_BUSINESS.category,
    description: DEMO_BUSINESS.description,
    primaryColor: DEMO_BUSINESS.primaryColor,
    googleConnected: DEMO_BUSINESS.googleConnected,
  })
}
