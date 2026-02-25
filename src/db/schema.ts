import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core"

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

export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_user_id_idx").on(table.userId)]
)

export const account = sqliteTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [index("account_user_id_idx").on(table.userId)]
)

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
})

// ============ BUSINESS TABLES ============

export const business = sqliteTable(
  "business",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
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
    primaryColor: text("primary_color").notNull().default("#1a3a2a"),
    autoRespond: integer("auto_respond", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [index("business_user_id_idx").on(table.userId)]
)

// ============ REVIEW TABLES ============

export const review = sqliteTable(
  "review",
  {
    id: text("id").primaryKey(),
    businessId: text("business_id")
      .notNull()
      .references(() => business.id, { onDelete: "cascade" }),
    customerName: text("customer_name"),
    customerEmail: text("customer_email"),
    rating: integer("rating").notNull(), // 1-5, validated at application layer
    rawInput: text("raw_input"),
    rawInputType: text("raw_input_type").notNull().default("text"), // "text" | "voice"
    generatedReview: text("generated_review"),
    finalReview: text("final_review"),
    platform: text("platform").notNull().default("google"), // google | yelp | facebook | tripadvisor
    postedToPlatform: integer("posted_to_platform", { mode: "boolean" }).notNull().default(false),
    sentiment: text("sentiment"), // positive | neutral | negative
    topics: text("topics"), // JSON array of detected topics
    source: text("source").notNull().default("link"), // link | qr | sms | email
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [
    index("review_business_id_idx").on(table.businessId),
    index("review_rating_idx").on(table.rating),
    index("review_created_at_idx").on(table.createdAt),
  ]
)

// ============ RESPONSE TABLES ============

export const reviewResponse = sqliteTable(
  "review_response",
  {
    id: text("id").primaryKey(),
    reviewId: text("review_id")
      .notNull()
      .references(() => review.id, { onDelete: "cascade" }),
    businessId: text("business_id")
      .notNull()
      .references(() => business.id, { onDelete: "cascade" }),
    generatedResponse: text("generated_response"),
    finalResponse: text("final_response"),
    status: text("status").notNull().default("draft"), // draft | approved | posted
    postedAt: integer("posted_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [
    index("review_response_review_id_idx").on(table.reviewId),
    index("review_response_business_id_idx").on(table.businessId),
  ]
)

// ============ CAMPAIGN / OUTREACH TABLES ============

export const reviewRequest = sqliteTable(
  "review_request",
  {
    id: text("id").primaryKey(),
    businessId: text("business_id")
      .notNull()
      .references(() => business.id, { onDelete: "cascade" }),
    customerName: text("customer_name"),
    customerEmail: text("customer_email"),
    customerPhone: text("customer_phone"),
    method: text("method").notNull().default("sms"), // sms | email
    status: text("status").notNull().default("pending"), // pending | sent | completed | expired
    sentAt: integer("sent_at", { mode: "timestamp" }),
    completedAt: integer("completed_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [index("review_request_business_id_idx").on(table.businessId)]
)

// Type exports (select)
export type User = typeof user.$inferSelect
export type Business = typeof business.$inferSelect
export type Review = typeof review.$inferSelect
export type ReviewResponse = typeof reviewResponse.$inferSelect
export type ReviewRequest = typeof reviewRequest.$inferSelect

// Type exports (insert)
export type NewBusiness = typeof business.$inferInsert
export type NewReview = typeof review.$inferInsert
export type NewReviewResponse = typeof reviewResponse.$inferInsert
export type NewReviewRequest = typeof reviewRequest.$inferInsert
