"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileText,
  Calendar,
  Clock,
  Shield,
  CreditCard,
  AlertTriangle,
  Mic,
  Globe,
  Bot,
  Scale,
  Lock,
  Server,
  Users,
  Gavel,
  RefreshCw,
  LogOut,
  BookOpen,
  Mail,
  ChevronRight,
  ArrowUpRight,
  Hash,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const accentColors = {
  mint: "#C8F5D4",
  yellow: "#FFE566",
  pink: "#FFB5B5",
  lavender: "#D4CCFF",
  peach: "#FFDAB5",
}

const sections = [
  { id: "agreement", number: "01", title: "Agreement to Terms", icon: FileText, color: accentColors.mint },
  { id: "description", number: "02", title: "Description of Service", icon: Mic, color: accentColors.yellow },
  { id: "account", number: "03", title: "Account Registration & Security", icon: Lock, color: accentColors.pink },
  { id: "billing", number: "04", title: "Subscription Plans & Billing", icon: CreditCard, color: accentColors.lavender },
  { id: "acceptable-use", number: "05", title: "Acceptable Use", icon: Shield, color: accentColors.peach },
  { id: "user-content", number: "06", title: "User Content & Reviews", icon: Users, color: accentColors.mint },
  { id: "ai-content", number: "07", title: "AI-Generated Content", icon: Bot, color: accentColors.yellow },
  { id: "intellectual-property", number: "08", title: "Intellectual Property", icon: Sparkles, color: accentColors.pink },
  { id: "third-party", number: "09", title: "Third-Party Platforms", icon: Globe, color: accentColors.lavender },
  { id: "privacy", number: "10", title: "Privacy & Data Protection", icon: Lock, color: accentColors.peach },
  { id: "api-terms", number: "11", title: "API Terms of Use", icon: Server, color: accentColors.mint },
  { id: "liability", number: "12", title: "Limitation of Liability", icon: AlertTriangle, color: accentColors.yellow },
  { id: "indemnification", number: "13", title: "Indemnification", icon: Scale, color: accentColors.pink },
  { id: "disputes", number: "14", title: "Dispute Resolution", icon: Gavel, color: accentColors.lavender },
  { id: "modifications", number: "15", title: "Modifications to Terms", icon: RefreshCw, color: accentColors.peach },
  { id: "termination", number: "16", title: "Termination", icon: LogOut, color: accentColors.mint },
  { id: "general", number: "17", title: "General Provisions", icon: BookOpen, color: accentColors.yellow },
  { id: "contact", number: "18", title: "Contact Information", icon: Mail, color: accentColors.pink },
]

const keyPoints = [
  {
    icon: CheckCircle2,
    color: accentColors.mint,
    title: "30-Day Money Back",
    description:
      "Not satisfied with ReviewForge? Get a full refund within the first 30 days of any paid subscription. No questions asked, no hoops to jump through.",
  },
  {
    icon: Shield,
    color: accentColors.yellow,
    title: "Your Reviews, Your Data",
    description:
      "You retain ownership of all customer reviews and data collected through ReviewForge. If you leave, you get a full 30-day data export window.",
  },
  {
    icon: Bot,
    color: accentColors.lavender,
    title: "AI Content Responsibility",
    description:
      "Our AI generates review drafts from customer voice input. You are responsible for reviewing and approving all AI-generated content before it is posted to any platform.",
  },
  {
    icon: Scale,
    color: accentColors.pink,
    title: "Fair Dispute Resolution",
    description:
      "Disputes are resolved through binding arbitration in Delaware. Small claims court remains available. Class action waiver applies to all users.",
  },
]

export default function TermsOfServicePage() {
  const [expandedToc, setExpandedToc] = useState(true)

  return (
    <div className="bg-[#FFF8F0]">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-20 left-[6%] w-16 h-16 bg-[#FFE566] rounded-full opacity-50" />
        <div className="absolute top-40 right-[8%] w-12 h-12 bg-[#FFB5B5] rounded-2xl opacity-50 rotate-12" />
        <div className="absolute bottom-32 left-[12%] w-10 h-10 bg-[#D4CCFF] rounded-xl opacity-50 -rotate-12" />
        <div className="absolute top-56 right-[22%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-40" />
        <div className="absolute bottom-20 right-[6%] w-14 h-14 bg-[#FFDAB5] rounded-2xl opacity-40 rotate-6" />
        <div className="absolute top-32 left-[35%] w-6 h-6 bg-[#FFB5B5] rounded-full opacity-30" />
        <div className="absolute bottom-40 left-[45%] w-10 h-10 bg-[#FFE566] rounded-xl opacity-30 rotate-45" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
            <FileText className="h-3.5 w-3.5" />
            Terms of Service
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05] mb-6"
            style={font}
          >
            THE RULES OF{" "}
            <span className="relative inline-block">
              <span className="relative z-10">THE ROAD</span>
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            These Terms of Service govern your use of ReviewForge, the AI-powered review platform
            operated by Schroeder Technologies, Inc. Please read them carefully before using our
            services.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]">
              <Calendar className="h-4 w-4 text-[#1a2e1a]/60" />
              Effective: February 25, 2026
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]">
              <Clock className="h-4 w-4 text-[#1a2e1a]/60" />
              ~18 min read
            </div>
          </div>
        </div>
      </section>

      {/* Key Points Cards */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
              <Info className="h-3.5 w-3.5" />
              Key Points at a Glance
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyPoints.map((point) => (
              <div
                key={point.title}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: point.color }}
                >
                  <point.icon className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <h3 className="text-base font-bold text-[#1a2e1a] mb-2" style={font}>
                  {point.title}
                </h3>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] overflow-hidden">
            <button
              onClick={() => setExpandedToc(!expandedToc)}
              className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4CCFF] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <Hash className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1a2e1a]" style={font}>
                    TABLE OF CONTENTS
                  </h2>
                  <p className="text-xs text-[#1a2e1a]/40 mt-0.5">18 sections</p>
                </div>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-[#1a2e1a]/40 transition-transform duration-200 ${
                  expandedToc ? "rotate-90" : ""
                }`}
              />
            </button>
            {expandedToc && (
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                <div className="border-t-2 border-[#1a2e1a]/10 pt-6">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#FFF8F0] transition-colors group"
                      >
                        <span
                          className="text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center border-2 border-[#1a2e1a] shrink-0"
                          style={{ backgroundColor: section.color }}
                        >
                          {section.number}
                        </span>
                        <span className="text-sm font-medium text-[#1a2e1a]/70 group-hover:text-[#1a2e1a] transition-colors">
                          {section.title}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#1a2e1a]/20 group-hover:text-[#1a2e1a]/50 ml-auto transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Legal Content */}
      <section className="pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Section 1: Agreement to Terms */}
          <LegalSection id="agreement" number="01" title="Agreement to Terms" icon={FileText} color={accentColors.mint}>
            <p>
              These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding agreement between you
              (&quot;User&quot;, &quot;you&quot;, &quot;your&quot;) and <strong>Schroeder Technologies, Inc.</strong>, a Delaware corporation
              (&quot;Schroeder Technologies&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), governing your access to and use of the
              ReviewForge platform, including our website at reviewforge.com, mobile applications, APIs, and all
              related services (collectively, the &quot;Service&quot;).
            </p>
            <p>
              By accessing or using ReviewForge, clicking &quot;I Agree&quot;, creating an account, or otherwise
              indicating your acceptance of these Terms, you acknowledge that you have read, understood, and
              agree to be bound by this Agreement. If you do not agree to these Terms, you must not access or
              use the Service.
            </p>
            <h4>Eligibility</h4>
            <p>
              You must meet the following requirements to use ReviewForge:
            </p>
            <ul>
              <li>You must be at least 18 years of age or the age of legal majority in your jurisdiction, whichever is greater.</li>
              <li>If you are using ReviewForge on behalf of a business, organization, or other legal entity, you represent and warrant that you are an authorized representative of that entity with the authority to bind the entity to these Terms.</li>
              <li>You must not have been previously suspended or removed from the Service by Schroeder Technologies.</li>
              <li>You must not be located in, or a national or resident of, any country subject to U.S. government trade sanctions or embargoes.</li>
              <li>Your use of the Service must comply with all applicable local, state, national, and international laws and regulations.</li>
            </ul>
            <p>
              If you are entering into this Agreement on behalf of a company or other legal entity, you represent
              that you have the authority to bind such entity and its affiliates to these Terms, in which case the
              terms &quot;you&quot; and &quot;your&quot; shall refer to such entity.
            </p>
          </LegalSection>

          {/* Section 2: Description of Service */}
          <LegalSection id="description" number="02" title="Description of Service" icon={Mic} color={accentColors.yellow}>
            <p>
              ReviewForge is an AI-powered reputation management platform designed to help businesses
              capture, generate, manage, and respond to customer reviews across multiple online platforms.
              The Service includes, but is not limited to, the following features and capabilities:
            </p>
            <h4>Core Features</h4>
            <ul>
              <li>
                <strong>AI-Powered Voice Review Capture:</strong> ReviewForge enables your customers to leave reviews
                by speaking naturally into their device&apos;s microphone. Our proprietary speech-to-text AI
                transcribes and processes the customer&apos;s spoken words, capturing their genuine sentiment and
                specific details about their experience.
              </li>
              <li>
                <strong>AI Review Generation:</strong> Our machine learning models transform raw customer voice input
                into polished, detailed, and authentic-sounding written reviews. The AI preserves the customer&apos;s
                original intent, specific mentions (such as staff names, dishes, products), and overall sentiment
                while enhancing the review with proper grammar, structure, and detail.
              </li>
              <li>
                <strong>Multi-Platform Posting:</strong> ReviewForge allows customers to post their generated reviews
                across multiple third-party review platforms, including but not limited to Google Business
                Profile, Yelp, Facebook, and TripAdvisor, with a single tap or click.
              </li>
              <li>
                <strong>Review Analytics Dashboard:</strong> Comprehensive analytics and reporting tools that track
                review volume, average ratings, sentiment trends, customer satisfaction scores, keyword
                frequency, competitor comparisons, and other reputation metrics over time.
              </li>
              <li>
                <strong>AI Response Engine:</strong> An automated review response system that generates personalized,
                contextually appropriate replies to customer reviews. Users may configure the engine for manual
                approval mode or fully automated &quot;autopilot&quot; mode.
              </li>
              <li>
                <strong>Smart Triggers:</strong> Multiple customer engagement channels designed to capture reviews at
                the optimal moment, including SMS text messages, QR codes for in-location displays, NFC
                (Near-Field Communication) tap technology, email follow-ups, and point-of-sale (POS) system
                integrations.
              </li>
            </ul>
            <h4>Service Availability</h4>
            <p>
              Schroeder Technologies will use commercially reasonable efforts to make ReviewForge available
              24 hours a day, 7 days a week, except during planned maintenance windows (for which we will
              provide advance notice when practicable) and unplanned service disruptions. We do not guarantee
              uninterrupted access to the Service and shall not be liable for any unavailability.
            </p>
            <p>
              We reserve the right to modify, update, enhance, or discontinue any feature or aspect of the
              Service at any time, with or without notice. Material changes to core features will be communicated
              to active subscribers at least 14 days in advance.
            </p>
          </LegalSection>

          {/* Section 3: Account Registration and Security */}
          <LegalSection id="account" number="03" title="Account Registration & Security" icon={Lock} color={accentColors.pink}>
            <h4>Account Creation</h4>
            <p>
              To access ReviewForge&apos;s features, you must create an account by providing accurate, current, and
              complete information, including your full legal name (or authorized business name), valid email
              address, business address, phone number, and any other information requested during the
              registration process. You agree to update your account information promptly to keep it accurate
              and current at all times.
            </p>
            <h4>Business Verification</h4>
            <p>
              For certain subscription plans and features, Schroeder Technologies may require business
              verification. This process may include, but is not limited to, verification of your business name,
              physical address, tax identification number, business license or registration documents, and
              ownership or authorization credentials. We reserve the right to deny or revoke access to any
              account that fails our verification procedures.
            </p>
            <h4>Password and Security</h4>
            <p>
              You are solely responsible for maintaining the confidentiality of your account credentials,
              including your password and any API keys associated with your account. You agree to:
            </p>
            <ul>
              <li>Create a strong, unique password that is not used for any other online service or account.</li>
              <li>Enable two-factor authentication (2FA) when available, especially for accounts with administrative privileges.</li>
              <li>Not share your login credentials, API keys, or account access with any unauthorized third party.</li>
              <li>Immediately notify Schroeder Technologies at <a href="mailto:security@schroedertech.com">security@schroedertech.com</a> of any unauthorized access to or use of your account, or any other breach of security.</li>
              <li>Accept full responsibility for all activities that occur under your account, whether or not you have authorized such activities.</li>
            </ul>
            <h4>Account Suspension and Termination</h4>
            <p>
              Schroeder Technologies reserves the right to suspend or terminate your account, without prior
              notice, if we reasonably believe that: (a) you have violated any provision of these Terms; (b) your
              account has been compromised; (c) your use of the Service poses a security risk to the platform
              or other users; (d) you have engaged in fraudulent, abusive, or illegal activity; or (e) you have
              failed to pay applicable fees for more than 15 days past the due date.
            </p>
          </LegalSection>

          {/* Section 4: Subscription Plans and Billing */}
          <LegalSection id="billing" number="04" title="Subscription Plans & Billing" icon={CreditCard} color={accentColors.lavender}>
            <h4>Available Plans</h4>
            <p>
              ReviewForge offers the following subscription tiers, each with distinct features and limitations:
            </p>
            <div className="space-y-3 my-4">
              <PlanCard name="Free" price="$0" period="forever" color={accentColors.mint}
                features={["1 business location", "25 reviews per month", "Basic AI review generation", "Google Business Profile posting only", "Email support (48-hour response time)"]}
              />
              <PlanCard name="Starter" price="$29" period="/month" color={accentColors.yellow}
                features={["1 business location", "100 reviews per month", "Full voice capture functionality", "Multi-platform posting (Google, Yelp, Facebook)", "AI-powered review responses (manual approval)", "Basic analytics and reporting"]}
              />
              <PlanCard name="Growth" price="$79" period="/month" color={accentColors.peach}
                features={["Up to 3 business locations", "Unlimited reviews", "SMS and QR code smart triggers", "AI auto-response engine (autopilot mode)", "Full analytics dashboard with sentiment tracking", "Priority email and chat support (4-hour response time)"]}
              />
              <PlanCard name="Business" price="$199" period="/month" color={accentColors.lavender}
                features={["Up to 10 business locations", "Everything unlimited", "White-label branding and customization", "Full API access with dedicated endpoints", "Competitor tracking and benchmarking", "Dedicated account manager", "NFC tap and POS integrations", "Custom reporting and data exports"]}
              />
            </div>
            <h4>Billing and Auto-Renewal</h4>
            <p>
              All paid subscription plans are billed on a recurring monthly basis unless you select annual billing
              (where available, at a discounted rate). Your subscription will automatically renew at the end of
              each billing period unless you cancel before the renewal date. The renewal charge will be at the
              then-current subscription rate, which Schroeder Technologies may adjust with at least 30 days&apos;
              written notice.
            </p>
            <h4>Payment Processing</h4>
            <p>
              All payments are processed through our third-party payment processor, Stripe. By providing your
              payment information, you authorize Schroeder Technologies and Stripe to charge your designated
              payment method for all applicable fees. You agree to provide valid and current payment information
              and to update it promptly if it changes. Failed payment attempts may result in temporary suspension
              of your account until the balance is settled.
            </p>
            <h4>Cancellation</h4>
            <p>
              You may cancel your subscription at any time through your account settings in the ReviewForge
              dashboard or by contacting our support team at <a href="mailto:support@reviewforge.com">support@reviewforge.com</a>. Upon
              cancellation, your paid features will remain active until the end of your current billing period.
              After the billing period expires, your account will be downgraded to the Free plan. No partial
              refunds are issued for unused portions of a billing period, except as described in our refund policy
              below.
            </p>
            <h4>30-Day Money-Back Guarantee</h4>
            <p>
              Schroeder Technologies offers a 30-day money-back guarantee on all paid subscription plans. If
              you are not satisfied with ReviewForge for any reason, you may request a full refund of your most
              recent subscription payment within 30 days of your initial purchase or most recent upgrade. To
              request a refund, contact our billing team at <a href="mailto:billing@schroedertech.com">billing@schroedertech.com</a> with
              your account email and the reason for your refund request. Refunds are processed within 5-10
              business days and returned to your original payment method. This guarantee applies only to the
              first billing cycle of a new subscription or plan upgrade.
            </p>
          </LegalSection>

          {/* Section 5: Acceptable Use */}
          <LegalSection id="acceptable-use" number="05" title="Acceptable Use" icon={Shield} color={accentColors.peach}>
            <h4>Permitted Uses</h4>
            <p>
              ReviewForge is intended for legitimate business use. You may use the Service to:
            </p>
            <ul>
              <li>Invite genuine customers to leave honest reviews about their real experiences with your business.</li>
              <li>Use the AI voice-to-review feature to help real customers articulate their authentic feedback.</li>
              <li>Manage and respond to customer reviews across supported platforms.</li>
              <li>Analyze review data and customer sentiment to improve your business operations.</li>
              <li>Share review collection links, QR codes, and NFC triggers with your actual customers.</li>
            </ul>
            <h4>Prohibited Conduct</h4>
            <p>
              You agree that you will NOT use ReviewForge to engage in any of the following activities, and that
              violation of these prohibitions may result in immediate suspension or termination of your account
              without refund:
            </p>
            <ul>
              <li>
                <strong>Fake or Fabricated Reviews:</strong> Creating, generating, posting, or facilitating reviews that do
                not reflect genuine customer experiences. This includes using the Service to generate reviews
                from fictitious persons, creating reviews for yourself or your own business, or soliciting reviews
                from individuals who have not actually patronized your business.
              </li>
              <li>
                <strong>Review Manipulation:</strong> Artificially inflating or deflating ratings for any business, including
                your own or a competitor&apos;s. This includes selectively gating reviews (directing only positive
                reviewers to public platforms while suppressing negative feedback), offering incentives conditioned
                on positive review content, or bulk-generating reviews through automated or scripted means.
              </li>
              <li>
                <strong>Harassment or Abuse:</strong> Using the Service to harass, bully, defame, threaten, or
                intimidate any individual, including customers, competitors, or Schroeder Technologies employees.
                This includes retaliating against customers who leave negative reviews.
              </li>
              <li>
                <strong>Reverse Engineering:</strong> Attempting to decompile, disassemble, reverse engineer, or
                otherwise attempt to discover the source code, algorithms, or underlying technology of ReviewForge,
                including our AI models, speech-to-text engines, or review generation systems.
              </li>
              <li>
                <strong>Scraping and Unauthorized Data Collection:</strong> Using bots, crawlers, scrapers, or other
                automated tools to extract data from ReviewForge, including review content, analytics data, user
                information, or any other information accessible through the Service.
              </li>
              <li>
                <strong>Automated Access:</strong> Accessing the Service through any automated means (including bots,
                scripts, or third-party tools) that are not expressly authorized by Schroeder Technologies or
                provided through our official API.
              </li>
              <li>
                <strong>Circumvention:</strong> Attempting to bypass, disable, or circumvent any security measures,
                rate limits, access controls, or usage restrictions implemented by Schroeder Technologies.
              </li>
              <li>
                <strong>Illegal Activity:</strong> Using the Service for any purpose that violates applicable local,
                state, national, or international law, including but not limited to laws governing consumer
                protection, unfair competition, false advertising, and data privacy.
              </li>
              <li>
                <strong>Impersonation:</strong> Misrepresenting your identity, your business, or your affiliation with
                any person or entity, or creating accounts under false pretenses.
              </li>
            </ul>
          </LegalSection>

          {/* Section 6: User Content and Reviews */}
          <LegalSection id="user-content" number="06" title="User Content & Reviews" icon={Users} color={accentColors.mint}>
            <h4>Ownership of Reviews</h4>
            <p>
              Customer reviews collected through ReviewForge are considered user-generated content. The
              original customer who provides voice input or written feedback retains ownership of their
              underlying ideas and personal expression. As the business user operating ReviewForge, you
              acknowledge that reviews belong to the customers who create them, and you do not acquire
              ownership rights over individual customer reviews simply by using our Service to facilitate their
              collection.
            </p>
            <h4>License Grant to Schroeder Technologies</h4>
            <p>
              By using ReviewForge, you grant Schroeder Technologies a worldwide, non-exclusive,
              royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish,
              translate, create derivative works from, distribute, and display any content submitted through the
              Service (including AI-generated review text, voice recordings for processing purposes, business
              information, and response templates). This license is granted for the following purposes:
            </p>
            <ul>
              <li>Operating, maintaining, and improving the ReviewForge platform and its features.</li>
              <li>Training and improving our AI models and algorithms, including our voice-to-text transcription, review generation, and sentiment analysis systems.</li>
              <li>Providing analytics, benchmarking, and aggregated insights (in de-identified form) to other users.</li>
              <li>Promoting and marketing the Service, including showcasing anonymized or aggregated examples of AI-generated reviews.</li>
            </ul>
            <p>
              This license survives termination of your account with respect to content already processed and
              integrated into our AI training data in de-identified form.
            </p>
            <h4>Accuracy of Voice-to-Review Content</h4>
            <p>
              While our AI strives for high accuracy in transcribing and transforming spoken customer feedback
              into written reviews, Schroeder Technologies does not guarantee that the AI-generated output
              will perfectly capture every nuance, detail, or intent of the original spoken input. Minor
              discrepancies may occur. You are responsible for reviewing AI-generated content and ensuring its
              accuracy before approving it for publication.
            </p>
            <h4>Right to Moderate</h4>
            <p>
              Schroeder Technologies reserves the right, but has no obligation, to review, monitor, edit,
              remove, or refuse to process any content submitted through the Service that we determine, in our
              sole discretion, violates these Terms, applicable law, or the terms of third-party platforms. We
              may also remove content that we believe is fraudulent, misleading, abusive, or otherwise harmful.
            </p>
          </LegalSection>

          {/* Section 7: AI-Generated Content */}
          <LegalSection id="ai-content" number="07" title="AI-Generated Content" icon={Bot} color={accentColors.yellow}>
            <h4>Nature of AI Output</h4>
            <p>
              ReviewForge utilizes artificial intelligence and machine learning technologies to transform
              customer voice input into written reviews, generate review responses, and provide sentiment
              analysis. You acknowledge and agree to the following regarding AI-generated content:
            </p>
            <ul>
              <li>
                <strong>No Guarantee of Accuracy:</strong> AI-generated content is produced by statistical language
                models and may contain inaccuracies, embellishments, or omissions relative to the original
                customer input. The AI may infer details, add contextual language, or restructure sentiments in
                ways that do not precisely mirror the customer&apos;s exact words or intent.
              </li>
              <li>
                <strong>User Review Responsibility:</strong> You are solely responsible for reviewing, editing, and
                approving all AI-generated review content before it is posted to any third-party platform.
                Schroeder Technologies strongly recommends that you or your authorized staff members review
                every AI-generated review for accuracy, appropriateness, and compliance with platform guidelines
                before publication. Enabling &quot;autopilot&quot; mode on the AI Response Engine is done at your own risk.
              </li>
              <li>
                <strong>No Guarantee of Platform Acceptance:</strong> Schroeder Technologies does not guarantee that
                AI-generated reviews will be accepted, published, or retained by any third-party review platform.
                Platforms such as Google, Yelp, Facebook, and TripAdvisor have their own content policies, spam
                filters, and review detection systems. Reviews posted through ReviewForge may be flagged,
                filtered, or removed by these platforms at their sole discretion.
              </li>
              <li>
                <strong>Evolving Technology:</strong> Our AI models are continuously updated and improved. The quality,
                style, and characteristics of AI-generated content may change over time as we refine our
                algorithms. We will endeavor to maintain or improve quality, but we cannot guarantee consistency
                of output across different versions of our models.
              </li>
            </ul>
            <h4>Disclosure Obligations</h4>
            <p>
              Depending on your jurisdiction, applicable laws may require disclosure that reviews have been
              facilitated or enhanced by AI technology. You are solely responsible for understanding and
              complying with any such disclosure requirements in your jurisdiction. Schroeder Technologies
              provides tools within the platform to add AI disclosure notices where required, but the
              responsibility for compliance rests with you.
            </p>
          </LegalSection>

          {/* Section 8: Intellectual Property */}
          <LegalSection id="intellectual-property" number="08" title="Intellectual Property" icon={Sparkles} color={accentColors.pink}>
            <h4>Schroeder Technologies Ownership</h4>
            <p>
              The ReviewForge platform, including all software, code, algorithms, AI models, user interface
              designs, graphics, logos, icons, audio, text, documentation, and all other materials and content
              provided through the Service (collectively, &quot;Platform IP&quot;), are and shall remain the exclusive
              property of Schroeder Technologies, Inc. and its licensors. The Platform IP is protected by
              United States and international copyright, trademark, patent, trade secret, and other intellectual
              property or proprietary rights laws.
            </p>
            <h4>Trademarks</h4>
            <p>
              &quot;ReviewForge&quot;, &quot;Schroeder Technologies&quot;, the ReviewForge logo, and all related names, logos,
              product and service names, designs, and slogans are trademarks of Schroeder Technologies, Inc.
              or its affiliates. You may not use these marks without the prior written permission of Schroeder
              Technologies. All other names, logos, product and service names, designs, and slogans on the
              Service are the trademarks of their respective owners.
            </p>
            <h4>Limited License</h4>
            <p>
              Subject to your compliance with these Terms, Schroeder Technologies grants you a limited,
              non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the
              Service solely for your internal business purposes during the term of your subscription. This
              license does not include the right to:
            </p>
            <ul>
              <li>Modify, copy, or create derivative works based on the Service or any part thereof.</li>
              <li>Sublicense, sell, resell, transfer, assign, distribute, or otherwise commercially exploit or make available to any third party the Service or any content obtained through the Service.</li>
              <li>Use any data mining, robots, or similar data gathering or extraction methods on the Service.</li>
              <li>Use the Service or any content for any purpose not expressly permitted by these Terms.</li>
              <li>Remove, alter, or obscure any proprietary notices (including copyright and trademark notices) on the Service.</li>
            </ul>
          </LegalSection>

          {/* Section 9: Third-Party Platforms */}
          <LegalSection id="third-party" number="09" title="Third-Party Platforms" icon={Globe} color={accentColors.lavender}>
            <p>
              ReviewForge integrates with various third-party review platforms and services to facilitate
              multi-platform review posting and management. These integrations currently include, but are not
              limited to:
            </p>
            <ul>
              <li><strong>Google Business Profile</strong> (formerly Google My Business)</li>
              <li><strong>Yelp</strong></li>
              <li><strong>Facebook</strong> (Meta Business Pages)</li>
              <li><strong>TripAdvisor</strong></li>
            </ul>
            <h4>Compliance with Third-Party Terms</h4>
            <p>
              You acknowledge and agree that your use of ReviewForge in connection with any third-party
              platform is also subject to that platform&apos;s own terms of service, community guidelines, content
              policies, and privacy policies. It is your sole responsibility to read, understand, and comply with
              the terms and policies of each third-party platform you connect to through ReviewForge.
            </p>
            <h4>No Responsibility for Third-Party Actions</h4>
            <p>
              Schroeder Technologies is not responsible for and shall not be liable for any actions taken by
              third-party platforms, including but not limited to:
            </p>
            <ul>
              <li>Removal, filtering, or suppression of reviews posted through ReviewForge.</li>
              <li>Suspension or termination of your account on any third-party platform.</li>
              <li>Changes to third-party APIs, terms of service, or content policies that affect ReviewForge functionality.</li>
              <li>Penalties, fines, or sanctions imposed by third-party platforms for any reason, including violations of their review policies.</li>
              <li>Data loss, corruption, or unauthorized access resulting from third-party platform vulnerabilities.</li>
            </ul>
            <p>
              Schroeder Technologies will use commercially reasonable efforts to maintain its integrations with
              third-party platforms, but we do not guarantee the continued availability, compatibility, or
              functionality of any third-party integration.
            </p>
          </LegalSection>

          {/* Section 10: Privacy and Data Protection */}
          <LegalSection id="privacy" number="10" title="Privacy & Data Protection" icon={Lock} color={accentColors.peach}>
            <p>
              Your privacy is important to Schroeder Technologies. Our collection, use, storage, and
              disclosure of personal information is governed by our{" "}
              <Link href="/privacy" className="text-[#1a2e1a] font-semibold underline underline-offset-4 hover:text-[#1a2e1a]/70 transition-colors">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using ReviewForge, you consent to the
              data practices described in the Privacy Policy.
            </p>
            <h4>Data Processing Overview</h4>
            <p>
              In the course of providing the Service, Schroeder Technologies processes the following
              categories of data:
            </p>
            <ul>
              <li><strong>Account Data:</strong> Your name, email address, business information, payment details, and login credentials.</li>
              <li><strong>Customer Voice Data:</strong> Audio recordings submitted by your customers through the voice review capture feature. These recordings are processed in real-time for transcription and are not retained after processing unless required for service improvement purposes as described in our Privacy Policy.</li>
              <li><strong>Review Content:</strong> Text content of reviews generated through the Service, including both the original transcription and the AI-enhanced version.</li>
              <li><strong>Analytics Data:</strong> Aggregated and individual metrics about review volume, ratings, sentiment, and engagement across your connected platforms.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with the ReviewForge platform, including feature usage, session duration, and interaction patterns.</li>
            </ul>
            <p>
              For businesses subject to the GDPR, CCPA, or other applicable data protection regulations,
              Schroeder Technologies offers a{" "}
              <Link href="/dpa" className="text-[#1a2e1a] font-semibold underline underline-offset-4 hover:text-[#1a2e1a]/70 transition-colors">
                Data Processing Agreement
              </Link>{" "}
              that can be executed upon request. Contact{" "}
              <a href="mailto:privacy@schroedertech.com">privacy@schroedertech.com</a> for details.
            </p>
          </LegalSection>

          {/* Section 11: API Terms */}
          <LegalSection id="api-terms" number="11" title="API Terms of Use" icon={Server} color={accentColors.mint}>
            <p>
              The ReviewForge API (&quot;API&quot;) is available exclusively to users on the <strong>Business plan
              ($199/month)</strong> and above. By accessing or using the API, you agree to the following additional
              terms:
            </p>
            <h4>API Access and Authentication</h4>
            <ul>
              <li>API access is provided through unique API keys issued to your account. You must keep your API keys confidential and secure. Any activity conducted using your API keys is your responsibility.</li>
              <li>API keys must be transmitted securely using HTTPS. Plain-text HTTP requests to the API are not supported and will be rejected.</li>
              <li>You must not share, sell, transfer, or publish your API keys. If you believe your API keys have been compromised, you must regenerate them immediately through your dashboard and notify us at <a href="mailto:api@schroedertech.com">api@schroedertech.com</a>.</li>
            </ul>
            <h4>Rate Limiting</h4>
            <p>
              API requests are subject to the following rate limits, which may be adjusted at Schroeder
              Technologies&apos; discretion:
            </p>
            <ul>
              <li><strong>Standard Rate:</strong> 1,000 requests per minute per API key.</li>
              <li><strong>Burst Rate:</strong> Up to 100 requests per second for short durations, subject to automatic throttling.</li>
              <li><strong>Daily Limit:</strong> 100,000 requests per day per account.</li>
            </ul>
            <p>
              Exceeding these rate limits will result in HTTP 429 (Too Many Requests) responses. Persistent
              abuse of rate limits may result in temporary or permanent revocation of API access.
            </p>
            <h4>Data Access Restrictions</h4>
            <ul>
              <li>API access is limited to data associated with your own account and business locations. You may not use the API to access data belonging to other ReviewForge users.</li>
              <li>Data retrieved through the API may only be used for your own internal business purposes, consistent with these Terms and our Privacy Policy.</li>
              <li>You may not use the API to build a competing product or service, or to replicate the core functionality of ReviewForge.</li>
              <li>You must comply with all applicable data protection laws when handling data obtained through the API.</li>
            </ul>
          </LegalSection>

          {/* Section 12: Limitation of Liability */}
          <LegalSection id="liability" number="12" title="Limitation of Liability" icon={AlertTriangle} color={accentColors.yellow}>
            <h4>Cap on Damages</h4>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SCHROEDER
              TECHNOLOGIES, INC., ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS,
              OR AFFILIATES BE LIABLE TO YOU FOR ANY AGGREGATE DAMAGES EXCEEDING THE GREATER OF:
              (A) THE TOTAL AMOUNT YOU PAID TO SCHROEDER TECHNOLOGIES IN THE TWELVE (12) MONTHS
              IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (B) ONE HUNDRED U.S.
              DOLLARS ($100.00).
            </p>
            <h4>Exclusion of Consequential Damages</h4>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SCHROEDER
              TECHNOLOGIES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE,
              OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, LOSS
              OF REVENUE, LOSS OF DATA, LOSS OF GOODWILL, LOSS OF BUSINESS OPPORTUNITIES, BUSINESS
              INTERRUPTION, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH: (I)
              YOUR USE OF OR INABILITY TO USE THE SERVICE; (II) ANY UNAUTHORIZED ACCESS TO OR
              ALTERATION OF YOUR DATA; (III) ANY AI-GENERATED CONTENT PRODUCED THROUGH THE SERVICE;
              (IV) ANY THIRD-PARTY PLATFORM ACTIONS INCLUDING REVIEW REMOVAL OR ACCOUNT
              SUSPENSION; (V) ANY ERRORS, INACCURACIES, OR OMISSIONS IN THE SERVICE; OR (VI) ANY
              OTHER MATTER RELATING TO THE SERVICE.
            </p>
            <h4>Force Majeure</h4>
            <p>
              Schroeder Technologies shall not be liable for any failure or delay in performance resulting from
              causes beyond our reasonable control, including but not limited to acts of God, natural disasters,
              pandemics, epidemics, war, terrorism, riots, embargoes, acts of governmental authorities,
              electrical outages, internet or telecommunications failures, cyberattacks, changes in third-party
              platform APIs or policies, or any other force majeure event.
            </p>
          </LegalSection>

          {/* Section 13: Indemnification */}
          <LegalSection id="indemnification" number="13" title="Indemnification" icon={Scale} color={accentColors.pink}>
            <p>
              You agree to indemnify, defend, and hold harmless Schroeder Technologies, Inc., its parent
              company, subsidiaries, affiliates, officers, directors, employees, agents, licensors, and
              suppliers (collectively, the &quot;Indemnified Parties&quot;) from and against any and all claims,
              liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable
              attorneys&apos; fees and court costs) arising out of or relating to:
            </p>
            <ul>
              <li>Your use or misuse of the ReviewForge Service.</li>
              <li>Any content you submit, post, or transmit through the Service, including AI-generated reviews that you approve for publication.</li>
              <li>Your violation of these Terms of Service or any applicable law, regulation, or third-party right.</li>
              <li>Your violation of any third-party review platform&apos;s terms of service or content policies.</li>
              <li>Any claim by a customer, competitor, or third party arising from reviews collected, generated, or posted through your ReviewForge account.</li>
              <li>Your negligent or willful misconduct.</li>
              <li>Any dispute between you and your customers regarding reviews or review solicitation practices.</li>
            </ul>
            <p>
              Schroeder Technologies reserves the right, at your expense, to assume the exclusive defense and
              control of any matter for which you are required to indemnify us, and you agree to cooperate with
              our defense of such claims. You agree not to settle any such matter without the prior written
              consent of Schroeder Technologies.
            </p>
          </LegalSection>

          {/* Section 14: Dispute Resolution */}
          <LegalSection id="disputes" number="14" title="Dispute Resolution" icon={Gavel} color={accentColors.lavender}>
            <h4>Mandatory Arbitration</h4>
            <p>
              Any dispute, controversy, or claim arising out of or relating to these Terms or the Service,
              including the formation, interpretation, breach, or termination thereof, shall be finally resolved
              by binding arbitration administered by the American Arbitration Association (&quot;AAA&quot;) under its
              Commercial Arbitration Rules then in effect. The arbitration shall be conducted by a single
              arbitrator selected in accordance with AAA procedures.
            </p>
            <p>
              The arbitration shall be conducted in Wilmington, Delaware, or, at the election of the claimant,
              via telephone, video conference, or written submissions. The arbitrator&apos;s decision shall be final
              and binding and may be entered as a judgment in any court of competent jurisdiction.
            </p>
            <h4>Class Action Waiver</h4>
            <p>
              YOU AND SCHROEDER TECHNOLOGIES AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL
              BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR
              REPRESENTATIVE ACTION. YOU EXPRESSLY WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS
              ACTION LAWSUIT OR CLASS-WIDE ARBITRATION AGAINST SCHROEDER TECHNOLOGIES. If any court
              or arbitrator determines that the class action waiver set forth in this section is void or
              unenforceable for any reason, or that an arbitration can proceed on a class basis, then the
              arbitration provision set forth in this section shall be deemed null and void in its entirety and
              the parties shall be deemed to have not agreed to arbitrate disputes.
            </p>
            <h4>Small Claims Exception</h4>
            <p>
              Notwithstanding the foregoing, either party may bring an individual action in small claims court
              for disputes or claims within the scope of that court&apos;s jurisdiction, provided the action is not
              transferred, removed, or appealed to a different court.
            </p>
            <h4>Governing Law</h4>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of
              Delaware, United States of America, without regard to its conflict of laws principles. For any
              disputes not subject to arbitration, you consent to the exclusive jurisdiction and venue of the
              state and federal courts located in New Castle County, Delaware.
            </p>
          </LegalSection>

          {/* Section 15: Modifications to Terms */}
          <LegalSection id="modifications" number="15" title="Modifications to Terms" icon={RefreshCw} color={accentColors.peach}>
            <p>
              Schroeder Technologies reserves the right to modify, amend, or update these Terms of Service at
              any time, at our sole discretion. When we make changes to these Terms, we will:
            </p>
            <ul>
              <li>Update the &quot;Effective Date&quot; at the top of this page to reflect the date the revised Terms take effect.</li>
              <li>Provide at least <strong>30 days&apos; advance notice</strong> of material changes via email to the address associated with your account and through a prominent notice within the ReviewForge dashboard.</li>
              <li>For non-material changes (such as formatting updates, typographical corrections, or clarifications that do not substantively alter your rights or obligations), we may update these Terms without prior notice.</li>
            </ul>
            <p>
              Your continued use of the Service after the effective date of any revised Terms constitutes your
              acceptance of the changes. If you do not agree to the modified Terms, you must stop using the
              Service and cancel your subscription before the effective date of the changes. Material changes
              will not apply retroactively and will apply only to disputes arising after the effective date.
            </p>
          </LegalSection>

          {/* Section 16: Termination */}
          <LegalSection id="termination" number="16" title="Termination" icon={LogOut} color={accentColors.mint}>
            <h4>Termination by You</h4>
            <p>
              You may terminate your account and your use of ReviewForge at any time by: (a) canceling your
              subscription through your account settings in the ReviewForge dashboard; or (b) contacting our
              support team at <a href="mailto:support@reviewforge.com">support@reviewforge.com</a> with a written
              termination request. Your termination will take effect at the end of your current billing period.
            </p>
            <h4>Termination by Schroeder Technologies</h4>
            <p>
              Schroeder Technologies may terminate or suspend your account at any time, with or without cause,
              with or without notice, if we determine in our sole discretion that: (a) you have violated any
              provision of these Terms; (b) your use of the Service creates legal liability for Schroeder
              Technologies; (c) continued provision of the Service to you is no longer commercially viable; or
              (d) as required by law or in response to a court order or other legal process.
            </p>
            <h4>Effect of Termination</h4>
            <p>
              Upon termination of your account:
            </p>
            <ul>
              <li>Your right to access and use the Service will immediately cease (subject to the data export period below).</li>
              <li>Any outstanding fees owed by you will become immediately due and payable.</li>
              <li>Schroeder Technologies will not be liable to you or any third party for any termination of your access to the Service.</li>
              <li>Provisions of these Terms that by their nature should survive termination will survive, including but not limited to Sections 6 (User Content), 8 (Intellectual Property), 12 (Limitation of Liability), 13 (Indemnification), 14 (Dispute Resolution), and 17 (General Provisions).</li>
            </ul>
            <h4>30-Day Data Export Period</h4>
            <p>
              Following termination of your account, Schroeder Technologies will provide a 30-day grace period
              during which you may export your data, including review content, analytics reports, customer
              interaction logs, and response templates. After the 30-day period, Schroeder Technologies reserves
              the right to permanently delete all data associated with your account, except as required by law or
              as necessary for legitimate business purposes (such as maintaining de-identified data used for AI
              model training). To request a data export, contact{" "}
              <a href="mailto:support@reviewforge.com">support@reviewforge.com</a> within the 30-day
              period.
            </p>
          </LegalSection>

          {/* Section 17: General Provisions */}
          <LegalSection id="general" number="17" title="General Provisions" icon={BookOpen} color={accentColors.yellow}>
            <h4>Entire Agreement</h4>
            <p>
              These Terms of Service, together with the Privacy Policy, Cookie Policy, Data Processing
              Agreement (if applicable), and any other documents expressly incorporated by reference,
              constitute the entire agreement between you and Schroeder Technologies regarding the use of the
              Service. These Terms supersede all prior and contemporaneous agreements, proposals, negotiations,
              representations, and communications, whether oral or written, between you and Schroeder
              Technologies relating to the subject matter hereof.
            </p>
            <h4>Severability</h4>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of
              competent jurisdiction, such provision shall be modified to the minimum extent necessary to make
              it valid and enforceable, or if modification is not possible, such provision shall be severed from
              these Terms. The invalidity of any provision shall not affect the validity or enforceability of
              the remaining provisions, which shall continue in full force and effect.
            </p>
            <h4>Waiver</h4>
            <p>
              The failure of Schroeder Technologies to exercise or enforce any right or provision of these
              Terms shall not constitute a waiver of such right or provision. Any waiver of any provision of
              these Terms will be effective only if in writing and signed by an authorized representative of
              Schroeder Technologies.
            </p>
            <h4>Assignment</h4>
            <p>
              You may not assign or transfer these Terms, or any rights or obligations hereunder, in whole or
              in part, by operation of law or otherwise, without the prior written consent of Schroeder
              Technologies. Schroeder Technologies may assign or transfer these Terms, in whole or in part,
              without restriction, including in connection with a merger, acquisition, corporate reorganization,
              or sale of all or substantially all of our assets. Any attempted assignment in violation of this
              section shall be null and void. Subject to the foregoing, these Terms will bind and inure to the
              benefit of the parties and their respective successors and permitted assigns.
            </p>
            <h4>Notices</h4>
            <p>
              All notices required or permitted under these Terms shall be in writing and shall be deemed
              effectively given: (a) upon personal delivery; (b) when sent by confirmed email; (c) one (1)
              business day after deposit with a nationally recognized overnight courier, freight prepaid; or
              (d) three (3) business days after deposit in the United States mail, by first class mail, postage
              prepaid. Notices to Schroeder Technologies should be sent to{" "}
              <a href="mailto:legal@schroedertech.com">legal@schroedertech.com</a> or to our mailing
              address listed in Section 18. Notices to you will be sent to the email address associated with
              your account.
            </p>
            <h4>Relationship of the Parties</h4>
            <p>
              Nothing in these Terms shall be construed to create a partnership, joint venture, employment, or
              agency relationship between you and Schroeder Technologies. Neither party has the authority to
              bind the other or to incur any obligation on behalf of the other.
            </p>
            <h4>Third-Party Beneficiaries</h4>
            <p>
              These Terms do not confer any third-party beneficiary rights. No person or entity other than the
              parties to these Terms shall have any right to enforce any provision of these Terms.
            </p>
          </LegalSection>

          {/* Section 18: Contact Information */}
          <LegalSection id="contact" number="18" title="Contact Information" icon={Mail} color={accentColors.pink}>
            <p>
              If you have any questions, concerns, or feedback regarding these Terms of Service, please
              contact us using any of the methods below:
            </p>
            <div className="bg-[#FFF8F0] rounded-2xl p-6 border-2 border-[#1a2e1a]/10 my-4 space-y-4">
              <div>
                <p className="text-sm font-bold text-[#1a2e1a] mb-1" style={font}>Schroeder Technologies, Inc.</p>
                <p className="text-sm text-[#1a2e1a]/60">A Delaware Corporation</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-1">Legal Inquiries</p>
                  <a href="mailto:legal@schroedertech.com" className="text-sm text-[#1a2e1a] font-semibold underline underline-offset-4 hover:text-[#1a2e1a]/70 transition-colors">
                    legal@schroedertech.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-1">General Support</p>
                  <a href="mailto:support@reviewforge.com" className="text-sm text-[#1a2e1a] font-semibold underline underline-offset-4 hover:text-[#1a2e1a]/70 transition-colors">
                    support@reviewforge.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-1">Privacy Concerns</p>
                  <a href="mailto:privacy@schroedertech.com" className="text-sm text-[#1a2e1a] font-semibold underline underline-offset-4 hover:text-[#1a2e1a]/70 transition-colors">
                    privacy@schroedertech.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-1">Billing</p>
                  <a href="mailto:billing@schroedertech.com" className="text-sm text-[#1a2e1a] font-semibold underline underline-offset-4 hover:text-[#1a2e1a]/70 transition-colors">
                    billing@schroedertech.com
                  </a>
                </div>
              </div>
            </div>
            <p>
              For urgent security matters, including suspected data breaches or account compromises, please
              contact <a href="mailto:security@schroedertech.com">security@schroedertech.com</a>. We
              strive to respond to all legal and privacy inquiries within five (5) business days.
            </p>
          </LegalSection>

          {/* Back to top / CTA */}
          <div className="mt-16 bg-[#1a2e1a] rounded-3xl p-8 sm:p-12 border-2 border-[#1a2e1a] text-center relative overflow-hidden">
            <div className="absolute top-6 left-8 w-16 h-16 bg-[#C8F5D4]/10 rounded-full blur-xl" />
            <div className="absolute bottom-6 right-8 w-20 h-20 bg-[#FFE566]/10 rounded-full blur-xl" />
            <div className="relative z-10">
              <p className="text-sm text-[#FFF8F0]/40 uppercase tracking-widest font-bold mb-3" style={font}>
                Questions about these terms?
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFF8F0] mb-4" style={font}>
                WE ARE HERE TO HELP
              </h3>
              <p className="text-[#FFF8F0]/50 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                Our legal team is happy to clarify any provision of these Terms. Reach out anytime and we
                will get back to you within five business days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:legal@schroedertech.com"
                  className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-6 py-3 rounded-full text-sm font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566]"
                >
                  <Mail className="h-4 w-4" />
                  Contact Legal Team
                </a>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 text-[#FFF8F0]/60 hover:text-[#FFF8F0] transition-colors text-sm font-medium"
                >
                  Read Privacy Policy <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Reusable Section Component ───────────────────────────────── */

function LegalSection({
  id,
  number,
  title,
  icon: Icon,
  color,
  children,
}: {
  id: string
  number: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-32">
      <div className="bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center gap-4 p-6 sm:p-8 pb-0">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#1a2e1a] shrink-0"
            style={{ backgroundColor: color }}
          >
            <Icon className="h-5 w-5 text-[#1a2e1a]" />
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="text-3xl font-bold text-[#1a2e1a]/10 shrink-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {number}
            </span>
            <h3
              className="text-lg sm:text-xl font-bold text-[#1a2e1a] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Section Content */}
        <div className="p-6 sm:p-8 pt-4 prose-terms">{children}</div>
      </div>

      {/* Inline styles for prose within this component */}
      <style jsx>{`
        .prose-terms :global(p) {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: rgba(26, 46, 26, 0.7);
          margin-bottom: 1rem;
        }
        .prose-terms :global(p:last-child) {
          margin-bottom: 0;
        }
        .prose-terms :global(h4) {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #1a2e1a;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        .prose-terms :global(h4:first-child) {
          margin-top: 0;
        }
        .prose-terms :global(ul) {
          list-style: none;
          padding: 0;
          margin: 0.75rem 0 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .prose-terms :global(li) {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: rgba(26, 46, 26, 0.65);
          padding-left: 1.5rem;
          position: relative;
        }
        .prose-terms :global(li::before) {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: ${color};
          border: 1.5px solid #1a2e1a;
        }
        .prose-terms :global(strong) {
          color: #1a2e1a;
          font-weight: 600;
        }
        .prose-terms :global(a) {
          color: #1a2e1a;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.15s;
        }
        .prose-terms :global(a:hover) {
          color: rgba(26, 46, 26, 0.7);
        }
      `}</style>
    </div>
  )
}

/* ─── Plan Card Sub-component ──────────────────────────────────── */

function PlanCard({
  name,
  price,
  period,
  color,
  features,
}: {
  name: string
  price: string
  period: string
  color: string
  features: string[]
}) {
  return (
    <div className="rounded-2xl p-5 border-2 border-[#1a2e1a]/15" style={{ backgroundColor: color }}>
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-bold uppercase tracking-wider text-[#1a2e1a]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {name}
        </span>
        <span className="text-lg font-bold text-[#1a2e1a]" style={{ fontFamily: "var(--font-display)" }}>
          {price}
          <span className="text-xs font-medium text-[#1a2e1a]/50 ml-0.5">{period}</span>
        </span>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {features.map((f) => (
          <li key={f} className="text-xs text-[#1a2e1a]/60 flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-[#1a2e1a]/40 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
