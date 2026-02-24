import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { business } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq } from "drizzle-orm"
import { generateSlug } from "@/lib/utils"

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const businesses = await db.select().from(business).where(eq(business.userId, session.user.id))
  return NextResponse.json(businesses)
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

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
    userId: session.user.id,
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
