import type { Metadata, Viewport } from "next"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "ReviewForge - Turn Every Happy Customer Into a 5-Star Review",
    template: "%s | ReviewForge",
  },
  description:
    "Capture the silent majority. Your happy customers have a lot to say - we help them say it. Effortlessly collect, transform, and distribute authentic reviews with AI-powered voice capture.",
  keywords: [
    "review management",
    "customer reviews",
    "AI reviews",
    "Google reviews",
    "Yelp reviews",
    "review collection",
    "voice reviews",
    "business reviews",
    "review platform",
  ],
  openGraph: {
    title: "ReviewForge - Turn Every Happy Customer Into a 5-Star Review",
    description:
      "97% of happy customers leave without writing a review. ReviewForge captures their voice in 8 seconds and turns it into a polished, platform-ready review.",
    type: "website",
    siteName: "ReviewForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewForge - AI-Powered Review Collection",
    description:
      "Turn 3 seconds of speech into detailed, authentic reviews on Google, Yelp, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a2e1a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
