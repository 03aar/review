import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { business } from "@/db/schema"
import { eq } from "drizzle-orm"
import { generateSlug } from "@/lib/utils"

const DEMO_USER_ID = "demo-user"

export async function GET(req: NextRequest) {
  const businesses = await db.select().from(business).where(eq(business.userId, DEMO_USER_ID))
  return NextResponse.json(businesses)
}

export async function POST(req: NextRequest) {

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
  const { name, category, description, address, phone, website, primaryColor } = body

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Business name is required" }, { status: 400 })
  }

  if (name.length > 200) {
    return NextResponse.json({ error: "Business name too long" }, { status: 400 })
  }

  let slug = generateSlug(name)

  // Check if slug already exists, if so append a random suffix
  const existing = await db.select().from(business).where(eq(business.slug, slug))
  if (existing.length > 0) {
    slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`
  }

  const id = crypto.randomUUID()
  const now = new Date()

  await db.insert(business).values({
    id,
    userId: DEMO_USER_ID,
    name,
    slug,
    category: category || "restaurant",
    description: description || null,
    address: address || null,
    phone: phone || null,
    website: website || null,
    primaryColor: primaryColor || "#1a3a2a",
    createdAt: now,
    updatedAt: now,
  })

  const newBusiness = await db.select().from(business).where(eq(business.id, id))
  return NextResponse.json(newBusiness[0], { status: 201 })
}
