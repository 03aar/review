"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Key,
  Copy,
  RefreshCw,
  Webhook,
  ChevronDown,
  ChevronRight,
  Send,
  CheckCircle2,
  XCircle,
  Code2,
  Package,
  ExternalLink,
  Download,
  Activity,
  Clock,
  AlertTriangle,
  Terminal,
  BookOpen,
} from "lucide-react"
import { toast } from "sonner"

const WEBHOOK_EVENTS = [
  { key: "review.received", label: "Review Received", description: "Fired when a new review is submitted" },
  { key: "review.responded", label: "Review Responded", description: "Fired when a response is posted to a review" },
  { key: "review_request.sent", label: "Review Request Sent", description: "Fired when a review request campaign message is sent" },
  { key: "review_request.converted", label: "Review Request Converted", description: "Fired when a review request leads to a submitted review" },
  { key: "rating.changed", label: "Rating Changed", description: "Fired when your average rating changes" },
  { key: "competitor.alert", label: "Competitor Alert", description: "Fired when a competitor receives notable review activity" },
  { key: "crisis.detected", label: "Crisis Detected", description: "Fired when a sudden spike in negative reviews is detected" },
]

const DELIVERY_LOG = [
  { id: "del-1", timestamp: "2026-02-25 14:32:10", event: "review.received", status: 200, statusText: "OK", retries: 0 },
  { id: "del-2", timestamp: "2026-02-25 14:28:45", event: "review.responded", status: 200, statusText: "OK", retries: 0 },
  { id: "del-3", timestamp: "2026-02-25 13:55:02", event: "review_request.sent", status: 500, statusText: "Internal Server Error", retries: 3 },
  { id: "del-4", timestamp: "2026-02-25 12:10:33", event: "rating.changed", status: 200, statusText: "OK", retries: 0 },
  { id: "del-5", timestamp: "2026-02-25 11:48:19", event: "crisis.detected", status: 200, statusText: "OK", retries: 0 },
  { id: "del-6", timestamp: "2026-02-25 10:22:07", event: "review.received", status: 500, statusText: "Internal Server Error", retries: 2 },
]

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/reviews",
    description: "List all reviews with optional filters for date, rating, platform, and response status.",
    exampleRequest: `curl -X GET "https://api.reviewforge.com/api/v1/reviews?rating=5&limit=10" \\
  -H "Authorization: Bearer rf_live_****3k7f" \\
  -H "Content-Type: application/json"`,
    exampleResponse: `{
  "data": [
    {
      "id": "rev_8xk2m",
      "platform": "google",
      "rating": 5,
      "text": "Absolutely fantastic service!",
      "author": "Jane D.",
      "created_at": "2026-02-24T18:30:00Z",
      "responded": true
    }
  ],
  "meta": { "total": 142, "page": 1, "per_page": 10 }
}`,
  },
  {
    method: "POST",
    path: "/api/v1/reviews/{id}/respond",
    description: "Generate and post an AI-powered response to a specific review.",
    exampleRequest: `curl -X POST "https://api.reviewforge.com/api/v1/reviews/rev_8xk2m/respond" \\
  -H "Authorization: Bearer rf_live_****3k7f" \\
  -H "Content-Type: application/json" \\
  -d '{ "tone": "friendly", "auto_publish": false }'`,
    exampleResponse: `{
  "id": "resp_3fn9a",
  "review_id": "rev_8xk2m",
  "text": "Thank you so much for the kind words, Jane! ...",
  "status": "draft",
  "created_at": "2026-02-25T09:15:00Z"
}`,
  },
  {
    method: "GET",
    path: "/api/v1/locations",
    description: "List all business locations associated with your account.",
    exampleRequest: `curl -X GET "https://api.reviewforge.com/api/v1/locations" \\
  -H "Authorization: Bearer rf_live_****3k7f"`,
    exampleResponse: `{
  "data": [
    {
      "id": "loc_01",
      "name": "Downtown",
      "address": "123 Main St",
      "avg_rating": 4.7,
      "review_count": 89
    }
  ],
  "meta": { "total": 3 }
}`,
  },
  {
    method: "POST",
    path: "/api/v1/campaigns",
    description: "Create a new review request campaign targeting a list of customers.",
    exampleRequest: `curl -X POST "https://api.reviewforge.com/api/v1/campaigns" \\
  -H "Authorization: Bearer rf_live_****3k7f" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "February Follow-Up",
    "channel": "sms",
    "recipients": ["+15551234567"],
    "template_id": "tmpl_default"
  }'`,
    exampleResponse: `{
  "id": "camp_v82x",
  "name": "February Follow-Up",
  "status": "scheduled",
  "recipients_count": 1,
  "created_at": "2026-02-25T10:00:00Z"
}`,
  },
  {
    method: "GET",
    path: "/api/v1/analytics",
    description: "Query aggregated analytics data for reviews, ratings, and response metrics.",
    exampleRequest: `curl -X GET "https://api.reviewforge.com/api/v1/analytics?period=30d" \\
  -H "Authorization: Bearer rf_live_****3k7f"`,
    exampleResponse: `{
  "period": "30d",
  "total_reviews": 47,
  "avg_rating": 4.6,
  "response_rate": 0.94,
  "sentiment_score": 0.82,
  "nps": 72
}`,
  },
]

export default function DevelopersPage() {
  const { business } = useBusinessContext()
  const [webhookEndpoint, setWebhookEndpoint] = useState("https://example.com/webhooks/reviewforge")
  const [enabledEvents, setEnabledEvents] = useState<Record<string, boolean>>({
    "review.received": true,
    "review.responded": true,
    "review_request.sent": false,
    "review_request.converted": false,
    "rating.changed": true,
    "competitor.alert": false,
    "crisis.detected": true,
  })
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null)

  function handleCopyApiKey() {
    navigator.clipboard.writeText("rf_live_****************************3k7f")
    toast.success("API key copied to clipboard")
  }

  function handleRegenerateKey() {
    toast("API key regenerated. Update your integrations with the new key.", {
      icon: <RefreshCw className="h-4 w-4 text-[#2d6a4f]" />,
    })
  }

  function toggleEvent(eventKey: string) {
    setEnabledEvents((prev) => ({
      ...prev,
      [eventKey]: !prev[eventKey],
    }))
    const newState = !enabledEvents[eventKey]
    toast.success(`${eventKey} ${newState ? "enabled" : "disabled"}`)
  }

  function handleTestWebhook() {
    toast.success("Test payload sent!")
  }

  function toggleEndpointExpand(path: string) {
    setExpandedEndpoint((prev) => (prev === path ? null : path))
  }

  const usagePercent = Math.round((234 / 1000) * 100)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Developer API & Webhooks</h1>
        <p className="text-[#5a6b5a]">
          Integrate ReviewForge with your stack -- {business.name}
        </p>
      </div>

      {/* API Keys */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Key className="h-4 w-4" />
            API Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 w-full bg-[#eef8e6] border border-[#b8dca8] rounded-lg px-4 py-2.5 font-mono text-sm text-[#1a3a2a] truncate">
              rf_live_****************************3k7f
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-[#b8dca8]"
                onClick={handleCopyApiKey}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-[#b8dca8] text-amber-700 hover:text-amber-800"
                onClick={handleRegenerateKey}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[#5a6b5a]">Created</p>
              <p className="font-medium text-[#1a3a2a]">Jan 15, 2026</p>
            </div>
            <div>
              <p className="text-[#5a6b5a]">Last used</p>
              <p className="font-medium text-[#1a3a2a]">Feb 25, 2026 -- 2 min ago</p>
            </div>
            <div>
              <p className="text-[#5a6b5a]">Rate limit</p>
              <p className="font-medium text-[#1a3a2a]">1,000 requests/hour (Growth plan)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Usage */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Activity className="h-4 w-4" />
            API Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a]">Requests today</p>
              <p className="text-xl font-bold text-[#1a3a2a]">234</p>
            </div>
            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a]">Requests this month</p>
              <p className="text-xl font-bold text-[#1a3a2a]">5,678</p>
            </div>
            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a]">Error rate</p>
              <p className="text-xl font-bold text-[#1a3a2a]">0.3%</p>
            </div>
            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a]">Avg latency</p>
              <p className="text-xl font-bold text-[#1a3a2a]">128ms</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#5a6b5a]">Hourly rate limit usage</span>
              <span className="font-medium text-[#1a3a2a]">234 / 1,000</span>
            </div>
            <div className="w-full h-3 bg-[#eef8e6] rounded-full border border-[#b8dca8] overflow-hidden">
              <div
                className="h-full bg-[#2d6a4f] rounded-full transition-all duration-500"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="text-xs text-[#5a6b5a] mt-1">{usagePercent}% of hourly limit consumed</p>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Subscriptions */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Webhook className="h-4 w-4" />
            Webhook Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Endpoint URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1a3a2a]">Endpoint URL</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={webhookEndpoint}
                onChange={(e) => setWebhookEndpoint(e.target.value)}
                placeholder="https://your-server.com/webhooks/reviewforge"
                className="flex-1 px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white font-mono"
              />
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-[#b8dca8] shrink-0 self-start sm:self-auto"
                onClick={handleTestWebhook}
              >
                <Send className="h-3.5 w-3.5" />
                Test Webhook
              </Button>
            </div>
          </div>

          {/* Event Toggles */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#1a3a2a]">Events</p>
            <div className="space-y-1">
              {WEBHOOK_EVENTS.map((evt) => (
                <div
                  key={evt.key}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#b8dca8] bg-white hover:bg-[#eef8e6] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono font-medium text-[#1a3a2a]">{evt.key}</code>
                      {enabledEvents[evt.key] && (
                        <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-[#b8dca8] text-[10px]">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#5a6b5a] mt-0.5">{evt.description}</p>
                  </div>
                  <Switch
                    checked={enabledEvents[evt.key] ?? false}
                    onCheckedChange={() => toggleEvent(evt.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Delivery Log */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#1a3a2a] flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Recent Deliveries
            </p>
            <div className="border border-[#b8dca8] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#eef8e6] text-[#5a6b5a]">
                      <th className="text-left px-3 py-2 font-medium">Timestamp</th>
                      <th className="text-left px-3 py-2 font-medium">Event</th>
                      <th className="text-left px-3 py-2 font-medium">Status</th>
                      <th className="text-left px-3 py-2 font-medium">Retries</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DELIVERY_LOG.map((entry) => (
                      <tr key={entry.id} className="border-t border-[#b8dca8]">
                        <td className="px-3 py-2 font-mono text-xs text-[#5a6b5a] whitespace-nowrap">
                          {entry.timestamp}
                        </td>
                        <td className="px-3 py-2">
                          <code className="text-xs font-mono text-[#1a3a2a]">{entry.event}</code>
                        </td>
                        <td className="px-3 py-2">
                          {entry.status === 200 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                              <CheckCircle2 className="h-3 w-3" />
                              {entry.status} {entry.statusText}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
                              <XCircle className="h-3 w-3" />
                              {entry.status} {entry.statusText}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-xs text-[#5a6b5a]">
                          {entry.retries > 0 ? (
                            <span className="inline-flex items-center gap-1 text-amber-600">
                              <AlertTriangle className="h-3 w-3" />
                              {entry.retries}
                            </span>
                          ) : (
                            <span className="text-[#5a6b5a]">0</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* REST API Reference */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Code2 className="h-4 w-4" />
            REST API Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {API_ENDPOINTS.map((ep) => {
            const isExpanded = expandedEndpoint === ep.path
            const methodColor =
              ep.method === "GET"
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-blue-100 text-blue-800 border-blue-200"

            return (
              <div key={ep.path} className="border border-[#b8dca8] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleEndpointExpand(ep.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#eef8e6] transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-[#5a6b5a] shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[#5a6b5a] shrink-0" />
                  )}
                  <Badge className={`${methodColor} font-mono text-xs shrink-0`}>
                    {ep.method}
                  </Badge>
                  <code className="text-sm font-mono font-medium text-[#1a3a2a]">{ep.path}</code>
                  <span className="text-xs text-[#5a6b5a] hidden sm:inline ml-auto truncate max-w-[240px]">
                    {ep.description}
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-[#b8dca8] bg-white">
                    <p className="text-sm text-[#5a6b5a] pt-3">{ep.description}</p>
                    <div>
                      <p className="text-xs font-medium text-[#1a3a2a] mb-1.5">Example Request</p>
                      <pre className="bg-[#1a1a2e] text-green-300 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
                        {ep.exampleRequest}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#1a3a2a] mb-1.5">Example Response</p>
                      <pre className="bg-[#1a1a2e] text-amber-200 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
                        {ep.exampleResponse}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* SDKs & Tools */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Package className="h-4 w-4" />
            SDKs & Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* JavaScript SDK */}
            <div className="border border-[#b8dca8] rounded-lg p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-sm font-bold text-black">
                  JS
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">JavaScript SDK</p>
                  <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-[#b8dca8] text-[10px]">v2.4.1</Badge>
                </div>
              </div>
              <div className="bg-[#1a1a2e] rounded-lg px-3 py-2 font-mono text-xs text-green-300 flex items-center gap-2">
                <Terminal className="h-3 w-3 shrink-0" />
                npm install reviewforge
              </div>
            </div>

            {/* Python SDK */}
            <div className="border border-[#b8dca8] rounded-lg p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                  PY
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Python SDK</p>
                  <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-[#b8dca8] text-[10px]">v1.8.0</Badge>
                </div>
              </div>
              <div className="bg-[#1a1a2e] rounded-lg px-3 py-2 font-mono text-xs text-green-300 flex items-center gap-2">
                <Terminal className="h-3 w-3 shrink-0" />
                pip install reviewforge
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-[#b8dca8]"
              onClick={() => toast.success("Postman collection downloaded!")}
            >
              <Download className="h-3.5 w-3.5" />
              Postman Collection
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-[#b8dca8]"
              onClick={() => toast.success("Opening full documentation...")}
            >
              <BookOpen className="h-3.5 w-3.5" />
              View Full Documentation
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
