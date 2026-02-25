"use client"

import {
  Shield,
  Lock,
  Server,
  Eye,
  AlertTriangle,
  Key,
  Fingerprint,
  Globe,
  Database,
  Monitor,
  CheckCircle2,
  Clock,
  Users,
  Mail,
  FileCheck,
  Layers,
  Wifi,
  HardDrive,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Building2,
  Bug,
  RefreshCw,
  Zap,
  ArrowRight,
  ExternalLink,
  Mic,
  CloudOff,
  Timer,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const stats = [
  { value: "256-bit", label: "Encryption", icon: Lock, color: "#C8F5D4" },
  { value: "99.99%", label: "Uptime SLA", icon: Zap, color: "#FFE566" },
  { value: "<72hr", label: "Breach Response", icon: Clock, color: "#FFB5B5" },
  { value: "SOC 2", label: "Compliance", icon: ShieldCheck, color: "#D4CCFF" },
]

const architectureLayers = [
  {
    label: "Network Security",
    items: ["WAF", "DDoS Protection", "VPC Isolation", "IDS/IPS"],
    color: "#C8F5D4",
    icon: Globe,
  },
  {
    label: "Application Security",
    items: ["SAST/DAST", "CSP Headers", "OWASP Top 10", "Input Validation"],
    color: "#FFE566",
    icon: Layers,
  },
  {
    label: "Data Security",
    items: ["AES-256-GCM", "TLS 1.3", "AWS KMS", "Column Encryption"],
    color: "#FFB5B5",
    icon: Database,
  },
  {
    label: "Access Control",
    items: ["RBAC", "MFA", "SSO", "Least Privilege"],
    color: "#D4CCFF",
    icon: Fingerprint,
  },
]

const severityLevels = [
  {
    level: "P1 - Critical",
    color: "#FF4444",
    bg: "#FFE0E0",
    description: "Active data breach or system-wide outage. Immediate response required.",
    response: "15 minutes",
  },
  {
    level: "P2 - High",
    color: "#FF8800",
    bg: "#FFF0DD",
    description: "Significant vulnerability or partial service degradation.",
    response: "1 hour",
  },
  {
    level: "P3 - Medium",
    color: "#FFBB00",
    bg: "#FFF8DD",
    description: "Non-critical vulnerability or minor security concern.",
    response: "4 hours",
  },
  {
    level: "P4 - Low",
    color: "#44AA44",
    bg: "#E0FFE0",
    description: "Informational finding or improvement suggestion.",
    response: "24 hours",
  },
]

const incidentPhases = [
  { phase: "Identification", icon: Eye, color: "#FFE566", description: "Detect and confirm the security event through monitoring, alerts, or reports." },
  { phase: "Containment", icon: ShieldAlert, color: "#FFB5B5", description: "Isolate affected systems to prevent further damage while preserving evidence." },
  { phase: "Eradication", icon: Bug, color: "#D4CCFF", description: "Remove the root cause, patch vulnerabilities, and eliminate threat actors." },
  { phase: "Recovery", icon: RefreshCw, color: "#C8F5D4", description: "Restore systems to normal operation with enhanced monitoring." },
]

const complianceItems = [
  { name: "SOC 2 Type II", status: "In Progress", expected: "Q3 2026", color: "#FFE566", icon: FileCheck },
  { name: "GDPR", status: "Compliant", expected: null, color: "#C8F5D4", icon: Globe },
  { name: "CCPA", status: "Compliant", expected: null, color: "#C8F5D4", icon: ShieldCheck },
  { name: "PCI DSS", status: "Compliant", expected: null, color: "#C8F5D4", icon: Lock },
]

export default function SecurityPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute top-40 left-10 w-20 h-20 bg-[#C8F5D4] rounded-full opacity-30 blur-sm" />
      <div className="absolute top-96 right-16 w-16 h-16 bg-[#FFE566] rounded-2xl opacity-25 blur-sm rotate-12" />
      <div className="absolute top-[600px] left-1/4 w-12 h-12 bg-[#FFB5B5] rounded-full opacity-20 blur-sm" />
      <div className="absolute top-[900px] right-1/3 w-24 h-24 bg-[#D4CCFF] rounded-3xl opacity-20 blur-sm -rotate-12" />
      <div className="absolute top-[1400px] left-20 w-14 h-14 bg-[#FFDAB5] rounded-full opacity-25 blur-sm" />
      <div className="absolute top-[2000px] right-24 w-18 h-18 bg-[#C8F5D4] rounded-2xl opacity-20 blur-sm rotate-45" />
      <div className="absolute top-[2600px] left-1/3 w-16 h-16 bg-[#FFE566] rounded-full opacity-25 blur-sm" />
      <div className="absolute top-[3200px] right-10 w-20 h-20 bg-[#FFB5B5] rounded-3xl opacity-20 blur-sm -rotate-6" />
      <div className="absolute top-[3800px] left-16 w-12 h-12 bg-[#D4CCFF] rounded-full opacity-30 blur-sm" />
      <div className="absolute top-[4400px] right-1/4 w-16 h-16 bg-[#FFDAB5] rounded-2xl opacity-20 blur-sm rotate-12" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#1a2e1a] mb-8">
            <Shield className="h-3.5 w-3.5" />
            Security
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1a2e1a] mb-6 tracking-tight leading-[0.95]"
            style={font}
          >
            SECURITY IS
            <br />
            IN OUR DNA
          </h1>
          <p className="text-lg sm:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            At Schroeder Technologies, protecting your data isn&apos;t just a feature &mdash; it&apos;s the foundation
            everything at ReviewForge is built upon. We employ industry-leading security practices to keep your
            customer data, voice recordings, and business insights safe.
          </p>
          <p className="text-sm text-[#1a2e1a]/40">
            Effective Date: February 25, 2026
          </p>
        </div>
      </section>

      {/* Security Stats */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] text-center"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1a2e1a]"
                style={{ backgroundColor: stat.color }}
              >
                <stat.icon className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1a2e1a] mb-1" style={font}>
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Architecture Diagram */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a] mb-3" style={font}>
              Security Architecture
            </h2>
            <p className="text-sm text-[#1a2e1a]/50">
              Multi-layered defense-in-depth approach protecting your data at every level
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4">
              {architectureLayers.map((layer, idx) => (
                <div key={layer.label} className="relative">
                  <div
                    className="rounded-2xl border-2 border-[#1a2e1a] p-5 sm:p-6 transition-all hover:shadow-[2px_2px_0px_0px_#1a2e1a]"
                    style={{ backgroundColor: layer.color + "40" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 sm:w-56 shrink-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#1a2e1a] shrink-0"
                          style={{ backgroundColor: layer.color }}
                        >
                          <layer.icon className="h-4.5 w-4.5 text-[#1a2e1a]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/40">
                            Layer {idx + 1}
                          </div>
                          <div className="font-bold text-[#1a2e1a] text-sm" style={font}>
                            {layer.label}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1a2e1a] border border-[#1a2e1a]/20 bg-white/80"
                          >
                            <CheckCircle2 className="h-3 w-3 text-[#1a2e1a]/50" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {idx < architectureLayers.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="w-px h-4 bg-[#1a2e1a]/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t-2 border-[#1a2e1a]/10 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/40">
                <Lock className="h-3.5 w-3.5" />
                Your Data &mdash; Protected at Every Layer
                <Lock className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <div className="px-4 sm:px-6 pb-20 space-y-12 max-w-4xl mx-auto">

        {/* 1. Our Security Commitment */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#C8F5D4] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Shield className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                1. Our Security Commitment
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                At Schroeder Technologies, security isn&apos;t an afterthought &mdash; it&apos;s woven into everything we build.
                ReviewForge processes sensitive customer feedback, voice recordings, and business intelligence data.
                We take that responsibility seriously with a security-first culture that permeates every team and
                every decision.
              </p>
              <p>
                Our dedicated security team operates independently with direct reporting to executive leadership,
                ensuring security concerns are never deprioritized. Every engineer at Schroeder Technologies
                undergoes security training, participates in threat modeling exercises, and follows secure coding
                standards as part of our development workflow.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Users, label: "Dedicated Security Team", desc: "Full-time security engineers and analysts" },
                  { icon: FileCheck, label: "Security-First Culture", desc: "Every employee trained on security best practices" },
                  { icon: RefreshCw, label: "Continuous Improvement", desc: "Regular audits, testing, and process refinement" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#C8F5D4]/30 border border-[#1a2e1a]/10 p-4 text-center">
                    <item.icon className="h-5 w-5 text-[#1a2e1a]/60 mx-auto mb-2" />
                    <div className="text-xs font-bold text-[#1a2e1a] mb-1">{item.label}</div>
                    <div className="text-xs text-[#1a2e1a]/50">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Infrastructure Security */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE566] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Server className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                2. Infrastructure Security
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                ReviewForge&apos;s infrastructure is hosted on <strong className="text-[#1a2e1a]">Amazon Web Services (AWS)</strong> with
                multi-region redundancy to ensure high availability and geographic resilience. Our infrastructure is
                designed to withstand component failures without impacting service delivery.
              </p>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Network Security</h3>
              <ul className="space-y-2">
                {[
                  "Virtual Private Cloud (VPC) isolation with strict security group rules and network ACLs",
                  "Web Application Firewall (WAF) with custom rule sets to block malicious traffic patterns",
                  "DDoS mitigation through AWS Shield Advanced with always-on detection and automatic inline mitigation",
                  "Intrusion Detection and Prevention Systems (IDS/IPS) monitoring all network traffic in real time",
                  "Private subnets for all database and application servers with no direct internet access",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Edge &amp; CDN Security</h3>
              <p>
                Application delivery is managed through <strong className="text-[#1a2e1a]">Vercel&apos;s edge network</strong>,
                providing global CDN distribution with built-in DDoS protection, automatic TLS termination,
                and edge-level security headers enforcement.
              </p>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Container &amp; Infrastructure Management</h3>
              <ul className="space-y-2">
                {[
                  "Container isolation using hardened images with minimal attack surface",
                  "Automated orchestration with health checks and automatic failover",
                  "Infrastructure-as-Code (IaC) with security scanning on every deployment",
                  "Immutable infrastructure pattern — servers are replaced, never patched in place",
                  "Automated vulnerability scanning of all container images before deployment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Application Security */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB5B5] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Layers className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                3. Application Security
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Our Secure Development Lifecycle (SDLC) ensures security is considered at every stage &mdash; from
                design to deployment. Every line of code that powers ReviewForge undergoes rigorous review
                before reaching production.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    icon: Eye,
                    title: "Code Review",
                    desc: "All pull requests require at least two reviewers, including a security-focused review for sensitive changes. No exceptions.",
                  },
                  {
                    icon: Bug,
                    title: "SAST & DAST",
                    desc: "Static Application Security Testing runs on every commit. Dynamic testing runs nightly against staging environments.",
                  },
                  {
                    icon: RefreshCw,
                    title: "Dependency Scanning",
                    desc: "Automated daily vulnerability scanning of all dependencies with automated PRs for critical patches within 24 hours.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "OWASP Top 10",
                    desc: "Comprehensive protection against injection, broken auth, XSS, CSRF, SSRF, and all OWASP Top 10 vulnerability categories.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl bg-[#FFB5B5]/20 border border-[#1a2e1a]/10 p-5">
                    <item.icon className="h-5 w-5 text-[#1a2e1a]/50 mb-3" />
                    <div className="text-sm font-bold text-[#1a2e1a] mb-1">{item.title}</div>
                    <div className="text-xs text-[#1a2e1a]/50 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-4" style={font}>Additional Application Controls</h3>
              <ul className="space-y-2">
                {[
                  "Strict input validation and output encoding on all user-supplied data",
                  "Content Security Policy (CSP) headers enforced across all pages to prevent XSS and data injection",
                  "Subresource Integrity (SRI) for all third-party scripts and stylesheets",
                  "HTTP Strict Transport Security (HSTS) with preloading enabled",
                  "Automated security regression testing as part of the CI/CD pipeline",
                  "Rate limiting and abuse detection on all API endpoints",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Data Security */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D4CCFF] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Database className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                4. Data Security
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Data protection is paramount at ReviewForge. We employ multiple layers of encryption and
                access controls to ensure your data remains confidential, intact, and available only to
                authorized parties.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 border-[#1a2e1a]/10 p-5 bg-[#D4CCFF]/15">
                  <div className="flex items-center gap-2 mb-3">
                    <HardDrive className="h-4 w-4 text-[#1a2e1a]/50" />
                    <span className="text-sm font-bold text-[#1a2e1a]">Encryption at Rest</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#1a2e1a]/50">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>AES-256-GCM encryption for all stored data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>AWS KMS with automatic key rotation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>Column-level encryption for sensitive fields</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>Encrypted backup storage with separate keys</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border-2 border-[#1a2e1a]/10 p-5 bg-[#D4CCFF]/15">
                  <div className="flex items-center gap-2 mb-3">
                    <Wifi className="h-4 w-4 text-[#1a2e1a]/50" />
                    <span className="text-sm font-bold text-[#1a2e1a]">Encryption in Transit</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#1a2e1a]/50">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>TLS 1.3 for all connections (minimum TLS 1.2)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>Perfect forward secrecy (PFS) enabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>Certificate pinning for mobile applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>Internal service-to-service mTLS</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Key Management</h3>
              <p>
                All encryption keys are managed through <strong className="text-[#1a2e1a]">AWS Key Management Service (KMS)</strong> with
                automatic annual rotation. Master keys are stored in FIPS 140-2 Level 3 validated hardware
                security modules (HSMs). No Schroeder Technologies employee has direct access to encryption keys.
              </p>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Database Security</h3>
              <p>
                All databases run within private subnets with no public internet access. Column-level encryption
                is applied to all personally identifiable information (PII) and sensitive business data. Database
                access is restricted to application service accounts with the minimum required permissions.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Access Control */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Fingerprint className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                5. Access Control
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Access to ReviewForge systems and data follows the principle of least privilege. Every access
                request is authenticated, authorized, and audited.
              </p>
              <ul className="space-y-3">
                {[
                  { bold: "Role-Based Access Control (RBAC):", text: "Granular permissions assigned by role with custom roles available for enterprise customers. Access is scoped to the minimum required for each function." },
                  { bold: "Multi-Factor Authentication (MFA):", text: "Required for all Schroeder Technologies staff accessing any internal system. Hardware security keys (FIDO2/WebAuthn) required for production access." },
                  { bold: "Single Sign-On (SSO):", text: "SAML 2.0 and OIDC-based SSO available for Business and Enterprise plan customers. Integrate with Okta, Azure AD, Google Workspace, and other identity providers." },
                  { bold: "Principle of Least Privilege:", text: "All access defaults to deny. Permissions are granted only when justified and are reviewed regularly for continued necessity." },
                  { bold: "Just-in-Time (JIT) Access:", text: "Production system access is granted on-demand with automatic expiration. All JIT access requests are logged and require manager approval." },
                  { bold: "Quarterly Access Reviews:", text: "All user access is reviewed quarterly by team leads and the security team. Stale or unnecessary permissions are revoked immediately." },
                  { bold: "Session Management:", text: "Automatic session timeouts after 30 minutes of inactivity. Concurrent session limits enforced. All sessions invalidated on password change." },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#1a2e1a]">{item.bold}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Voice Data Security */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#C8F5D4] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Mic className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                6. Voice Data Security
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <div className="rounded-2xl bg-[#C8F5D4]/30 border-2 border-[#C8F5D4] p-5 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#1a2e1a] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#1a2e1a] mb-1">Voice Data Receives Special Protection</div>
                    <div className="text-xs text-[#1a2e1a]/60">
                      Because ReviewForge processes voice recordings for review generation, we apply additional
                      security measures specifically designed for voice data beyond our standard data protection controls.
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Lock,
                    title: "Encrypted at Capture",
                    desc: "Voice recordings are encrypted immediately upon capture using AES-256-GCM before any processing or storage occurs.",
                  },
                  {
                    icon: Server,
                    title: "Isolated Processing",
                    desc: "AI processing of voice data occurs in isolated compute environments with no persistent storage and no network egress.",
                  },
                  {
                    icon: Timer,
                    title: "Configurable Retention",
                    desc: "Voice data is deleted after processing by default. Customers can configure retention from 24 hours to 90 days based on their needs.",
                  },
                  {
                    icon: CloudOff,
                    title: "No Model Training",
                    desc: "Voice data is never used for model training or improvement without explicit, documented consent from the data owner.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl bg-[#C8F5D4]/15 border border-[#1a2e1a]/10 p-5">
                    <item.icon className="h-5 w-5 text-[#1a2e1a]/50 mb-3" />
                    <div className="text-sm font-bold text-[#1a2e1a] mb-1">{item.title}</div>
                    <div className="text-xs text-[#1a2e1a]/50 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
              <p className="pt-2">
                Transcription data is stored separately from voice recordings in distinct database tables with
                independent encryption keys. This separation ensures that even in the unlikely event of
                unauthorized access to one data store, the other remains protected.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Monitoring and Incident Response */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE566] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Monitor className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                7. Monitoring &amp; Incident Response
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Our security operations center provides <strong className="text-[#1a2e1a]">24/7 monitoring</strong> of all
                ReviewForge systems. We use a Security Information and Event Management (SIEM) platform to
                aggregate, correlate, and analyze security events across our entire infrastructure in real time.
              </p>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Monitoring Capabilities</h3>
              <ul className="space-y-2">
                {[
                  "Real-time log aggregation and correlation from all systems and services",
                  "Automated alerting with escalation procedures based on severity",
                  "Anomaly detection using machine learning to identify unusual patterns",
                  "Continuous vulnerability scanning of all external-facing systems",
                  "Uptime monitoring with sub-minute detection of service degradation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-4" style={font}>Incident Response Plan</h3>
              <p>
                Our incident response follows a structured four-phase approach aligned with NIST SP 800-61 guidelines:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {incidentPhases.map((phase, idx) => (
                  <div key={phase.phase} className="flex items-start gap-3 rounded-2xl border border-[#1a2e1a]/10 p-4" style={{ backgroundColor: phase.color + "20" }}>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center border border-[#1a2e1a]/20 shrink-0 text-xs font-black text-[#1a2e1a]"
                      style={{ backgroundColor: phase.color }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1a2e1a] mb-1">{phase.phase}</div>
                      <div className="text-xs text-[#1a2e1a]/50 leading-relaxed">{phase.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-4" style={font}>Severity Classification</h3>
              <div className="space-y-3 mt-2">
                {severityLevels.map((sev) => (
                  <div key={sev.level} className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: sev.bg }}>
                    <div
                      className="w-3 h-3 rounded-full mt-1 shrink-0 border border-black/10"
                      style={{ backgroundColor: sev.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#1a2e1a]">{sev.level}</span>
                        <span className="text-xs font-semibold text-[#1a2e1a]/50">Response: {sev.response}</span>
                      </div>
                      <div className="text-xs text-[#1a2e1a]/50">{sev.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#FFE566]/20 border-2 border-[#FFE566] p-5 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#1a2e1a] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#1a2e1a] mb-1">Customer Notification</div>
                    <div className="text-xs text-[#1a2e1a]/60 leading-relaxed">
                      In the event of a confirmed data breach affecting customer data, Schroeder Technologies
                      will notify affected customers <strong className="text-[#1a2e1a]">within 72 hours</strong> of
                      confirmation, in compliance with GDPR and applicable regulations. Notifications will include
                      the nature of the breach, data affected, remediation steps taken, and recommended actions.
                    </div>
                  </div>
                </div>
              </div>

              <p className="pt-2">
                Every security incident, regardless of severity, concludes with a thorough post-incident review.
                Findings are documented, lessons learned are shared across the organization, and preventive
                measures are implemented to avoid recurrence.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Compliance and Certifications */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB5B5] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <FileCheck className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                8. Compliance &amp; Certifications
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Schroeder Technologies maintains compliance with major regulatory frameworks and industry standards
                to ensure ReviewForge meets the security expectations of organizations of all sizes.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {complianceItems.map((item) => (
                  <div key={item.name} className="rounded-2xl border-2 border-[#1a2e1a]/10 p-5" style={{ backgroundColor: item.color + "20" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-[#1a2e1a]/60" />
                        <span className="text-sm font-bold text-[#1a2e1a]">{item.name}</span>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: item.status === "Compliant" ? "#C8F5D4" : "#FFE566",
                          borderColor: "#1a2e1a30",
                          color: "#1a2e1a",
                        }}
                      >
                        {item.status === "Compliant" && <CheckCircle2 className="h-2.5 w-2.5" />}
                        {item.status === "In Progress" && <Clock className="h-2.5 w-2.5" />}
                        {item.status}
                      </span>
                    </div>
                    {item.expected && (
                      <div className="text-xs text-[#1a2e1a]/40">Expected completion: {item.expected}</div>
                    )}
                    {!item.expected && item.name === "GDPR" && (
                      <div className="text-xs text-[#1a2e1a]/40">Full compliance with EU General Data Protection Regulation</div>
                    )}
                    {!item.expected && item.name === "CCPA" && (
                      <div className="text-xs text-[#1a2e1a]/40">Full compliance with California Consumer Privacy Act</div>
                    )}
                    {!item.expected && item.name === "PCI DSS" && (
                      <div className="text-xs text-[#1a2e1a]/40">Payment processing handled securely via Stripe</div>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-4" style={font}>Third-Party Testing</h3>
              <ul className="space-y-2">
                {[
                  "Annual third-party penetration testing by an independent security firm",
                  "Additional penetration tests after every major feature release",
                  "Continuous automated vulnerability scanning of all external-facing services",
                  "Public vulnerability disclosure program (see Section 10)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 9. Business Continuity and Disaster Recovery */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D4CCFF] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <RefreshCw className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                9. Business Continuity &amp; Disaster Recovery
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                ReviewForge is engineered for resilience. Our business continuity and disaster recovery (BC/DR)
                program ensures that your service remains available even in the face of unexpected events.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {[
                  { label: "RTO", value: "4 hours", desc: "Recovery Time Objective", color: "#D4CCFF" },
                  { label: "RPO", value: "1 hour", desc: "Recovery Point Objective", color: "#C8F5D4" },
                  { label: "Uptime SLA", value: "99.99%", desc: "Business plan guarantee", color: "#FFE566" },
                  { label: "DR Testing", value: "Annual", desc: "Full disaster recovery drill", color: "#FFB5B5" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#1a2e1a]/10 p-4 text-center"
                    style={{ backgroundColor: item.color + "25" }}
                  >
                    <div className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/40 mb-1">{item.label}</div>
                    <div className="text-xl font-black text-[#1a2e1a] mb-1" style={font}>{item.value}</div>
                    <div className="text-[10px] text-[#1a2e1a]/40">{item.desc}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-4" style={font}>Recovery Capabilities</h3>
              <ul className="space-y-2">
                {[
                  "Multi-region deployment with automatic failover across AWS availability zones",
                  "Automated backups: hourly incremental and daily full backups with 30-day retention",
                  "Backups stored in geographically separate regions with independent encryption",
                  "Annual disaster recovery testing with documented results and improvement plans",
                  "Automated health monitoring with self-healing capabilities for common failure modes",
                  "Runbook automation for rapid incident response and service restoration",
                  "99.99% uptime SLA for Business plan customers (99.9% for Starter plan)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 10. Vulnerability Disclosure / Bug Bounty */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFDAB5] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Bug className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                10. Vulnerability Disclosure &amp; Bug Bounty
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                We believe the security community is a vital partner in keeping ReviewForge secure.
                Schroeder Technologies maintains a responsible disclosure program and welcomes reports
                from security researchers.
              </p>

              <div className="rounded-2xl bg-[#FFDAB5]/30 border-2 border-[#FFDAB5] p-5">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#1a2e1a] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#1a2e1a] mb-1">Report a Vulnerability</div>
                    <div className="text-xs text-[#1a2e1a]/60 leading-relaxed mb-2">
                      Send your findings to{" "}
                      <a href="mailto:security@schroedertech.com" className="text-[#1a2e1a] font-semibold underline underline-offset-2">
                        security@schroedertech.com
                      </a>
                      . Please include a detailed description, steps to reproduce, and any supporting evidence.
                      Use our PGP key for encrypted submissions.
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <h4 className="text-sm font-bold text-[#1a2e1a] mb-3">In Scope</h4>
                  <ul className="space-y-2">
                    {[
                      "ReviewForge web application (app.reviewforge.com)",
                      "ReviewForge API (api.reviewforge.com)",
                      "Authentication and authorization flaws",
                      "Cross-site scripting (XSS) and injection vulnerabilities",
                      "Server-side request forgery (SSRF)",
                      "Privilege escalation vulnerabilities",
                      "Data exposure or leakage",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1a2e1a] mb-3">Out of Scope</h4>
                  <ul className="space-y-2">
                    {[
                      "Denial of service (DoS/DDoS) attacks",
                      "Social engineering or phishing",
                      "Physical security testing",
                      "Third-party applications or services",
                      "Automated scanning without prior approval",
                      "Findings from outdated software versions",
                      "Spam or rate limiting issues",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs">
                        <AlertTriangle className="h-3 w-3 text-[#1a2e1a]/30 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-4" style={font}>Safe Harbor</h3>
              <p>
                Schroeder Technologies will not pursue legal action against security researchers who discover
                and report vulnerabilities in good faith, following our responsible disclosure guidelines. We
                consider security research conducted in accordance with this policy to be authorized and will
                not initiate legal action against you.
              </p>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Response Timeline</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { time: "24 hours", action: "Acknowledgment of your report" },
                  { time: "72 hours", action: "Initial assessment and severity classification" },
                  { time: "7 days", action: "Detailed response with remediation plan" },
                  { time: "90 days", action: "Coordinated disclosure window" },
                ].map((item) => (
                  <div key={item.action} className="flex items-center gap-3 rounded-xl bg-[#FFDAB5]/15 border border-[#1a2e1a]/10 p-3">
                    <div className="text-sm font-black text-[#1a2e1a] whitespace-nowrap" style={font}>{item.time}</div>
                    <div className="text-xs text-[#1a2e1a]/50">{item.action}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#1a2e1a] pt-2" style={font}>Recognition Program</h3>
              <p>
                Valid vulnerability reports are eligible for our recognition program. Researchers who submit
                qualifying reports will be credited on our Security Hall of Fame (with permission) and may
                receive monetary rewards based on severity and impact of the finding.
              </p>
            </div>
          </div>
        </section>

        {/* 11. Employee Security */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#C8F5D4] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <UserCheck className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                11. Employee Security
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                Our people are our first line of defense. Schroeder Technologies invests heavily in employee
                security awareness and enforces strict policies to minimize human-related risk.
              </p>
              <ul className="space-y-3">
                {[
                  { bold: "Background Checks:", text: "All employees undergo comprehensive background checks before receiving access to any systems or customer data. Checks are refreshed for role changes involving elevated privileges." },
                  { bold: "Security Awareness Training:", text: "Mandatory quarterly security training covering phishing recognition, social engineering defense, secure data handling, and incident reporting. Training completion is tracked and reported to management." },
                  { bold: "Acceptable Use Policies:", text: "All employees sign and acknowledge comprehensive acceptable use policies covering company devices, networks, data handling, and communication channels." },
                  { bold: "Clean Desk Policy:", text: "All employees are required to secure sensitive documents and lock workstations when unattended. Regular compliance audits are conducted." },
                  { bold: "Secure Remote Work:", text: "Remote access requires VPN with MFA. Company-managed devices with endpoint detection and response (EDR) are mandatory. Full-disk encryption is enforced on all devices." },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#1a2e1a]">{item.bold}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 12. Third-Party Security */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE566] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Building2 className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                12. Third-Party Security
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                We carefully evaluate and monitor the security posture of every third party that integrates
                with or supports ReviewForge. No vendor gains access to customer data without meeting our
                security standards.
              </p>
              <ul className="space-y-3">
                {[
                  { bold: "Vendor Security Assessment:", text: "All prospective vendors undergo a comprehensive security assessment before engagement, including review of their security certifications, practices, and incident history. Vendors handling customer data must demonstrate SOC 2 Type II compliance or equivalent." },
                  { bold: "Sub-Processor Requirements:", text: "All sub-processors are contractually bound to maintain security controls at least as stringent as our own. Sub-processor agreements include data processing terms, breach notification obligations, and audit rights." },
                  { bold: "Regular Vendor Audits:", text: "We conduct annual security reviews of all critical vendors and sub-processors. Vendors that fail to meet our updated security requirements are given a remediation timeline or replaced." },
                  { bold: "Data Minimization:", text: "Third parties receive only the minimum data necessary to perform their function. Access is regularly reviewed and revoked when no longer needed." },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#1a2e1a]/40 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[#1a2e1a]">{item.bold}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 13. Contact */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB5B5] flex items-center justify-center border-2 border-[#1a2e1a] shrink-0">
              <Mail className="h-5 w-5 text-[#1a2e1a]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a2e1a]" style={font}>
                13. Contact Us
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
            <div className="space-y-4 text-[#1a2e1a]/60 leading-relaxed">
              <p>
                If you have questions about this Security Policy, want to report a vulnerability, or need to
                discuss security requirements for your organization, our security team is here to help.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="rounded-2xl bg-[#FFB5B5]/20 border border-[#1a2e1a]/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="h-4 w-4 text-[#1a2e1a]/60" />
                    <span className="text-sm font-bold text-[#1a2e1a]">Security Team</span>
                  </div>
                  <a
                    href="mailto:security@schroedertech.com"
                    className="inline-flex items-center gap-2 text-sm text-[#1a2e1a] font-semibold hover:underline underline-offset-2"
                  >
                    security@schroedertech.com
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <p className="text-xs text-[#1a2e1a]/40 mt-2">
                    For vulnerability reports, security inquiries, and compliance documentation requests.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#FFB5B5]/20 border border-[#1a2e1a]/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-4 w-4 text-[#1a2e1a]/60" />
                    <span className="text-sm font-bold text-[#1a2e1a]">Schroeder Technologies</span>
                  </div>
                  <a
                    href="mailto:legal@schroedertech.com"
                    className="inline-flex items-center gap-2 text-sm text-[#1a2e1a] font-semibold hover:underline underline-offset-2"
                  >
                    legal@schroedertech.com
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <p className="text-xs text-[#1a2e1a]/40 mt-2">
                    For legal inquiries, data processing agreements, and compliance certifications.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#1a2e1a] p-6 mt-4 text-center">
                <Key className="h-6 w-6 text-[#C8F5D4] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#FFF8F0] mb-2" style={font}>
                  Enterprise Security Package
                </h3>
                <p className="text-sm text-[#FFF8F0]/60 mb-4 max-w-md mx-auto">
                  Need a security questionnaire completed, penetration test report, or SOC 2 documentation?
                  Our enterprise security package is available for qualifying customers.
                </p>
                <a
                  href="mailto:security@schroedertech.com?subject=Enterprise%20Security%20Package%20Request"
                  className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-6 py-2.5 rounded-full text-sm font-bold border-2 border-[#C8F5D4] hover:bg-[#b8e5c4] transition-colors"
                >
                  Request Security Documentation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center pt-8 pb-4">
          <p className="text-xs text-[#1a2e1a]/30">
            This Security Policy was last updated on February 25, 2026.
            <br />
            Schroeder Technologies reserves the right to update this policy as our security practices evolve.
          </p>
        </div>
      </div>
    </div>
  )
}
