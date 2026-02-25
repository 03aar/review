"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { TrendingUp } from "lucide-react"

export default function ROIPage() {
  return (
    <ComingSoon
      title="ROI & Impact"
      description="Measure the business impact of your reviews — track revenue attribution, customer lifetime value, and return on your review management investment."
      icon={TrendingUp}
    />
  )
}
