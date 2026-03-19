import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  const templates = await db
    .select()
    .from(schema.responseTemplate)
    .where(eq(schema.responseTemplate.businessId, businessId))
    .orderBy(desc(schema.responseTemplate.usageCount))

  return NextResponse.json(templates)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { businessId, name, category, content, variables } = body

  if (!businessId || !name || !content) {
    return NextResponse.json({ error: "businessId, name, and content required" }, { status: 400 })
  }

  const now = new Date()
  const template = {
    id: crypto.randomUUID(),
    businessId,
    name: String(name).slice(0, 100),
    category: category || "general",
    content: String(content).slice(0, 2000),
    variables: variables ? JSON.stringify(variables) : null,
    usageCount: 0,
    createdAt: now,
    updatedAt: now,
  }

  await db.insert(schema.responseTemplate).values(template)
  return NextResponse.json(template, { status: 201 })
}
