import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script, Caveat } from "next/font/google"
import "./globals.css"

// Load fonts using Next.js font system
const inter = Inter({ subsets: ["latin"] })

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
})

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
})

export const metadata: Metadata = {
  title: "Happy Birthday Trisheeta!",
  description: "A special birthday wish for Trisheeta",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancingScript.variable} ${caveat.variable}`}>{children}</body>
    </html>
  )
}
