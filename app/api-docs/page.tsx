import { ApiDocumentation } from "@/components/api-documentation"
import Link from "next/link"

export const metadata = {
  title: "API Documentation - TributariApp",
  description:
    "Complete API documentation for TributariApp's fiscal automation platform. RESTful APIs for tax management, reporting, and compliance.",
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                ← TributariApp
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">API Documentation</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                API Status: Operational
              </span>
              <Link href="/api-keys" className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                Obtener API Key
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ApiDocumentation />
      </main>
    </div>
  )
}
