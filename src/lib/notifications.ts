import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"

type NotificationType =
  | "review_new"
  | "review_negative"
  | "response_needed"
  | "campaign_complete"
  | "goal_reached"
  | "crisis_alert"
  | "team_joined"
  | "weekly_summary"

export async function createNotification({
  businessId,
  userId,
  type,
  title,
  message,
  data,
}: {
  businessId: string
  userId?: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
}) {
  const notification = {
    id: crypto.randomUUID(),
    businessId,
    userId: userId || null,
    type,
    title,
    message,
    data: data ? JSON.stringify(data) : null,
    read: false,
    channel: "in_app" as const,
    sentAt: new Date(),
    readAt: null,
    createdAt: new Date(),
  }

  await db.insert(schema.notification).values(notification)
  return notification
}

export async function notifyNewReview(
  businessId: string,
  review: { customerName: string | null; rating: number; sentiment: string | null }
) {
  const isNegative = review.rating <= 2 || review.sentiment === "negative"

  await createNotification({
    businessId,
    type: isNegative ? "review_negative" : "review_new",
    title: isNegative
      ? `Negative review from ${review.customerName || "Anonymous"}`
      : `New ${review.rating}-star review from ${review.customerName || "Anonymous"}`,
    message: isNegative
      ? `A ${review.rating}-star review needs your attention. Consider responding promptly.`
      : `${review.customerName || "A customer"} left a ${review.rating}-star review.`,
    data: { rating: review.rating, sentiment: review.sentiment },
  })
}

export async function checkAndUnlockAchievements(businessId: string) {
  const reviews = await db
    .select()
    .from(schema.review)
    .where(eq(schema.review.businessId, businessId))

  const existingAchievements = await db
    .select()
    .from(schema.achievement)
    .where(eq(schema.achievement.businessId, businessId))

  const existingTypes = new Set(existingAchievements.map((a) => a.type))
  const now = new Date()

  const toUnlock: string[] = []

  if (reviews.length >= 1 && !existingTypes.has("first_review")) toUnlock.push("first_review")
  if (reviews.length >= 100 && !existingTypes.has("100_reviews")) toUnlock.push("100_reviews")
  if (reviews.length >= 500 && !existingTypes.has("500_reviews")) toUnlock.push("500_reviews")

  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0
  if (avgRating >= 4.8 && reviews.length >= 10 && !existingTypes.has("rating_48")) {
    toUnlock.push("rating_48")
  }

  for (const type of toUnlock) {
    await db.insert(schema.achievement).values({
      id: crypto.randomUUID(),
      businessId,
      type,
      unlockedAt: now,
    })

    await createNotification({
      businessId,
      type: "goal_reached",
      title: "Achievement Unlocked!",
      message: getAchievementMessage(type),
      data: { achievementType: type },
    })
  }
}

function getAchievementMessage(type: string): string {
  const messages: Record<string, string> = {
    first_review: "You received your first review! The journey begins.",
    "100_reviews": "Incredible! You've collected 100 reviews.",
    "500_reviews": "Legendary! 500 reviews and counting.",
    rating_48: "Your average rating is 4.8+! Outstanding reputation.",
    streak_30: "30-day review streak! Consistency is key.",
    perfect_month: "Every day this month had a new review. Perfect!",
  }
  return messages[type] || "New achievement unlocked!"
}
