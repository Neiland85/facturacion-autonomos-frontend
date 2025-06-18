"use client"

import Link from "next/link"
import { CookieSettingsLink } from "./cookie-settings-link"

export function InstitutionalFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Information */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">TributariApp</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Plataforma de automatización fiscal para empresas españolas. Cumplimiento normativo y optimización
              tributaria mediante inteligencia artificial.
            </p>
            <div className="text-xs text-gray-500">
              <p>CIF: B-12345678</p>
              <p>Registro Mercantil de Madrid</p>
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Legal</h4>
            <nav className="space-y-3">
              <Link
                href="/privacy-policy"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/cookie-policy"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Política de Cookies
              </Link>
              <Link
                href="/terms-of-service"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Términos de Servicio
              </Link>
              <Link
                href="/legal-notice"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Aviso Legal
              </Link>
              <div className="pt-1">
                <CookieSettingsLink />
              </div>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Contacto</h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div>
                <p className="text-gray-300 font-medium mb-1">Dirección</p>
                <p>Calle Serrano, 123</p>
                <p>28006 Madrid, España</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium mb-1">Teléfono</p>
                <a href="tel:+34910123456" className="hover:text-white transition-colors duration-200">
                  +34 910 123 456
                </a>
              </div>
              <div>
                <p className="text-gray-300 font-medium mb-1">Email</p>
                <a href="mailto:info@tributariapp.com" className="hover:text-white transition-colors duration-200">
                  info@tributariapp.com
                </a>
              </div>
              <div>
                <p className="text-gray-300 font-medium mb-1">Soporte</p>
                <a href="mailto:soporte@tributariapp.com" className="hover:text-white transition-colors duration-200">
                  soporte@tributariapp.com
                </a>
              </div>
            </div>
          </div>

          {/* Resources & Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Recursos</h4>
            <nav className="space-y-3">
              <Link
                href="/documentation"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Documentación
              </Link>
              <Link
                href="/api-reference"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                API Reference
              </Link>
              <Link
                href="/help-center"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Centro de Ayuda
              </Link>
              <Link
                href="/status"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Estado del Sistema
              </Link>
              <a
                href="https://github.com/tributariapp"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-800 pt-8">
          {/* Social Media & Additional Links */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500 font-medium">Síguenos:</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com/company/tributariapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/tributariapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
                <a
                  href="https://youtube.com/@tributariapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="YouTube"
                >
                  YouTube
                </a>
                <a
                  href="https://github.com/tributariapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Additional Information */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-xs text-gray-500">
              <span>Horario de atención: L-V 9:00-18:00 CET</span>
              <span className="hidden md:inline">•</span>
              <span>Respuesta en menos de 24h</span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Copyright */}
              <div className="text-xs text-gray-500">
                <p>&copy; {currentYear} TributariApp S.L. Todos los derechos reservados.</p>
                <p className="mt-1">Desarrollado en España • Cumplimiento GDPR • Certificación ISO 27001</p>
              </div>

              {/* Compliance & Certifications */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-800 rounded text-gray-400 font-mono">GDPR</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-gray-400 font-mono">ISO 27001</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-gray-400 font-mono">PCI DSS</span>
              </div>
            </div>
          </div>

          {/* Accessibility Statement */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                Este sitio web cumple con las{" "}
                <Link href="/accessibility" className="text-gray-400 hover:text-white underline">
                  Pautas de Accesibilidad WCAG 2.1 AA
                </Link>
                . Si experimenta dificultades de acceso, por favor{" "}
                <a href="mailto:accesibilidad@tributariapp.com" className="text-gray-400 hover:text-white underline">
                  contáctenos
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
