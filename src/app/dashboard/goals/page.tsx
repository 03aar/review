"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Target,
  TrendingUp,
  Trophy,
  Medal,
  Flame,
  Star,
  Award,
  Shield,
  Crown,
  Lock,
  CheckCircle2,
  ArrowRight,
  Send,
  QrCode,
  Users,
  Zap,
  ChevronUp,
  Calendar,
} from "lucide-react"

// --- Mock Data ---
const monthlyGoal = { target: 50, current: 23, daysRemaining: 15, daysElapsed: 15, totalDays: 30, conversionRate: 34 }

const paceData = [
  { day: 1, expected: 1.7, actual: 2 },  { day: 3, expected: 5.0, actual: 4 },
  { day: 5, expected: 8.3, actual: 7 },  { day: 7, expected: 11.7, actual: 10 },
  { day: 9, expected: 15.0, actual: 14 }, { day: 11, expected: 18.3, actual: 17 },
  { day: 13, expected: 21.7, actual: 20 },{ day: 15, expected: 25.0, actual: 23 },
]

const achievements = [
  { id: "first-100", title: "First 100 Reviews", description: "Collected 100 verified customer reviews",
    icon: Trophy, status: "unlocked" as const, unlockedDate: "Jan 12, 2026", progress: 100, progressMax: 100 },
  { id: "30-streak", title: "30-Day Streak", description: "Received at least 1 review every day for 30 days",
    icon: Flame, status: "unlocked" as const, unlockedDate: "Feb 3, 2026", progress: 30, progressMax: 30 },
  { id: "high-rating", title: "4.8+ Rating for 90 Days", description: "Maintained a 4.8+ star average for 90 consecutive days",
    icon: Star, status: "unlocked" as const, unlockedDate: "Feb 18, 2026", progress: 90, progressMax: 90 },
  { id: "response-rate", title: "100% Response Rate 30 Days", description: "Responded to every review for 30 consecutive days",
    icon: Shield, status: "in_progress" as const, progress: 24, progressMax: 30 },
  { id: "champion-500", title: "Review Champion 500", description: "Reach 500 total verified reviews across all locations",
    icon: Crown, status: "locked" as const, progress: 234, progressMax: 500 },
  { id: "perfect-month", title: "Perfect Month", description: "Hit 100% of monthly goal with 4.9+ average rating",
    icon: Award, status: "locked" as const, progress: 0, progressMax: 1 },
]

const leaderboard = [
  { name: "Downtown", reviews: 67, goal: 50, rank: 1 },
  { name: "Westside", reviews: 52, goal: 50, rank: 2 },
  { name: "Eastside", reviews: 41, goal: 50, rank: 3 },
]

const quickWins = [
  { id: "batch-request", title: "Send a batch request to 45 recent customers",
    description: "Target customers from the past 2 weeks who haven't been asked yet", icon: Send, action: "Send Batch" },
  { id: "qr-codes", title: "Print QR codes for tables (40% higher conversion)",
    description: "Table-top QR codes see significantly higher scan rates than wall posters", icon: QrCode, action: "Generate QR" },
  { id: "staff-training", title: "Train staff on verbal ask + card handoff",
    description: "The verbal-ask-then-card method converts 3x better than email alone", icon: Users, action: "View Guide" },
]

const currentStreak = 12
const rankMedals = ["", "#FFD700", "#C0C0C0", "#CD7F32"]
const rankLabels = ["", "1st", "2nd", "3rd"]

export default function GoalsPage() {
  const { business } = useBusinessContext()
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(null)
  const percentage = Math.round((monthlyGoal.current / monthlyGoal.target) * 100)
  const expectedByNow = Math.round((monthlyGoal.daysElapsed / monthlyGoal.totalDays) * monthlyGoal.target)
  const isOnTrack = monthlyGoal.current >= expectedByNow
  const requestsNeeded = Math.ceil((monthlyGoal.target - monthlyGoal.current) / (monthlyGoal.conversionRate / 100))
  const maxPaceValue = Math.max(...paceData.map((d) => Math.max(d.expected, d.actual)))

  function handleQuickWinAction(id: string) {
    switch (id) {
      case "batch-request":
        toast.success("Batch request queued! 45 customers will receive review requests within the hour.")
        break
      case "qr-codes":
        toast.success("QR codes generated! Check the Marketing tab to download and print.")
        break
      case "staff-training":
        toast.success("Training guide opened! Share with your team for best results.")
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">Goals & Gamification</h1>
          <p className="text-[#5a6b5a] text-sm mt-1">
            Track progress, unlock achievements, and keep {business.name} growing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-[#b8dca8] rounded-lg px-4 py-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-semibold text-[#1a3a2a]">{currentStreak}-day streak</span>
          </div>
        </div>
      </div>

      {/* Monthly Goal + Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-[#b8dca8] bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1a3a2a] flex items-center gap-2">
                <Target className="h-5 w-5 text-[#2d6a4f]" />
                Monthly Goal Progress
              </CardTitle>
              <Badge
                className={
                  isOnTrack
                    ? "bg-[#d4f0c0] text-[#2d6a4f] border-[#b8dca8]"
                    : "bg-amber-100 text-amber-800 border-amber-200"
                }
              >
                {isOnTrack ? "On track!" : "Falling behind"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold text-[#1a3a2a]">{monthlyGoal.current}</span>
                <span className="text-2xl text-[#5a6b5a] mb-1">/ {monthlyGoal.target} reviews</span>
              </div>

              <div className="space-y-2">
                <Progress
                  value={percentage}
                  className="h-5 rounded-full bg-[#eef8e6]"
                  style={
                    {
                      "--tw-progress-fill": "#2d6a4f",
                    } as React.CSSProperties
                  }
                />
                <div className="flex justify-between text-sm">
                  <span className="text-[#2d6a4f] font-semibold">{percentage}% complete</span>
                  <span className="text-[#5a6b5a]">{monthlyGoal.daysRemaining} days remaining</span>
                </div>
              </div>

              <div className="bg-[#eef8e6] border border-[#b8dca8] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-[#2d6a4f] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#1a3a2a]">
                      You need {monthlyGoal.target - monthlyGoal.current} more reviews in {monthlyGoal.daysRemaining} days
                    </p>
                    <p className="text-sm text-[#5a6b5a] mt-1">
                      Based on your conversion rate of {monthlyGoal.conversionRate}%, you need ~{requestsNeeded} requests to hit your goal. Send a batch request to close the gap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#b8dca8] bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1a3a2a] flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Streak Counter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <div>
                      <span className="text-4xl font-bold text-[#1a3a2a]">{currentStreak}</span>
                      <p className="text-xs text-[#5a6b5a] -mt-1">days</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Flame className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a3a2a]">Daily review streak</p>
                <p className="text-xs text-[#5a6b5a] mt-1">
                  You&apos;ve received at least 1 review every day for the last {currentStreak} days. Keep it going!
                </p>
              </div>
              <div className="w-full bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
                <p className="text-xs text-[#5a6b5a]">
                  <span className="font-semibold text-[#2d6a4f]">Best streak:</span> 34 days
                </p>
                <p className="text-xs text-[#5a6b5a] mt-1">
                  <span className="font-semibold text-[#2d6a4f]">Next milestone:</span> 15 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pace Tracker */}
      <Card className="border-[#b8dca8] bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-[#1a3a2a] flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#2d6a4f]" />
            Pace Tracker
          </CardTitle>
          <p className="text-sm text-[#5a6b5a]">Daily expected vs actual review pace this month</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#2d6a4f]" />
                <span className="text-[#5a6b5a]">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#b8dca8]" />
                <span className="text-[#5a6b5a]">Expected</span>
              </div>
            </div>

            <div className="flex items-end gap-3 h-40">
              {paceData.map((d) => {
                const actualHeight = (d.actual / maxPaceValue) * 100
                const expectedHeight = (d.expected / maxPaceValue) * 100
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                      <div
                        className="w-2/5 bg-[#2d6a4f] rounded-t-sm transition-all"
                        style={{ height: `${actualHeight}%` }}
                        title={`Day ${d.day}: ${d.actual} actual`}
                      />
                      <div
                        className="w-2/5 bg-[#b8dca8] rounded-t-sm transition-all"
                        style={{ height: `${expectedHeight}%` }}
                        title={`Day ${d.day}: ${d.expected.toFixed(1)} expected`}
                      />
                    </div>
                    <span className="text-xs text-[#5a6b5a]">Day {d.day}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#2d6a4f]" />
                <span className="text-sm text-[#5a6b5a]">
                  Expected by day {monthlyGoal.daysElapsed}:
                  <span className="font-semibold text-[#1a3a2a] ml-1">{expectedByNow} reviews</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                {isOnTrack ? (
                  <ChevronUp className="h-4 w-4 text-[#2d6a4f]" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-amber-600 rotate-180" />
                )}
                <span className={`text-sm font-semibold ${isOnTrack ? "text-[#2d6a4f]" : "text-amber-600"}`}>
                  {isOnTrack ? "Ahead" : "Behind"} by {Math.abs(monthlyGoal.current - expectedByNow)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-[#b8dca8] bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-[#1a3a2a] flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#2d6a4f]" />
              Achievements
            </CardTitle>
            <span className="text-sm text-[#5a6b5a]">
              {achievements.filter((a) => a.status === "unlocked").length}/{achievements.length} unlocked
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              const isUnlocked = achievement.status === "unlocked"
              const isInProgress = achievement.status === "in_progress"
              const isLocked = achievement.status === "locked"
              const progressPercent = Math.round((achievement.progress / achievement.progressMax) * 100)

              return (
                <button
                  key={achievement.id}
                  onClick={() =>
                    setExpandedAchievement(
                      expandedAchievement === achievement.id ? null : achievement.id
                    )
                  }
                  className={`text-left rounded-xl border p-4 transition-all hover:shadow-md ${
                    isUnlocked
                      ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-sm"
                      : isInProgress
                        ? "bg-white border-[#b8dca8]"
                        : "bg-gray-50 border-gray-200 opacity-75"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        isUnlocked
                          ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md"
                          : isInProgress
                            ? "bg-[#d4f0c0] border-2 border-[#b8dca8]"
                            : "bg-gray-200"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Icon
                          className={`h-5 w-5 ${
                            isUnlocked ? "text-white" : "text-[#2d6a4f]"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-sm font-semibold truncate ${
                            isLocked ? "text-gray-400" : "text-[#1a3a2a]"
                          }`}
                        >
                          {achievement.title}
                        </h3>
                        {isUnlocked && (
                          <CheckCircle2 className="h-4 w-4 text-yellow-600 shrink-0" />
                        )}
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          isLocked ? "text-gray-400" : "text-[#5a6b5a]"
                        }`}
                      >
                        {achievement.description}
                      </p>

                      {!isUnlocked && achievement.progress > 0 && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className={isLocked ? "text-gray-400" : "text-[#2d6a4f]"}>
                              {achievement.progress}/{achievement.progressMax}
                            </span>
                            <span className={isLocked ? "text-gray-400" : "text-[#5a6b5a]"}>
                              {progressPercent}%
                            </span>
                          </div>
                          <Progress
                            value={progressPercent}
                            className={`h-2 ${isLocked ? "bg-gray-200" : "bg-[#eef8e6]"}`}
                          />
                        </div>
                      )}

                      {isUnlocked && achievement.unlockedDate && (
                        <p className="text-xs text-amber-600 mt-2 font-medium">
                          Unlocked {achievement.unlockedDate}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard + Quick Wins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#b8dca8] bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1a3a2a] flex items-center gap-2">
              <Medal className="h-5 w-5 text-[#2d6a4f]" />
              Location Leaderboard
            </CardTitle>
            <p className="text-sm text-[#5a6b5a]">Multi-location performance this month</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((location) => {
                const goalPercent = Math.round((location.reviews / location.goal) * 100)
                const isOverGoal = goalPercent >= 100
                return (
                  <div
                    key={location.name}
                    className={`rounded-lg border p-4 ${
                      location.rank === 1
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300"
                        : "bg-[#eef8e6] border-[#b8dca8]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
                          style={{ backgroundColor: rankMedals[location.rank] }}
                        >
                          {rankLabels[location.rank]}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[#1a3a2a]">{location.name}</h3>
                          <p className="text-xs text-[#5a6b5a]">
                            {location.reviews} reviews
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          isOverGoal
                            ? "bg-[#d4f0c0] text-[#2d6a4f] border-[#b8dca8]"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {goalPercent}% of goal
                      </Badge>
                    </div>
                    <Progress
                      value={Math.min(goalPercent, 100)}
                      className="h-2.5 bg-[#eef8e6]"
                    />
                    {isOverGoal && (
                      <p className="text-xs text-[#2d6a4f] mt-2 flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Exceeded goal by {location.reviews - location.goal} reviews!
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#b8dca8] bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1a3a2a] flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#2d6a4f]" />
                Quick Wins
              </CardTitle>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                {monthlyGoal.target - monthlyGoal.current} reviews to go
              </Badge>
            </div>
            <p className="text-sm text-[#5a6b5a]">Suggested actions to hit your monthly goal faster</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickWins.map((win) => {
                const Icon = win.icon
                return (
                  <div
                    key={win.id}
                    className="rounded-lg border border-[#b8dca8] bg-[#eef8e6] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4f0c0] flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-[#2d6a4f]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#1a3a2a]">{win.title}</h3>
                        <p className="text-xs text-[#5a6b5a] mt-1">{win.description}</p>
                        <Button
                          size="sm"
                          className="mt-3 bg-[#1a3a2a] text-[#d4f0c0] hover:bg-[#0f2a1c]"
                          onClick={() => handleQuickWinAction(win.id)}
                        >
                          {win.action}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
