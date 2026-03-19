function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  get DATABASE_URL() {
    return process.env.DATABASE_URL || "file:./reviewforge.db"
  },
  get BETTER_AUTH_SECRET() {
    return requireEnv("BETTER_AUTH_SECRET")
  },
  get BETTER_AUTH_URL() {
    return requireEnv("BETTER_AUTH_URL")
  },
  get NEXT_PUBLIC_APP_URL() {
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  },
  get NODE_ENV() {
    return process.env.NODE_ENV || "development"
  },
  get isProduction() {
    return this.NODE_ENV === "production"
  },
}
