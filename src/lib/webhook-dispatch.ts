import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"

type WebhookEvent =
  | "review.created"
  | "review.responded"
  | "review.negative"
  | "campaign.completed"
  | "goal.reached"
  | "team.joined"

export async function dispatchWebhook(
  businessId: string,
  event: WebhookEvent,
  payload: Record<string, unknown>
) {
  const webhooks = await db
    .select()
    .from(schema.webhook)
    .where(eq(schema.webhook.businessId, businessId))

  const activeWebhooks = webhooks.filter((w) => {
    if (!w.active) return false
    try {
      const events: string[] = JSON.parse(w.events)
      return events.includes(event)
    } catch {
      return false
    }
  })

  for (const webhook of activeWebhooks) {
    const deliveryId = crypto.randomUUID()
    const body = JSON.stringify({ event, data: payload, timestamp: new Date().toISOString() })

    try {
      // Sign the payload with HMAC
      const encoder = new TextEncoder()
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(webhook.secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      )
      const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body))
      const sigHex = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-ReviewForge-Signature": `sha256=${sigHex}`,
          "X-ReviewForge-Event": event,
          "X-ReviewForge-Delivery": deliveryId,
        },
        body,
        signal: AbortSignal.timeout(10000), // 10s timeout
      })

      await db.insert(schema.webhookDelivery).values({
        id: deliveryId,
        webhookId: webhook.id,
        event,
        payload: body,
        statusCode: response.status,
        response: (await response.text()).slice(0, 500),
        success: response.ok,
        attemptCount: 1,
        deliveredAt: new Date(),
      })

      if (response.ok) {
        await db
          .update(schema.webhook)
          .set({ lastDeliveredAt: new Date(), failureCount: 0 })
          .where(eq(schema.webhook.id, webhook.id))
      } else {
        await db
          .update(schema.webhook)
          .set({
            lastFailedAt: new Date(),
            failureCount: webhook.failureCount + 1,
            active: webhook.failureCount + 1 >= 10 ? false : webhook.active, // Auto-disable after 10 failures
          })
          .where(eq(schema.webhook.id, webhook.id))
      }
    } catch (err) {
      await db.insert(schema.webhookDelivery).values({
        id: deliveryId,
        webhookId: webhook.id,
        event,
        payload: body,
        statusCode: null,
        response: err instanceof Error ? err.message : "Unknown error",
        success: false,
        attemptCount: 1,
        deliveredAt: new Date(),
      })
    }
  }
}
