import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"
import { generateSlug } from "@/lib/utils"

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const businesses = await db
    .select()
    .from(schema.business)
    .where(eq(schema.business.userId, session.user.id))

  return NextResponse.json(businesses)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { name, category } = body
  if (!name || !category) {
    return NextResponse.json({ error: "name and category are required" }, { status: 400 })
  }

  const id = crypto.randomUUID()
  const baseSlug = generateSlug(name)
  let slug = baseSlug
  let suffix = 1

  // Ensure unique slug
  while (true) {
    const existing = await db
      .select({ id: schema.business.id })
      .from(schema.business)
      .where(eq(schema.business.slug, slug))
      .limit(1)
    if (existing.length === 0) break
    slug = `${baseSlug}-${suffix++}`
  }

  const now = new Date()
  const newBusiness = {
    id,
    userId: session.user.id,
    name: String(name).slice(0, 200),
    slug,
    category: String(category).slice(0, 100),
    description: body.description || null,
    address: body.address || null,
    phone: body.phone || null,
    website: body.website || null,
    logoUrl: null,
    googlePlaceId: null,
    googleConnected: false,
    yelpConnected: false,
    facebookConnected: false,
    primaryColor: "#1a3a2a",
    autoRespond: false,
    createdAt: now,
    updatedAt: now,
  }

  await db.insert(schema.business).values(newBusiness)

  return NextResponse.json(newBusiness, { status: 201 })
}
