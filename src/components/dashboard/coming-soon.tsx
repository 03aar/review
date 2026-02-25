"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Construction } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ComingSoonProps {
  title: string
  description: string
  icon?: LucideIcon
}

export function ComingSoon({ title, description, icon: Icon = Construction }: ComingSoonProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#1a3a2a] animate-slide-up">{title}</h1>
      <Card className="border-[#b8dca8] animate-scale-bounce opacity-0" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
        <CardContent className="py-16 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#eef8e6] flex items-center justify-center animate-float">
            <Icon className="h-8 w-8 text-[#2d6a4f]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1a3a2a] mb-2">Coming Soon</h2>
          <p className="text-[#5a6b5a] max-w-md mx-auto">{description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
