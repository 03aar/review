"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Megaphone } from "lucide-react"

export default function MarketingPage() {
  return (
    <ComingSoon
      title="Marketing"
      description="Generate social media content from your best reviews, create embeddable widgets, and build marketing materials that showcase customer love."
      icon={Megaphone}
    />
  )
}
