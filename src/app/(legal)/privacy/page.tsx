"use client"

import {
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  Clock,
  UserCheck,
  Server,
  Baby,
  Link2,
  Bell,
  Mail,
  Mic,
  Brain,
  FileText,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Fingerprint,
  HardDrive,
  Trash2,
  Download,
  Settings,
  Cookie,
  BarChart3,
  Share2,
  MapPin,
  Building2,
  Phone,
  Scale,
  ShieldCheck,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const sections = [
  { id: "introduction", number: "01", title: "Introduction", icon: FileText, color: "#C8F5D4" },
  { id: "information-we-collect", number: "02", title: "Information We Collect", icon: Database, color: "#FFE566" },
  { id: "how-we-use", number: "03", title: "How We Use Your Information", icon: Settings, color: "#FFB5B5" },
  { id: "ai-voice-processing", number: "04", title: "AI & Voice Data Processing", icon: Brain, color: "#D4CCFF" },
  { id: "data-sharing", number: "05", title: "Data Sharing & Disclosure", icon: Share2, color: "#FFDAB5" },
  { id: "data-retention", number: "06", title: "Data Retention", icon: Clock, color: "#C8F5D4" },
  { id: "your-rights", number: "07", title: "Your Privacy Rights", icon: UserCheck, color: "#FFE566" },
  { id: "international-transfers", number: "08", title: "International Data Transfers", icon: Globe, color: "#FFB5B5" },
  { id: "data-security", number: "09", title: "Data Security", icon: Lock, color: "#D4CCFF" },
  { id: "childrens-privacy", number: "10", title: "Children's Privacy", icon: Baby, color: "#FFDAB5" },
  { id: "third-party-links", number: "11", title: "Third-Party Links & Integrations", icon: Link2, color: "#C8F5D4" },
  { id: "changes", number: "12", title: "Changes to This Policy", icon: Bell, color: "#FFE566" },
  { id: "contact", number: "13", title: "Contact Information", icon: Mail, color: "#FFB5B5" },
]

function SectionCard({
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
    <section id={id} className="scroll-mt-40">
      <div className="bg-white rounded-3xl p-7 md:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-[#1a2e1a] shrink-0"
            style={{ backgroundColor: color }}
          >
            <Icon className="h-6 w-6 text-[#1a2e1a]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1a2e1a]/30 uppercase tracking-widest" style={font}>
              Section {number}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a]" style={font}>
              {title}
            </h2>
          </div>
        </div>
        <div className="text-[#1a2e1a]/70 leading-relaxed space-y-4">{children}</div>
      </div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-[#1a2e1a] mb-3" style={font}>
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-[#1a2e1a]/20 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function HighlightBox({
  color,
  icon: Icon,
  children,
}: {
  color: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl p-5 border-2 border-[#1a2e1a]/10 mt-4" style={{ backgroundColor: color + "30" }}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-[#1a2e1a] mt-0.5 shrink-0" />
        <div className="text-sm text-[#1a2e1a]/70">{children}</div>
      </div>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FFF8F0]">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Floating decorative shapes */}
        <div className="absolute top-16 left-[6%] w-20 h-20 bg-[#C8F5D4] rounded-full opacity-50" />
        <div className="absolute top-32 right-[8%] w-14 h-14 bg-[#FFE566] rounded-2xl opacity-50 rotate-12" />
        <div className="absolute bottom-20 left-[12%] w-10 h-10 bg-[#D4CCFF] rounded-xl opacity-50 -rotate-12" />
        <div className="absolute top-48 right-[22%] w-8 h-8 bg-[#FFB5B5] rounded-full opacity-40" />
        <div className="absolute bottom-32 right-[5%] w-16 h-16 bg-[#FFDAB5] rounded-2xl opacity-40 rotate-6" />
        <div className="absolute top-24 left-[35%] w-6 h-6 bg-[#FFB5B5] rounded-full opacity-30" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">
            <Shield className="h-4 w-4" /> Privacy Policy
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a2e1a] tracking-tight mb-6" style={font}>
            YOUR DATA,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">YOUR RIGHTS</span>
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#C8F5D4] -z-0 rounded-sm" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            At Schroeder Technologies, transparency is not optional. This policy explains exactly what data ReviewForge collects, how we use it, and the rights you have over it. No legalese traps, no hidden clauses.
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-5 py-2.5 rounded-full text-sm font-medium border-2 border-[#1a2e1a]/15">
              <Clock className="h-4 w-4 text-[#1a2e1a]/40" />
              <span className="text-[#1a2e1a]/50">Last Updated:</span>
              <span className="font-bold">February 25, 2026</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-5 py-2.5 rounded-full text-sm font-medium border-2 border-[#1a2e1a]/15">
              <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40" />
              <span className="text-[#1a2e1a]/50">Effective:</span>
              <span className="font-bold">February 25, 2026</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-5 py-2.5 rounded-full text-sm font-medium border-2 border-[#1a2e1a]/15">
              <FileText className="h-4 w-4 text-[#1a2e1a]/40" />
              <span className="text-[#1a2e1a]/50">Version:</span>
              <span className="font-bold">3.1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "We Never Sell Your Data",
                description: "Your information is never sold to third parties. Period.",
                color: "#C8F5D4",
              },
              {
                icon: Scale,
                title: "GDPR & CCPA Compliant",
                description: "Full compliance with global privacy regulations.",
                color: "#FFE566",
              },
              {
                icon: Settings,
                title: "You Control Your Data",
                description: "Access, export, or delete your data at any time.",
                color: "#FFB5B5",
              },
              {
                icon: Lock,
                title: "256-bit Encryption",
                description: "Enterprise-grade encryption for all data at rest and in transit.",
                color: "#D4CCFF",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-6 md:p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] text-center"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: card.color }}
                >
                  <card.icon className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#1a2e1a] mb-1" style={font}>
                  {card.title}
                </h3>
                <p className="text-xs text-[#1a2e1a]/50 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-7 md:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a]">
                <FileText className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1a2e1a]" style={font}>
                Table of Contents
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FFF8F0] transition-colors group"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-[#1a2e1a] border border-[#1a2e1a]/15 shrink-0"
                    style={{ backgroundColor: section.color + "60" }}
                  >
                    {section.number}
                  </span>
                  <span className="text-sm font-medium text-[#1a2e1a]/70 group-hover:text-[#1a2e1a] transition-colors">
                    {section.title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#1a2e1a]/20 ml-auto group-hover:text-[#1a2e1a]/50 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Legal Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-8">
        {/* Section 01: Introduction */}
        <SectionCard {...sections[0]}>
          <p>
            This Privacy Policy (&quot;Policy&quot;) is issued by <strong>Schroeder Technologies, Inc.</strong> (&quot;Schroeder Technologies,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a Delaware corporation headquartered at 2100 Innovation Drive, Suite 450, Austin, TX 78701, United States. Schroeder Technologies is the developer and operator of <strong>ReviewForge</strong>, an AI-powered review capture and reputation management platform (the &quot;Service&quot; or &quot;Platform&quot;).
          </p>
          <p>
            This Policy describes how we collect, use, disclose, store, and protect the personal information of individuals who visit our website at reviewforge.com and its subdomains (the &quot;Website&quot;), use our web and mobile applications, interact with our voice capture interfaces, or otherwise engage with our services. It applies to all users of the Platform, including business owners (&quot;Account Holders&quot;), their employees and staff who operate the Platform (&quot;Authorized Users&quot;), and the end consumers who submit voice recordings and reviews through the Platform (&quot;Reviewers&quot;).
          </p>
          <p>
            By accessing or using ReviewForge, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy. If you do not agree with any part of this Policy, you must discontinue use of the Platform immediately. For users located in the European Economic Area (EEA), United Kingdom, or other jurisdictions that require an explicit legal basis for processing, we rely on the legal bases described in each section below.
          </p>
          <p>
            This Policy does not apply to third-party websites, services, or platforms that may be linked from or integrated with ReviewForge, including but not limited to Google Business Profile, Yelp, Facebook, and TripAdvisor. We encourage you to review the privacy policies of those third parties independently.
          </p>
          <HighlightBox color="#C8F5D4" icon={AlertCircle}>
            <strong>Important:</strong> If you are an Account Holder who enables ReviewForge for your customers (Reviewers), you act as a data controller for the personal information collected from those Reviewers. Schroeder Technologies acts as a data processor on your behalf. Please ensure you have appropriate privacy notices and consents in place for your customers.
          </HighlightBox>
        </SectionCard>

        {/* Section 02: Information We Collect */}
        <SectionCard {...sections[1]}>
          <p>
            We collect information in several ways: directly from you when you provide it, automatically when you use the Platform, and from third-party sources when you connect external accounts. Below is a comprehensive breakdown of each category.
          </p>

          <SubSection title="2.1 Account Information">
            <p>When you create a ReviewForge account or update your profile, we collect:</p>
            <BulletList
              items={[
                "Full name (first and last name) of the account holder and any authorized users",
                "Email address (used for account authentication, notifications, and communications)",
                "Business name, DBA (doing business as) names, and legal entity name",
                "Phone number (mobile and/or business line, used for SMS triggers and account recovery)",
                "Business address and location(s), including street address, city, state/province, postal code, and country",
                "Industry category and business type (e.g., restaurant, dental practice, auto dealership, hotel)",
                "Business logo, profile images, and branding assets you upload",
                "Billing information (payment card details are processed and stored by our PCI-compliant payment processor, Stripe; we retain only the last four digits of your card and expiration date)",
                "Password (stored in salted and hashed form using bcrypt; we never store plaintext passwords)",
                "Account preferences, notification settings, and configured review platform connections",
              ]}
            />
          </SubSection>

          <SubSection title="2.2 Voice Data and Recordings">
            <p>
              When Reviewers use ReviewForge&apos;s voice capture feature, we collect:
            </p>
            <BulletList
              items={[
                "Audio recordings of the Reviewer's spoken feedback (typically 3-15 seconds in duration)",
                "Transcriptions generated from the audio recordings using our speech-to-text AI models",
                "Metadata associated with each recording, including timestamp, duration, language detected, and the device type used",
                "The AI-generated review text that is produced from the transcription",
                "Any edits or modifications the Reviewer makes to the generated review before posting",
              ]}
            />
            <HighlightBox color="#D4CCFF" icon={Mic}>
              <strong>Voice Data Notice:</strong> Voice recordings are processed in real time to generate review text. By default, original audio recordings are retained for 90 days to improve transcription accuracy and service quality, then automatically and permanently deleted. You may opt out of audio retention in your account settings, in which case recordings are deleted immediately after transcription.
            </HighlightBox>
          </SubSection>

          <SubSection title="2.3 Review Content">
            <p>We collect and process the following review-related data:</p>
            <BulletList
              items={[
                "The final review text as posted or approved by the Reviewer",
                "Star ratings or numerical scores assigned by the Reviewer",
                "The review platform(s) selected for posting (e.g., Google, Yelp, Facebook, TripAdvisor)",
                "Timestamps of review creation, editing, and posting",
                "Review status information (draft, pending approval, posted, rejected)",
                "AI-generated response text for reviews (if the auto-response feature is enabled)",
                "Sentiment analysis scores and extracted topic tags derived from review content",
              ]}
            />
          </SubSection>

          <SubSection title="2.4 Business Data and Analytics">
            <p>For Account Holders, we collect and generate the following business-related data:</p>
            <BulletList
              items={[
                "Aggregated review statistics (total reviews, average rating, review volume over time)",
                "Sentiment analysis trends and topic frequency data across all reviews",
                "Customer satisfaction scores and Net Promoter Score (NPS) estimates",
                "Competitor benchmarking data (if the competitor tracking feature is enabled)",
                "Review source distribution across connected platforms",
                "Response rate metrics and average response time",
                "QR code scan analytics, SMS trigger engagement rates, and NFC tap counts",
                "Customer journey data within the review capture flow (e.g., drop-off rates, completion rates)",
              ]}
            />
          </SubSection>

          <SubSection title="2.5 Usage Data and Device Information">
            <p>We automatically collect technical information when you access the Platform:</p>
            <BulletList
              items={[
                "IP address (used for security, fraud prevention, and approximate geolocation)",
                "Browser type and version (e.g., Chrome 120, Safari 17, Firefox 121)",
                "Operating system and device type (e.g., iOS 18, Android 15, Windows 11, macOS 15)",
                "Screen resolution, viewport dimensions, and device orientation",
                "Referring URL and exit pages",
                "Pages viewed, features used, and actions taken within the Platform",
                "Session duration, timestamps of access, and frequency of visits",
                "Language and locale preferences as set in the browser or device",
                "Error logs, crash reports, and performance metrics",
              ]}
            />
          </SubSection>

          <SubSection title="2.6 Cookies and Tracking Technologies">
            <p>ReviewForge uses cookies and similar technologies to enhance your experience:</p>
            <BulletList
              items={[
                "Essential cookies: Required for authentication, session management, security (CSRF protection), and load balancing. These cannot be disabled.",
                "Functional cookies: Remember your preferences, language settings, and UI customizations (e.g., dark mode, dashboard layout).",
                "Analytics cookies: Help us understand how users interact with the Platform using aggregated, anonymized data. We use Plausible Analytics, a privacy-focused analytics provider that does not use personal identifiers.",
                "Marketing cookies: Used only with your explicit consent to measure the effectiveness of our advertising campaigns. We do not serve behavioral advertising within the Platform.",
              ]}
            />
            <p className="mt-3">
              You can manage your cookie preferences at any time through the cookie banner displayed on first visit, or via the &quot;Cookie Preferences&quot; link in the footer. For detailed information, please see our{" "}
              <a href="/cookies" className="text-[#1a2e1a] font-semibold underline decoration-[#C8F5D4] decoration-2 underline-offset-2 hover:decoration-[#1a2e1a] transition-colors">
                Cookie Policy
              </a>.
            </p>
          </SubSection>

          <SubSection title="2.7 Third-Party Platform Data">
            <p>
              When you connect ReviewForge to third-party review platforms, we may receive:
            </p>
            <BulletList
              items={[
                "Google Business Profile: Business listing details, existing reviews and ratings, reviewer display names, review dates, your reply history, and listing performance metrics",
                "Yelp: Business page information, reviews, ratings, reviewer public profiles, and response data accessible through the Yelp Fusion API",
                "Facebook: Business Page reviews and recommendations, commenter display names, and Page Insights data as authorized through Facebook Graph API permissions",
                "TripAdvisor: Property listing data, reviews, ratings, and management response history as available through the TripAdvisor Content API",
                "Other platforms: Any data made available through authorized API connections you configure",
              ]}
            />
            <HighlightBox color="#FFE566" icon={ExternalLink}>
              We access third-party platform data only through official APIs and only with the permissions you explicitly grant. We do not scrape or collect data from these platforms without authorization. You can revoke platform connections at any time from your account settings.
            </HighlightBox>
          </SubSection>
        </SectionCard>

        {/* Section 03: How We Use Your Information */}
        <SectionCard {...sections[2]}>
          <p>
            We use the information we collect for the following purposes, each tied to a specific legal basis where required under GDPR or similar regulations:
          </p>

          <SubSection title="3.1 Providing and Operating the Service">
            <BulletList
              items={[
                "Processing voice recordings to generate AI-written review text (contractual necessity)",
                "Publishing approved reviews to selected third-party platforms on your behalf (contractual necessity)",
                "Generating AI-powered responses to reviews received on connected platforms (contractual necessity)",
                "Providing real-time analytics, sentiment analysis, and reporting dashboards (contractual necessity)",
                "Managing your account, processing payments, and maintaining your subscription (contractual necessity)",
                "Sending transactional notifications including review alerts, billing receipts, and security notices (contractual necessity)",
              ]}
            />
          </SubSection>

          <SubSection title="3.2 AI Model Improvement and Research">
            <BulletList
              items={[
                "Improving the accuracy of our speech-to-text transcription models using aggregated voice data (legitimate interest)",
                "Enhancing the quality and naturalness of AI-generated review text (legitimate interest)",
                "Training and refining our sentiment analysis and topic extraction algorithms (legitimate interest)",
                "Developing new features based on aggregated usage patterns (legitimate interest)",
              ]}
            />
            <HighlightBox color="#D4CCFF" icon={Brain}>
              <strong>AI Training Opt-Out:</strong> You may opt out of having your data used for AI model training at any time by navigating to Settings &gt; Privacy &gt; AI Training in your account dashboard. Opting out does not affect the quality of service you receive. When you opt out, your data is excluded from all future training data sets within 30 days.
            </HighlightBox>
          </SubSection>

          <SubSection title="3.3 Communications">
            <BulletList
              items={[
                "Sending product updates, new feature announcements, and service bulletins (legitimate interest with opt-out)",
                "Delivering marketing communications including newsletters, case studies, and promotional offers (consent-based; you may unsubscribe at any time)",
                "Responding to your support requests, inquiries, and feedback (contractual necessity)",
                "Conducting customer satisfaction surveys (legitimate interest with opt-out)",
              ]}
            />
          </SubSection>

          <SubSection title="3.4 Security, Fraud Prevention, and Legal Compliance">
            <BulletList
              items={[
                "Detecting, preventing, and investigating fraudulent activity, abuse, and policy violations (legitimate interest)",
                "Verifying account identity and preventing unauthorized access (legitimate interest)",
                "Complying with applicable laws, regulations, legal processes, and enforceable governmental requests (legal obligation)",
                "Enforcing our Terms of Service and other agreements (legitimate interest)",
                "Protecting the rights, property, and safety of Schroeder Technologies, our users, and the public (legitimate interest)",
              ]}
            />
          </SubSection>
        </SectionCard>

        {/* Section 04: AI and Voice Data Processing */}
        <SectionCard {...sections[3]}>
          <p>
            ReviewForge&apos;s core functionality involves processing voice data through artificial intelligence. Given the sensitive nature of voice data, we want to provide complete transparency about how this processing works.
          </p>

          <SubSection title="4.1 Voice Capture and Transcription">
            <p>
              When a Reviewer taps the &quot;Record&quot; button and speaks, their audio is captured directly in the browser using the Web Audio API. The audio stream is transmitted over an encrypted TLS 1.3 connection to our processing servers located in the United States and the European Union (for EEA users). Our proprietary speech-to-text model transcribes the audio into text within seconds. The transcription is then passed to our review generation model.
            </p>
          </SubSection>

          <SubSection title="4.2 AI Review Generation">
            <p>
              Our AI review generation model takes the raw transcription and transforms it into a polished, detailed review while preserving the Reviewer&apos;s authentic voice, specific details mentioned, and overall sentiment. The model does not fabricate facts, add experiences that were not mentioned, or alter the sentiment of the original feedback. The Reviewer always has the opportunity to review, edit, and approve the generated text before it is posted.
            </p>
          </SubSection>

          <SubSection title="4.3 Data Flow and Processing Pipeline">
            <BulletList
              items={[
                "Step 1: Audio captured in browser, encrypted, and transmitted to processing server",
                "Step 2: Speech-to-text model generates raw transcription",
                "Step 3: Review generation model creates polished review text from transcription",
                "Step 4: Generated review presented to Reviewer for approval or editing",
                "Step 5: Upon approval, review is posted to selected platform(s) via API",
                "Step 6: Original audio retained for 90 days (unless opt-out is enabled), then permanently deleted",
                "Step 7: Transcription and generated review text retained for the life of the account or until deletion is requested",
              ]}
            />
          </SubSection>

          <SubSection title="4.4 Voice Data Retention and Deletion">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#1a2e1a]/10">
                    <th className="text-left py-3 pr-4 font-bold text-[#1a2e1a]">Data Type</th>
                    <th className="text-left py-3 pr-4 font-bold text-[#1a2e1a]">Default Retention</th>
                    <th className="text-left py-3 font-bold text-[#1a2e1a]">With Opt-Out</th>
                  </tr>
                </thead>
                <tbody className="text-[#1a2e1a]/60">
                  <tr className="border-b border-[#1a2e1a]/5">
                    <td className="py-3 pr-4">Original audio recording</td>
                    <td className="py-3 pr-4">90 days</td>
                    <td className="py-3">Deleted immediately after transcription</td>
                  </tr>
                  <tr className="border-b border-[#1a2e1a]/5">
                    <td className="py-3 pr-4">Raw transcription</td>
                    <td className="py-3 pr-4">Life of account</td>
                    <td className="py-3">Deleted upon account deletion request</td>
                  </tr>
                  <tr className="border-b border-[#1a2e1a]/5">
                    <td className="py-3 pr-4">Generated review text</td>
                    <td className="py-3 pr-4">Life of account</td>
                    <td className="py-3">Deleted upon account deletion request</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Anonymized training data</td>
                    <td className="py-3 pr-4">Indefinite</td>
                    <td className="py-3">Excluded from training within 30 days of opt-out</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="4.5 Automated Decision-Making">
            <p>
              ReviewForge uses automated processing to generate review text, perform sentiment analysis, and produce analytics insights. These automated processes do not make decisions that produce legal effects or similarly significant effects on individuals. The Reviewer always retains full control over whether a generated review is posted, and can edit or discard the AI-generated text at any point. Account Holders can enable or disable AI auto-response features and always have the option to manually review and approve AI-generated responses before they are published.
            </p>
          </SubSection>
        </SectionCard>

        {/* Section 05: Data Sharing and Disclosure */}
        <SectionCard {...sections[4]}>
          <p>
            We do not sell, rent, or trade your personal information to third parties for their own marketing purposes. We share your information only in the following limited circumstances:
          </p>

          <SubSection title="5.1 Service Providers">
            <p>
              We engage trusted third-party service providers who process data on our behalf to support Platform operations. These providers are contractually obligated to use your data only for the purposes we specify and to maintain appropriate security measures:
            </p>
            <BulletList
              items={[
                "Cloud hosting and infrastructure: Amazon Web Services (AWS), deployed in US-East-1 and EU-West-1 regions",
                "Payment processing: Stripe, Inc. (PCI DSS Level 1 certified)",
                "Email delivery: Postmark by ActiveCampaign (transactional emails) and Mailchimp by Intuit (marketing communications, consent-based only)",
                "SMS delivery: Twilio, Inc. (for SMS review triggers and two-factor authentication)",
                "Error monitoring: Sentry (application performance and error tracking)",
                "Analytics: Plausible Analytics (privacy-focused, cookieless website analytics)",
              ]}
            />
          </SubSection>

          <SubSection title="5.2 Review Platforms">
            <p>
              When a Reviewer approves a review for posting, we transmit the review content (text, star rating, and any associated display name) to the selected third-party platforms through their official APIs. This sharing is necessary to fulfill the core purpose of the Service and is initiated by the Reviewer&apos;s explicit action. The platforms that may receive this data include:
            </p>
            <BulletList
              items={[
                "Google LLC (Google Business Profile)",
                "Yelp Inc. (Yelp Business)",
                "Meta Platforms, Inc. (Facebook Reviews and Recommendations)",
                "TripAdvisor LLC (TripAdvisor Reviews)",
              ]}
            />
            <p className="mt-2">
              Once a review is posted to a third-party platform, it is governed by that platform&apos;s own privacy policy and terms of service. We cannot control how these platforms use, display, or retain the review data.
            </p>
          </SubSection>

          <SubSection title="5.3 Legal Requirements">
            <p>
              We may disclose your information if we reasonably believe disclosure is required to:
            </p>
            <BulletList
              items={[
                "Comply with any applicable law, regulation, subpoena, court order, or legal process served on Schroeder Technologies",
                "Enforce our Terms of Service, Acceptable Use Policy, or other agreements",
                "Protect and defend the rights, property, or safety of Schroeder Technologies, our users, or the public",
                "Detect, prevent, or address fraud, security vulnerabilities, or technical issues",
                "Respond to lawful requests from public authorities, including national security or law enforcement requirements",
              ]}
            />
            <p className="mt-2">
              Where legally permitted, we will make reasonable efforts to notify affected users before disclosing their information in response to legal process, unless we are prohibited from doing so by law or court order, or if we believe notification would create a risk of harm or be otherwise counterproductive.
            </p>
          </SubSection>

          <SubSection title="5.4 Business Transfers">
            <p>
              In the event of a merger, acquisition, reorganization, bankruptcy, or sale of all or a portion of Schroeder Technologies&apos; assets, your personal information may be transferred as part of the transaction. We will notify you via email and/or a prominent notice on the Platform before your information is transferred and becomes subject to a different privacy policy. You will have the opportunity to delete your account and data before any such transfer is completed.
            </p>
          </SubSection>

          <SubSection title="5.5 With Your Consent">
            <p>
              We may share your information with third parties when you have given us explicit, informed consent to do so. You may withdraw your consent at any time, which will not affect the lawfulness of any processing performed before withdrawal.
            </p>
          </SubSection>
        </SectionCard>

        {/* Section 06: Data Retention */}
        <SectionCard {...sections[5]}>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements. Below are our specific retention periods:
          </p>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[#1a2e1a]/10">
                  <th className="text-left py-3 pr-4 font-bold text-[#1a2e1a]">Data Category</th>
                  <th className="text-left py-3 pr-4 font-bold text-[#1a2e1a]">Retention Period</th>
                  <th className="text-left py-3 font-bold text-[#1a2e1a]">Reason</th>
                </tr>
              </thead>
              <tbody className="text-[#1a2e1a]/60">
                <tr className="border-b border-[#1a2e1a]/5">
                  <td className="py-3 pr-4">Account information</td>
                  <td className="py-3 pr-4">Duration of active account + 30 days</td>
                  <td className="py-3">Service delivery and account recovery grace period</td>
                </tr>
                <tr className="border-b border-[#1a2e1a]/5">
                  <td className="py-3 pr-4">Voice recordings</td>
                  <td className="py-3 pr-4">90 days (or immediate with opt-out)</td>
                  <td className="py-3">Transcription quality improvement</td>
                </tr>
                <tr className="border-b border-[#1a2e1a]/5">
                  <td className="py-3 pr-4">Review content and transcriptions</td>
                  <td className="py-3 pr-4">Duration of active account + 90 days</td>
                  <td className="py-3">Service delivery, analytics, and legal compliance</td>
                </tr>
                <tr className="border-b border-[#1a2e1a]/5">
                  <td className="py-3 pr-4">Business analytics data</td>
                  <td className="py-3 pr-4">Duration of active account + 90 days</td>
                  <td className="py-3">Service delivery and historical reporting</td>
                </tr>
                <tr className="border-b border-[#1a2e1a]/5">
                  <td className="py-3 pr-4">Usage and access logs</td>
                  <td className="py-3 pr-4">12 months</td>
                  <td className="py-3">Security monitoring and fraud prevention</td>
                </tr>
                <tr className="border-b border-[#1a2e1a]/5">
                  <td className="py-3 pr-4">Billing records and invoices</td>
                  <td className="py-3 pr-4">7 years after transaction</td>
                  <td className="py-3">Tax and financial regulatory compliance</td>
                </tr>
                <tr className="border-b border-[#1a2e1a]/5">
                  <td className="py-3 pr-4">Support correspondence</td>
                  <td className="py-3 pr-4">3 years after resolution</td>
                  <td className="py-3">Quality assurance and dispute resolution</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Cookie consent records</td>
                  <td className="py-3 pr-4">3 years from consent</td>
                  <td className="py-3">Regulatory compliance documentation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            When data reaches the end of its retention period, it is permanently deleted from our active systems within 30 days. Backup copies are purged within 90 days of the active deletion. We use automated data lifecycle management tools to enforce these retention schedules consistently.
          </p>
        </SectionCard>

        {/* Section 07: Your Privacy Rights */}
        <SectionCard {...sections[6]}>
          <p>
            Depending on your location and applicable law, you may have certain rights regarding your personal information. Schroeder Technologies is committed to honoring these rights regardless of where you are located, to the extent technically feasible.
          </p>

          <SubSection title="7.1 Rights Under the GDPR (EEA and UK Residents)">
            <p>
              If you are located in the European Economic Area or the United Kingdom, you have the following rights under the General Data Protection Regulation (GDPR) and UK GDPR:
            </p>
            <BulletList
              items={[
                "Right of Access (Article 15): You have the right to obtain confirmation of whether we process your personal data and to receive a copy of that data in a structured, commonly used, machine-readable format.",
                "Right to Rectification (Article 16): You may request correction of inaccurate personal data or completion of incomplete data we hold about you.",
                "Right to Erasure (Article 17): You may request deletion of your personal data when it is no longer necessary for the purposes for which it was collected, when you withdraw consent, or when the data has been unlawfully processed.",
                "Right to Data Portability (Article 20): You have the right to receive your personal data in a structured, commonly used, and machine-readable format (JSON or CSV) and to transmit that data to another controller without hindrance.",
                "Right to Restriction of Processing (Article 18): You may request that we restrict the processing of your data in certain circumstances, such as when you contest the accuracy of the data or object to processing based on legitimate interests.",
                "Right to Object (Article 21): You may object to processing based on legitimate interests, including profiling. You also have the absolute right to object to processing for direct marketing purposes at any time.",
                "Right to Withdraw Consent (Article 7): Where processing is based on consent, you may withdraw your consent at any time without affecting the lawfulness of processing performed before withdrawal.",
                "Right to Lodge a Complaint: You have the right to lodge a complaint with your local supervisory authority. Our lead supervisory authority is the Irish Data Protection Commission (DPC).",
              ]}
            />
          </SubSection>

          <SubSection title="7.2 Rights Under the CCPA/CPRA (California Residents)">
            <p>
              If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA):
            </p>
            <BulletList
              items={[
                "Right to Know: You may request disclosure of the categories and specific pieces of personal information we have collected about you, the sources from which it was collected, our business purpose for collecting it, and the categories of third parties with whom we share it.",
                "Right to Delete: You may request that we delete the personal information we have collected from you, subject to certain exceptions permitted by law (such as data needed for legal compliance or to complete a transaction).",
                "Right to Correct: You may request that we correct inaccurate personal information we maintain about you.",
                "Right to Opt Out of Sale or Sharing: Schroeder Technologies does not sell personal information and does not share personal information for cross-context behavioral advertising. However, you may exercise this right preemptively, and we will honor it.",
                "Right to Limit Use of Sensitive Personal Information: Voice recordings may constitute sensitive personal information under CPRA. You may direct us to limit the use and disclosure of this data to purposes necessary for providing the Service.",
                "Right to Non-Discrimination: We will not discriminate against you for exercising any of your CCPA/CPRA rights. You will not receive different pricing, quality of service, or access to features based on your exercise of privacy rights.",
              ]}
            />
          </SubSection>

          <SubSection title="7.3 How to Exercise Your Rights">
            <p>You may exercise any of the rights described above through the following methods:</p>
            <BulletList
              items={[
                "Self-Service Dashboard: Navigate to Settings > Privacy > Data Rights in your ReviewForge account to access, download, or delete your data directly.",
                "Email Request: Send a detailed request to privacy@schroedertech.com from the email address associated with your account.",
                "Web Form: Submit a data rights request through our online form at reviewforge.com/privacy-request.",
                "Postal Mail: Write to our Data Protection Officer at the address provided in Section 13.",
              ]}
            />
            <p className="mt-3">
              We will verify your identity before processing any request. For email and web form requests, we may ask you to verify ownership of the associated account via email confirmation or two-factor authentication. We will respond to all verified requests within 30 days (GDPR) or 45 days (CCPA), with one possible extension of equal length if the request is complex. We will inform you of any extension and the reason for it.
            </p>
          </SubSection>

          <SubSection title="7.4 Additional State and Regional Rights">
            <p>
              Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), and other states with comprehensive privacy laws may have additional or similar rights. We extend the rights described above to all users. If you believe your specific jurisdictional rights are not covered, please contact our Data Protection Officer.
            </p>
          </SubSection>
        </SectionCard>

        {/* Section 08: International Data Transfers */}
        <SectionCard {...sections[7]}>
          <p>
            Schroeder Technologies is headquartered in the United States. If you are accessing ReviewForge from outside the United States, please be aware that your personal information will be transferred to, stored, and processed in the United States and potentially other countries where our service providers maintain facilities.
          </p>

          <SubSection title="8.1 Transfer Mechanisms">
            <p>
              For transfers of personal data from the EEA, UK, or Switzerland to the United States or other countries that do not have an adequacy decision from the European Commission, we rely on the following safeguards:
            </p>
            <BulletList
              items={[
                "Standard Contractual Clauses (SCCs): We execute the European Commission's Standard Contractual Clauses (2021/914) with all service providers who process EEA personal data outside the EEA. These clauses provide contractual guarantees that personal data will be protected to European standards.",
                "UK International Data Transfer Agreement (IDTA): For transfers from the UK, we use the UK IDTA or the UK Addendum to the EU SCCs as approved by the UK Information Commissioner's Office.",
                "EU-U.S. Data Privacy Framework: Schroeder Technologies has certified its compliance with the EU-U.S. Data Privacy Framework, the UK Extension to the EU-U.S. Data Privacy Framework, and the Swiss-U.S. Data Privacy Framework as set forth by the U.S. Department of Commerce.",
                "Supplementary Measures: In accordance with the Schrems II decision, we implement supplementary technical and organizational measures, including encryption of data in transit and at rest, pseudonymization where feasible, and strict access controls.",
              ]}
            />
          </SubSection>

          <SubSection title="8.2 Data Localization">
            <p>
              For Account Holders on the Business plan and above who require data residency within the European Union, we offer the option to process and store all data exclusively within our EU-West-1 (Ireland) AWS region. Contact our sales team at enterprise@schroedertech.com to enable EU data residency for your account.
            </p>
          </SubSection>
        </SectionCard>

        {/* Section 09: Data Security */}
        <SectionCard {...sections[8]}>
          <p>
            Schroeder Technologies implements comprehensive technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security program is designed to be commensurate with the sensitivity of the data we process.
          </p>

          <SubSection title="9.1 Technical Measures">
            <BulletList
              items={[
                "Encryption in Transit: All data transmitted between your device and our servers is encrypted using TLS 1.3 with forward secrecy. We enforce HTTP Strict Transport Security (HSTS) with a minimum one-year max-age policy.",
                "Encryption at Rest: All data stored in our databases, file storage systems, and backup media is encrypted using AES-256 encryption. Encryption keys are managed through AWS Key Management Service (KMS) with automatic key rotation every 365 days.",
                "Access Controls: We implement role-based access control (RBAC) across all systems. Employee access to customer data requires multi-factor authentication and is restricted to the minimum necessary for their job function.",
                "Network Security: Our infrastructure is protected by Web Application Firewalls (WAF), intrusion detection/prevention systems (IDS/IPS), DDoS mitigation services, and network segmentation with private subnets for databases and processing servers.",
                "Application Security: We conduct regular penetration testing (at least annually by an independent third party), automated vulnerability scanning (weekly), static application security testing (SAST) and dynamic application security testing (DAST) as part of our CI/CD pipeline, and maintain a responsible disclosure / bug bounty program.",
                "Secure Development: All code changes undergo mandatory peer review, are scanned for vulnerabilities before deployment, and follow OWASP Top 10 mitigation guidelines.",
              ]}
            />
          </SubSection>

          <SubSection title="9.2 Organizational Measures">
            <BulletList
              items={[
                "All employees undergo background checks, sign confidentiality agreements, and complete annual security awareness training.",
                "We maintain a documented Information Security Management System (ISMS) aligned with ISO 27001 standards.",
                "We conduct annual third-party security audits and maintain SOC 2 Type II certification for our cloud infrastructure.",
                "We have established incident response procedures with defined roles, communication protocols, and escalation paths. We commit to notifying affected users and relevant supervisory authorities within 72 hours of becoming aware of a qualifying personal data breach.",
                "Physical access to our offices is controlled via badge access systems and CCTV monitoring. Our cloud infrastructure provider (AWS) maintains SOC 2, ISO 27001, and FedRAMP certifications for their data centers.",
              ]}
            />
          </SubSection>

          <HighlightBox color="#FFB5B5" icon={AlertCircle}>
            <strong>Security Reporting:</strong> If you discover a security vulnerability in ReviewForge, please report it to security@schroedertech.com. We operate a responsible disclosure program and will not take legal action against researchers who report vulnerabilities in good faith. Please do not access, modify, or delete other users&apos; data during your research.
          </HighlightBox>
        </SectionCard>

        {/* Section 10: Children's Privacy */}
        <SectionCard {...sections[9]}>
          <p>
            ReviewForge is a business-to-business (B2B) platform designed for use by businesses and their adult customers. The Service is not directed at, marketed to, or intended for use by children under the age of 16 (or the applicable age of digital consent in your jurisdiction).
          </p>
          <p>
            We do not knowingly collect personal information from children under 16. If we learn that we have inadvertently collected personal information from a child under 16, we will take prompt steps to delete that information from our systems. If you are a parent or guardian and believe that your child under 16 has provided personal information to ReviewForge, please contact us immediately at privacy@schroedertech.com, and we will delete the information within 48 hours of verification.
          </p>
          <p>
            Account Holders must ensure that the review capture interfaces they deploy (QR codes, SMS links, NFC triggers, etc.) are used in contexts where Reviewers are reasonably expected to be adults. If an Account Holder becomes aware that a minor has submitted a voice recording or review through their ReviewForge integration, the Account Holder must promptly notify us so we can delete the data.
          </p>
        </SectionCard>

        {/* Section 11: Third-Party Links and Integrations */}
        <SectionCard {...sections[10]}>
          <p>
            ReviewForge integrates with and links to various third-party services. This Policy does not cover the privacy practices of those third parties. We encourage you to review their respective policies:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                name: "Google Business Profile",
                description: "Review posting, listing management, and analytics",
                url: "https://policies.google.com/privacy",
                color: "#C8F5D4",
              },
              {
                name: "Yelp",
                description: "Review posting and business page management",
                url: "https://www.yelp.com/tos/privacy_policy",
                color: "#FFE566",
              },
              {
                name: "Facebook / Meta",
                description: "Page reviews, recommendations, and insights",
                url: "https://www.facebook.com/privacy/policy",
                color: "#FFB5B5",
              },
              {
                name: "TripAdvisor",
                description: "Property reviews and management responses",
                url: "https://www.tripadvisor.com/pages/privacy.html",
                color: "#D4CCFF",
              },
            ].map((platform) => (
              <div
                key={platform.name}
                className="rounded-2xl p-5 border-2 border-[#1a2e1a]/10"
                style={{ backgroundColor: platform.color + "30" }}
              >
                <h4 className="font-bold text-[#1a2e1a] text-sm mb-1" style={font}>
                  {platform.name}
                </h4>
                <p className="text-xs text-[#1a2e1a]/50 mb-2">{platform.description}</p>
                <span className="text-xs text-[#1a2e1a]/40 flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  See their privacy policy
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4">
            When you connect a third-party platform to ReviewForge, we access only the data and permissions you explicitly authorize. We recommend reviewing the permissions requested during the connection process and revoking any that are not necessary. You can disconnect any third-party integration at any time from your account settings without affecting the rest of your ReviewForge functionality.
          </p>
          <p>
            We are not responsible for the privacy practices, data collection, or content of any third-party websites or services. Links to external sites are provided for convenience only and do not constitute an endorsement of their privacy practices.
          </p>
        </SectionCard>

        {/* Section 12: Changes to This Policy */}
        <SectionCard {...sections[11]}>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or for other operational reasons. When we make changes, we will take the following steps:
          </p>
          <BulletList
            items={[
              "Material Changes: For changes that materially affect how we collect, use, or share your personal information, we will provide at least 30 days' advance notice via email to the address associated with your account and through a prominent banner notification within the Platform. You will have the opportunity to review the changes and, if you disagree, to close your account and export your data before the new policy takes effect.",
              "Non-Material Changes: For minor changes such as formatting updates, clarifications, or corrections that do not materially affect your rights, we will update the 'Last Updated' date at the top of this page. We encourage you to review this page periodically.",
              "Version History: We maintain a version history of all past privacy policies, which is available upon request by emailing privacy@schroedertech.com.",
              "Continued Use: Your continued use of ReviewForge after the effective date of any updated Privacy Policy constitutes your acceptance of the revised terms. If you do not agree with any changes, you must discontinue use of the Service.",
            ]}
          />
        </SectionCard>

        {/* Section 13: Contact Information */}
        <SectionCard {...sections[12]}>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to reach out using any of the methods below:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-2xl p-6 border-2 border-[#1a2e1a]/10 bg-[#C8F5D4]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C8F5D4] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <h4 className="font-bold text-[#1a2e1a] text-sm" style={font}>
                  Company Headquarters
                </h4>
              </div>
              <div className="space-y-2 text-sm text-[#1a2e1a]/60">
                <p className="font-semibold text-[#1a2e1a]">Schroeder Technologies, Inc.</p>
                <p>2100 Innovation Drive, Suite 450</p>
                <p>Austin, TX 78701</p>
                <p>United States</p>
              </div>
            </div>

            <div className="rounded-2xl p-6 border-2 border-[#1a2e1a]/10 bg-[#FFE566]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFE566] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <Fingerprint className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <h4 className="font-bold text-[#1a2e1a] text-sm" style={font}>
                  Data Protection Officer
                </h4>
              </div>
              <div className="space-y-2 text-sm text-[#1a2e1a]/60">
                <p className="font-semibold text-[#1a2e1a]">Office of the DPO</p>
                <p>privacy@schroedertech.com</p>
                <p>+1 (512) 555-0142</p>
                <p>Response within 2 business days</p>
              </div>
            </div>

            <div className="rounded-2xl p-6 border-2 border-[#1a2e1a]/10 bg-[#D4CCFF]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#D4CCFF] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <Globe className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <h4 className="font-bold text-[#1a2e1a] text-sm" style={font}>
                  EU Representative
                </h4>
              </div>
              <div className="space-y-2 text-sm text-[#1a2e1a]/60">
                <p className="font-semibold text-[#1a2e1a]">Schroeder Technologies EU Ltd.</p>
                <p>77 Sir John Rogerson&apos;s Quay</p>
                <p>Dublin 2, D02 VK60</p>
                <p>Ireland</p>
              </div>
            </div>

            <div className="rounded-2xl p-6 border-2 border-[#1a2e1a]/10 bg-[#FFB5B5]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFB5B5] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <h4 className="font-bold text-[#1a2e1a] text-sm" style={font}>
                  General Inquiries
                </h4>
              </div>
              <div className="space-y-2 text-sm text-[#1a2e1a]/60">
                <p className="font-semibold text-[#1a2e1a]">ReviewForge Support</p>
                <p>support@reviewforge.com</p>
                <p>legal@schroedertech.com</p>
                <p>Mon-Fri, 9AM-6PM CT</p>
              </div>
            </div>
          </div>

          <SubSection title="Supervisory Authority">
            <p>
              If you are located in the EEA or UK and believe that our processing of your personal data violates applicable data protection law, you have the right to lodge a complaint with your local supervisory authority. Our lead supervisory authority in the EU is:
            </p>
            <div className="rounded-2xl p-5 border-2 border-[#1a2e1a]/10 bg-[#FFDAB5]/20 mt-3">
              <p className="font-semibold text-[#1a2e1a] text-sm">Irish Data Protection Commission (DPC)</p>
              <p className="text-sm text-[#1a2e1a]/60 mt-1">21 Fitzwilliam Square South, Dublin 2, D02 RD28, Ireland</p>
              <p className="text-sm text-[#1a2e1a]/60">Phone: +353 (0)1 765 0100</p>
              <p className="text-sm text-[#1a2e1a]/60">Website: dataprotection.ie</p>
            </div>
            <p className="mt-3">
              We encourage you to contact our Data Protection Officer first so we can attempt to resolve your concern directly. We take every complaint seriously and aim to resolve issues within 30 days.
            </p>
          </SubSection>
        </SectionCard>

        {/* End Note */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a]">
            <Shield className="h-4 w-4" /> End of Privacy Policy
          </div>
          <p className="text-sm text-[#1a2e1a]/40 mt-4 max-w-lg mx-auto">
            Thank you for taking the time to read our Privacy Policy. If you have any questions, we are always here to help at{" "}
            <a
              href="mailto:privacy@schroedertech.com"
              className="text-[#1a2e1a]/60 underline decoration-[#C8F5D4] decoration-2 underline-offset-2 hover:text-[#1a2e1a] transition-colors"
            >
              privacy@schroedertech.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
