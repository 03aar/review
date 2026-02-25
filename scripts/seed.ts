/**
 * Seed script — populates the database with demo data for development/testing.
 *
 * Usage:
 *   npm run db:seed
 *
 * Prerequisites:
 *   - DATABASE_URL must be set in .env
 *   - Tables must exist (run `npm run db:push` first)
 *
 * What it does:
 *   1. Creates a demo user (or skips if one already exists)
 *   2. Creates the Sakura Bistro demo business
 *   3. Inserts 12 demo reviews with varied ratings, sentiments, and platforms
 *
 * IMPORTANT: The seed user ("demo@reviewforge.local") has no auth account record,
 * so it cannot be used to log in through the UI. To see the seeded data in the
 * dashboard, register a real account at /register, then either:
 *   (a) Update the seed business's userId to match your real user ID, or
 *   (b) Use the --assign-to flag: `tsx scripts/seed.ts --assign-to <your-user-id>`
 *       (not yet implemented — for now, manually update the DB or re-seed after registering)
 *
 * Safe to run multiple times — checks for existing records before inserting.
 */

import "dotenv/config"
import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { eq } from "drizzle-orm"
import { user, business, review } from "../src/db/schema"

// ── DB connection (standalone, not the Next.js singleton) ──────────────

const url = process.env.DATABASE_URL
if (!url) {
  console.error("ERROR: DATABASE_URL is not set. Check your .env file.")
  process.exit(1)
}

const authToken = process.env.TURSO_AUTH_TOKEN
const client = createClient({ url, authToken })
const db = drizzle(client)

// ── Helpers ────────────────────────────────────────────────────────────

const SEED_USER_ID = "seed-user-001"
const SEED_BUSINESS_ID = "seed-biz-001"

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

// ── Seed data ──────────────────────────────────────────────────────────

const SEED_USER = {
  id: SEED_USER_ID,
  name: "Demo User",
  email: "demo@reviewforge.local",
  emailVerified: false,
  createdAt: new Date("2025-10-01"),
  updatedAt: new Date("2025-10-01"),
}

const SEED_BUSINESS = {
  id: SEED_BUSINESS_ID,
  userId: SEED_USER_ID,
  name: "Sakura Bistro",
  slug: "sakura-bistro",
  category: "restaurant",
  description: "Modern Japanese fusion restaurant in downtown",
  address: "123 Main Street, San Francisco, CA",
  phone: "(415) 555-0123",
  website: "https://sakurabistro.com",
  primaryColor: "#1a3a2a",
  googleConnected: true,
  yelpConnected: false,
  facebookConnected: true,
  autoRespond: false,
  createdAt: new Date("2025-10-01"),
  updatedAt: new Date("2026-02-20"),
}

const SEED_REVIEWS = [
  {
    id: "seed-rev-001",
    businessId: SEED_BUSINESS_ID,
    customerName: "Sarah M.",
    customerEmail: "sarah@example.com",
    rating: 5,
    rawInput: "food was amazing and jake our waiter was super nice",
    rawInputType: "voice" as const,
    generatedReview:
      "Had an absolutely wonderful dinner at Sakura Bistro last night. The food was genuinely impressive. Every dish was beautifully presented and packed with flavor. Our waiter Jake was outstanding, attentive without being intrusive, and made great recommendations. We'll definitely be coming back!",
    finalReview:
      "Had an absolutely wonderful dinner at Sakura Bistro last night. The food was genuinely impressive. Every dish was beautifully presented and packed with flavor. Our waiter Jake was outstanding, attentive without being intrusive, and made great recommendations. We'll definitely be coming back!",
    platform: "google" as const,
    sentiment: "positive",
    topics: JSON.stringify(["food quality", "service", "atmosphere"]),
    source: "qr" as const,
    postedToPlatform: true,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "seed-rev-002",
    businessId: SEED_BUSINESS_ID,
    customerName: "Mike R.",
    customerEmail: "mike@example.com",
    rating: 5,
    rawInput: "best sushi in the city hands down",
    rawInputType: "voice" as const,
    generatedReview:
      "Sakura Bistro serves hands down the best sushi in San Francisco. The fish is incredibly fresh, the rice is perfectly seasoned, and the presentation is art. The omakase is a must-try. Every course was a surprise and delight. Already planning my next visit.",
    finalReview:
      "Sakura Bistro serves hands down the best sushi in San Francisco. The fish is incredibly fresh, the rice is perfectly seasoned, and the presentation is art. The omakase is a must-try. Every course was a surprise and delight. Already planning my next visit.",
    platform: "google" as const,
    sentiment: "positive",
    topics: JSON.stringify(["food quality", "sushi", "presentation"]),
    source: "link" as const,
    postedToPlatform: true,
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: "seed-rev-003",
    businessId: SEED_BUSINESS_ID,
    customerName: "Emily C.",
    customerEmail: null,
    rating: 4,
    rawInput: "great ambiance, cocktails were strong, food took a while",
    rawInputType: "voice" as const,
    generatedReview:
      "Lovely ambiance at Sakura Bistro. The interior design is stunning and the vibe is perfect for date night. The cocktail menu is creative and the drinks are well-crafted. Food did take a bit longer than expected, but the quality made up for the wait. Would recommend for a special evening out.",
    finalReview:
      "Lovely ambiance at Sakura Bistro. The interior design is stunning and the vibe is perfect for date night. The cocktail menu is creative and the drinks are well-crafted. Food did take a bit longer than expected, but the quality made up for the wait. Would recommend for a special evening out.",
    platform: "yelp" as const,
    sentiment: "positive",
    topics: JSON.stringify(["atmosphere", "cocktails", "wait time"]),
    source: "sms" as const,
    postedToPlatform: true,
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: "seed-rev-004",
    businessId: SEED_BUSINESS_ID,
    customerName: "David L.",
    customerEmail: "david@example.com",
    rating: 5,
    rawInput: "my wife loved the dessert and the staff remembered our anniversary",
    rawInputType: "voice" as const,
    generatedReview:
      "We celebrated our anniversary at Sakura Bistro and the staff made it truly memorable. They remembered our occasion and brought out a special dessert with a congratulations note. My wife was thrilled. The matcha cheesecake was incredible. This level of personal touch is rare; thank you, Sakura Bistro!",
    finalReview:
      "We celebrated our anniversary at Sakura Bistro and the staff made it truly memorable. They remembered our occasion and brought out a special dessert with a congratulations note. My wife was thrilled. The matcha cheesecake was incredible. This level of personal touch is rare; thank you, Sakura Bistro!",
    platform: "google" as const,
    sentiment: "positive",
    topics: JSON.stringify(["service", "dessert", "special occasion"]),
    source: "qr" as const,
    postedToPlatform: true,
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
  },
  {
    id: "seed-rev-005",
    businessId: SEED_BUSINESS_ID,
    customerName: "Jessica P.",
    customerEmail: null,
    rating: 3,
    rawInput: "food was ok, parking was terrible",
    rawInputType: "text" as const,
    generatedReview:
      "The food at Sakura Bistro was decent, nothing extraordinary but certainly acceptable. However, parking in the area is a real challenge. We circled the block several times before finding a spot. The restaurant might benefit from partnering with a nearby garage for validated parking.",
    finalReview:
      "The food at Sakura Bistro was decent, nothing extraordinary but certainly acceptable. However, parking in the area is a real challenge. We circled the block several times before finding a spot. The restaurant might benefit from partnering with a nearby garage for validated parking.",
    platform: "google" as const,
    sentiment: "neutral",
    topics: JSON.stringify(["food quality", "parking"]),
    source: "link" as const,
    postedToPlatform: false,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
  {
    id: "seed-rev-006",
    businessId: SEED_BUSINESS_ID,
    customerName: "Alex T.",
    customerEmail: "alex@example.com",
    rating: 5,
    rawInput: "ramen was incredible, broth was so rich",
    rawInputType: "voice" as const,
    generatedReview:
      "The tonkotsu ramen at Sakura Bistro is in a league of its own. The broth is incredibly rich and deeply flavored; you can tell it's been simmered for hours. The noodles had perfect texture and the chashu pork was melt-in-your-mouth tender. Best ramen I've had outside of Japan.",
    finalReview:
      "The tonkotsu ramen at Sakura Bistro is in a league of its own. The broth is incredibly rich and deeply flavored; you can tell it's been simmered for hours. The noodles had perfect texture and the chashu pork was melt-in-your-mouth tender. Best ramen I've had outside of Japan.",
    platform: "google" as const,
    sentiment: "positive",
    topics: JSON.stringify(["ramen", "food quality"]),
    source: "qr" as const,
    postedToPlatform: true,
    createdAt: daysAgo(6),
    updatedAt: daysAgo(6),
  },
  {
    id: "seed-rev-007",
    businessId: SEED_BUSINESS_ID,
    customerName: "Rachel K.",
    customerEmail: null,
    rating: 4,
    rawInput: "lunch specials are a great deal, wish they had more vegetarian options",
    rawInputType: "text" as const,
    generatedReview:
      "Sakura Bistro's lunch specials are an excellent value, with generous portions at very reasonable prices. The bento box lunch is my go-to. My only suggestion would be to expand the vegetarian options. While they have a few, more variety would be welcome for plant-based diners like myself.",
    finalReview:
      "Sakura Bistro's lunch specials are an excellent value, with generous portions at very reasonable prices. The bento box lunch is my go-to. My only suggestion would be to expand the vegetarian options. While they have a few, more variety would be welcome for plant-based diners like myself.",
    platform: "yelp" as const,
    sentiment: "positive",
    topics: JSON.stringify(["value", "vegetarian", "lunch"]),
    source: "link" as const,
    postedToPlatform: true,
    createdAt: daysAgo(8),
    updatedAt: daysAgo(8),
  },
  {
    id: "seed-rev-008",
    businessId: SEED_BUSINESS_ID,
    customerName: "Tom W.",
    customerEmail: "tom@example.com",
    rating: 2,
    rawInput: "waited 45 minutes for our table even with a reservation",
    rawInputType: "voice" as const,
    generatedReview:
      "Unfortunately, our experience at Sakura Bistro was marred by an excessive wait. Despite having a reservation, we waited 45 minutes for our table. The host was apologetic but it put a damper on the evening. The food was fine once we finally sat down, but the wait was unacceptable.",
    finalReview:
      "Unfortunately, our experience at Sakura Bistro was marred by an excessive wait. Despite having a reservation, we waited 45 minutes for our table. The host was apologetic but it put a damper on the evening. The food was fine once we finally sat down, but the wait was unacceptable.",
    platform: "google" as const,
    sentiment: "negative",
    topics: JSON.stringify(["wait time", "reservation"]),
    source: "link" as const,
    postedToPlatform: false,
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
  },
  {
    id: "seed-rev-009",
    businessId: SEED_BUSINESS_ID,
    customerName: "Nina S.",
    customerEmail: "nina@example.com",
    rating: 5,
    rawInput: "the happy hour is unbeatable, love the edamame and gyoza",
    rawInputType: "voice" as const,
    generatedReview:
      "Sakura Bistro's happy hour is seriously underrated. The prices are fantastic and the food quality doesn't dip one bit. The edamame is perfectly salted and the gyoza are crispy, juicy perfection. Pair with their yuzu highball and you've got yourself an unbeatable evening. We come here every Friday!",
    finalReview:
      "Sakura Bistro's happy hour is seriously underrated. The prices are fantastic and the food quality doesn't dip one bit. The edamame is perfectly salted and the gyoza are crispy, juicy perfection. Pair with their yuzu highball and you've got yourself an unbeatable evening. We come here every Friday!",
    platform: "facebook" as const,
    sentiment: "positive",
    topics: JSON.stringify(["happy hour", "value", "appetizers"]),
    source: "sms" as const,
    postedToPlatform: true,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(12),
  },
  {
    id: "seed-rev-010",
    businessId: SEED_BUSINESS_ID,
    customerName: "Carlos G.",
    customerEmail: null,
    rating: 5,
    rawInput: "brought my family, kids loved the teriyaki chicken, great family spot",
    rawInputType: "voice" as const,
    generatedReview:
      "Sakura Bistro is a fantastic family restaurant. We brought our two kids and they absolutely loved the teriyaki chicken; they cleaned their plates! The staff was incredibly accommodating with the kids, bringing out crayons and paper without us even asking. Great portions, great prices, and a welcoming atmosphere for families.",
    finalReview:
      "Sakura Bistro is a fantastic family restaurant. We brought our two kids and they absolutely loved the teriyaki chicken; they cleaned their plates! The staff was incredibly accommodating with the kids, bringing out crayons and paper without us even asking. Great portions, great prices, and a welcoming atmosphere for families.",
    platform: "google" as const,
    sentiment: "positive",
    topics: JSON.stringify(["family friendly", "food quality", "service"]),
    source: "qr" as const,
    postedToPlatform: true,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(14),
  },
  {
    id: "seed-rev-011",
    businessId: SEED_BUSINESS_ID,
    customerName: "Olivia H.",
    customerEmail: "olivia@example.com",
    rating: 4,
    rawInput: "great for date night, music was a bit loud though",
    rawInputType: "voice" as const,
    generatedReview:
      "Sakura Bistro is a wonderful date night spot. The dim lighting, elegant decor, and creative cocktails set the perfect mood. The sashimi platter was beautiful and delicious. My only note is that the background music was a touch loud, making conversation a bit challenging. Otherwise, a lovely evening.",
    finalReview:
      "Sakura Bistro is a wonderful date night spot. The dim lighting, elegant decor, and creative cocktails set the perfect mood. The sashimi platter was beautiful and delicious. My only note is that the background music was a touch loud, making conversation a bit challenging. Otherwise, a lovely evening.",
    platform: "google" as const,
    sentiment: "positive",
    topics: JSON.stringify(["date night", "atmosphere", "noise level"]),
    source: "link" as const,
    postedToPlatform: true,
    createdAt: daysAgo(16),
    updatedAt: daysAgo(16),
  },
  {
    id: "seed-rev-012",
    businessId: SEED_BUSINESS_ID,
    customerName: "James B.",
    customerEmail: null,
    rating: 5,
    rawInput: "private dining room was perfect for our company dinner",
    rawInputType: "text" as const,
    generatedReview:
      "We hosted our company dinner in Sakura Bistro's private dining room and it was perfection. The room comfortably seats 20, the service was excellent, and the prix fixe menu was put together beautifully. Every course was a hit with our team. The staff handled all the logistics smoothly. Highly recommend for corporate events.",
    finalReview:
      "We hosted our company dinner in Sakura Bistro's private dining room and it was perfection. The room comfortably seats 20, the service was excellent, and the prix fixe menu was put together beautifully. Every course was a hit with our team. The staff handled all the logistics smoothly. Highly recommend for corporate events.",
    platform: "google" as const,
    sentiment: "positive",
    topics: JSON.stringify(["private dining", "corporate events", "service"]),
    source: "link" as const,
    postedToPlatform: true,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
]

// ── Main ───────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding database...\n")

  // 1. Seed user — INSERT OR IGNORE to avoid duplicates
  const existingUser = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, SEED_USER_ID))
    .limit(1)

  if (existingUser.length === 0) {
    await db.insert(user).values(SEED_USER)
    console.log("  ✓ Created demo user (demo@reviewforge.local)")
  } else {
    console.log("  ○ Demo user already exists — skipping")
  }

  // 2. Seed business
  const existingBiz = await db
    .select({ id: business.id })
    .from(business)
    .where(eq(business.id, SEED_BUSINESS_ID))
    .limit(1)

  if (existingBiz.length === 0) {
    await db.insert(business).values(SEED_BUSINESS)
    console.log("  ✓ Created Sakura Bistro business")
  } else {
    console.log("  ○ Sakura Bistro already exists — skipping")
  }

  // 3. Seed reviews — insert each, skip if exists
  let inserted = 0
  let skipped = 0

  for (const rev of SEED_REVIEWS) {
    const existing = await db
      .select({ id: review.id })
      .from(review)
      .where(eq(review.id, rev.id))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(review).values(rev)
      inserted++
    } else {
      skipped++
    }
  }

  console.log(`  ✓ Reviews: ${inserted} inserted, ${skipped} skipped (already exist)`)
  console.log("\n✅ Seed complete!")
}

seed()
  .catch((err) => {
    console.error("\n❌ Seed failed:", err)
    process.exit(1)
  })
  .finally(() => {
    client.close()
  })
