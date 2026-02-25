import { z } from "zod"

// ============ SHARED CONSTANTS ============

export const VALID_CATEGORIES = [
  "restaurant", "hotel", "medical", "home_services", "auto_repair",
  "salon_spa", "dental", "legal", "ecommerce", "fitness",
  "education", "professional_services", "other",
] as const

export const VALID_PLATFORMS = ["google", "yelp", "facebook", "tripadvisor", "private"] as const
export const VALID_INPUT_TYPES = ["text", "voice"] as const
export const VALID_SOURCES = ["link", "qr", "sms", "email"] as const
export const VALID_CAMPAIGN_METHODS = ["sms", "email"] as const
export const VALID_RESPOND_ACTIONS = ["regenerate", "approve", "edit"] as const

export const MAX_TEXT = 5000
export const MAX_NAME = 100
export const MAX_EMAIL = 255
export const MAX_BIZ_NAME = 200
export const MAX_DESCRIPTION = 1000
export const MAX_ADDRESS = 500
export const MAX_PHONE = 30
export const MAX_WEBSITE = 500

// ============ REUSABLE PRIMITIVES ============

/** UUID or cuid-style ID */
const id = z.string().min(1).max(128)

/** Email regex — RFC 5322-ish, rejects obvious junk */
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** Trimmed, capped email with proper format validation. Empty string → undefined (no email). */
const email = z
  .string()
  .trim()
  .max(MAX_EMAIL)
  .transform((val) => (val === "" ? undefined : val))
  .pipe(
    z.string().refine((val) => EMAIL_RE.test(val), { message: "Invalid email format" }).optional()
  )

/** Safe website URL — must be http(s) */
const websiteUrl = z
  .string()
  .trim()
  .max(MAX_WEBSITE)
  .refine(
    (val) => {
      if (!val) return true // empty is OK (nullable)
      try {
        const url = new URL(val)
        return url.protocol === "http:" || url.protocol === "https:"
      } catch {
        return false
      }
    },
    { message: "Website must be a valid HTTP or HTTPS URL" }
  )

/** Hex color code */
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color (#RRGGBB)")

// ============ BUSINESSES ============

export const createBusinessSchema = z.object({
  name: z.string().trim().min(1, "Business name is required").max(MAX_BIZ_NAME),
  category: z.enum(VALID_CATEGORIES).optional().default("restaurant"),
})

export const updateBusinessSchema = z.object({
  id: id,
  name: z.string().trim().min(1).max(MAX_BIZ_NAME).optional(),
  category: z.enum(VALID_CATEGORIES).optional(),
  description: z.string().trim().max(MAX_DESCRIPTION).optional().nullable(),
  address: z.string().trim().max(MAX_ADDRESS).optional().nullable(),
  phone: z.string().trim().max(MAX_PHONE).optional().nullable(),
  website: websiteUrl.optional().nullable(),
  primaryColor: hexColor.optional(),
  autoRespond: z.boolean().optional(),
})

// ============ REVIEWS ============

export const createReviewSchema = z.object({
  businessId: id,
  rating: z.coerce.number().int().min(1).max(5),
  rawInput: z.string().trim().max(MAX_TEXT).optional().default(""),
  rawInputType: z.enum(VALID_INPUT_TYPES).optional().default("text"),
  customerName: z.string().trim().max(MAX_NAME).optional().nullable(),
  customerEmail: email.optional().nullable(),
  platform: z.enum(VALID_PLATFORMS).optional().default("google"),
  platforms: z.array(z.enum(VALID_PLATFORMS)).optional().default([]),
  finalReview: z.string().trim().max(MAX_TEXT).optional().nullable(),
  source: z.enum(VALID_SOURCES).optional().default("link"),
})

export const listReviewsSchema = z.object({
  businessId: id,
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(50),
})

// ============ RESPOND TO REVIEW ============

export const respondToReviewSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("regenerate"),
  }),
  z.object({
    action: z.literal("approve"),
  }),
  z.object({
    action: z.literal("edit"),
    editedResponse: z.string().trim().min(1, "editedResponse is required").max(MAX_TEXT),
  }),
])

// ============ AI ENDPOINTS ============

export const generateReviewSchema = z.object({
  rawInput: z.string().trim().min(1, "rawInput is required").max(MAX_TEXT),
  rating: z.coerce.number().int().min(1).max(5),
  businessName: z.string().trim().min(1, "businessName is required").max(MAX_BIZ_NAME),
  businessCategory: z.string().trim().max(100).optional(),
})

export const generateResponseSchema = z.object({
  review: z.string().trim().min(1, "review is required").max(MAX_TEXT),
  rating: z.coerce.number().int().min(1).max(5),
  businessName: z.string().trim().min(1, "businessName is required").max(MAX_BIZ_NAME),
  customerName: z.string().trim().max(MAX_NAME).optional(),
  businessCategory: z.string().trim().max(100).optional(),
})

// ============ CAMPAIGNS ============

const campaignCustomer = z.object({
  name: z.string().trim().max(MAX_NAME).optional().nullable(),
  email: email.optional().nullable(),
  phone: z.string().trim().max(MAX_PHONE).optional().nullable(),
  method: z.enum(VALID_CAMPAIGN_METHODS).optional().default("email"),
}).refine(
  (c) => (c.name && c.name.length > 0) || (c.email && c.email.length > 0),
  { message: "Each customer must have at least a name or email" }
)

export const createCampaignSchema = z.object({
  businessId: id,
  customers: z.array(campaignCustomer).min(1, "At least one customer required").max(50, "Maximum 50 customers per batch"),
})

export const listCampaignsSchema = z.object({
  businessId: id,
})

// ============ INSIGHTS ============

export const insightsQuerySchema = z.object({
  businessId: id,
})

// ============ HELPER: Parse + format errors ============

/**
 * Parses request body with a Zod schema.
 * Returns { data } on success or { error: NextResponse } on failure.
 */
export function parseBody<T>(schema: z.ZodSchema<T>, body: unknown):
  | { data: T; error?: never }
  | { data?: never; error: { message: string; issues?: z.ZodIssue[] } } {
  const result = schema.safeParse(body)
  if (result.success) {
    return { data: result.data }
  }
  const firstIssue = result.error.issues[0]
  const message = firstIssue
    ? `${firstIssue.path.join(".")}: ${firstIssue.message}`.replace(/^: /, "")
    : "Validation failed"
  return { error: { message, issues: result.error.issues } }
}

/**
 * Parses query params (from URLSearchParams) with a Zod schema.
 */
export function parseQuery<T>(schema: z.ZodSchema<T>, params: URLSearchParams):
  | { data: T; error?: never }
  | { data?: never; error: { message: string } } {
  const obj: Record<string, string> = {}
  params.forEach((value, key) => {
    obj[key] = value
  })
  return parseBody(schema, obj)
}
