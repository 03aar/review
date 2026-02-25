"use client"

import { ComingSoon } from "@/components/dashboard/coming-soon"
import { ShieldAlert } from "lucide-react"

export default function CrisisPage() {
  return (
    <ComingSoon
      title="Crisis Management"
      description="Get real-time alerts for negative review spikes, automated escalation workflows, and guided response playbooks."
      icon={ShieldAlert}
    />
  )
}
