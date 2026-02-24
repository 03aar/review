import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"

// ============ AUTH TABLES (better-auth) ============

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
})

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
})

// ============ BUSINESS TABLES ============

export const business = sqliteTable("business", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  category: text("category").notNull().default("restaurant"),
  address: text("address"),
  phone: text("phone"),
  website: text("website"),
  logoUrl: text("logo_url"),
  googlePlaceId: text("google_place_id"),
  googleConnected: integer("google_connected", { mode: "boolean" }).notNull().default(false),
  yelpConnected: integer("yelp_connected", { mode: "boolean" }).notNull().default(false),
  facebookConnected: integer("facebook_connected", { mode: "boolean" }).notNull().default(false),
  primaryColor: text("primary_color").notNull().default("#2563eb"),
  autoRespond: integer("auto_respond", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})

// ============ REVIEW TABLES ============

export const review = sqliteTable("review", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  rating: integer("rating").notNull(), // 1-5
  rawInput: text("raw_input"), // What the customer actually said/typed
  rawInputType: text("raw_input_type").notNull().default("text"), // "text" | "voice"
  generatedReview: text("generated_review"), // AI-polished version
  finalReview: text("final_review"), // What was actually posted (after customer edits)
  platform: text("platform").notNull().default("google"), // google | yelp | facebook | tripadvisor
  postedToPlatform: integer("posted_to_platform", { mode: "boolean" }).notNull().default(false),
  sentiment: text("sentiment"), // positive | neutral | negative
  topics: text("topics"), // JSON array of detected topics
  source: text("source").notNull().default("link"), // link | qr | sms | email
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ RESPONSE TABLES ============

export const reviewResponse = sqliteTable("review_response", {
  id: text("id").primaryKey(),
  reviewId: text("review_id")
    .notNull()
    .references(() => review.id),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  generatedResponse: text("generated_response"), // AI draft
  finalResponse: text("final_response"), // What was posted (after owner edits)
  status: text("status").notNull().default("draft"), // draft | approved | posted
  postedAt: integer("posted_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ CAMPAIGN / OUTREACH TABLES ============

export const reviewRequest = sqliteTable("review_request", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  method: text("method").notNull().default("sms"), // sms | email
  status: text("status").notNull().default("pending"), // pending | sent | completed | expired
  sentAt: integer("sent_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// Type exports
export type User = typeof user.$inferSelect
export type Business = typeof business.$inferSelect
export type Review = typeof review.$inferSelect
export type ReviewResponse = typeof reviewResponse.$inferSelect
export type ReviewRequest = typeof reviewRequest.$inferSelect
