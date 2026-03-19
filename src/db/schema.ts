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
  primaryColor: text("primary_color").notNull().default("#1a3a2a"),
  autoRespond: integer("auto_respond", { mode: "boolean" }).notNull().default(false),
  // Business hours (JSON: { mon: { open: "09:00", close: "17:00", closed: false }, ... })
  businessHours: text("business_hours"),
  // AI response settings
  responseTone: text("response_tone").notNull().default("professional"), // professional | friendly | casual
  responseLength: text("response_length").notNull().default("medium"), // short | medium | detailed
  customTemplatePositive: text("custom_template_positive"),
  customTemplateNeutral: text("custom_template_neutral"),
  customTemplateNegative: text("custom_template_negative"),
  // Subscription
  plan: text("plan").notNull().default("starter"), // starter | growth | enterprise
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  planExpiresAt: integer("plan_expires_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})

// ============ TEAM MEMBERS ============

export const teamMember = sqliteTable("team_member", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  userId: text("user_id").references(() => user.id), // null if invited but not registered
  email: text("email").notNull(),
  name: text("name"),
  role: text("role").notNull().default("member"), // owner | admin | manager | member
  status: text("status").notNull().default("pending"), // pending | active | deactivated
  inviteToken: text("invite_token"),
  invitedAt: integer("invited_at", { mode: "timestamp" }),
  joinedAt: integer("joined_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ REVIEW TABLES ============

export const review = sqliteTable("review", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  rating: integer("rating").notNull(), // 1-5
  rawInput: text("raw_input"),
  rawInputType: text("raw_input_type").notNull().default("text"), // text | voice
  generatedReview: text("generated_review"),
  finalReview: text("final_review"),
  platform: text("platform").notNull().default("google"), // google | yelp | facebook | tripadvisor
  postedToPlatform: integer("posted_to_platform", { mode: "boolean" }).notNull().default(false),
  sentiment: text("sentiment"), // positive | neutral | negative
  sentimentScore: real("sentiment_score"), // -1.0 to 1.0
  topics: text("topics"), // JSON array
  source: text("source").notNull().default("link"), // link | qr | sms | email | widget | api
  // Staff attribution
  staffMention: text("staff_mention"), // Detected staff member name
  // Campaign tracking
  campaignId: text("campaign_id"),
  requestId: text("request_id"),
  // Response tracking
  respondedAt: integer("responded_at", { mode: "timestamp" }),
  responseTime: integer("response_time"), // seconds to respond
  // Customer recovery
  isPrivateFeedback: integer("is_private_feedback", { mode: "boolean" }).notNull().default(false),
  recoveryStatus: text("recovery_status"), // null | contacted | returned | updated
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
  generatedResponse: text("generated_response"),
  finalResponse: text("final_response"),
  status: text("status").notNull().default("draft"), // draft | approved | posted
  respondedBy: text("responded_by"), // user ID of who approved
  postedAt: integer("posted_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ CAMPAIGN / OUTREACH TABLES ============

export const campaign = sqliteTable("campaign", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  name: text("name").notNull(),
  type: text("type").notNull().default("sms"), // sms | email | qr
  status: text("status").notNull().default("active"), // draft | active | paused | completed
  // Content
  messageTemplate: text("message_template"),
  subject: text("subject"), // for email campaigns
  // Scheduling
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  // Targeting
  targetCount: integer("target_count").notNull().default(0),
  // Stats (denormalized for performance)
  sentCount: integer("sent_count").notNull().default(0),
  openedCount: integer("opened_count").notNull().default(0),
  clickedCount: integer("clicked_count").notNull().default(0),
  convertedCount: integer("converted_count").notNull().default(0),
  // A/B testing
  variantName: text("variant_name"), // null = not an A/B test, "A" or "B" for variants
  parentCampaignId: text("parent_campaign_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})

export const reviewRequest = sqliteTable("review_request", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  campaignId: text("campaign_id").references(() => campaign.id),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  method: text("method").notNull().default("sms"), // sms | email
  status: text("status").notNull().default("pending"), // pending | sent | delivered | opened | clicked | completed | expired | bounced
  // Tracking
  trackingId: text("tracking_id"), // unique token for click tracking
  openedAt: integer("opened_at", { mode: "timestamp" }),
  clickedAt: integer("clicked_at", { mode: "timestamp" }),
  sentAt: integer("sent_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ WEBHOOK SYSTEM ============

export const webhook = sqliteTable("webhook", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  url: text("url").notNull(),
  secret: text("secret").notNull(), // HMAC signing secret
  events: text("events").notNull(), // JSON array: ["review.created", "review.responded", etc.]
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  failureCount: integer("failure_count").notNull().default(0),
  lastDeliveredAt: integer("last_delivered_at", { mode: "timestamp" }),
  lastFailedAt: integer("last_failed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

export const webhookDelivery = sqliteTable("webhook_delivery", {
  id: text("id").primaryKey(),
  webhookId: text("webhook_id")
    .notNull()
    .references(() => webhook.id),
  event: text("event").notNull(),
  payload: text("payload").notNull(), // JSON
  statusCode: integer("status_code"),
  response: text("response"),
  success: integer("success", { mode: "boolean" }).notNull().default(false),
  attemptCount: integer("attempt_count").notNull().default(1),
  deliveredAt: integer("delivered_at", { mode: "timestamp" }).notNull(),
})

// ============ API KEYS ============

export const apiKey = sqliteTable("api_key", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  name: text("name").notNull(),
  keyHash: text("key_hash").notNull(), // SHA-256 hash of the key
  keyPrefix: text("key_prefix").notNull(), // First 8 chars for identification (e.g., "rf_live_")
  permissions: text("permissions").notNull().default("read"), // read | write | admin
  lastUsedAt: integer("last_used_at", { mode: "timestamp" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  rateLimit: integer("rate_limit").notNull().default(1000), // requests per day
  requestCount: integer("request_count").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ NOTIFICATIONS ============

export const notification = sqliteTable("notification", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  userId: text("user_id").references(() => user.id),
  type: text("type").notNull(), // review_new | review_negative | response_needed | campaign_complete | goal_reached | crisis_alert
  title: text("title").notNull(),
  message: text("message").notNull(),
  data: text("data"), // JSON with extra context (reviewId, etc.)
  read: integer("read", { mode: "boolean" }).notNull().default(false),
  channel: text("channel").notNull().default("in_app"), // in_app | email | sms
  sentAt: integer("sent_at", { mode: "timestamp" }),
  readAt: integer("read_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ COMPETITOR TRACKING ============

export const competitor = sqliteTable("competitor", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  name: text("name").notNull(),
  googlePlaceId: text("google_place_id"),
  yelpId: text("yelp_id"),
  // Latest known metrics
  rating: real("rating"),
  reviewCount: integer("review_count"),
  responseRate: real("response_rate"), // 0-100
  lastCheckedAt: integer("last_checked_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

export const competitorSnapshot = sqliteTable("competitor_snapshot", {
  id: text("id").primaryKey(),
  competitorId: text("competitor_id")
    .notNull()
    .references(() => competitor.id),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  responseRate: real("response_rate"),
  capturedAt: integer("captured_at", { mode: "timestamp" }).notNull(),
})

// ============ GOALS & ACHIEVEMENTS ============

export const goal = sqliteTable("goal", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  type: text("type").notNull(), // reviews_count | avg_rating | response_rate | review_streak
  target: real("target").notNull(), // Target value
  current: real("current").notNull().default(0),
  period: text("period").notNull().default("monthly"), // weekly | monthly | quarterly
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

export const achievement = sqliteTable("achievement", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  type: text("type").notNull(), // first_review | 100_reviews | 500_reviews | perfect_month | streak_30 | rating_48
  unlockedAt: integer("unlocked_at", { mode: "timestamp" }).notNull(),
})

// ============ ACTIVITY LOG / AUDIT TRAIL ============

export const activityLog = sqliteTable("activity_log", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  userId: text("user_id"),
  action: text("action").notNull(), // review.created | response.posted | campaign.sent | team.invited | settings.updated
  entityType: text("entity_type"), // review | campaign | team_member | business | webhook
  entityId: text("entity_id"),
  details: text("details"), // JSON with action-specific data
  ipAddress: text("ip_address"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// ============ WIDGET CONFIGURATION ============

export const widgetConfig = sqliteTable("widget_config", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  type: text("type").notNull().default("badge"), // badge | carousel | grid | floating
  theme: text("theme").notNull().default("light"), // light | dark
  accentColor: text("accent_color").notNull().default("#2d6a4f"),
  showRating: integer("show_rating", { mode: "boolean" }).notNull().default(true),
  showCount: integer("show_count", { mode: "boolean" }).notNull().default(true),
  maxReviews: integer("max_reviews").notNull().default(5),
  minRating: integer("min_rating").notNull().default(4),
  autoPlay: integer("auto_play", { mode: "boolean" }).notNull().default(true),
  position: text("position").notNull().default("bottom-right"), // for floating widget
  embedCode: text("embed_code"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})

// ============ RESPONSE TEMPLATES ============

export const responseTemplate = sqliteTable("response_template", {
  id: text("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => business.id),
  name: text("name").notNull(),
  category: text("category").notNull().default("general"), // positive | neutral | negative | recovery | general
  content: text("content").notNull(),
  variables: text("variables"), // JSON array of placeholder names: ["customerName", "businessName"]
  usageCount: integer("usage_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})

// Type exports
export type User = typeof user.$inferSelect
export type Business = typeof business.$inferSelect
export type Review = typeof review.$inferSelect
export type ReviewResponse = typeof reviewResponse.$inferSelect
export type ReviewRequest = typeof reviewRequest.$inferSelect
export type Campaign = typeof campaign.$inferSelect
export type TeamMember = typeof teamMember.$inferSelect
export type Webhook = typeof webhook.$inferSelect
export type ApiKey = typeof apiKey.$inferSelect
export type Notification = typeof notification.$inferSelect
export type Competitor = typeof competitor.$inferSelect
export type Goal = typeof goal.$inferSelect
export type Achievement = typeof achievement.$inferSelect
export type ActivityLog = typeof activityLog.$inferSelect
export type WidgetConfig = typeof widgetConfig.$inferSelect
export type ResponseTemplate = typeof responseTemplate.$inferSelect
