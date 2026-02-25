"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Users } from "lucide-react"

export default function CompetitorsPage() {
  return (
    <ComingSoon
      title="Competitors"
      description="Track competitor reviews, compare ratings, and identify opportunities to stand out in your market."
      icon={Users}
    />
  )
}
