"use client"

import {
  Cookie,
  Shield,
  BarChart3,
  Settings,
  Megaphone,
  Globe,
  Clock,
  Server,
  Eye,
  Fingerprint,
  Monitor,
  Smartphone,
  HardDrive,
  ToggleRight,
  Mail,
  Info,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Layers,
  Lock,
} from "lucide-react"
import { useState } from "react"

const font = { fontFamily: "var(--font-display)" }

const cookieCategories = [
  {
    id: "essential",
    name: "Essential",
    icon: Shield,
    color: "#C8F5D4",
    count: 5,
    description:
      "Required for ReviewForge to function. These cannot be disabled without breaking core features like login, session management, and security.",
    alwaysActive: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    color: "#FFE566",
    count: 5,
    description:
      "Help us understand how you use ReviewForge so we can improve the experience. We track page views, feature usage, and performance metrics.",
    alwaysActive: false,
  },
  {
    id: "functional",
    name: "Functional",
    icon: Settings,
    color: "#D4CCFF",
    count: 4,
    description:
      "Remember your preferences like theme, language, and dashboard layout. Disabling these means your settings won't persist between sessions.",
    alwaysActive: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Megaphone,
    color: "#FFB5B5",
    count: 3,
    description:
      "Used to deliver relevant ads and measure campaign effectiveness. These are set by third-party advertising partners.",
    alwaysActive: false,
  },
]

const essentialCookies = [
  {
    name: "rf_session",
    provider: "ReviewForge",
    purpose:
      "Maintains your active session as you navigate between pages. Stores a unique session identifier that links your browser to our server-side session data.",
    duration: "24 hours",
    type: "First-party",
  },
  {
    name: "rf_auth",
    provider: "ReviewForge",
    purpose:
      "Stores your encrypted authentication token after login. This keeps you signed in across browser restarts without requiring re-authentication.",
    duration: "7 days",
    type: "First-party",
  },
  {
    name: "rf_csrf",
    provider: "ReviewForge",
    purpose:
      "Cross-Site Request Forgery protection token. Validates that form submissions and API requests originate from ReviewForge and not from malicious third-party sites.",
    duration: "Session",
    type: "First-party",
  },
  {
    name: "rf_business",
    provider: "ReviewForge",
    purpose:
      "Remembers which business profile you have selected when managing multiple locations. Ensures dashboard data, reviews, and analytics correspond to the correct business.",
    duration: "30 days",
    type: "First-party",
  },
  {
    name: "__Host-rf_secure",
    provider: "ReviewForge",
    purpose:
      "A Secure-prefixed cookie that enforces HTTPS-only transmission and prevents subdomain access. Provides an additional layer of session security for sensitive operations.",
    duration: "Session",
    type: "First-party",
  },
]

const analyticsCookies = [
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose:
      "Registers a unique ID used to generate statistical data on how you use ReviewForge. This helps us identify trends in page visits, session duration, and user flows.",
    duration: "2 years",
    type: "Third-party",
  },
  {
    name: "_ga_*",
    provider: "Google Analytics",
    purpose:
      "Used by Google Analytics 4 to persist session state and distinguish between individual sessions. The asterisk represents a unique container ID specific to our GA4 property.",
    duration: "2 years",
    type: "Third-party",
  },
  {
    name: "_gid",
    provider: "Google Analytics",
    purpose:
      "Registers a unique ID for the current 24-hour period. Used to throttle request rates, aggregate daily usage patterns, and differentiate between users on a daily basis.",
    duration: "24 hours",
    type: "Third-party",
  },
  {
    name: "rf_analytics",
    provider: "ReviewForge",
    purpose:
      "Our own first-party analytics cookie that tracks feature adoption, review response rates, and dashboard engagement. This data is never shared with third parties and is used solely to improve ReviewForge.",
    duration: "1 year",
    type: "First-party",
  },
  {
    name: "mp_*",
    provider: "Mixpanel",
    purpose:
      "Mixpanel analytics cookies used for product analytics, funnel analysis, and A/B testing. Tracks user interactions with specific ReviewForge features to help us prioritize development.",
    duration: "1 year",
    type: "Third-party",
  },
]

const functionalCookies = [
  {
    name: "rf_theme",
    provider: "ReviewForge",
    purpose:
      "Stores your preferred visual theme (light, dark, or system-default). Ensures the correct theme is applied immediately on page load to prevent visual flashing.",
    duration: "1 year",
    type: "First-party",
  },
  {
    name: "rf_lang",
    provider: "ReviewForge",
    purpose:
      "Saves your preferred language setting. ReviewForge supports multiple languages and this cookie ensures the interface is displayed in your chosen language on every visit.",
    duration: "1 year",
    type: "First-party",
  },
  {
    name: "rf_dashboard_layout",
    provider: "ReviewForge",
    purpose:
      "Remembers your customized dashboard layout, including widget positions, collapsed panels, selected date ranges, and chart preferences across sessions.",
    duration: "1 year",
    type: "First-party",
  },
  {
    name: "rf_onboarding",
    provider: "ReviewForge",
    purpose:
      "Tracks your onboarding progress through the ReviewForge setup wizard. Ensures completed steps are not repeated and guides you to the next step when you return.",
    duration: "90 days",
    type: "First-party",
  },
]

const marketingCookies = [
  {
    name: "_fbp",
    provider: "Facebook (Meta)",
    purpose:
      "Facebook Pixel cookie used to identify browsers for advertising and site analytics. Enables us to measure the effectiveness of our Facebook ad campaigns and deliver relevant ads to ReviewForge visitors.",
    duration: "3 months",
    type: "Third-party",
  },
  {
    name: "_gcl_au",
    provider: "Google Ads",
    purpose:
      "Google Ads conversion linker cookie. Stores click information from our Google advertising campaigns to attribute sign-ups and conversions to the correct ad, helping us optimize our ad spend.",
    duration: "3 months",
    type: "Third-party",
  },
  {
    name: "hubspotutk",
    provider: "HubSpot",
    purpose:
      "HubSpot tracking cookie used to keep track of visitors to our marketing site. Associates your browsing activity with a HubSpot contact record when you submit a form, enabling personalized follow-up.",
    duration: "6 months",
    type: "Third-party",
  },
]

interface CookieTableProps {
  cookies: typeof essentialCookies
  accentColor: string
}

function CookieTable({ cookies, accentColor }: CookieTableProps) {
  return (
    <div className="space-y-3">
      {cookies.map((cookie, index) => (
        <div
          key={cookie.name}
          className={`rounded-2xl border-2 border-[#1a2e1a] overflow-hidden ${
            index % 2 === 0 ? "bg-white" : "bg-[#FFF8F0]"
          }`}
        >
          <div className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <code
                className="text-sm font-bold px-3 py-1 rounded-lg border-2 border-[#1a2e1a]"
                style={{ backgroundColor: accentColor }}
              >
                {cookie.name}
              </code>
              <span className="inline-flex items-center gap-1 bg-[#1a2e1a]/5 text-[#1a2e1a]/70 px-2.5 py-1 rounded-full text-xs font-semibold">
                <Server className="h-3 w-3" />
                {cookie.provider}
              </span>
              <span className="inline-flex items-center gap-1 bg-[#1a2e1a]/5 text-[#1a2e1a]/70 px-2.5 py-1 rounded-full text-xs font-semibold">
                <Clock className="h-3 w-3" />
                {cookie.duration}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  cookie.type === "First-party"
                    ? "bg-[#C8F5D4]/50 text-[#1a2e1a] border-[#1a2e1a]/20"
                    : "bg-[#FFB5B5]/50 text-[#1a2e1a] border-[#1a2e1a]/20"
                }`}
              >
                {cookie.type === "First-party" ? (
                  <Lock className="h-3 w-3" />
                ) : (
                  <Globe className="h-3 w-3" />
                )}
                {cookie.type}
              </span>
            </div>
            <p className="text-sm text-[#1a2e1a]/70 leading-relaxed">
              {cookie.purpose}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionHeading({
  number,
  title,
  id,
}: {
  number: string
  title: string
  id: string
}) {
  return (
    <div className="flex items-center gap-4 mb-6" id={id}>
      <div
        className="w-10 h-10 rounded-full bg-[#1a2e1a] text-[#FFF8F0] flex items-center justify-center text-sm font-bold shrink-0"
        style={font}
      >
        {number}
      </div>
      <h2
        className="text-2xl sm:text-3xl font-bold text-[#1a2e1a] tracking-tight"
        style={font}
      >
        {title}
      </h2>
    </div>
  )
}

export default function CookiePolicyPage() {
  const [expandedBrowser, setExpandedBrowser] = useState<string | null>(null)

  const browsers = [
    {
      name: "Google Chrome",
      icon: Monitor,
      steps: [
        "Click the three-dot menu in the top right corner",
        "Select \"Settings\" from the dropdown",
        "Click \"Privacy and security\" in the left sidebar",
        "Click \"Cookies and other site data\"",
        "Choose your preferred cookie setting: allow all, block third-party, block third-party in incognito, or block all cookies",
        "To delete existing cookies, click \"See all site data and permissions\" and remove entries for reviewforge.com",
      ],
    },
    {
      name: "Mozilla Firefox",
      icon: Globe,
      steps: [
        "Click the hamburger menu (three lines) in the top right",
        "Select \"Settings\"",
        "Click \"Privacy & Security\" in the left panel",
        "Under \"Enhanced Tracking Protection\", choose Standard, Strict, or Custom",
        "In Custom mode, you can select which cookies to block (cross-site tracking, all third-party, or all cookies)",
        "To clear existing cookies, click \"Manage Data\" and search for reviewforge.com",
      ],
    },
    {
      name: "Safari",
      icon: Smartphone,
      steps: [
        "Open Safari and click \"Safari\" in the menu bar",
        "Select \"Settings\" (or \"Preferences\" on older versions)",
        "Click the \"Privacy\" tab",
        "Check \"Prevent cross-site tracking\" to block third-party cookies",
        "Click \"Manage Website Data\" to view and remove cookies from specific sites",
        "Search for reviewforge.com and click \"Remove\" to delete our cookies",
      ],
    },
    {
      name: "Microsoft Edge",
      icon: Monitor,
      steps: [
        "Click the three-dot menu in the top right corner",
        "Select \"Settings\"",
        "Click \"Cookies and site permissions\" in the left sidebar",
        "Click \"Manage and delete cookies and site data\"",
        "Toggle \"Block third-party cookies\" if desired",
        "Click \"See all cookies and site data\" and search for reviewforge.com to remove specific cookies",
      ],
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Floating decorative shapes */}
      <div className="absolute top-40 -left-16 w-32 h-32 bg-[#FFB5B5] rounded-full opacity-20 blur-2xl pointer-events-none" />
      <div className="absolute top-96 -right-20 w-48 h-48 bg-[#D4CCFF] rounded-full opacity-20 blur-2xl pointer-events-none" />
      <div className="absolute top-[60rem] -left-10 w-40 h-40 bg-[#FFE566] rounded-full opacity-15 blur-2xl pointer-events-none" />
      <div className="absolute top-[100rem] -right-14 w-36 h-36 bg-[#C8F5D4] rounded-full opacity-20 blur-2xl pointer-events-none" />
      <div className="absolute top-[140rem] left-1/4 w-28 h-28 bg-[#FFDAB5] rounded-full opacity-15 blur-2xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Floating cookie decorations */}
          <div className="absolute top-12 left-[10%] w-8 h-8 bg-[#FFB5B5] rounded-full border-2 border-[#1a2e1a] rotate-12 hidden sm:block" />
          <div className="absolute top-20 right-[15%] w-6 h-6 bg-[#FFE566] rounded-lg border-2 border-[#1a2e1a] -rotate-12 hidden sm:block" />
          <div className="absolute top-32 left-[20%] w-5 h-5 bg-[#D4CCFF] rounded-full border-2 border-[#1a2e1a] hidden sm:block" />

          <div className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a] mb-6">
            <Cookie className="h-3.5 w-3.5" />
            Cookie Policy
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1a2e1a] tracking-tight mb-6"
            style={font}
          >
            HOW WE USE{" "}
            <span className="relative inline-block">
              COOKIES
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[#FFB5B5]/40 -rotate-1 rounded-full" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto leading-relaxed mb-8">
            We believe in transparency. This policy explains exactly what
            cookies ReviewForge uses, why we use them, and how you can control
            them. No legalese, no surprises.
          </p>

          <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]">
            <Clock className="h-4 w-4 text-[#1a2e1a]/50" />
            <span className="text-sm font-medium text-[#1a2e1a]/70">
              Effective Date:{" "}
              <span className="text-[#1a2e1a] font-bold">
                February 25, 2026
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Cookie Category Overview Cards */}
      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {cookieCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] relative overflow-hidden group hover:shadow-[6px_6px_0px_0px_#1a2e1a] transition-shadow"
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-[3rem] opacity-30"
                  style={{ backgroundColor: category.color }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#1a2e1a]"
                      style={{ backgroundColor: category.color }}
                    >
                      <category.icon className="h-6 w-6 text-[#1a2e1a]" />
                    </div>
                    {category.alwaysActive ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#C8F5D4] text-[#1a2e1a] px-3 py-1 rounded-full text-xs font-bold border border-[#1a2e1a]/20">
                        <CheckCircle2 className="h-3 w-3" />
                        Always Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-[#1a2e1a]/5 text-[#1a2e1a]/50 px-3 py-1 rounded-full text-xs font-bold">
                        <ToggleRight className="h-3 w-3" />
                        Optional
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-xl font-bold text-[#1a2e1a] mb-2"
                    style={font}
                  >
                    {category.name} Cookies
                  </h3>
                  <p className="text-sm text-[#1a2e1a]/60 leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-2 border-[#1a2e1a]"
                      style={{ backgroundColor: category.color }}
                    >
                      <Layers className="h-3 w-3" />
                      {category.count} cookie{category.count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Section 1: What Are Cookies */}
          <div>
            <SectionHeading number="1" title="What Are Cookies" id="what-are-cookies" />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
                  <Info className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-1" style={font}>
                    The Short Version
                  </h3>
                  <p className="text-sm text-[#1a2e1a]/60">
                    Cookies are not scary. Here is what they actually are.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed">
                <p>
                  Cookies are small text files that are placed on your computer or
                  mobile device when you visit a website. They are widely used to
                  make websites work more efficiently, provide a better user
                  experience, and give website owners useful information about how
                  their site is being used.
                </p>
                <p>
                  When you visit ReviewForge, our servers send one or more cookies
                  to your browser. Your browser stores them on your device and sends
                  them back to us with each subsequent request. This is how we
                  remember that you are logged in, which business you are managing,
                  and what your preferences are.
                </p>
                <p>
                  Cookies can be <strong className="text-[#1a2e1a]">first-party</strong> (set
                  directly by ReviewForge) or <strong className="text-[#1a2e1a]">third-party</strong>{" "}
                  (set by services we integrate with, like Google Analytics). They
                  can also be <strong className="text-[#1a2e1a]">session cookies</strong> (deleted
                  when you close your browser) or{" "}
                  <strong className="text-[#1a2e1a]">persistent cookies</strong> (remain on your
                  device for a set period of time).
                </p>
                <p>
                  In addition to cookies, we also use similar technologies such as
                  local storage and session storage (collectively referred to as
                  &ldquo;cookies&rdquo; throughout this policy where appropriate) for some
                  functionality within ReviewForge.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: How We Use Cookies */}
          <div>
            <SectionHeading
              number="2"
              title="How We Use Cookies"
              id="how-we-use-cookies"
            />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed">
                <p>
                  ReviewForge uses cookies for four main purposes, each serving a
                  distinct role in providing and improving our review management
                  platform. We have categorized every cookie we use into one of the
                  following groups:
                </p>
                <ul className="space-y-3 pl-1">
                  {cookieCategories.map((cat) => (
                    <li key={cat.id} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center border border-[#1a2e1a]/20 shrink-0 mt-0.5"
                        style={{ backgroundColor: cat.color }}
                      >
                        <cat.icon className="h-3.5 w-3.5 text-[#1a2e1a]" />
                      </div>
                      <div>
                        <strong className="text-[#1a2e1a]">
                          {cat.name} Cookies
                        </strong>{" "}
                        &mdash; {cat.description}
                      </div>
                    </li>
                  ))}
                </ul>
                <p>
                  The sections below provide full details on every individual cookie
                  we use, including its name, purpose, who sets it, and how long it
                  lasts. We believe you deserve to know exactly what data is being
                  stored on your device.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Essential Cookies */}
          <div>
            <SectionHeading
              number="3"
              title="Essential Cookies"
              id="essential-cookies"
            />
            <div className="mb-5">
              <div className="bg-[#C8F5D4]/30 rounded-2xl p-5 border-2 border-[#C8F5D4]">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#1a2e1a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e1a] mb-1">
                      These cookies are strictly necessary
                    </p>
                    <p className="text-sm text-[#1a2e1a]/60">
                      Essential cookies cannot be disabled because ReviewForge
                      literally cannot function without them. They handle
                      authentication, security protections, and core session
                      management. No personal information is shared with third
                      parties through these cookies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CookieTable cookies={essentialCookies} accentColor="#C8F5D4" />
          </div>

          {/* Section 4: Analytics Cookies */}
          <div>
            <SectionHeading
              number="4"
              title="Analytics Cookies"
              id="analytics-cookies"
            />
            <div className="mb-5">
              <div className="bg-[#FFE566]/20 rounded-2xl p-5 border-2 border-[#FFE566]">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-[#1a2e1a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e1a] mb-1">
                      Helping us build a better product
                    </p>
                    <p className="text-sm text-[#1a2e1a]/60">
                      Analytics cookies help us understand which features are most
                      used, where users encounter friction, and how ReviewForge
                      performs across different devices. You can opt out of these
                      cookies at any time without affecting core functionality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CookieTable cookies={analyticsCookies} accentColor="#FFE566" />
          </div>

          {/* Section 5: Functional Cookies */}
          <div>
            <SectionHeading
              number="5"
              title="Functional Cookies"
              id="functional-cookies"
            />
            <div className="mb-5">
              <div className="bg-[#D4CCFF]/30 rounded-2xl p-5 border-2 border-[#D4CCFF]">
                <div className="flex items-start gap-3">
                  <Settings className="h-5 w-5 text-[#1a2e1a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e1a] mb-1">
                      Your preferences, remembered
                    </p>
                    <p className="text-sm text-[#1a2e1a]/60">
                      Functional cookies personalize your experience by
                      remembering choices you make. Without these, you would need
                      to reconfigure your theme, language, and dashboard layout
                      every time you visit ReviewForge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CookieTable cookies={functionalCookies} accentColor="#D4CCFF" />
          </div>

          {/* Section 6: Marketing Cookies */}
          <div>
            <SectionHeading
              number="6"
              title="Marketing Cookies"
              id="marketing-cookies"
            />
            <div className="mb-5">
              <div className="bg-[#FFB5B5]/30 rounded-2xl p-5 border-2 border-[#FFB5B5]">
                <div className="flex items-start gap-3">
                  <Megaphone className="h-5 w-5 text-[#1a2e1a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e1a] mb-1">
                      Advertising and campaign measurement
                    </p>
                    <p className="text-sm text-[#1a2e1a]/60">
                      Marketing cookies are placed by our advertising partners to
                      build a profile of your interests and show you relevant ads
                      on other sites. These are entirely optional and ReviewForge
                      works perfectly without them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CookieTable cookies={marketingCookies} accentColor="#FFB5B5" />
          </div>

          {/* Section 7: Local Storage and Session Storage */}
          <div>
            <SectionHeading
              number="7"
              title="Local Storage & Session Storage"
              id="local-storage"
            />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
                  <HardDrive className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-1" style={font}>
                    Beyond Traditional Cookies
                  </h3>
                  <p className="text-sm text-[#1a2e1a]/60">
                    In addition to cookies, ReviewForge uses browser storage APIs
                    for performance and functionality.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed">
                <p>
                  Modern web applications like ReviewForge use Local Storage and
                  Session Storage to keep certain data on your device. Unlike
                  cookies, this data is not sent to our servers with every request,
                  making it more efficient for storing larger amounts of
                  non-sensitive information.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-5">
                  <div className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#1a2e1a]/10">
                    <h4 className="font-bold text-[#1a2e1a] mb-3 text-sm" style={font}>
                      Local Storage (Persistent)
                    </h4>
                    <ul className="space-y-2 text-sm text-[#1a2e1a]/60">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFDAB5] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        User interface preferences and theme settings
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFDAB5] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        Cached dashboard widget configurations
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFDAB5] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        Feature flag states and experiment assignments
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFDAB5] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        Notification preferences and dismissed alerts
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#1a2e1a]/10">
                    <h4 className="font-bold text-[#1a2e1a] mb-3 text-sm" style={font}>
                      Session Storage (Temporary)
                    </h4>
                    <ul className="space-y-2 text-sm text-[#1a2e1a]/60">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4CCFF] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        Form data for multi-step review response drafts
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4CCFF] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        Temporary navigation state and scroll positions
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4CCFF] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        Unsaved changes in settings and configurations
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4CCFF] mt-1.5 shrink-0 border border-[#1a2e1a]/20" />
                        Active filter and sort states for review lists
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  Session storage is automatically cleared when you close your
                  browser tab. Local storage persists until you manually clear it
                  through your browser settings or until ReviewForge programmatically
                  removes outdated entries.
                </p>
              </div>
            </div>
          </div>

          {/* Section 8: Third-Party Cookies */}
          <div>
            <SectionHeading
              number="8"
              title="Third-Party Cookies"
              id="third-party-cookies"
            />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed mb-6">
                <p>
                  ReviewForge integrates with several third-party services that may
                  set their own cookies on your device. We carefully vet each
                  partner and only work with services that meet our privacy
                  standards. Below is a complete list of third-party services that
                  may place cookies when you use ReviewForge:
                </p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "Google Analytics",
                    purpose:
                      "Website analytics and usage statistics. Helps us understand traffic patterns, popular features, and user demographics. Data is anonymized and aggregated.",
                    link: "https://policies.google.com/privacy",
                    color: "#FFE566",
                  },
                  {
                    name: "Facebook (Meta) Pixel",
                    purpose:
                      "Advertising conversion tracking and audience building. Measures the effectiveness of our Facebook and Instagram ad campaigns. You can opt out via Facebook Ad Settings.",
                    link: "https://www.facebook.com/privacy/policy",
                    color: "#FFB5B5",
                  },
                  {
                    name: "Intercom",
                    purpose:
                      "Live chat and customer support widget. Enables real-time support conversations, help articles, and onboarding tours within the ReviewForge dashboard.",
                    link: "https://www.intercom.com/legal/privacy",
                    color: "#C8F5D4",
                  },
                  {
                    name: "Stripe",
                    purpose:
                      "Payment processing and fraud prevention. Stripe sets cookies to securely process your subscription payments and detect fraudulent transactions. These are essential for billing.",
                    link: "https://stripe.com/privacy",
                    color: "#D4CCFF",
                  },
                  {
                    name: "HubSpot",
                    purpose:
                      "Marketing automation and lead tracking. Used on our marketing pages to track content engagement, manage email campaigns, and personalize your experience on reviewforge.com.",
                    link: "https://legal.hubspot.com/privacy-policy",
                    color: "#FFDAB5",
                  },
                ].map((service) => (
                  <div
                    key={service.name}
                    className="flex items-start gap-4 p-4 rounded-2xl border-2 border-[#1a2e1a]/10 hover:border-[#1a2e1a]/20 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#1a2e1a] shrink-0"
                      style={{ backgroundColor: service.color }}
                    >
                      <Globe className="h-5 w-5 text-[#1a2e1a]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-[#1a2e1a] text-sm" style={font}>
                          {service.name}
                        </h4>
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#1a2e1a]/40 hover:text-[#1a2e1a]/70 transition-colors"
                        >
                          Privacy Policy
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                        {service.purpose}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 9: Managing Your Cookie Preferences */}
          <div>
            <SectionHeading
              number="9"
              title="Managing Your Cookie Preferences"
              id="managing-cookies"
            />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed mb-6">
                <p>
                  You have full control over which cookies are stored on your
                  device. Most web browsers allow you to manage cookies through
                  their settings. Please note that disabling certain cookies may
                  impact your experience with ReviewForge.
                </p>
                <p>
                  In addition to browser controls, you can manage your cookie
                  preferences directly within ReviewForge by visiting your{" "}
                  <strong className="text-[#1a2e1a]">Account Settings &gt; Privacy</strong>{" "}
                  page, where you will find toggles for each optional cookie
                  category.
                </p>
              </div>

              <div className="space-y-3">
                {browsers.map((browser) => (
                  <div
                    key={browser.name}
                    className="border-2 border-[#1a2e1a]/10 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedBrowser(
                          expandedBrowser === browser.name
                            ? null
                            : browser.name
                        )
                      }
                      className="w-full flex items-center gap-3 p-4 hover:bg-[#FFF8F0]/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#1a2e1a]/5 flex items-center justify-center shrink-0">
                        <browser.icon className="h-4 w-4 text-[#1a2e1a]" />
                      </div>
                      <span className="text-sm font-bold text-[#1a2e1a] flex-1">
                        {browser.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#1a2e1a]/40 transition-transform ${
                          expandedBrowser === browser.name
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {expandedBrowser === browser.name && (
                      <div className="px-4 pb-4 pt-0">
                        <ol className="space-y-2 pl-4">
                          {browser.steps.map((step, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-sm text-[#1a2e1a]/60"
                            >
                              <span
                                className="w-5 h-5 rounded-full bg-[#1a2e1a] text-[#FFF8F0] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                                style={font}
                              >
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 bg-[#FFE566]/15 rounded-2xl border-2 border-[#FFE566]/40">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-[#1a2e1a] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1a2e1a]/70">
                    <strong className="text-[#1a2e1a]">Important:</strong>{" "}
                    Blocking all cookies will prevent you from logging into
                    ReviewForge. We recommend keeping essential cookies enabled
                    and selectively managing analytics, functional, and marketing
                    cookies based on your preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 10: Do Not Track Signals */}
          <div>
            <SectionHeading
              number="10"
              title="Do Not Track Signals"
              id="do-not-track"
            />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#D4CCFF] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
                  <Eye className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-1" style={font}>
                    We Respect Your Browser Signals
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed">
                <p>
                  Some web browsers transmit &ldquo;Do Not Track&rdquo; (DNT) signals to
                  websites. While there is no universally accepted standard for
                  how companies should respond to DNT signals, ReviewForge takes
                  your privacy preferences seriously.
                </p>
                <p>
                  When we detect a DNT signal from your browser, ReviewForge will
                  automatically disable all non-essential cookies, including
                  analytics, functional, and marketing cookies. Only strictly
                  necessary cookies required for authentication and security will
                  remain active.
                </p>
                <p>
                  We also honor the{" "}
                  <strong className="text-[#1a2e1a]">
                    Global Privacy Control (GPC)
                  </strong>{" "}
                  signal. If your browser sends a GPC signal, we treat it as a
                  valid opt-out request for the sale or sharing of personal
                  information, consistent with applicable privacy laws including
                  the California Consumer Privacy Act (CCPA).
                </p>
              </div>
            </div>
          </div>

          {/* Section 11: Cookie Consent */}
          <div>
            <SectionHeading
              number="11"
              title="Cookie Consent"
              id="cookie-consent"
            />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#C8F5D4] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
                  <Fingerprint className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-1" style={font}>
                    Your Consent, Your Control
                  </h3>
                </div>
              </div>
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed">
                <p>
                  When you first visit ReviewForge, we display a cookie consent
                  banner that asks for your permission before setting any
                  non-essential cookies. You can choose to accept all cookies,
                  reject optional cookies, or customize your preferences by
                  category.
                </p>
                <p>
                  Your consent preferences are stored in a cookie called{" "}
                  <code className="text-sm bg-[#1a2e1a]/5 px-2 py-0.5 rounded-md font-mono">
                    rf_consent
                  </code>{" "}
                  that persists for 12 months. This cookie records which
                  categories you have opted into and the date of your consent, in
                  compliance with GDPR and ePrivacy Directive requirements.
                </p>
                <h4 className="font-bold text-[#1a2e1a] pt-2" style={font}>
                  How to Withdraw Consent
                </h4>
                <p>You can change or withdraw your cookie consent at any time by:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Clicking the \"Cookie Preferences\" link in the footer of any ReviewForge page",
                    "Visiting Account Settings > Privacy > Cookie Preferences in your dashboard",
                    "Clearing your browser cookies, which will reset your consent and trigger the consent banner on your next visit",
                    "Contacting us at privacy@schroedertech.com to request consent withdrawal on your behalf",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#C8F5D4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  When you withdraw consent for a category, ReviewForge will
                  immediately stop setting new cookies in that category and will
                  delete any existing cookies from that category on your device.
                </p>
              </div>
            </div>
          </div>

          {/* Section 12: Updates to This Policy */}
          <div>
            <SectionHeading
              number="12"
              title="Updates to This Policy"
              id="updates"
            />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed">
                <p>
                  We may update this Cookie Policy from time to time to reflect
                  changes in the cookies we use, changes in our practices, or
                  changes in applicable laws and regulations. When we make material
                  changes to this policy, we will:
                </p>
                <ul className="space-y-2 pl-1">
                  {[
                    "Update the \"Effective Date\" at the top of this page",
                    "Display a prominent notice within the ReviewForge dashboard",
                    "Send an email notification to account owners if the changes significantly affect how we process data",
                    "Re-prompt for cookie consent if we add new cookie categories or third-party providers",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFB5B5] mt-2 shrink-0 border border-[#1a2e1a]/20" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  We encourage you to review this policy periodically to stay
                  informed about how ReviewForge uses cookies. The most current
                  version will always be available at{" "}
                  <strong className="text-[#1a2e1a]">
                    reviewforge.com/cookies
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Section 13: Contact */}
          <div>
            <SectionHeading number="13" title="Contact Us" id="contact" />
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="space-y-4 text-[#1a2e1a]/70 text-[15px] leading-relaxed mb-6">
                <p>
                  If you have questions about our use of cookies, need help
                  managing your cookie preferences, or want to learn more about
                  how ReviewForge handles your data, we are here to help. Our
                  privacy team typically responds within two business days.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#1a2e1a]/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB5B5] flex items-center justify-center border border-[#1a2e1a]/20">
                      <Mail className="h-4 w-4 text-[#1a2e1a]" />
                    </div>
                    <h4
                      className="font-bold text-[#1a2e1a] text-sm"
                      style={font}
                    >
                      Cookie Questions
                    </h4>
                  </div>
                  <a
                    href="mailto:privacy@schroedertech.com"
                    className="text-sm text-[#1a2e1a] font-semibold hover:underline"
                  >
                    privacy@schroedertech.com
                  </a>
                  <p className="text-xs text-[#1a2e1a]/40 mt-1">
                    For cookie and privacy inquiries
                  </p>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#1a2e1a]/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C8F5D4] flex items-center justify-center border border-[#1a2e1a]/20">
                      <Shield className="h-4 w-4 text-[#1a2e1a]" />
                    </div>
                    <h4
                      className="font-bold text-[#1a2e1a] text-sm"
                      style={font}
                    >
                      Data Protection Officer
                    </h4>
                  </div>
                  <a
                    href="mailto:dpo@schroedertech.com"
                    className="text-sm text-[#1a2e1a] font-semibold hover:underline"
                  >
                    dpo@schroedertech.com
                  </a>
                  <p className="text-xs text-[#1a2e1a]/40 mt-1">
                    For GDPR and data rights requests
                  </p>
                </div>
              </div>
              <div className="mt-5 p-5 bg-[#1a2e1a] rounded-2xl text-[#FFF8F0]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF8F0]/10 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-[#FFF8F0]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={font}>
                      Schroeder Technologies
                    </h4>
                    <p className="text-xs text-[#FFF8F0]/60 leading-relaxed">
                      ReviewForge is a product of Schroeder Technologies. All
                      cookie-related inquiries and data requests are handled by
                      our dedicated privacy team. We are committed to
                      transparency and will work with you to resolve any
                      concerns about your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacer for visual breathing room */}
          <div className="h-8" />
        </div>
      </section>
    </div>
  )
}
