"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Radio } from "lucide-react"

export default function MonitoringPage() {
  return (
    <ComingSoon
      title="Monitoring"
      description="Monitor brand mentions across platforms, track sentiment trends in real-time, and get notified about important conversations."
      icon={Radio}
    />
  )
}
