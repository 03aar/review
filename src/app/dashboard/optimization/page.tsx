"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Zap } from "lucide-react"

export default function OptimizationPage() {
  return (
    <ComingSoon
      title="Optimization"
      description="A/B test review request timing, optimize conversion rates across channels, and get AI-powered recommendations to collect more reviews."
      icon={Zap}
    />
  )
}
