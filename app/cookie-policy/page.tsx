import { CookiePolicyContent } from "@/components/cookie-policy-content"
import { CookieSettingsLink } from "@/components/cookie-settings-link"
import Link from "next/link"

export const metadata = {
  title: "Política de Cookies - TributariApp",
  description:
    "Información detallada sobre el uso de cookies en TributariApp y cómo gestionar sus preferencias de privacidad.",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                ← Volver al inicio
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Política de Cookies</h1>
              <p className="text-gray-600 mt-2">
                Última actualización:{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="hidden sm:block">
              <CookieSettingsLink />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <CookiePolicyContent />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <p>&copy; {new Date().getFullYear()} TributariApp. Todos los derechos reservados.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-800 underline">
                Política de Privacidad
              </Link>
              <Link href="/terms-of-service" className="text-gray-600 hover:text-gray-800 underline">
                Términos de Servicio
              </Link>
              <CookieSettingsLink />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
