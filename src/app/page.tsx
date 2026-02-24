"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  Mic,
  Sparkles,
  Send,
  BarChart3,
  Reply,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react"
import { motion } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-blue-600 fill-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ReviewForge
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                AI-Powered Review Collection
              </div>
            </motion.div>

            <motion.h1
              {...fadeIn}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Turn Every Happy Customer Into a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                5-Star Review
              </span>
            </motion.h1>

            <motion.p
              {...fadeIn}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Your happy customers have a lot to say. We help them say it.
              Capture reviews in 10 seconds with AI that transforms a quick
              voice note into a polished, platform-ready review.
            </motion.p>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              <Button size="xl" asChild>
                <Link href="/register">
                  Start Collecting Reviews
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Set up in 2 minutes
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Works with Google, Yelp, & more
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              The Math That Haunts Every Business Owner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Happy customers are silent. Unhappy ones write novels. Your
              online reputation doesn&apos;t reflect reality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Without ReviewForge */}
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <span className="text-red-500 text-xl">&#10005;</span>
                  Without ReviewForge
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>100 customers visit</span>
                  </div>
                  <div className="pl-4 space-y-1 text-muted-foreground">
                    <p>70 had a good experience &rarr; <strong className="text-red-700">2 leave a review</strong></p>
                    <p>20 had an okay experience &rarr; 0 leave a review</p>
                    <p>10 had a bad experience &rarr; <strong className="text-red-700">4 leave a review</strong></p>
                  </div>
                  <div className="border-t border-red-200 pt-3">
                    <p className="font-medium text-red-800">
                      Result: 6 reviews - 67% negative
                    </p>
                    <p className="text-muted-foreground">
                      Actual satisfaction: 70% happy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* With ReviewForge */}
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  With ReviewForge
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>100 customers visit</span>
                  </div>
                  <div className="pl-4 space-y-1 text-muted-foreground">
                    <p>70 had a good experience &rarr; <strong className="text-green-700">35 leave a review</strong></p>
                    <p>20 had an okay experience &rarr; <strong className="text-green-700">5 leave a review</strong></p>
                    <p>10 had a bad experience &rarr; 4 leave a review</p>
                  </div>
                  <div className="border-t border-green-200 pt-3">
                    <p className="font-medium text-green-800">
                      Result: 44 reviews - 80% positive
                    </p>
                    <p className="text-muted-foreground">
                      Your reputation matches reality
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              10 Seconds. That&apos;s It.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From happy customer to posted review in under a minute. No apps to
              download. No accounts to create. Zero friction.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: MessageSquare,
                title: "Customer Taps Link",
                desc: "QR code, text, or link on receipt. Opens instantly in their browser.",
              },
              {
                step: "2",
                icon: Mic,
                title: "Speak or Type",
                desc: 'Voice-first input. Just say "the food was amazing and our waiter was great."',
              },
              {
                step: "3",
                icon: Sparkles,
                title: "AI Polishes It",
                desc: "Transforms raw thoughts into a beautifully written, authentic review.",
              },
              {
                step: "4",
                icon: Send,
                title: "Posted Everywhere",
                desc: "One tap posts to Google, Yelp, Facebook, and TripAdvisor simultaneously.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-blue-600" />
                </div>
                <div className="text-sm font-bold text-blue-600 mb-1">
                  Step {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              The AI Magic Moment
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch raw customer input become a polished, ready-to-post review
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Customer says:
                    </span>
                  </div>
                  <p className="text-sm italic text-gray-600 bg-gray-50 p-4 rounded-lg">
                    &ldquo;Yeah it was great, the food was really good and our
                    waiter was nice&rdquo;
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      AI generates:
                    </span>
                  </div>
                  <p className="text-sm bg-white p-4 rounded-lg border border-blue-100">
                    &ldquo;Had an amazing dinner experience! The food was
                    absolutely delicious - you can tell they use quality
                    ingredients. Our waiter was incredibly friendly and attentive
                    without being overbearing. Will definitely be back!&rdquo;
                  </p>
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Customer approves with one tap. Review goes live on Google
              instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Own Your Reputation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Voice-First Capture",
                desc: "Customers speak naturally. AI does the writing. 10 seconds, done.",
              },
              {
                icon: Sparkles,
                title: "AI Review Generation",
                desc: "Transforms casual feedback into polished, authentic reviews customers are proud to post.",
              },
              {
                icon: Globe,
                title: "Multi-Platform Distribution",
                desc: "One review, every platform. Google, Yelp, Facebook, TripAdvisor - all at once.",
              },
              {
                icon: Reply,
                title: "AI Response Engine",
                desc: "Automatically draft personalized responses to every review. Approve with one click.",
              },
              {
                icon: BarChart3,
                title: "Customer Intelligence",
                desc: "See what topics customers mention, sentiment trends, and actionable insights.",
              },
              {
                icon: Zap,
                title: "Smart Triggers",
                desc: "Connect to POS, booking systems, or use QR codes. Reach customers at the perfect moment.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50%", label: "Increase in review volume", icon: TrendingUp },
              { value: "4.5+", label: "Average star rating achieved", icon: Star },
              { value: "10s", label: "Average time to leave a review", icon: Clock },
              { value: "100%", label: "Businesses see more reviews", icon: Users },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <p className="text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            The Reviews You Deserve, Automatically
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Stop letting your online reputation be defined by the vocal
            minority. Capture the silent majority and show the world what
            your customers really think.
          </p>
          <Button size="xl" asChild>
            <Link href="/register">
              Get Started Free
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600 fill-blue-600" />
            <span className="font-bold text-blue-600">ReviewForge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your happy customers have a lot to say. We help them say it.
          </p>
        </div>
      </footer>
    </div>
  )
}
