import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!slug || slug.length < 1) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  const businesses = await db
    .select()
    .from(schema.business)
    .where(eq(schema.business.slug, slug))
    .limit(1)

  if (businesses.length === 0) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  const biz = businesses[0]
  return NextResponse.json({
    id: biz.id,
    name: biz.name,
    slug: biz.slug,
    category: biz.category,
    description: biz.description,
    primaryColor: biz.primaryColor,
    googleConnected: biz.googleConnected,
  })
}
