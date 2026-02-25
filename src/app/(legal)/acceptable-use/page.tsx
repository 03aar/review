"use client"

import {
  Check,
  X,
  Shield,
  AlertTriangle,
  Scale,
  Users,
  Code,
  Eye,
  MessageSquare,
  Zap,
  Lock,
  FileText,
  Mail,
  Clock,
  Ban,
  Flag,
  Star,
  Activity,
  Globe,
  BookOpen,
  ChevronRight,
  AlertCircle,
  UserCheck,
  Server,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const permittedUses = [
  "Collecting reviews from genuine customers via email, SMS, or in-person prompts",
  "Using AI-assisted review generation based on real customer interactions and voice captures",
  "Publishing reviews to multiple platforms (Google, Yelp, Facebook, etc.) with customer consent",
  "Analyzing review sentiment, trends, and insights through our dashboard",
  "Tracking staff performance based on customer feedback and review mentions",
  "Monitoring competitor reviews and ratings through publicly available data",
  "Embedding ReviewForge widgets and review displays on your own website",
  "Generating review response suggestions using our AI tools",
  "Exporting your review data for internal reporting and analysis",
  "Using the API within documented rate limits for custom integrations",
]

const prohibitedActions = [
  "Creating, purchasing, or soliciting fake or fabricated reviews",
  "Offering payment, discounts, or gifts in exchange for positive reviews",
  "Cherry-picking only positive customer interactions for AI enhancement",
  "Using ReviewForge on behalf of individuals who have not given consent",
  "Circumventing or attempting to bypass platform rate limits",
  "Reverse engineering, decompiling, or disassembling the AI models",
  "Sharing account credentials or API keys with unauthorized parties",
  "Generating reviews containing false claims or misleading information",
  "Attempting to access, modify, or delete other users\u2019 data",
  "Conducting DDoS attacks or unauthorized load testing against our systems",
]

const severityLevels = [
  {
    level: "Warning",
    color: "#FFE566",
    icon: AlertTriangle,
    description: "First-time minor violations receive a written warning with guidance on how to correct the behavior. You have 7 days to remedy the issue.",
  },
  {
    level: "Temporary Suspension",
    color: "#FFDAB5",
    icon: Clock,
    description: "Repeated minor violations or first-time moderate violations result in a 7-day account suspension. All scheduled campaigns are paused.",
  },
  {
    level: "Permanent Ban",
    color: "#FFB5B5",
    icon: Ban,
    description: "Severe violations or repeated moderate violations lead to permanent account termination. All data is retained for 30 days per our data policy.",
  },
  {
    level: "Legal Action",
    color: "#FFB5B5",
    icon: Scale,
    description: "Egregious violations involving fraud, data theft, or actions causing significant harm may result in civil or criminal legal proceedings.",
  },
]

const detailedProhibitions = [
  {
    title: "Review Manipulation",
    icon: MessageSquare,
    color: "#FFB5B5",
    items: [
      "Creating fake reviews or testimonials that do not reflect genuine customer experiences",
      "Incentivizing reviews through payment, discounts, free products, or other compensation in exchange for positive reviews (note: asking customers for honest, uncompensated reviews is permitted and encouraged)",
      "Selectively cherry-picking only positive customer interactions for AI-powered review enhancement while discarding negative or neutral feedback",
      "Using ReviewForge to post reviews on behalf of individuals who have not explicitly consented to the process",
      "Manipulating review timestamps to make reviews appear more recent than they are",
      "Creating multiple accounts to generate reviews for the same business",
      "Using AI enhancement to fundamentally alter the meaning or sentiment of a customer\u2019s original feedback",
    ],
  },
  {
    title: "Platform Abuse",
    icon: Server,
    color: "#FFDAB5",
    items: [
      "Circumventing, bypassing, or attempting to exceed documented API rate limits",
      "Automated scraping of ReviewForge data, interfaces, or content without written authorization",
      "Reverse engineering, decompiling, or disassembling any part of the ReviewForge AI models or algorithms",
      "Using API keys for purposes not authorized under your subscription plan",
      "Sharing, selling, or transferring account credentials to unauthorized third parties",
      "Creating automated systems that interact with ReviewForge without using our official API",
      "Reselling ReviewForge services without an authorized reseller agreement",
    ],
  },
  {
    title: "Content Violations",
    icon: FileText,
    color: "#D4CCFF",
    items: [
      "Generating reviews that contain demonstrably false claims about products, services, or experiences",
      "Creating or distributing defamatory, libelous, or slanderous content through our platform",
      "Publishing content containing hate speech, discrimination, or harassment targeting individuals or groups",
      "Including personally identifiable information (PII) of others without their explicit consent",
      "Using ReviewForge to conduct competitive sabotage by generating negative reviews about competitors",
      "Posting content that infringes on intellectual property rights, trademarks, or copyrights",
      "Generating sexually explicit, violent, or otherwise inappropriate content through AI tools",
    ],
  },
  {
    title: "Technical Violations",
    icon: Code,
    color: "#C8F5D4",
    items: [
      "Attempting to access, read, modify, or delete data belonging to other ReviewForge users",
      "Exploiting security vulnerabilities rather than reporting them through our responsible disclosure program",
      "Conducting distributed denial-of-service (DDoS) attacks or unauthorized load/stress testing",
      "Injecting malicious code, scripts, or payloads into any ReviewForge interface or API endpoint",
      "Attempting to intercept, monitor, or eavesdrop on communications between ReviewForge and third-party platforms",
      "Tampering with audit logs, analytics data, or reporting mechanisms",
      "Using ReviewForge infrastructure to host, distribute, or execute malware",
    ],
  },
  {
    title: "Legal Violations",
    icon: Scale,
    color: "#FFE566",
    items: [
      "Violating the terms of service of third-party review platforms including Google, Yelp, Facebook, TripAdvisor, and others",
      "Engaging in practices that violate consumer protection laws in your jurisdiction, including the FTC Act and equivalent regulations",
      "Breaching advertising standards set by the FTC, ASA, or equivalent regulatory bodies regarding endorsements and testimonials",
      "Using ReviewForge in ways that violate GDPR, CCPA, or other applicable data protection legislation",
      "Facilitating or participating in any form of wire fraud, identity theft, or deceptive business practices",
    ],
  },
]

const apiRules = [
  {
    label: "Business Plan",
    limit: "1,000 requests/minute",
    color: "#C8F5D4",
  },
  {
    label: "Growth Plan",
    limit: "100 requests/minute",
    color: "#FFE566",
  },
]

export default function AcceptableUsePolicyPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Decorative Shapes */}
      <div className="absolute top-32 left-8 w-16 h-16 bg-[#D4CCFF] rounded-full opacity-30 blur-sm pointer-events-none" />
      <div className="absolute top-64 right-12 w-24 h-24 bg-[#FFE566] rounded-2xl rotate-12 opacity-20 blur-sm pointer-events-none" />
      <div className="absolute top-[500px] left-[5%] w-12 h-12 bg-[#FFB5B5] rounded-full opacity-25 pointer-events-none" />
      <div className="absolute top-[900px] right-[8%] w-20 h-20 bg-[#C8F5D4] rounded-3xl rotate-45 opacity-20 pointer-events-none" />
      <div className="absolute top-[1400px] left-[3%] w-14 h-14 bg-[#FFDAB5] rounded-full opacity-25 blur-sm pointer-events-none" />
      <div className="absolute top-[2000px] right-[6%] w-18 h-18 bg-[#D4CCFF] rounded-2xl rotate-[-15deg] opacity-20 pointer-events-none" />
      <div className="absolute top-[2800px] left-[7%] w-16 h-16 bg-[#FFE566] rounded-full opacity-20 pointer-events-none" />
      <div className="absolute top-[3500px] right-[4%] w-12 h-12 bg-[#FFB5B5] rounded-2xl rotate-30 opacity-25 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a] mb-8">
            <Scale className="h-3.5 w-3.5" />
            Acceptable Use Policy
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1a2e1a] leading-[1.1] tracking-tight mb-6"
            style={font}
          >
            PLAY FAIR,
            <br />
            <span className="relative inline-block">
              GROW TOGETHER
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 C50 2, 100 2, 150 6 S250 10, 298 4" stroke="#D4CCFF" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto leading-relaxed mb-8">
            ReviewForge is built on trust and authenticity. This policy outlines how you can use
            our platform responsibly to grow your business while maintaining the integrity of the
            review ecosystem for everyone.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-[#1a2e1a]/40">
            <Clock className="h-4 w-4" />
            Effective Date: February 25, 2026
          </div>
        </div>
      </section>

      {/* Do's and Don'ts Cards */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Do's Card */}
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#C8F5D4] rounded-xl border-2 border-[#1a2e1a] flex items-center justify-center">
                <Check className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl font-bold text-[#1a2e1a]" style={font}>
                The Green Zone
              </h2>
            </div>
            <ul className="space-y-3">
              {permittedUses.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 bg-[#C8F5D4] rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-[#1a2e1a]" />
                  </div>
                  <span className="text-sm text-[#1a2e1a]/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts Card */}
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFB5B5] rounded-xl border-2 border-[#1a2e1a] flex items-center justify-center">
                <X className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl font-bold text-[#1a2e1a]" style={font}>
                The Red Zone
              </h2>
            </div>
            <ul className="space-y-3">
              {prohibitedActions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 bg-[#FFB5B5] rounded-full flex items-center justify-center">
                    <X className="h-3 w-3 text-[#1a2e1a]" />
                  </div>
                  <span className="text-sm text-[#1a2e1a]/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 1: Purpose */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <BookOpen className="h-3.5 w-3.5" />
                Section 1
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Purpose
            </h2>
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                This Acceptable Use Policy (&quot;AUP&quot;) governs your use of ReviewForge, a product of Schroeder Technologies (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). This policy exists to maintain the trust, safety, and authenticity that are foundational to the review ecosystem.
              </p>
              <p>
                ReviewForge leverages AI to help businesses collect, enhance, and distribute genuine customer reviews. The power of this technology comes with responsibility. Authentic reviews help consumers make informed decisions and help honest businesses thrive. Fraudulent or manipulated reviews erode trust for everyone.
              </p>
              <p>
                By using ReviewForge, you agree to comply with this AUP in addition to our{" "}
                <a href="/terms" className="text-[#1a2e1a] font-semibold underline underline-offset-4 decoration-[#D4CCFF] decoration-2 hover:decoration-[#1a2e1a] transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#1a2e1a] font-semibold underline underline-offset-4 decoration-[#D4CCFF] decoration-2 hover:decoration-[#1a2e1a] transition-colors">
                  Privacy Policy
                </a>
                . Violation of this policy may result in suspension or termination of your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Permitted Uses */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <Check className="h-3.5 w-3.5" />
                Section 2
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Permitted Uses
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-6">
              ReviewForge is designed to help legitimate businesses build their online reputation through authentic customer feedback. The following uses are expressly permitted and encouraged:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MessageSquare, title: "Review Collection", desc: "Send review requests via email, SMS, QR codes, or in-person NFC taps to genuine customers who have interacted with your business." },
                { icon: Zap, title: "AI Enhancement", desc: "Use our AI to help customers articulate their genuine experiences more clearly and professionally, preserving the original meaning and sentiment." },
                { icon: Globe, title: "Multi-Platform Publishing", desc: "Distribute customer-approved reviews across Google, Yelp, Facebook, TripAdvisor, and other supported platforms with proper consent." },
                { icon: Activity, title: "Analytics & Insights", desc: "Access sentiment analysis, trend reports, and business insights derived from your collected review data." },
                { icon: Users, title: "Staff Performance", desc: "Track and reward staff members based on customer mentions and review sentiment to improve service quality." },
                { icon: Eye, title: "Competitor Monitoring", desc: "Monitor competitor reviews and ratings through publicly available data to understand market positioning." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-2xl bg-[#C8F5D4]/20 border border-[#1a2e1a]/10">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C8F5D4] rounded-lg flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1a2e1a] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Prohibited Conduct (Detailed) */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <AlertTriangle className="h-3.5 w-3.5" />
                Section 3
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Prohibited Conduct
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-8">
              The following activities are strictly prohibited when using ReviewForge. Engaging in any of these activities may result in immediate suspension or termination of your account, and in severe cases, legal action.
            </p>
            <div className="space-y-8">
              {detailedProhibitions.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-[#1a2e1a] flex items-center justify-center"
                      style={{ backgroundColor: category.color }}
                    >
                      <category.icon className="h-4 w-4 text-[#1a2e1a]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1a2e1a]" style={font}>
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2.5 ml-11">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <X className="h-4 w-4 text-[#FFB5B5] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#1a2e1a]/60 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Review Authenticity Standards */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <Star className="h-3.5 w-3.5" />
                Section 4
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Review Authenticity Standards
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-6">
              ReviewForge is committed to maintaining the highest standards of review authenticity. Our platform is designed to amplify genuine customer voices, not fabricate them. Every review processed through ReviewForge must meet the following standards:
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-bold text-[#1a2e1a]" style={font}>What Makes a Review Authentic</h3>
              <div className="grid gap-3">
                {[
                  {
                    icon: UserCheck,
                    title: "Based on Real Customer Interaction",
                    desc: "Every review must originate from a verifiable customer who has actually purchased a product or used a service from the reviewed business.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Voice Capture from Actual Customer",
                    desc: "When using ReviewForge's voice-to-review feature, the voice recording must be from the actual customer describing their genuine experience.",
                  },
                  {
                    icon: Shield,
                    title: "AI Enhancement Preserves Original Meaning",
                    desc: "Our AI tools may improve grammar, structure, and clarity, but they must never alter the core meaning, sentiment, or factual claims of the original customer feedback.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[#FFE566]/15 border border-[#1a2e1a]/10">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFE566] rounded-xl border-2 border-[#1a2e1a] flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1a2e1a] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFB5B5]/15 border border-[#FFB5B5]/30">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-[#1a2e1a]" />
                <h4 className="text-sm font-bold text-[#1a2e1a]">Prohibited Authenticity Practices</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Having employees or agents pose as customers to write reviews",
                  "Using AI to generate entirely fabricated customer experiences",
                  "Enhancing reviews in a way that changes a negative experience into a positive one",
                  "Combining multiple customer experiences into a single review",
                  "Using stock photos or fake personas for review attribution",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="h-4 w-4 text-[#FFB5B5] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1a2e1a]/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: API Usage Rules */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <Code className="h-3.5 w-3.5" />
                Section 5
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              API Usage Rules
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-6">
              Access to the ReviewForge API is subject to the following rules. Violation of these rules may result in API key revocation and account suspension.
            </p>

            <h3 className="text-lg font-bold text-[#1a2e1a] mb-4" style={font}>Rate Limits</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {apiRules.map((rule, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border-2 border-[#1a2e1a] text-center"
                  style={{ backgroundColor: rule.color }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/50 mb-2">{rule.label}</p>
                  <p className="text-2xl font-black text-[#1a2e1a]" style={font}>{rule.limit}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#1a2e1a] mb-3" style={font}>Data Access Restrictions</h3>
                <ul className="space-y-2">
                  {[
                    "API access is limited to data within your own account and authorized locations only",
                    "Bulk data exports are limited to 10,000 records per request on the Business plan",
                    "Personally identifiable information must not be stored beyond what is necessary for review processing",
                    "Cached API responses must be refreshed at least every 24 hours to ensure data accuracy",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1a2e1a]/60 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1a2e1a] mb-3" style={font}>Webhook Requirements</h3>
                <ul className="space-y-2">
                  {[
                    "Webhook endpoints must respond with a 200 status code within 30 seconds",
                    "Failed webhook deliveries will be retried up to 5 times with exponential backoff",
                    "Webhook URLs must use HTTPS and have a valid SSL certificate",
                    "You must validate webhook signatures to ensure requests originate from ReviewForge",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1a2e1a]/60 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1a2e1a] mb-3" style={font}>Attribution Requirements</h3>
                <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                  If you display ReviewForge data in a public-facing application, you must include appropriate attribution with a &quot;Powered by ReviewForge&quot; badge or text link. Custom attribution formats may be approved upon request by contacting our partnerships team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Enforcement */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFDAB5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <Shield className="h-3.5 w-3.5" />
                Section 6
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Enforcement
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-6">
              Schroeder Technologies reserves the right to investigate and take appropriate action against any user who violates this AUP. Our enforcement process is designed to be fair, transparent, and proportionate.
            </p>

            <h3 className="text-lg font-bold text-[#1a2e1a] mb-4" style={font}>Enforcement Process</h3>
            <div className="space-y-4 mb-8">
              {[
                { step: "1", title: "Detection", desc: "Violations are detected through automated monitoring systems, user reports, or periodic audits of platform activity." },
                { step: "2", title: "Investigation", desc: "Our Trust & Safety team reviews the flagged activity, gathering evidence and context before making any determination." },
                { step: "3", title: "Notification", desc: "The account holder is notified of the alleged violation with specific details of the activity in question." },
                { step: "4", title: "Response Window", desc: "You have 5 business days to respond to the notification with an explanation or evidence of compliance." },
                { step: "5", title: "Determination", desc: "Based on the investigation and your response, our team determines the appropriate action per the graduated penalty framework." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#FFDAB5] rounded-full border-2 border-[#1a2e1a] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#1a2e1a]">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1a2e1a] mb-0.5">{item.title}</h4>
                    <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-[#1a2e1a] mb-4" style={font}>Appeal Process</h3>
            <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
              If you believe an enforcement action was taken in error, you may file an appeal within 14 days of the decision by emailing{" "}
              <a href="mailto:appeals@reviewforge.com" className="text-[#1a2e1a] font-semibold underline underline-offset-4 decoration-[#FFDAB5] decoration-2 hover:decoration-[#1a2e1a] transition-colors">
                appeals@reviewforge.com
              </a>
              . Appeals are reviewed by a senior member of our Trust & Safety team who was not involved in the original decision. You will receive a response within 10 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Reporting Violations */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <Flag className="h-3.5 w-3.5" />
                Section 7
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Reporting Violations
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-6">
              Maintaining the integrity of ReviewForge is a shared responsibility. If you become aware of any activity that violates this AUP, we encourage you to report it promptly.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Mail, title: "Email Report", desc: "Send details of the violation to abuse@reviewforge.com with as much evidence as possible.", color: "#C8F5D4" },
                { icon: Flag, title: "In-App Report", desc: "Use the \"Report\" button available on any review, profile, or activity within the ReviewForge dashboard.", color: "#FFE566" },
                { icon: Lock, title: "Anonymous Tip", desc: "Submit an anonymous report through our secure reporting form if you wish to remain unidentified.", color: "#D4CCFF" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border-2 border-[#1a2e1a] text-center" style={{ backgroundColor: item.color }}>
                  <div className="w-10 h-10 bg-white rounded-xl border-2 border-[#1a2e1a] flex items-center justify-center mx-auto mb-3">
                    <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1a2e1a] mb-1">{item.title}</h4>
                  <p className="text-xs text-[#1a2e1a]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a2e1a]" style={font}>What Happens When You Report</h3>
              <ul className="space-y-2">
                {[
                  "You receive an acknowledgment within 24 hours confirming receipt of your report",
                  "Our Trust & Safety team investigates the reported activity within 3 business days",
                  "You are notified of the outcome once the investigation is complete (unless the report was anonymous)",
                  "Appropriate enforcement action is taken per our graduated penalty framework",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1a2e1a]/60 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-[#C8F5D4]/20 border border-[#C8F5D4]/50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-[#1a2e1a]" />
                <h4 className="text-sm font-bold text-[#1a2e1a]">Protection for Reporters</h4>
              </div>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                Schroeder Technologies prohibits any form of retaliation against individuals who report violations in good faith. If you experience retaliation after making a report, please contact us immediately at{" "}
                <a href="mailto:abuse@reviewforge.com" className="text-[#1a2e1a] font-semibold underline underline-offset-4 decoration-[#C8F5D4] decoration-2 hover:decoration-[#1a2e1a] transition-colors">
                  abuse@reviewforge.com
                </a>
                . False or malicious reports made to harm another user are themselves a violation of this policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Consequences / Graduated Penalties */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <AlertTriangle className="h-3.5 w-3.5" />
                Section 8
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Consequences
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-8">
              We use a graduated penalty system to address violations proportionately. The severity of the consequence depends on the nature of the violation, its impact, and whether it is a first or repeated offense.
            </p>
            <div className="space-y-4">
              {severityLevels.map((level, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: `${level.color}20` }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl border-2 border-[#1a2e1a] flex items-center justify-center"
                    style={{ backgroundColor: level.color }}
                  >
                    <level.icon className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-bold text-[#1a2e1a]" style={font}>{level.level}</h3>
                      <div
                        className="w-2.5 h-2.5 rounded-full border border-[#1a2e1a]/30"
                        style={{ backgroundColor: level.color }}
                      />
                    </div>
                    <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Changes to Policy */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <FileText className="h-3.5 w-3.5" />
                Section 9
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Changes to This Policy
            </h2>
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Schroeder Technologies reserves the right to modify this Acceptable Use Policy at any time. When we make changes, we will:
              </p>
              <ul className="space-y-2 ml-1">
                {[
                  "Update the \"Effective Date\" at the top of this page",
                  "Notify all active users via email at least 30 days before material changes take effect",
                  "Post a prominent notice within the ReviewForge dashboard",
                  "Maintain a changelog of previous policy versions accessible from our legal page",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="h-4 w-4 text-[#D4CCFF] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Your continued use of ReviewForge after the effective date of any changes constitutes your acceptance of the updated policy. If you do not agree with the revised terms, you must discontinue use of the platform and contact us to close your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Contact */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFDAB5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
                <Mail className="h-3.5 w-3.5" />
                Section 10
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] mb-4" style={font}>
              Contact Us
            </h2>
            <p className="text-[#1a2e1a]/60 leading-relaxed mb-6">
              If you have questions about this Acceptable Use Policy, need to report a violation, or want to discuss specific use cases, please reach out to us.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FFDAB5]/20 border border-[#1a2e1a]/10">
                <h4 className="text-sm font-bold text-[#1a2e1a] mb-2">Report Abuse</h4>
                <a
                  href="mailto:abuse@reviewforge.com"
                  className="text-sm text-[#1a2e1a] font-semibold underline underline-offset-4 decoration-[#FFDAB5] decoration-2 hover:decoration-[#1a2e1a] transition-colors"
                >
                  abuse@reviewforge.com
                </a>
                <p className="text-xs text-[#1a2e1a]/40 mt-2">For reporting policy violations and suspicious activity</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#D4CCFF]/20 border border-[#1a2e1a]/10">
                <h4 className="text-sm font-bold text-[#1a2e1a] mb-2">General Legal Inquiries</h4>
                <a
                  href="mailto:legal@schroedertech.com"
                  className="text-sm text-[#1a2e1a] font-semibold underline underline-offset-4 decoration-[#D4CCFF] decoration-2 hover:decoration-[#1a2e1a] transition-colors"
                >
                  legal@schroedertech.com
                </a>
                <p className="text-xs text-[#1a2e1a]/40 mt-2">Schroeder Technologies legal department</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#1a2e1a]/10">
              <p className="text-xs text-[#1a2e1a]/40 leading-relaxed">
                ReviewForge is a product of Schroeder Technologies. This Acceptable Use Policy is incorporated by reference into our Terms of Service. In the event of a conflict between this AUP and the Terms of Service, the Terms of Service shall prevail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
