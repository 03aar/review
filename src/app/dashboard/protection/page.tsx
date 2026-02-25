"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Shield } from "lucide-react"

export default function ProtectionPage() {
  return (
    <ComingSoon
      title="Protection"
      description="Detect fake reviews, flag suspicious patterns, and protect your business reputation with automated monitoring and alerts."
      icon={Shield}
    />
  )
}
