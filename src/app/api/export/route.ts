import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  const format = req.nextUrl.searchParams.get("format") || "json"
  const type = req.nextUrl.searchParams.get("type") || "reviews"

  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  if (type === "reviews") {
    const reviews = await db
      .select()
      .from(schema.review)
      .where(eq(schema.review.businessId, businessId))
      .orderBy(desc(schema.review.createdAt))

    if (format === "csv") {
      const headers = [
        "ID", "Customer Name", "Customer Email", "Rating", "Sentiment",
        "Platform", "Source", "Raw Input", "Generated Review", "Final Review",
        "Topics", "Posted", "Date"
      ]

      const rows = reviews.map((r) => [
        r.id,
        r.customerName || "",
        r.customerEmail || "",
        r.rating,
        r.sentiment || "",
        r.platform,
        r.source,
        `"${(r.rawInput || "").replace(/"/g, '""')}"`,
        `"${(r.generatedReview || "").replace(/"/g, '""')}"`,
        `"${(r.finalReview || "").replace(/"/g, '""')}"`,
        r.topics || "[]",
        r.postedToPlatform ? "Yes" : "No",
        r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
      ])

      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename=reviews-${new Date().toISOString().split("T")[0]}.csv`,
        },
      })
    }

    return NextResponse.json({ reviews, exportedAt: new Date().toISOString(), count: reviews.length })
  }

  if (type === "activity") {
    const logs = await db
      .select()
      .from(schema.activityLog)
      .where(eq(schema.activityLog.businessId, businessId))
      .orderBy(desc(schema.activityLog.createdAt))
      .limit(1000)

    return NextResponse.json({ activityLogs: logs, exportedAt: new Date().toISOString(), count: logs.length })
  }

  return NextResponse.json({ error: "Invalid export type" }, { status: 400 })
}
