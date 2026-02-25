"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { UserCheck } from "lucide-react"

export default function StaffPage() {
  return (
    <ComingSoon
      title="Staff Performance"
      description="Track which team members get mentioned in reviews, identify top performers, and use customer feedback for coaching and recognition."
      icon={UserCheck}
    />
  )
}
