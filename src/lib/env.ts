import { z } from "zod"

const serverSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required"),
  TURSO_AUTH_TOKEN: z
    .string()
    .optional(),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters. Generate one: openssl rand -base64 32")
    .refine(
      (val) => val !== "your-secret-here-change-in-production",
      "BETTER_AUTH_SECRET is still the placeholder value. Generate a real secret: openssl rand -base64 32"
    ),
  BETTER_AUTH_URL: z
    .string()
    .url("BETTER_AUTH_URL must be a valid URL"),
}).refine(
  (data) => {
    // If DATABASE_URL is a Turso remote URL, TURSO_AUTH_TOKEN is required
    if (data.DATABASE_URL.startsWith("libsql://") && !data.TURSO_AUTH_TOKEN) {
      return false
    }
    return true
  },
  { message: "TURSO_AUTH_TOKEN is required when DATABASE_URL is a Turso remote URL (libsql://)" }
)

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL must be a valid URL"),
})

export type ServerEnv = z.infer<typeof serverSchema>
export type ClientEnv = z.infer<typeof clientSchema>

function validateEnv<T>(schema: z.ZodSchema<T>, data: Record<string, unknown>, label: string): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n")
    throw new Error(
      `\n\nEnvironment validation failed (${label}):\n${errors}\n\nCheck your .env file against .env.example\n`
    )
  }
  return result.data
}

let _serverEnv: ServerEnv | null = null
let _clientEnv: ClientEnv | null = null

export function getServerEnv(): ServerEnv {
  if (_serverEnv) return _serverEnv
  _serverEnv = validateEnv(serverSchema, process.env, "server")
  return _serverEnv
}

export function getClientEnv(): ClientEnv {
  if (_clientEnv) return _clientEnv
  _clientEnv = validateEnv(
    clientSchema,
    {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    "client"
  )
  return _clientEnv
}
