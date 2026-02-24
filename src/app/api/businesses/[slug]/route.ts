import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { business } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const result = await db
    .select({
      id: business.id,
      name: business.name,
      slug: business.slug,
      category: business.category,
      description: business.description,
      logoUrl: business.logoUrl,
      primaryColor: business.primaryColor,
      googleConnected: business.googleConnected,
    })
    .from(business)
    .where(eq(business.slug, slug))

  if (result.length === 0) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  return NextResponse.json(result[0])
}
