import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "ReviewForge - Turn Every Happy Customer Into a 5-Star Review",
  description:
    "Capture the silent majority. Your happy customers have a lot to say - we help them say it. Effortlessly collect, transform, and distribute authentic reviews.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
