import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import * as schema from "../src/db/schema"

const client = createClient({
  url: process.env.DATABASE_URL || "file:./reviewforge.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

const db = drizzle(client, { schema })

async function seed() {
  console.log("Seeding database...")

  // Check if demo user exists
  const existingUsers = await db.select().from(schema.user).limit(1)
  if (existingUsers.length > 0) {
    console.log("Database already has data. Skipping seed.")
    return
  }

  // Create demo user (password: "password123" - hashed by better-auth during registration)
  const userId = "demo-user-001"
  const now = new Date()

  await db.insert(schema.user).values({
    id: userId,
    name: "Demo User",
    email: "demo@reviewforge.com",
    emailVerified: true,
    image: null,
    createdAt: now,
    updatedAt: now,
  })

  // Create demo business
  const businessId = "demo-biz-001"
  await db.insert(schema.business).values({
    id: businessId,
    userId,
    name: "Sakura Bistro",
    slug: "sakura-bistro",
    category: "restaurant",
    description: "Modern Japanese fusion restaurant in downtown",
    address: "123 Main Street, San Francisco, CA",
    phone: "(415) 555-0123",
    website: "https://sakurabistro.com",
    logoUrl: null,
    googlePlaceId: null,
    googleConnected: true,
    yelpConnected: false,
    facebookConnected: true,
    primaryColor: "#1a3a2a",
    autoRespond: false,
    createdAt: new Date("2025-10-01"),
    updatedAt: now,
  })

  // Seed reviews
  function daysAgo(days: number) {
    return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  }

  const reviews = [
    {
      id: "rev-001",
      businessId,
      customerName: "Sarah M.",
      customerEmail: "sarah@example.com",
      rating: 5,
      rawInput: "food was amazing and jake our waiter was super nice",
      rawInputType: "voice",
      generatedReview: "Had an absolutely wonderful dinner at Sakura Bistro last night. The food was genuinely impressive. Every dish was beautifully presented and packed with flavor. Our waiter Jake was outstanding, attentive without being intrusive, and made great recommendations. We'll definitely be coming back!",
      finalReview: "Had an absolutely wonderful dinner at Sakura Bistro last night. The food was genuinely impressive. Every dish was beautifully presented and packed with flavor. Our waiter Jake was outstanding, attentive without being intrusive, and made great recommendations. We'll definitely be coming back!",
      platform: "google",
      sentiment: "positive",
      topics: JSON.stringify(["food quality", "service", "atmosphere"]),
      source: "qr",
      postedToPlatform: true,
      createdAt: daysAgo(1),
    },
    {
      id: "rev-002",
      businessId,
      customerName: "Mike R.",
      customerEmail: "mike@example.com",
      rating: 5,
      rawInput: "best sushi in the city hands down",
      rawInputType: "voice",
      generatedReview: "Sakura Bistro serves hands down the best sushi in San Francisco. The fish is incredibly fresh, the rice is perfectly seasoned, and the presentation is art. The omakase is a must-try.",
      finalReview: "Sakura Bistro serves hands down the best sushi in San Francisco. The fish is incredibly fresh, the rice is perfectly seasoned, and the presentation is art. The omakase is a must-try.",
      platform: "google",
      sentiment: "positive",
      topics: JSON.stringify(["food quality", "sushi", "presentation"]),
      source: "link",
      postedToPlatform: true,
      createdAt: daysAgo(2),
    },
    {
      id: "rev-003",
      businessId,
      customerName: "Emily C.",
      customerEmail: null,
      rating: 4,
      rawInput: "great ambiance, cocktails were strong, food took a while",
      rawInputType: "voice",
      generatedReview: "Lovely ambiance at Sakura Bistro. The interior design is stunning and the vibe is perfect for date night. The cocktail menu is creative and the drinks are well-crafted.",
      finalReview: "Lovely ambiance at Sakura Bistro. The interior design is stunning and the vibe is perfect for date night. The cocktail menu is creative and the drinks are well-crafted.",
      platform: "yelp",
      sentiment: "positive",
      topics: JSON.stringify(["atmosphere", "cocktails", "wait time"]),
      source: "sms",
      postedToPlatform: true,
      createdAt: daysAgo(3),
    },
    {
      id: "rev-004",
      businessId,
      customerName: "David L.",
      customerEmail: "david@example.com",
      rating: 5,
      rawInput: "my wife loved the dessert and the staff remembered our anniversary",
      rawInputType: "voice",
      generatedReview: "We celebrated our anniversary at Sakura Bistro and the staff made it truly memorable. They remembered our occasion and brought out a special dessert with a congratulations note.",
      finalReview: "We celebrated our anniversary at Sakura Bistro and the staff made it truly memorable. They remembered our occasion and brought out a special dessert with a congratulations note.",
      platform: "google",
      sentiment: "positive",
      topics: JSON.stringify(["service", "dessert", "special occasion"]),
      source: "qr",
      postedToPlatform: true,
      createdAt: daysAgo(4),
    },
    {
      id: "rev-005",
      businessId,
      customerName: "Jessica P.",
      customerEmail: null,
      rating: 3,
      rawInput: "food was ok, parking was terrible",
      rawInputType: "text",
      generatedReview: "The food at Sakura Bistro was decent, nothing extraordinary but certainly acceptable. However, parking in the area is a real challenge.",
      finalReview: "The food at Sakura Bistro was decent, nothing extraordinary but certainly acceptable. However, parking in the area is a real challenge.",
      platform: "google",
      sentiment: "neutral",
      topics: JSON.stringify(["food quality", "parking"]),
      source: "link",
      postedToPlatform: false,
      createdAt: daysAgo(5),
    },
    {
      id: "rev-006",
      businessId,
      customerName: "Alex T.",
      customerEmail: "alex@example.com",
      rating: 5,
      rawInput: "ramen was incredible, broth was so rich",
      rawInputType: "voice",
      generatedReview: "The tonkotsu ramen at Sakura Bistro is in a league of its own. The broth is incredibly rich and deeply flavored.",
      finalReview: "The tonkotsu ramen at Sakura Bistro is in a league of its own. The broth is incredibly rich and deeply flavored.",
      platform: "google",
      sentiment: "positive",
      topics: JSON.stringify(["ramen", "food quality"]),
      source: "qr",
      postedToPlatform: true,
      createdAt: daysAgo(6),
    },
    {
      id: "rev-007",
      businessId,
      customerName: "Rachel K.",
      customerEmail: null,
      rating: 4,
      rawInput: "lunch specials are a great deal, wish they had more vegetarian options",
      rawInputType: "text",
      generatedReview: "Sakura Bistro's lunch specials are an excellent value, with generous portions at very reasonable prices. My only suggestion would be to expand the vegetarian options.",
      finalReview: "Sakura Bistro's lunch specials are an excellent value, with generous portions at very reasonable prices. My only suggestion would be to expand the vegetarian options.",
      platform: "yelp",
      sentiment: "positive",
      topics: JSON.stringify(["value", "vegetarian", "lunch"]),
      source: "link",
      postedToPlatform: true,
      createdAt: daysAgo(8),
    },
    {
      id: "rev-008",
      businessId,
      customerName: "Tom W.",
      customerEmail: "tom@example.com",
      rating: 2,
      rawInput: "waited 45 minutes for our table even with a reservation",
      rawInputType: "voice",
      generatedReview: "Unfortunately, our experience at Sakura Bistro was marred by an excessive wait. Despite having a reservation, we waited 45 minutes for our table.",
      finalReview: "Unfortunately, our experience at Sakura Bistro was marred by an excessive wait. Despite having a reservation, we waited 45 minutes for our table.",
      platform: "google",
      sentiment: "negative",
      topics: JSON.stringify(["wait time", "reservation"]),
      source: "link",
      postedToPlatform: false,
      createdAt: daysAgo(10),
    },
    {
      id: "rev-009",
      businessId,
      customerName: "Nina S.",
      customerEmail: "nina@example.com",
      rating: 5,
      rawInput: "the happy hour is unbeatable, love the edamame and gyoza",
      rawInputType: "voice",
      generatedReview: "Sakura Bistro's happy hour is seriously underrated. The prices are fantastic and the food quality doesn't dip one bit.",
      finalReview: "Sakura Bistro's happy hour is seriously underrated. The prices are fantastic and the food quality doesn't dip one bit.",
      platform: "facebook",
      sentiment: "positive",
      topics: JSON.stringify(["happy hour", "value", "appetizers"]),
      source: "sms",
      postedToPlatform: true,
      createdAt: daysAgo(12),
    },
    {
      id: "rev-010",
      businessId,
      customerName: "Carlos G.",
      customerEmail: null,
      rating: 5,
      rawInput: "brought my family, kids loved the teriyaki chicken, great family spot",
      rawInputType: "voice",
      generatedReview: "Sakura Bistro is a fantastic family restaurant. We brought our two kids and they absolutely loved the teriyaki chicken.",
      finalReview: "Sakura Bistro is a fantastic family restaurant. We brought our two kids and they absolutely loved the teriyaki chicken.",
      platform: "google",
      sentiment: "positive",
      topics: JSON.stringify(["family friendly", "food quality", "service"]),
      source: "qr",
      postedToPlatform: true,
      createdAt: daysAgo(14),
    },
    {
      id: "rev-011",
      businessId,
      customerName: "Olivia H.",
      customerEmail: "olivia@example.com",
      rating: 4,
      rawInput: "great for date night, music was a bit loud though",
      rawInputType: "voice",
      generatedReview: "Sakura Bistro is a wonderful date night spot. The dim lighting, elegant decor, and creative cocktails set the perfect mood.",
      finalReview: "Sakura Bistro is a wonderful date night spot. The dim lighting, elegant decor, and creative cocktails set the perfect mood.",
      platform: "google",
      sentiment: "positive",
      topics: JSON.stringify(["date night", "atmosphere", "noise level"]),
      source: "link",
      postedToPlatform: true,
      createdAt: daysAgo(16),
    },
    {
      id: "rev-012",
      businessId,
      customerName: "James B.",
      customerEmail: null,
      rating: 5,
      rawInput: "private dining room was perfect for our company dinner",
      rawInputType: "text",
      generatedReview: "We hosted our company dinner in Sakura Bistro's private dining room and it was perfection.",
      finalReview: "We hosted our company dinner in Sakura Bistro's private dining room and it was perfection.",
      platform: "google",
      sentiment: "positive",
      topics: JSON.stringify(["private dining", "corporate events", "service"]),
      source: "link",
      postedToPlatform: true,
      createdAt: daysAgo(20),
    },
  ]

  for (const review of reviews) {
    await db.insert(schema.review).values(review)
  }

  console.log(`Seeded: 1 user, 1 business, ${reviews.length} reviews`)
  console.log("Done!")
}

seed().catch(console.error)
