import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AuthProvider } from "@/providers/auth-provider"
import { NextThemesProvider } from "@/providers/theme-provider"
import { AcademicYearProvider } from "@/providers/academic-year-provider"
import { ModalRenderer } from "@/components/modals/modal-renderer"
import { QueryProvider } from "@/providers/query-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PFE Management Platform",
  description: "Comprehensive platform for managing Final Year Projects",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <NextThemesProvider>
          <AuthProvider>
            <AcademicYearProvider>
              <QueryProvider>
                {children}
                <ModalRenderer />
              </QueryProvider>
            </AcademicYearProvider>
          </AuthProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}
