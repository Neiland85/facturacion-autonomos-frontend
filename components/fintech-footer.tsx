"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ContactModal } from "./contact-modal"

export function FintechFooter() {
  const [showContactModal, setShowContactModal] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left side - Company and Copyright */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">TributariApp</span>
                <span className="mx-2">•</span>
                <span>&copy; {currentYear}</span>
              </div>

              {/* Legal Links */}
              <nav className="flex items-center gap-6">
                <Link
                  href="/terms-of-service"
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Términos de Servicio
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Política de Privacidad
                </Link>
                <Link
                  href="/cookie-policy"
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Cookies
                </Link>
              </nav>
            </div>

            {/* Right side - Developer Links & Contact */}
            <div className="flex items-center gap-4">
              {/* API Documentation Link */}
              <Link
                href="/api-docs"
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded border border-gray-700">API</span>
                Documentación
              </Link>

              {/* Contact Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactModal(true)}
                className="text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-900 px-4 py-2 h-auto border border-gray-800 hover:border-gray-700 transition-all duration-200"
              >
                Contacto
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal open={showContactModal} onOpenChange={setShowContactModal} />
    </>
  )
}
