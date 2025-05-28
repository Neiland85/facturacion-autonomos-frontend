import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Facturación Autónomos",
  description: "WebApp moderna para la gestión de facturación de autónomos",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</div>
          </main>
          <footer className="bg-white border-t border-gray-200 py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Facturación Autónomos. Todos los derechos reservados.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
