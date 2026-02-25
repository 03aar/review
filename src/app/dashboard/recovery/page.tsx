"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { HeartHandshake } from "lucide-react"

export default function RecoveryPage() {
  return (
    <ComingSoon
      title="Recovery"
      description="Turn unhappy customers into advocates with automated follow-ups, service recovery workflows, and win-back campaigns."
      icon={HeartHandshake}
    />
  )
}
