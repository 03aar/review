"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Target } from "lucide-react"

export default function GoalsPage() {
  return (
    <ComingSoon
      title="Goals & Streaks"
      description="Set review collection targets, track daily streaks, unlock achievements, and motivate your team with gamified milestones."
      icon={Target}
    />
  )
}
