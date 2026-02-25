import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import * as schema from "./schema"

function createDatabase() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error("DATABASE_URL is not set. Check your .env file.")
  }

  // Turso remote DBs require an auth token; local file:// DBs don't
  const authToken = process.env.TURSO_AUTH_TOKEN
  const client = createClient({ url, authToken })
  return drizzle(client, { schema })
}

// Singleton pattern: prevent connection leaks during Next.js hot reload in dev
const globalForDb = globalThis as unknown as { db: ReturnType<typeof createDatabase> | undefined }

export const db = globalForDb.db ?? createDatabase()

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db
}
