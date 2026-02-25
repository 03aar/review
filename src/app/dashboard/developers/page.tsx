"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Code2,
  ChevronDown,
  ChevronRight,
  Copy,
  Link as LinkIcon,
  Lock,
  Globe,
} from "lucide-react"
import { toast } from "sonner"

interface Endpoint {
  method: "GET" | "POST"
  path: string
  auth: boolean
  description: string
  params?: string
  body?: string
  response: string
}

const API_ENDPOINTS: Endpoint[] = [
  {
    method: "GET",
    path: "/api/businesses",
    auth: true,
    description: "List all businesses owned by the authenticated user.",
    response: `{
  "businesses": [
    {
      "id": "abc123",
      "name": "Sakura Bistro",
      "slug": "sakura-bistro",
      "category": "restaurant",
      "address": null,
      "phone": null,
      "website": null,
      "primaryColor": "#1a3a2a",
      "createdAt": "2026-02-20T10:00:00.000Z"
    }
  ]
}`,
  },
  {
    method: "POST",
    path: "/api/businesses",
    auth: true,
    description: "Create a new business. Slug is auto-generated from the name with collision handling.",
    body: `{
  "name": "Sakura Bistro",
  "category": "restaurant"
}`,
    response: `{
  "business": {
    "id": "abc123",
    "name": "Sakura Bistro",
    "slug": "sakura-bistro",
    "category": "restaurant",
    "createdAt": "2026-02-20T10:00:00.000Z"
  }
}`,
  },
  {
    method: "GET",
    path: "/api/businesses/[slug]",
    auth: false,
    description: "Get a business by its slug. Public endpoint used by the review widget. Returns 404 if not found.",
    response: `{
  "id": "abc123",
  "name": "Sakura Bistro",
  "slug": "sakura-bistro",
  "category": "restaurant",
  "primaryColor": "#1a3a2a"
}`,
  },
  {
    method: "GET",
    path: "/api/reviews",
    auth: true,
    description: "List reviews for a business with pagination. Requires business ownership.",
    params: "businessId (required), page (default 1), pageSize (default 50, max 100)",
    response: `{
  "data": [
    {
      "id": "rev-1",
      "businessId": "abc123",
      "customerName": "Jane D.",
      "rating": 5,
      "rawInput": "Loved the ramen!",
      "generatedReview": "...",
      "finalReview": "...",
      "platform": "google",
      "sentiment": "positive",
      "topics": "[\\"food quality\\", \\"service\\"]",
      "source": "link",
      "createdAt": "2026-02-24T18:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 12,
    "totalPages": 1
  }
}`,
  },
  {
    method: "POST",
    path: "/api/reviews",
    auth: false,
    description: "Submit a new review. Public endpoint used by the review capture widget (/r/[slug]).",
    body: `{
  "businessId": "abc123",
  "rating": 5,
  "rawInput": "Amazing food and great atmosphere!",
  "rawInputType": "text",
  "customerName": "Jane Doe",
  "customerEmail": "jane@example.com",
  "platform": "google",
  "platforms": ["google", "yelp"],
  "finalReview": "Optional edited version",
  "source": "link"
}`,
    response: `{
  "review": {
    "id": "rev-new",
    "businessId": "abc123",
    "rating": 5,
    "generatedReview": "AI-polished review text...",
    "finalReview": "...",
    "platform": "google",
    "platforms": ["google", "yelp"],
    "sentiment": "positive",
    "topics": ["food quality", "ambiance"],
    "createdAt": "2026-02-25T12:00:00.000Z"
  },
  "generatedReview": "AI-polished review text...",
  "sentiment": "positive",
  "topics": ["food quality", "ambiance"]
}`,
  },
  {
    method: "POST",
    path: "/api/reviews/[id]/respond",
    auth: true,
    description: "Manage AI-generated responses to reviews. Supports regenerate, approve, and edit actions.",
    body: `// Regenerate a new AI response
{ "action": "regenerate" }

// Approve an existing draft
{ "action": "approve" }

// Edit and post a custom response
{
  "action": "edit",
  "editedResponse": "Thank you for the wonderful feedback!"
}`,
    response: `// regenerate
{
  "id": "resp-1",
  "response": "AI-generated response text...",
  "status": "draft"
}

// approve or edit
{ "id": "resp-1", "status": "posted" }`,
  },
  {
    method: "GET",
    path: "/api/insights",
    auth: true,
    description: "Get computed analytics for a business: rating stats, sentiment breakdown, trends, and top topics.",
    params: "businessId (required)",
    response: `{
  "overview": {
    "totalReviews": 47,
    "averageRating": 4.6,
    "responseRate": 0.72,
    "platformBreakdown": { "google": 30, "yelp": 10, "facebook": 7 },
    "sentimentBreakdown": { "positive": 35, "neutral": 8, "negative": 4 }
  },
  "trends": [...],
  "topTopics": [
    { "topic": "food quality", "count": 28, "sentiment": 0.85 }
  ],
  "recentActivity": [...]
}`,
  },
  {
    method: "POST",
    path: "/api/ai/generate-review",
    auth: false,
    description: "Generate an AI-polished review from raw customer input. Used by the review widget.",
    body: `{
  "rawInput": "great food loved the pasta",
  "rating": 5,
  "businessName": "Sakura Bistro",
  "businessCategory": "restaurant"
}`,
    response: `{
  "generatedReview": "The pasta at Sakura Bistro was truly outstanding...",
  "sentiment": "positive",
  "topics": ["food quality"]
}`,
  },
  {
    method: "POST",
    path: "/api/ai/generate-response",
    auth: false,
    description: "Generate an AI response to a customer review. Used by the dashboard response workflow.",
    body: `{
  "review": "The pasta was amazing!",
  "rating": 5,
  "businessName": "Sakura Bistro",
  "customerName": "Jane",
  "businessCategory": "restaurant"
}`,
    response: `{
  "response": "Thank you so much, Jane! We're thrilled..."
}`,
  },
]

export default function DevelopersPage() {
  const { business } = useBusinessContext()
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null)

  function handleCopyLink() {
    const url = `${window.location.origin}/r/${business.slug}`
    navigator.clipboard.writeText(url)
    toast.success("Review link copied!")
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">API Reference</h1>
        <p className="text-[#5a6b5a]">
          All available endpoints for {business.name}
        </p>
      </div>

      {/* Quick Info */}
      <Card className="border-[#b8dca8]">
        <CardContent className="pt-5 pb-4 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-[#eef8e6] rounded-lg px-3 py-2 border border-[#b8dca8]">
              <LinkIcon className="h-3.5 w-3.5 text-[#2d6a4f]" />
              <code className="text-sm font-mono text-[#1a3a2a]">/r/{business.slug}</code>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-[#b8dca8]"
              onClick={handleCopyLink}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Review Link
            </Button>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#5a6b5a]">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Auth endpoints require a session cookie (Better Auth)
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Public endpoints have no auth requirement
            </span>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Code2 className="h-4 w-4" />
            Endpoints ({API_ENDPOINTS.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {API_ENDPOINTS.map((ep) => {
            const key = `${ep.method} ${ep.path}`
            const isExpanded = expandedEndpoint === key
            const methodColor =
              ep.method === "GET"
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-blue-100 text-blue-800 border-blue-200"

            return (
              <div key={key} className="border border-[#b8dca8] rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedEndpoint(isExpanded ? null : key)}
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
                  {ep.auth ? (
                    <Lock className="h-3 w-3 text-[#5a6b5a] shrink-0" />
                  ) : (
                    <Globe className="h-3 w-3 text-[#5a6b5a] shrink-0" />
                  )}
                  <span className="text-xs text-[#5a6b5a] hidden sm:inline ml-auto truncate max-w-[240px]">
                    {ep.description.slice(0, 60)}...
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-[#b8dca8] bg-white">
                    <p className="text-sm text-[#5a6b5a] pt-3">{ep.description}</p>

                    {ep.params && (
                      <div>
                        <p className="text-xs font-medium text-[#1a3a2a] mb-1">Query Parameters</p>
                        <p className="text-xs text-[#5a6b5a] bg-[#eef8e6] px-3 py-2 rounded border border-[#b8dca8]">
                          {ep.params}
                        </p>
                      </div>
                    )}

                    {ep.body && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-[#1a3a2a]">Request Body</p>
                          <button
                            onClick={() => { navigator.clipboard.writeText(ep.body!); toast.success("Copied!") }}
                            className="flex items-center gap-1 text-[10px] text-[#5a6b5a] hover:text-[#1a3a2a] transition-colors"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </button>
                        </div>
                        <pre className="bg-[#1a1a2e] text-green-300 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
                          {ep.body}
                        </pre>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-[#1a3a2a]">Response</p>
                        <button
                          onClick={() => { navigator.clipboard.writeText(ep.response); toast.success("Copied!") }}
                          className="flex items-center gap-1 text-[10px] text-[#5a6b5a] hover:text-[#1a3a2a] transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </button>
                      </div>
                      <pre className="bg-[#1a1a2e] text-amber-200 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">
                        {ep.response}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
