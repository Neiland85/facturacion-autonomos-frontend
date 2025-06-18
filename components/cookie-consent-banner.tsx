"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CookiePreferencesModal } from "./cookie-preferences-modal"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import Link from "next/link"

export function CookieConsentBanner() {
  const [showModal, setShowModal] = useState(false)
  const { consentGiven, acceptAll, rejectAll, hasInteracted, preferences } = useCookieConsent()

  // Don't show banner if user has already interacted
  if (hasInteracted) {
    return null
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
        <Card className="max-w-6xl mx-auto bg-white border-gray-200">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">Configuración de Cookies</h2>
                <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
                  Este sitio web utiliza cookies para mejorar su experiencia de navegación, analizar el uso del sitio y
                  personalizar el contenido. Las cookies esenciales son necesarias para el funcionamiento básico del
                  sitio. Puede gestionar sus preferencias de cookies en cualquier momento.
                </p>
                <p className="text-xs text-gray-600">
                  Para más información, consulte nuestra{" "}
                  <Link href="/cookie-policy" className="underline hover:no-underline text-gray-800 font-medium">
                    Política de Cookies
                  </Link>{" "}
                  y{" "}
                  <Link href="/privacy-policy" className="underline hover:no-underline text-gray-800 font-medium">
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(true)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 
                           font-medium px-6 py-2 h-auto whitespace-nowrap"
                >
                  Gestionar Preferencias
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 
                           font-medium px-6 py-2 h-auto whitespace-nowrap"
                >
                  Rechazar Opcionales
                </Button>
                <Button
                  onClick={acceptAll}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-6 py-2 h-auto 
                           whitespace-nowrap border-0"
                >
                  Aceptar Todas
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <CookiePreferencesModal open={showModal} onOpenChange={setShowModal} />
    </>
  )
}
