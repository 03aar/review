"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mic,
  Send,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  Star,
  Zap,
  Shield,
  Globe,
  Check,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#eef8e6]">
      {/* Navigation */}
      <nav className="bg-[#eef8e6]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-[#b8dca8]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#1a3a2a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">R</span>
            </div>
            <span className="text-xl font-bold text-[#1a3a2a]">
              ReviewForge
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-[#1a3a2a]" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#d4f0c0] text-[#1a3a2a] px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-[#b8dca8]">
              <Mic className="h-4 w-4" />
              Voice-first review collection
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#1a3a2a] font-serif leading-tight">
              TURN CUSTOMER{" "}
              <span className="relative inline-block">
                FEEDBACK
                <span className="absolute bottom-0 left-0 w-full h-2 bg-[#f0d040] -z-10 translate-y-1" />
              </span>{" "}
              INTO REVENUE
            </h1>

            <p className="text-lg md:text-xl text-[#4a7a5a] mb-8 max-w-2xl mx-auto">
              97% of your happy customers leave without writing a review.
              ReviewForge captures their voice in 8 seconds and turns it into a
              polished, platform-ready review they post with one tap.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] px-8 py-6 text-base" asChild>
                <Link href="/register">
                  Start Collecting Reviews
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#1a3a2a] text-[#1a3a2a] hover:bg-[#d4f0c0] px-8 py-6 text-base" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-[#4a7a5a] flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#2d6a4f]" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#2d6a4f]" />
                Set up in 2 minutes
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#2d6a4f]" />
                Works with Google, Yelp &amp; more
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-[#1a3a2a] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-[#95d5b2] text-xs ml-2">ReviewForge Dashboard</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#2d6a4f] rounded-xl p-4">
                  <p className="text-[#95d5b2] text-xs mb-1">Total Reviews</p>
                  <p className="text-white text-2xl font-bold">847</p>
                  <p className="text-[#52b788] text-xs mt-1">+23 this week</p>
                </div>
                <div className="bg-[#2d6a4f] rounded-xl p-4">
                  <p className="text-[#95d5b2] text-xs mb-1">Avg Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-white text-2xl font-bold">4.8</p>
                    <Star className="h-4 w-4 text-[#f0d040] fill-[#f0d040]" />
                  </div>
                  <p className="text-[#52b788] text-xs mt-1">Up from 4.2</p>
                </div>
                <div className="bg-[#2d6a4f] rounded-xl p-4">
                  <p className="text-[#95d5b2] text-xs mb-1">Response Rate</p>
                  <p className="text-white text-2xl font-bold">100%</p>
                  <p className="text-[#52b788] text-xs mt-1">AI-powered</p>
                </div>
                <div className="bg-[#2d6a4f] rounded-xl p-4">
                  <p className="text-[#95d5b2] text-xs mb-1">Conversion</p>
                  <p className="text-white text-2xl font-bold">52%</p>
                  <p className="text-[#52b788] text-xs mt-1">vs 3% industry avg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3a2a] font-serif">
              Your Online Reputation Is a Lie
            </h2>
            <p className="text-lg text-[#4a7a5a] max-w-2xl mx-auto">
              Happy customers stay quiet. Angry ones write essays. The result:
              your star rating reflects 3% of your actual customer experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <span className="text-red-500 text-xl">&#10005;</span>
                  Without ReviewForge
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="pl-4 space-y-1.5 text-gray-600">
                    <p>100 customers visit your business</p>
                    <p>70 had a good experience <strong className="text-red-700">&#8594; 2 leave a review</strong></p>
                    <p>10 had a bad experience <strong className="text-red-700">&#8594; 4 leave a review</strong></p>
                  </div>
                  <div className="border-t border-red-200 pt-3">
                    <p className="font-medium text-red-800">
                      Result: 6 reviews, 67% negative
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Actual customer satisfaction: 70% happy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#b8dca8] bg-[#eef8e6]/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#1a3a2a] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2d6a4f]" />
                  With ReviewForge
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="pl-4 space-y-1.5 text-gray-600">
                    <p>100 customers visit your business</p>
                    <p>70 had a good experience <strong className="text-[#2d6a4f]">&#8594; 35 leave a review</strong></p>
                    <p>10 had a bad experience &#8594; 4 leave a review</p>
                  </div>
                  <div className="border-t border-[#b8dca8] pt-3">
                    <p className="font-medium text-[#1a3a2a]">
                      Result: 44 reviews, 80% positive
                    </p>
                    <p className="text-[#4a7a5a] text-xs mt-1">
                      Your reputation finally matches reality
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#eef8e6]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3a2a] font-serif">
              8 Seconds From Thought to Posted Review
            </h2>
            <p className="text-lg text-[#4a7a5a] max-w-2xl mx-auto">
              No app downloads. No account creation. No typing. Just speak and post.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: MessageSquare,
                title: "Customer taps link",
                desc: "QR code on the table, text after checkout, or link on a receipt. Opens instantly in their browser.",
              },
              {
                step: "2",
                icon: Mic,
                title: "Speak naturally",
                desc: "\"The pasta was incredible and our server Jake made the night.\" Three seconds of talking.",
              },
              {
                step: "3",
                icon: Zap,
                title: "AI writes the review",
                desc: "Their words become a detailed, authentic review that mentions Jake and the pasta by name.",
              },
              {
                step: "4",
                icon: Send,
                title: "One tap to post",
                desc: "Review goes live on Google, Yelp, and Facebook. Customer is done before they finish their coffee.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-[#d4f0c0] border border-[#b8dca8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-[#1a3a2a]" />
                </div>
                <div className="text-sm font-bold text-[#2d6a4f] mb-1">
                  Step {item.step}
                </div>
                <h3 className="font-semibold mb-2 text-[#1a3a2a]">{item.title}</h3>
                <p className="text-sm text-[#4a7a5a]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3a2a] font-serif">
              From Raw Voice to Ready Review
            </h2>
            <p className="text-lg text-[#4a7a5a]">
              The AI keeps their personality. It just adds detail and polish.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#b8dca8]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-[#4a7a5a]">
                      Customer says:
                    </span>
                  </div>
                  <p className="text-sm italic text-gray-600 bg-[#eef8e6] p-4 rounded-lg">
                    &ldquo;Yeah it was great, food was really good and Jake our
                    waiter was super nice&rdquo;
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#2d6a4f] bg-[#eef8e6]/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-[#2d6a4f]" />
                    <span className="text-sm font-medium text-[#2d6a4f]">
                      ReviewForge generates:
                    </span>
                  </div>
                  <p className="text-sm bg-white p-4 rounded-lg border border-[#b8dca8]">
                    &ldquo;Had an excellent dinner here last night. The food was
                    genuinely impressive, and our waiter Jake went out of his way
                    to make sure everything was perfect. Attentive without hovering.
                    We&apos;ll be back soon.&rdquo;
                  </p>
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-[#f0d040] fill-[#f0d040]"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-sm text-[#4a7a5a] mt-6">
              Customer approves with one tap. The review goes live on Google instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#eef8e6]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3a2a] font-serif">
              Everything You Need to Own Your Reputation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Mic,
                title: "Voice-First Capture",
                desc: "Customers speak for 3 seconds. The AI handles the rest. No typing, no friction, no app downloads.",
              },
              {
                icon: Zap,
                title: "AI Review Writer",
                desc: "Turns casual speech into a detailed, authentic review that references specific people, dishes, and moments.",
              },
              {
                icon: Globe,
                title: "Multi-Platform Posting",
                desc: "One review, every platform. Google, Yelp, Facebook, TripAdvisor. Posted with a single tap.",
              },
              {
                icon: MessageSquare,
                title: "AI Response Engine",
                desc: "Every review gets a personalized reply within minutes. Approve with one click or let it run on autopilot.",
              },
              {
                icon: BarChart3,
                title: "Customer Intelligence",
                desc: "See which topics your customers mention most, track sentiment shifts, and spot problems before they spread.",
              },
              {
                icon: Shield,
                title: "Smart Triggers",
                desc: "Send review requests via SMS, QR code, NFC tap, email, or POS integration. Reach customers at the right moment.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-[#b8dca8] hover:shadow-md transition-shadow bg-white">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 bg-[#d4f0c0] border border-[#b8dca8] rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-[#1a3a2a]" />
                  </div>
                  <h3 className="font-semibold mb-2 text-[#1a3a2a]">{feature.title}</h3>
                  <p className="text-sm text-[#4a7a5a]">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#1a3a2a] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "17x", label: "More reviews collected", icon: TrendingUp },
              { value: "4.8", label: "Average star rating achieved", icon: Star },
              { value: "8s", label: "Average time to leave a review", icon: Mic },
              { value: "52%", label: "Customer conversion rate", icon: CheckCircle2 },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-[#52b788]" />
                <p className="text-4xl font-bold mb-1 text-[#e4f5d6]">{stat.value}</p>
                <p className="text-sm text-[#95d5b2]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4 text-[#1a3a2a] font-serif">
              Simple Pricing, Real Results
            </h2>
            <p className="text-lg text-[#4a7a5a]">
              Start free. Upgrade when you see the reviews coming in.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                desc: "Try it out with one location",
                features: [
                  "1 location",
                  "25 reviews/month",
                  "Basic AI generation",
                  "Google posting",
                  "Email support",
                ],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                desc: "For businesses getting serious about reviews",
                features: [
                  "1 location",
                  "100 reviews/month",
                  "Voice capture",
                  "Multi-platform posting",
                  "AI response drafts",
                  "Basic analytics",
                ],
                cta: "Start Free Trial",
                highlight: false,
              },
              {
                name: "Growth",
                price: "$79",
                period: "/month",
                desc: "The most popular choice for growing businesses",
                features: [
                  "3 locations",
                  "Unlimited reviews",
                  "SMS + QR triggers",
                  "AI auto-responses",
                  "Full analytics suite",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                highlight: true,
              },
              {
                name: "Business",
                price: "$199",
                period: "/month",
                desc: "For multi-location operations",
                features: [
                  "10 locations",
                  "Unlimited everything",
                  "White-label option",
                  "API access",
                  "Competitor tracking",
                  "Dedicated account manager",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.highlight
                    ? "border-[#2d6a4f] border-2 shadow-lg"
                    : "border-[#b8dca8]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f0d040] text-[#1a3a2a] text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-[#1a3a2a]">{plan.name}</h3>
                  <div className="mt-2 mb-1">
                    <span className="text-3xl font-bold text-[#1a3a2a]">
                      {plan.price}
                    </span>
                    <span className="text-sm text-[#4a7a5a]">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-[#4a7a5a] mb-4">{plan.desc}</p>
                  <Button
                    className={`w-full ${
                      plan.highlight
                        ? "bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
                        : "bg-[#d4f0c0] hover:bg-[#b8dca8] text-[#1a3a2a]"
                    }`}
                    asChild
                  >
                    <Link href="/register">{plan.cta}</Link>
                  </Button>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="text-sm text-[#4a7a5a] flex items-center gap-2"
                      >
                        <Check className="h-3.5 w-3.5 text-[#2d6a4f] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a3a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#e4f5d6] font-serif">
            Stop Losing Customers to a Bad Star Rating
          </h2>
          <p className="text-lg text-[#95d5b2] mb-8">
            Every day without ReviewForge, dozens of happy customers leave your
            business without saying a word online. Their silence costs you real
            money. Start capturing their voice today.
          </p>
          <Button size="lg" className="bg-[#f0d040] hover:bg-[#e0c030] text-[#1a3a2a] font-semibold px-8 py-6 text-base" asChild>
            <Link href="/register">
              Get Started Free
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#b8dca8] py-8 bg-[#eef8e6]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#1a3a2a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm font-serif">R</span>
            </div>
            <span className="font-bold text-[#1a3a2a]">ReviewForge</span>
          </div>
          <p className="text-sm text-[#4a7a5a]">
            Your happy customers have a lot to say. We help them say it.
          </p>
        </div>
      </footer>
    </div>
  )
}
