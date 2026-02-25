"use client"

import {
  Database,
  Shield,
  Globe,
  Server,
  Lock,
  Users,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  Trash2,
  Clock,
  Mail,
  Building2,
  Mic,
  Cpu,
  Send,
  BarChart3,
  Key,
  ShieldCheck,
  Fingerprint,
  HardDrive,
  Network,
  UserCheck,
  BookOpen,
  Scale,
  RefreshCw,
  ChevronRight,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const complianceBadges = [
  {
    title: "GDPR",
    subtitle: "General Data Protection Regulation",
    status: "Compliant",
    icon: Shield,
    color: "#C8F5D4",
    description: "Full compliance with EU data protection requirements including lawful basis, data minimization, and cross-border transfer safeguards.",
  },
  {
    title: "CCPA",
    subtitle: "California Consumer Privacy Act",
    status: "Compliant",
    icon: Users,
    color: "#FFE566",
    description: "Adherence to California consumer privacy rights including disclosure, deletion, and opt-out of data sales.",
  },
  {
    title: "SOC 2",
    subtitle: "Service Organization Control",
    status: "Compliant",
    icon: CheckCircle2,
    color: "#D4CCFF",
    description: "Type II audit completed covering security, availability, and confidentiality trust service criteria.",
  },
  {
    title: "ISO 27001",
    subtitle: "Information Security Management",
    status: "In Progress",
    icon: Lock,
    color: "#FFDAB5",
    description: "Certification in progress. Information security management system implemented and undergoing formal audit.",
  },
]

const dataFlowSteps = [
  { label: "Customer", sublabel: "End consumer interaction", icon: Users, color: "#C8F5D4" },
  { label: "Voice Capture", sublabel: "Secure audio recording", icon: Mic, color: "#FFE566" },
  { label: "AI Processing", sublabel: "Transcription & generation", icon: Cpu, color: "#D4CCFF" },
  { label: "Review Generation", sublabel: "Content creation", icon: FileText, color: "#FFB5B5" },
  { label: "Platform Posting", sublabel: "Multi-channel distribution", icon: Send, color: "#FFDAB5" },
]

const subProcessors = [
  { name: "Amazon Web Services (AWS)", purpose: "Cloud infrastructure and data storage", location: "United States", icon: Server },
  { name: "Google Cloud Platform", purpose: "AI/ML processing and natural language services", location: "United States", icon: Cpu },
  { name: "OpenAI", purpose: "Voice transcription and text generation", location: "United States", icon: Mic },
  { name: "Stripe", purpose: "Payment processing and billing", location: "United States", icon: Key },
  { name: "SendGrid (Twilio)", purpose: "Transactional email delivery", location: "United States", icon: Mail },
  { name: "Vercel", purpose: "Application hosting and CDN", location: "United States", icon: Globe },
  { name: "Turso", purpose: "Primary database infrastructure", location: "United States", icon: Database },
]

const technicalMeasures = [
  { label: "AES-256 encryption at rest", icon: Lock },
  { label: "TLS 1.3 encryption in transit", icon: ShieldCheck },
  { label: "Hardware security module key management", icon: Key },
  { label: "Role-based access controls (RBAC)", icon: Fingerprint },
  { label: "Multi-factor authentication (MFA)", icon: UserCheck },
  { label: "Network segmentation and isolation", icon: Network },
  { label: "Web Application Firewall (WAF)", icon: Shield },
  { label: "DDoS protection and mitigation", icon: HardDrive },
]

const organizationalMeasures = [
  { label: "Annual security awareness training", icon: BookOpen },
  { label: "Background checks for all personnel", icon: UserCheck },
  { label: "Documented incident response plan", icon: AlertTriangle },
  { label: "Business continuity and disaster recovery", icon: RefreshCw },
]

const dataSubjectRights = [
  { right: "Right of Access", description: "Data subjects may request confirmation of processing and a copy of their personal data.", icon: Eye },
  { right: "Right to Rectification", description: "Data subjects may request correction of inaccurate or incomplete personal data.", icon: FileText },
  { right: "Right to Erasure", description: "Data subjects may request deletion of personal data under qualifying circumstances.", icon: Trash2 },
  { right: "Right to Restriction", description: "Data subjects may request restriction of processing in specific situations.", icon: Lock },
  { right: "Right to Portability", description: "Data subjects may receive their data in a structured, machine-readable format.", icon: Database },
  { right: "Right to Object", description: "Data subjects may object to processing based on legitimate interests or direct marketing.", icon: AlertTriangle },
]

export default function DataProcessingAgreementPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute top-32 left-10 w-32 h-32 bg-[#FFDAB5]/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-96 right-16 w-48 h-48 bg-[#D4CCFF]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[60rem] left-1/4 w-40 h-40 bg-[#C8F5D4]/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-[120rem] right-1/3 w-36 h-36 bg-[#FFE566]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[180rem] left-16 w-44 h-44 bg-[#FFB5B5]/25 rounded-full blur-2xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFDAB5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a] mb-8">
            <Database className="h-3.5 w-3.5" />
            DATA PROCESSING AGREEMENT
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1a2e1a] tracking-tight leading-[1.1] mb-6"
            style={font}
          >
            HOW WE HANDLE
            <br />
            YOUR DATA
          </h1>

          <p className="text-lg sm:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto leading-relaxed mb-8">
            This Data Processing Agreement outlines how Schroeder Technologies processes personal data
            through ReviewForge in compliance with GDPR, CCPA, and other applicable data protection
            regulations. We are committed to transparency, security, and your rights.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-[#1a2e1a]/40">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Effective: February 25, 2026
            </span>
            <span className="hidden sm:inline text-[#1a2e1a]/20">|</span>
            <span className="hidden sm:flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Version 2.0
            </span>
          </div>
        </div>

        {/* Decorative floating shapes */}
        <div className="absolute top-16 right-8 w-16 h-16 bg-[#C8F5D4] rounded-2xl border-2 border-[#1a2e1a] rotate-12 opacity-40 hidden lg:block" />
        <div className="absolute bottom-8 left-12 w-12 h-12 bg-[#FFE566] rounded-full border-2 border-[#1a2e1a] opacity-30 hidden lg:block" />
        <div className="absolute top-1/2 left-6 w-10 h-10 bg-[#D4CCFF] rounded-lg border-2 border-[#1a2e1a] -rotate-6 opacity-35 hidden lg:block" />
      </section>

      {/* Compliance Badges Section */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a] mb-3" style={font}>
              COMPLIANCE STANDARDS
            </h2>
            <p className="text-[#1a2e1a]/50 max-w-lg mx-auto">
              ReviewForge adheres to industry-leading data protection frameworks and security certifications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {complianceBadges.map((badge) => (
              <div
                key={badge.title}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] relative overflow-hidden"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: badge.color }}
                >
                  <badge.icon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h3 className="text-lg font-black text-[#1a2e1a] mb-1" style={font}>
                  {badge.title}
                </h3>
                <p className="text-xs text-[#1a2e1a]/40 font-medium mb-3">{badge.subtitle}</p>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-2 border-[#1a2e1a] mb-3 ${
                    badge.status === "Compliant"
                      ? "bg-[#C8F5D4] text-[#1a2e1a]"
                      : "bg-[#FFE566] text-[#1a2e1a]"
                  }`}
                >
                  {badge.status === "Compliant" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {badge.status}
                </span>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Flow Diagram */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a] mb-6">
              <BarChart3 className="h-3.5 w-3.5" />
              DATA FLOW OVERVIEW
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a] mb-3" style={font}>
              HOW YOUR DATA MOVES THROUGH REVIEWFORGE
            </h2>
            <p className="text-[#1a2e1a]/50 max-w-lg mx-auto">
              A visual representation of personal data processing within our system, from initial capture to final output.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            {/* Desktop flow - horizontal */}
            <div className="hidden lg:flex items-center justify-between gap-3">
              {dataFlowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a] mb-3"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="h-7 w-7 text-[#1a2e1a]" />
                    </div>
                    <h4 className="text-sm font-black text-[#1a2e1a]" style={font}>
                      {step.label}
                    </h4>
                    <p className="text-xs text-[#1a2e1a]/40 mt-1 max-w-[120px]">{step.sublabel}</p>
                  </div>
                  {i < dataFlowSteps.length - 1 && (
                    <div className="flex items-center -mt-8">
                      <div className="w-8 h-0.5 bg-[#1a2e1a]/20" />
                      <ChevronRight className="h-5 w-5 text-[#1a2e1a]/30 -ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile flow - vertical */}
            <div className="lg:hidden flex flex-col items-center gap-2">
              {dataFlowSteps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center">
                  <div className="flex items-center gap-4 w-full max-w-xs">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-[#1a2e1a] shadow-[2px_2px_0px_0px_#1a2e1a] shrink-0"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="h-6 w-6 text-[#1a2e1a]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#1a2e1a]" style={font}>
                        {step.label}
                      </h4>
                      <p className="text-xs text-[#1a2e1a]/40">{step.sublabel}</p>
                    </div>
                  </div>
                  {i < dataFlowSteps.length - 1 && (
                    <div className="flex flex-col items-center my-1">
                      <div className="w-0.5 h-4 bg-[#1a2e1a]/15" />
                      <ArrowRight className="h-4 w-4 text-[#1a2e1a]/25 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-[#1a2e1a]/10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C8F5D4] flex items-center justify-center border border-[#1a2e1a]/20 shrink-0 mt-0.5">
                  <Lock className="h-4 w-4 text-[#1a2e1a]" />
                </div>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Voice recordings
                  are processed in isolated environments and are automatically deleted after transcription unless
                  explicitly retained by the Controller. No personal data is shared with third parties beyond the
                  sub-processors listed in this agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed DPA Sections */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Section 1: Definitions */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#C8F5D4] flex items-center justify-center border-2 border-[#1a2e1a]">
                <BookOpen className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                1. Definitions
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <div className="grid gap-4">
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <span className="font-bold text-[#1a2e1a]">&quot;Controller&quot;</span> means the Customer who
                  determines the purposes and means of the processing of Personal Data through their use of ReviewForge.
                  The Controller is the business entity that subscribes to ReviewForge services and directs the collection
                  and use of end-consumer data.
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <span className="font-bold text-[#1a2e1a]">&quot;Processor&quot;</span> means Schroeder Technologies,
                  which processes Personal Data on behalf of the Controller through the ReviewForge platform. Schroeder
                  Technologies acts solely under the documented instructions of the Controller.
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <span className="font-bold text-[#1a2e1a]">&quot;Data Subject&quot;</span> means an identified or
                  identifiable natural person whose Personal Data is processed through ReviewForge. This includes end
                  consumers, customers of the Controller&apos;s business, and employees or staff of the Controller.
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <span className="font-bold text-[#1a2e1a]">&quot;Personal Data&quot;</span> means any information
                  relating to a Data Subject that can be used to directly or indirectly identify that person. In the
                  context of ReviewForge, this includes but is not limited to voice recordings, names, email addresses,
                  review content, device information, and IP addresses.
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <span className="font-bold text-[#1a2e1a]">&quot;Processing&quot;</span> means any operation or set of
                  operations performed on Personal Data, whether or not by automated means, including collection,
                  recording, organization, structuring, storage, adaptation, alteration, retrieval, consultation, use,
                  disclosure by transmission, dissemination, alignment, combination, restriction, erasure, or
                  destruction.
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <span className="font-bold text-[#1a2e1a]">&quot;Sub-processor&quot;</span> means any third-party
                  processor engaged by Schroeder Technologies to process Personal Data on behalf of the Controller in
                  connection with ReviewForge services. A current list of sub-processors is maintained in Section 5 of
                  this agreement.
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <span className="font-bold text-[#1a2e1a]">&quot;Supervisory Authority&quot;</span> means an
                  independent public authority established by an EU Member State pursuant to the GDPR, or any other
                  regulatory body with jurisdiction over data protection matters relevant to the Controller or Processor.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Scope and Purpose */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFE566] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Globe className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                2. Scope and Purpose
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <p>
                This Data Processing Agreement (&quot;DPA&quot;) applies to the processing of Personal Data by Schroeder
                Technologies (&quot;Processor&quot;) on behalf of the Customer (&quot;Controller&quot;) through the
                ReviewForge platform and any associated services.
              </p>
              <p>
                This DPA supplements and forms an integral part of the ReviewForge Terms of Service and Subscription
                Agreement between Schroeder Technologies and the Controller. In the event of any conflict between this
                DPA and the Terms of Service, this DPA shall prevail with respect to matters of data processing.
              </p>
              <p>
                The purpose of this DPA is to ensure that Schroeder Technologies processes Personal Data in accordance
                with the Controller&apos;s instructions and in compliance with applicable data protection laws, including
                but not limited to the General Data Protection Regulation (EU) 2016/679 (&quot;GDPR&quot;), the
                California Consumer Privacy Act (&quot;CCPA&quot;), and other relevant national and regional data
                protection legislation.
              </p>
              <p>
                This DPA shall apply to all activities in which employees, contractors, or sub-processors of Schroeder
                Technologies process Personal Data on behalf of the Controller in connection with the provision of
                ReviewForge services.
              </p>
            </div>
          </div>

          {/* Section 3: Data Processing Details */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D4CCFF] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Database className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                3. Data Processing Details
              </h2>
            </div>
            <div className="space-y-6">
              <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#1a2e1a]/10">
                <h3 className="font-bold text-[#1a2e1a] mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Subject Matter
                </h3>
                <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                  The subject matter of processing is the provision of AI-powered review collection and management
                  services through the ReviewForge platform. This encompasses the automated capture, transcription,
                  analysis, generation, and distribution of customer reviews for the Controller&apos;s business.
                </p>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#1a2e1a]/10">
                <h3 className="font-bold text-[#1a2e1a] mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration of Processing
                </h3>
                <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                  Processing shall continue for the term of the subscription agreement between the Controller and
                  Schroeder Technologies. Upon termination or expiration of the subscription agreement, processing shall
                  cease in accordance with the Term and Termination provisions outlined in Section 12 of this DPA.
                </p>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#1a2e1a]/10">
                <h3 className="font-bold text-[#1a2e1a] mb-2 flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Nature and Purpose of Processing
                </h3>
                <ul className="text-sm text-[#1a2e1a]/60 leading-relaxed space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span><strong className="text-[#1a2e1a]/80">Voice capture and recording:</strong> Collection of audio feedback from end consumers via the ReviewForge recording interface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span><strong className="text-[#1a2e1a]/80">Transcription:</strong> Automated conversion of voice recordings to text using AI-powered speech recognition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span><strong className="text-[#1a2e1a]/80">AI review generation:</strong> Processing of transcribed content to generate structured review text using natural language models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span><strong className="text-[#1a2e1a]/80">Multi-platform posting:</strong> Distribution of generated reviews to third-party review platforms on behalf of the Controller</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span><strong className="text-[#1a2e1a]/80">Analytics and reporting:</strong> Aggregation and analysis of review data to provide insights, sentiment analysis, and performance metrics to the Controller</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#1a2e1a]/10">
                <h3 className="font-bold text-[#1a2e1a] mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Categories of Data Subjects
                </h3>
                <ul className="text-sm text-[#1a2e1a]/60 leading-relaxed space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span><strong className="text-[#1a2e1a]/80">End consumers and customers</strong> of the Controller&apos;s business who provide voice feedback and reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span><strong className="text-[#1a2e1a]/80">Employees and staff</strong> of the Controller who administer and manage the ReviewForge platform on behalf of the Controller</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#1a2e1a]/10">
                <h3 className="font-bold text-[#1a2e1a] mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Types of Personal Data
                </h3>
                <div className="grid sm:grid-cols-2 gap-2 mt-3">
                  {[
                    "Voice recordings and audio data",
                    "Names and contact information",
                    "Email addresses",
                    "Review content and text data",
                    "Device information and identifiers",
                    "IP addresses and geolocation data",
                    "Business and transactional data",
                    "Usage and interaction data",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#1a2e1a]/60"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#D4CCFF] border border-[#1a2e1a]/20 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Obligations of the Processor */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFB5B5] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Building2 className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                4. Obligations of the Processor
              </h2>
            </div>
            <p className="text-sm text-[#1a2e1a]/60 leading-relaxed mb-6">
              Schroeder Technologies, as the Processor, shall comply with the following obligations in relation to the
              processing of Personal Data through ReviewForge:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Processing on Documented Instructions",
                  text: "Schroeder Technologies shall process Personal Data only on the documented instructions of the Controller, including with regard to transfers of Personal Data to a third country or international organization, unless required to do so by Union or Member State law to which Schroeder Technologies is subject. In such a case, Schroeder Technologies shall inform the Controller of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest.",
                  icon: FileText,
                },
                {
                  title: "Confidentiality",
                  text: "Schroeder Technologies shall ensure that persons authorized to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality. All employees, contractors, and agents with access to Personal Data are bound by non-disclosure agreements and receive regular training on data protection obligations.",
                  icon: Lock,
                },
                {
                  title: "Security Measures",
                  text: "Schroeder Technologies shall implement and maintain appropriate technical and organizational measures to ensure a level of security appropriate to the risk, as detailed in Section 6 of this DPA. These measures are designed to protect against unauthorized or unlawful processing and against accidental loss, destruction, or damage of Personal Data.",
                  icon: Shield,
                },
                {
                  title: "Assistance with Data Subject Requests",
                  text: "Schroeder Technologies shall assist the Controller, by appropriate technical and organizational measures insofar as this is possible, for the fulfilment of the Controller's obligation to respond to requests for exercising the Data Subject's rights as laid down in Chapter III of the GDPR and equivalent provisions under applicable law.",
                  icon: Users,
                },
                {
                  title: "Data Breach Notification",
                  text: "Schroeder Technologies shall notify the Controller without undue delay, and in no event later than 72 hours, after becoming aware of a Personal Data breach. The notification shall include the nature of the breach, categories and approximate number of Data Subjects affected, likely consequences, and measures taken or proposed to address the breach.",
                  icon: AlertTriangle,
                },
                {
                  title: "Deletion and Return of Data",
                  text: "Upon termination of the subscription agreement, Schroeder Technologies shall, at the choice of the Controller, delete or return all Personal Data processed on behalf of the Controller, and delete existing copies unless Union or Member State law requires storage of the Personal Data. Deletion will be completed within 90 days of the termination date.",
                  icon: Trash2,
                },
                {
                  title: "Audit and Compliance",
                  text: "Schroeder Technologies shall make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in this DPA and allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller, as further detailed in Section 11.",
                  icon: Eye,
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <div className="w-8 h-8 rounded-lg bg-[#FFB5B5]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="h-4 w-4 text-[#1a2e1a]/70" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a2e1a] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Sub-processors */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Server className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                5. Sub-processors
              </h2>
            </div>
            <p className="text-sm text-[#1a2e1a]/60 leading-relaxed mb-6">
              The Controller provides general authorization for Schroeder Technologies to engage the following
              sub-processors for the processing of Personal Data. The Controller acknowledges that these sub-processors
              are necessary for the provision of ReviewForge services.
            </p>

            {/* Sub-processor table */}
            <div className="overflow-x-auto -mx-2 px-2">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-[2fr_2fr_1fr] bg-[#1a2e1a] rounded-t-2xl px-5 py-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFF8F0]">Sub-processor</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFF8F0]">Purpose</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFF8F0]">Location</span>
                </div>
                {subProcessors.map((sp, i) => (
                  <div
                    key={sp.name}
                    className={`grid grid-cols-[2fr_2fr_1fr] px-5 py-4 border-x-2 border-[#1a2e1a] ${
                      i === subProcessors.length - 1 ? "border-b-2 rounded-b-2xl" : "border-b border-[#1a2e1a]/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FFDAB5]/40 flex items-center justify-center shrink-0">
                        <sp.icon className="h-4 w-4 text-[#1a2e1a]/60" />
                      </div>
                      <span className="text-sm font-semibold text-[#1a2e1a]">{sp.name}</span>
                    </div>
                    <span className="text-sm text-[#1a2e1a]/60 flex items-center">{sp.purpose}</span>
                    <div className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-[#1a2e1a]/40 shrink-0" />
                      <span className="text-sm text-[#1a2e1a]/60">{sp.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-[#FFE566]/20 rounded-2xl p-5 border border-[#FFE566]/40">
              <h4 className="font-bold text-[#1a2e1a] text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Notification of Sub-processor Changes
              </h4>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                Schroeder Technologies shall notify the Controller at least 30 days in advance of any intended changes
                to sub-processors, including the addition or replacement of sub-processors. The Controller may object to
                such changes in writing within 14 days of receiving notice. If a reasonable objection is raised, Schroeder
                Technologies shall make commercially reasonable efforts to address the Controller&apos;s concerns or
                provide an alternative solution. If no resolution is reached, the Controller may terminate the affected
                services without penalty.
              </p>
            </div>
          </div>

          {/* Section 6: Data Security Measures */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#C8F5D4] flex items-center justify-center border-2 border-[#1a2e1a]">
                <ShieldCheck className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                6. Data Security Measures
              </h2>
            </div>
            <p className="text-sm text-[#1a2e1a]/60 leading-relaxed mb-6">
              Schroeder Technologies implements and maintains the following technical and organizational measures to
              protect Personal Data processed through ReviewForge. These measures are reviewed and updated regularly to
              address evolving threats and industry best practices.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#1a2e1a] mb-4 flex items-center gap-2" style={font}>
                  <Lock className="h-4 w-4" />
                  Technical Measures
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {technicalMeasures.map((measure) => (
                    <div
                      key={measure.label}
                      className="flex items-center gap-3 bg-[#FFF8F0] rounded-xl p-4 border border-[#1a2e1a]/10"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#C8F5D4]/50 flex items-center justify-center shrink-0">
                        <measure.icon className="h-4 w-4 text-[#1a2e1a]/60" />
                      </div>
                      <span className="text-sm text-[#1a2e1a]/70 font-medium">{measure.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#1a2e1a] mb-4 flex items-center gap-2" style={font}>
                  <Building2 className="h-4 w-4" />
                  Organizational Measures
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {organizationalMeasures.map((measure) => (
                    <div
                      key={measure.label}
                      className="flex items-center gap-3 bg-[#FFF8F0] rounded-xl p-4 border border-[#1a2e1a]/10"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#D4CCFF]/50 flex items-center justify-center shrink-0">
                        <measure.icon className="h-4 w-4 text-[#1a2e1a]/60" />
                      </div>
                      <span className="text-sm text-[#1a2e1a]/70 font-medium">{measure.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: International Data Transfers */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFE566] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Globe className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                7. International Data Transfers
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Schroeder Technologies processes Personal Data primarily within the United States. Where Personal Data
                originating from the European Economic Area (EEA), the United Kingdom (UK), or Switzerland is transferred
                to the United States or any other country that has not received an adequacy decision from the European
                Commission, Schroeder Technologies ensures that appropriate safeguards are in place.
              </p>

              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-3 bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <div className="w-8 h-8 rounded-lg bg-[#FFE566]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="h-4 w-4 text-[#1a2e1a]/70" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a2e1a] mb-1">Standard Contractual Clauses (EU SCCs 2021)</h4>
                    <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                      Schroeder Technologies has adopted the Standard Contractual Clauses approved by the European
                      Commission Decision (EU) 2021/914 of 4 June 2021 for transfers of Personal Data from the EEA to
                      third countries. Module Two (Controller to Processor) applies to transfers under this DPA. These
                      clauses are incorporated by reference and form an integral part of this agreement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <div className="w-8 h-8 rounded-lg bg-[#FFE566]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Scale className="h-4 w-4 text-[#1a2e1a]/70" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a2e1a] mb-1">UK International Data Transfer Addendum</h4>
                    <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                      For transfers of Personal Data from the United Kingdom, the UK International Data Transfer Addendum
                      to the EU SCCs, as issued by the UK Information Commissioner&apos;s Office (ICO), shall apply in
                      addition to the Standard Contractual Clauses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <div className="w-8 h-8 rounded-lg bg-[#FFE566]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="h-4 w-4 text-[#1a2e1a]/70" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a2e1a] mb-1">Supplementary Measures</h4>
                    <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                      In addition to the safeguards above, Schroeder Technologies implements supplementary technical and
                      organizational measures including encryption of data in transit and at rest, strict access controls,
                      regular security assessments, and contractual obligations imposed on all sub-processors to maintain
                      equivalent levels of data protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: Data Subject Rights */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D4CCFF] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Users className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                8. Data Subject Rights
              </h2>
            </div>
            <p className="text-sm text-[#1a2e1a]/60 leading-relaxed mb-6">
              Schroeder Technologies shall assist the Controller in fulfilling its obligations to respond to Data Subject
              requests under applicable data protection laws. The following rights are supported through ReviewForge&apos;s
              administrative tools and through direct coordination with our data protection team:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {dataSubjectRights.map((item) => (
                <div
                  key={item.right}
                  className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#D4CCFF]/50 flex items-center justify-center shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-[#1a2e1a]/60" />
                    </div>
                    <h4 className="font-bold text-[#1a2e1a] text-sm">{item.right}</h4>
                  </div>
                  <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Upon receiving a request from a Data Subject, the Controller should submit the request through the
                ReviewForge dashboard or contact Schroeder Technologies directly at{" "}
                <a href="mailto:dpo@schroedertech.com" className="text-[#1a2e1a] font-semibold underline underline-offset-2">
                  dpo@schroedertech.com
                </a>
                . Schroeder Technologies shall respond to the Controller&apos;s instructions regarding Data Subject
                requests within 10 business days and shall not independently respond to Data Subject requests unless
                authorized by the Controller or required by applicable law.
              </p>
            </div>
          </div>

          {/* Section 9: Data Breach Notification */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFB5B5] flex items-center justify-center border-2 border-[#1a2e1a]">
                <AlertTriangle className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                9. Data Breach Notification
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <div className="bg-[#FFB5B5]/15 rounded-2xl p-5 border border-[#FFB5B5]/30">
                <h4 className="font-bold text-[#1a2e1a] mb-2">Definition of a Personal Data Breach</h4>
                <p>
                  A &quot;Personal Data Breach&quot; means a breach of security leading to the accidental or unlawful
                  destruction, loss, alteration, unauthorized disclosure of, or access to, Personal Data transmitted,
                  stored, or otherwise processed by Schroeder Technologies on behalf of the Controller.
                </p>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Notification Timeline
                </h4>
                <p>
                  Schroeder Technologies shall notify the Controller of any Personal Data Breach without undue delay and
                  in no event later than <strong className="text-[#1a2e1a]">72 hours</strong> after becoming aware of the
                  breach. This notification shall be made to the Controller&apos;s designated contact via email and, where
                  appropriate, through the ReviewForge dashboard notification system.
                </p>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-2">Content of Notification</h4>
                <p className="mb-3">The breach notification shall include, to the extent possible:</p>
                <ul className="space-y-2">
                  {[
                    "A description of the nature of the Personal Data Breach, including the categories and approximate number of Data Subjects concerned and the categories and approximate number of Personal Data records concerned",
                    "The name and contact details of the Data Protection Officer or other point of contact",
                    "A description of the likely consequences of the Personal Data Breach",
                    "A description of the measures taken or proposed to be taken to address the breach, including measures to mitigate its possible adverse effects",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-2">Cooperation</h4>
                <p>
                  Schroeder Technologies shall cooperate with the Controller and take reasonable commercial steps to
                  assist in the investigation, mitigation, and remediation of each Personal Data Breach. Schroeder
                  Technologies shall preserve all relevant records and evidence relating to the breach for a minimum
                  period of 36 months following the breach event.
                </p>
              </div>
            </div>
          </div>

          {/* Section 10: Data Protection Impact Assessment */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Scale className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                10. Data Protection Impact Assessment
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Where the Controller is required to carry out a Data Protection Impact Assessment (&quot;DPIA&quot;)
                under Article 35 of the GDPR or equivalent provisions under applicable law, Schroeder Technologies shall
                provide reasonable assistance to the Controller in conducting the assessment, taking into account the
                nature of the processing and the information available to Schroeder Technologies.
              </p>
              <p>
                A DPIA may be required when processing is likely to result in a high risk to the rights and freedoms
                of Data Subjects, including but not limited to:
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  "Systematic and extensive evaluation of personal aspects based on automated processing, including profiling",
                  "Processing of special categories of data on a large scale",
                  "Systematic monitoring of a publicly accessible area on a large scale",
                  "Use of new technologies or novel processing methods that may present significant risks",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1a2e1a]/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Schroeder Technologies shall provide the Controller with such information as is reasonably necessary
                to fulfill the Controller&apos;s obligations under Article 36 of the GDPR regarding prior consultation
                with the Supervisory Authority, where applicable.
              </p>
            </div>
          </div>

          {/* Section 11: Audit Rights */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#C8F5D4] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Eye className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                11. Audit Rights
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <p>
                The Controller shall have the right to audit Schroeder Technologies&apos; compliance with this DPA,
                subject to the following conditions:
              </p>
              <div className="grid gap-4 mt-4">
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <h4 className="font-bold text-[#1a2e1a] mb-1">Frequency</h4>
                  <p>
                    The Controller may conduct or commission an audit no more than once per calendar year, unless a
                    Personal Data Breach has occurred or the Controller has reasonable grounds to suspect non-compliance,
                    in which case additional audits may be conducted.
                  </p>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <h4 className="font-bold text-[#1a2e1a] mb-1">Notice</h4>
                  <p>
                    The Controller shall provide Schroeder Technologies with at least 30 days&apos; written notice prior
                    to conducting an audit, including a detailed scope and plan for the audit activities.
                  </p>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <h4 className="font-bold text-[#1a2e1a] mb-1">Conduct</h4>
                  <p>
                    Audits shall be conducted during normal business hours and in a manner that minimizes disruption to
                    Schroeder Technologies&apos; operations. The Controller and its auditors shall comply with all
                    reasonable security and confidentiality requirements.
                  </p>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <h4 className="font-bold text-[#1a2e1a] mb-1">Costs</h4>
                  <p>
                    The Controller shall bear the costs of any audit, unless the audit reveals material non-compliance
                    with this DPA by Schroeder Technologies, in which case Schroeder Technologies shall bear the
                    reasonable costs of the audit.
                  </p>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                  <h4 className="font-bold text-[#1a2e1a] mb-1">Alternative Evidence</h4>
                  <p>
                    Schroeder Technologies may satisfy audit obligations by providing the Controller with current SOC 2
                    Type II reports, ISO 27001 certification documentation (when available), or other relevant third-party
                    audit reports or certifications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 12: Term and Termination */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFE566] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Clock className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                12. Term and Termination
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-1">Duration</h4>
                <p>
                  This DPA shall become effective upon the date the Controller begins using ReviewForge services and
                  shall remain in effect for the duration of the subscription agreement. This DPA shall automatically
                  terminate upon the termination or expiration of the subscription agreement, subject to the survival
                  provisions below.
                </p>
              </div>
              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-1">Survival of Obligations</h4>
                <p>
                  The obligations of Schroeder Technologies regarding confidentiality, data security, data breach
                  notification, and cooperation with audits shall survive the termination or expiration of this DPA for
                  a period of 24 months, or for so long as Schroeder Technologies retains any Personal Data processed
                  on behalf of the Controller, whichever is longer.
                </p>
              </div>
              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-1">Data Deletion Timeline</h4>
                <p>
                  Upon termination of the subscription agreement, the Controller may request the return of Personal Data
                  in a structured, commonly used, and machine-readable format within 30 days of termination. Following
                  this 30-day period, or upon the Controller&apos;s written instruction, Schroeder Technologies shall
                  securely delete all Personal Data within{" "}
                  <strong className="text-[#1a2e1a]">90 days</strong> of the termination date. A certificate of
                  destruction shall be provided upon request. Certain data may be retained beyond this period where
                  required by applicable law, in which case such data shall continue to be protected under the terms of
                  this DPA.
                </p>
              </div>
            </div>
          </div>

          {/* Section 13: Liability */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D4CCFF] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Scale className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                13. Liability
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-1">Limitation of Liability</h4>
                <p>
                  Each party&apos;s liability under this DPA shall be subject to the limitations and exclusions of
                  liability set forth in the subscription agreement between the parties. Nothing in this DPA shall limit
                  or exclude either party&apos;s liability for breaches of applicable data protection law that cannot be
                  limited or excluded under such law, including liability to Data Subjects under Articles 82 and 83 of
                  the GDPR.
                </p>
              </div>
              <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#1a2e1a]/10">
                <h4 className="font-bold text-[#1a2e1a] mb-1">Indemnification</h4>
                <p>
                  Each party shall indemnify and hold harmless the other party from and against any claims, damages,
                  losses, costs, and expenses (including reasonable attorney&apos;s fees) arising from or in connection
                  with any breach of this DPA by the indemnifying party or its agents, employees, or sub-processors.
                  Schroeder Technologies shall indemnify the Controller for any fines, penalties, or damages imposed by a
                  Supervisory Authority or court of competent jurisdiction arising directly from Schroeder
                  Technologies&apos; breach of its obligations under this DPA.
                </p>
              </div>
            </div>
          </div>

          {/* Section 14: Contact */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a]">
                <Mail className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a2e1a]" style={font}>
                14. Contact Information
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#1a2e1a]/60 leading-relaxed">
              <p>
                For questions, concerns, or requests related to this Data Processing Agreement or the processing of
                Personal Data through ReviewForge, please contact:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#1a2e1a]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Fingerprint className="h-5 w-5 text-[#1a2e1a]/60" />
                    <h4 className="font-bold text-[#1a2e1a]">Data Protection Officer</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-[#1a2e1a]/40 shrink-0" />
                      <a
                        href="mailto:dpo@schroedertech.com"
                        className="text-[#1a2e1a] font-semibold underline underline-offset-2 hover:text-[#1a2e1a]/80 transition-colors"
                      >
                        dpo@schroedertech.com
                      </a>
                    </p>
                    <p className="text-[#1a2e1a]/50">
                      For all data protection inquiries, DPIA assistance, breach notifications, and Data Subject rights
                      requests.
                    </p>
                  </div>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#1a2e1a]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-5 w-5 text-[#1a2e1a]/60" />
                    <h4 className="font-bold text-[#1a2e1a]">Schroeder Technologies</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-[#1a2e1a]/40 shrink-0" />
                      <a
                        href="mailto:legal@schroedertech.com"
                        className="text-[#1a2e1a] font-semibold underline underline-offset-2 hover:text-[#1a2e1a]/80 transition-colors"
                      >
                        legal@schroedertech.com
                      </a>
                    </p>
                    <p className="text-[#1a2e1a]/50">
                      For legal matters, DPA negotiations, sub-processor change notifications, and audit scheduling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing note */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a] mb-4">
              <Shield className="h-3.5 w-3.5" />
              YOUR DATA IS PROTECTED
            </div>
            <p className="text-sm text-[#1a2e1a]/40 max-w-lg mx-auto leading-relaxed">
              This Data Processing Agreement was last updated on February 25, 2026. Schroeder Technologies reserves the
              right to update this DPA to reflect changes in our processing activities, legal requirements, or industry
              standards. Material changes will be communicated to Controllers at least 30 days in advance.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}