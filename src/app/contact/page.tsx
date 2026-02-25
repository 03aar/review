"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Building,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Headphones,
  Scale,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const inquiryTypes = [
  "General Inquiry",
  "Sales",
  "Support",
  "Billing",
  "Partnership",
  "Press/Media",
  "Bug Report",
  "Feature Request",
]

const hearAboutOptions = [
  "Google",
  "Social Media",
  "Referral",
  "Blog/Article",
  "Event",
  "Other",
]

const faqs = [
  {
    question: "What are your support hours?",
    answer:
      "Our support team is available Monday through Friday, 9am to 6pm Eastern Time. Enterprise customers on the Business plan have access to 24/7 priority support.",
  },
  {
    question: "How quickly will I get a response?",
    answer:
      "Free and Starter plan users can expect a response within 24 hours. Growth plan users receive responses within 4 hours during business hours. Business plan users have a guaranteed 1-hour SLA with dedicated account management.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Phone support is available for Growth and Business plan customers. All other plans receive support via email and our in-app chat. You can also schedule a call with our team through the demo booking link.",
  },
  {
    question: "Can I schedule a demo?",
    answer:
      "Absolutely! You can book a personalized demo with our sales team by clicking the \"Book a Demo\" button above or emailing sales@reviewforge.com. Demos typically last 30 minutes and we'll walk you through the entire platform tailored to your business needs.",
  },
]

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
    hearAbout: "",
    agreePrivacy: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreePrivacy: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreePrivacy) {
      toast.error("Please agree to the Privacy Policy before submitting.")
      return
    }

    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    toast.success("Message sent successfully! We'll get back to you within 24 hours.")

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      inquiryType: "",
      subject: "",
      message: "",
      hearAbout: "",
      agreePrivacy: false,
    })
  }

  const inputClass =
    "w-full bg-white border-2 border-[#1a2e1a] rounded-xl px-4 py-3 text-sm text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-[#2d6a4f] placeholder:text-[#1a2e1a]/30"

  const selectClass =
    "w-full bg-white border-2 border-[#1a2e1a] rounded-xl px-4 py-3 text-sm text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-[#2d6a4f] appearance-none cursor-pointer"

  return (
    <div className="min-h-screen bg-[#FFF8F0] overflow-hidden">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#1a2e1a] focus:text-[#FFF8F0] focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#1a2e1a]/5"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg" style={font}>
                R
              </span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1a2e1a]" style={font}>
              ReviewForge
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-[#1a2e1a] px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#1a2e1a]/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span
                  className={`block h-0.5 w-5 bg-[#1a2e1a] transition-all duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-[#1a2e1a] transition-all duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF8F0] border-t border-[#1a2e1a]/10 px-4 py-4 space-y-3">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2"
            >
              How it works
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2"
            >
              Pricing
            </Link>
            <div className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="text-sm font-medium text-[#1a2e1a] px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="main-content" className="relative pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-60" />
        <div className="absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-60 rotate-12" />
        <div className="absolute bottom-20 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-60 -rotate-12" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-50" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
              <MessageSquare className="h-4 w-4" /> CONTACT US
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05] mb-6"
              style={font}
            >
              LET&apos;S{" "}
              <span className="relative inline-block">
                <span className="relative z-10">TALK</span>
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#C8F5D4] -z-0 rounded-sm" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re a current customer or just exploring, we&apos;re here to
              help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options Grid */}
      <section className="py-12 md:py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sales Card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                style={{ backgroundColor: "#C8F5D4" }}
              >
                <Send className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-2" style={font}>
                Sales
              </h3>
              <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-4">
                Interested in ReviewForge? Let&apos;s discuss how we can help your
                business.
              </p>
              <a
                href="mailto:sales@reviewforge.com"
                className="flex items-center gap-2 text-sm font-medium text-[#2d6a4f] hover:text-[#1a2e1a] transition-colors mb-5"
              >
                <Mail className="h-4 w-4" />
                sales@reviewforge.com
              </a>
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-5 py-2.5 rounded-full text-sm font-bold border-2 border-[#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] transition-all"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                style={{ backgroundColor: "#FFE566" }}
              >
                <Headphones className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-2" style={font}>
                Support
              </h3>
              <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-4">
                Already a customer? Our support team is ready to help.
              </p>
              <a
                href="mailto:support@reviewforge.com"
                className="flex items-center gap-2 text-sm font-medium text-[#2d6a4f] hover:text-[#1a2e1a] transition-colors mb-5"
              >
                <Mail className="h-4 w-4" />
                support@reviewforge.com
              </a>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a2e1a]/30" style={font}>
                  SLA by Plan
                </p>
                <div className="flex items-center justify-between text-xs text-[#1a2e1a]/60">
                  <span>Free / Starter</span>
                  <span className="font-semibold text-[#1a2e1a]">24 hours</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#1a2e1a]/60">
                  <span>Growth</span>
                  <span className="font-semibold text-[#1a2e1a]">4 hours</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#1a2e1a]/60">
                  <span>Business</span>
                  <span className="font-semibold text-[#1a2e1a]">1 hour</span>
                </div>
              </div>
            </div>

            {/* Legal/Privacy Card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                style={{ backgroundColor: "#FFB5B5" }}
              >
                <Scale className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a2e1a] mb-2" style={font}>
                Legal / Privacy
              </h3>
              <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-4">
                Questions about terms, privacy, or data?
              </p>
              <a
                href="mailto:legal@schroedertech.com"
                className="flex items-center gap-2 text-sm font-medium text-[#2d6a4f] hover:text-[#1a2e1a] transition-colors mb-5"
              >
                <Mail className="h-4 w-4" />
                legal@schroedertech.com
              </a>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1a2e1a]/60 hover:text-[#1a2e1a] bg-[#FFF8F0] px-3 py-1.5 rounded-full border border-[#1a2e1a]/10 transition-colors"
                >
                  Privacy Policy <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1a2e1a]/60 hover:text-[#1a2e1a] bg-[#FFF8F0] px-3 py-1.5 rounded-full border border-[#1a2e1a]/10 transition-colors"
                >
                  Terms of Service <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  href="/dpa"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1a2e1a]/60 hover:text-[#1a2e1a] bg-[#FFF8F0] px-3 py-1.5 rounded-full border border-[#1a2e1a]/10 transition-colors"
                >
                  DPA <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  href="/security"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1a2e1a]/60 hover:text-[#1a2e1a] bg-[#FFF8F0] px-3 py-1.5 rounded-full border border-[#1a2e1a]/10 transition-colors"
                >
                  Security <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 md:py-24 bg-[#C8F5D4]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Get in Touch
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4"
              style={font}
            >
              SEND US A MESSAGE
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-xl mx-auto">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-10 border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a]"
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className={inputClass}
                required
              />
            </div>

            {/* Company */}
            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
              >
                Phone Number{" "}
                <span className="text-[#1a2e1a]/30 font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={inputClass}
              />
            </div>

            {/* Inquiry Type */}
            <div className="mb-4">
              <label
                htmlFor="inquiryType"
                className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
              >
                Inquiry Type
              </label>
              <div className="relative">
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select an inquiry type</option>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a2e1a]/40 pointer-events-none" />
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={5}
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            {/* How did you hear about us? */}
            <div className="mb-6">
              <label
                htmlFor="hearAbout"
                className="block text-sm font-semibold text-[#1a2e1a] mb-1.5"
              >
                How did you hear about us?
              </label>
              <div className="relative">
                <select
                  id="hearAbout"
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select an option</option>
                  {hearAboutOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a2e1a]/40 pointer-events-none" />
              </div>
            </div>

            {/* Privacy checkbox */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.agreePrivacy}
                  onChange={handleCheckbox}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-[#1a2e1a] text-[#2d6a4f] focus:ring-[#2d6a4f] cursor-pointer"
                />
                <span className="text-sm text-[#1a2e1a]/60 group-hover:text-[#1a2e1a] transition-colors">
                  I agree to the{" "}
                  <Link
                    href="/privacy"
                    className="text-[#2d6a4f] underline hover:text-[#1a2e1a]"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and consent to Schroeder Technologies processing my data.
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#1a2e1a] text-[#FFF8F0] px-8 py-4 rounded-full text-base font-bold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_#1a2e1a] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#FFF8F0]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              FAQ
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4"
              style={font}
            >
              QUICK ANSWERS
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-xl mx-auto">
              Common questions about reaching our team.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FFF8F0]/50 transition-colors"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-base font-bold text-[#1a2e1a] pr-4" style={font}>
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-[#1a2e1a] shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#1a2e1a] shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t-2 border-[#1a2e1a]/10 pt-4">
                      <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office/Company Info */}
      <section className="py-16 md:py-24 bg-[#1a2e1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#FFDAB5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              Our Company
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#FFF8F0] mb-4"
              style={font}
            >
              WHERE TO FIND US
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Address */}
            <div className="bg-[#FFF8F0] rounded-3xl p-7 border-2 border-[#1a2e1a]/20">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                style={{ backgroundColor: "#FFDAB5" }}
              >
                <Building className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>
                Headquarters
              </h3>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                Schroeder Technologies, Inc.
              </p>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                1209 Orange Street
              </p>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                Wilmington, DE 19801
              </p>
            </div>

            {/* Remote-first */}
            <div className="bg-[#FFF8F0] rounded-3xl p-7 border-2 border-[#1a2e1a]/20">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                style={{ backgroundColor: "#D4CCFF" }}
              >
                <MapPin className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>
                Remote-First
              </h3>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                We&apos;re a remote-first company with team members worldwide. Our
                distributed team spans multiple time zones to better serve our global
                customer base.
              </p>
            </div>

            {/* Hours */}
            <div className="bg-[#FFF8F0] rounded-3xl p-7 border-2 border-[#1a2e1a]/20">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                style={{ backgroundColor: "#C8F5D4" }}
              >
                <Clock className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>
                Business Hours
              </h3>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                Monday &ndash; Friday
              </p>
              <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">
                9:00 AM &ndash; 6:00 PM ET
              </p>
              <p className="text-xs text-[#1a2e1a]/40 mt-2">
                Business plan customers have 24/7 access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 md:py-20 bg-[#FFE566] border-y-2 border-[#1a2e1a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-[#1a2e1a] mb-3"
            style={font}
          >
            FOLLOW US
          </h2>
          <p className="text-sm text-[#1a2e1a]/50 mb-8">
            Stay updated with product news, tips, and more.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://twitter.com/reviewforge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-6 py-3 rounded-full text-sm font-bold border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </a>
            <a
              href="https://linkedin.com/company/schroeder-technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-6 py-3 rounded-full text-sm font-bold border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <a
              href="https://instagram.com/reviewforge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1a2e1a] px-6 py-3 rounded-full text-sm font-bold border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFF8F0] border-t-2 border-[#1a2e1a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg" style={font}>
                    R
                  </span>
                </div>
                <span className="text-xl font-bold text-[#1a2e1a]" style={font}>
                  ReviewForge
                </span>
              </div>
              <p className="text-sm text-[#1a2e1a]/40 leading-relaxed">
                Your happy customers have a lot to say. We help them say it.
              </p>
            </div>
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4"
                style={font}
              >
                Product
              </h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "How it works", "Integrations"].map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4"
                style={font}
              >
                Company
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Contact", href: "/contact" },
                ].map((i) => (
                  <li key={i.label}>
                    <Link
                      href={i.href}
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4"
                style={font}
              >
                Legal
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Acceptable Use", href: "/acceptable-use" },
                  { label: "Security", href: "/security" },
                  { label: "DPA", href: "/dpa" },
                ].map((i) => (
                  <li key={i.label}>
                    <Link
                      href={i.href}
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-[#1a2e1a]/10 gap-4">
            <p className="text-xs text-[#1a2e1a]/30">
              &copy; 2026 Schroeder Technologies. All rights reserved. ReviewForge is a
              registered trademark.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-[#1a2e1a]/30 hover:text-[#1a2e1a] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
