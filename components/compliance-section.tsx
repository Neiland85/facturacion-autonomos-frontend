"use client"

import { useEffect, useRef } from "react"
import { Shield, FileCheck, CheckCircle, Award } from "lucide-react"

export function ComplianceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".slide-in-element")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-gray-900 text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="slide-in-element slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Cumplimiento Oficial Garantizado</h2>
            <p className="text-lg max-w-3xl mx-auto mb-10 text-gray-300 leading-relaxed">
              Cumplimos con todos los requisitos técnicos y de seguridad exigidos por{" "}
              <strong className="text-blue-400">PEPPOL</strong> y la{" "}
              <strong className="text-blue-400">Agencia Tributaria Española (AEAT)</strong> para operar con sus APIs.
              Nuestra plataforma está preparada para generar y presentar declaraciones fiscales de forma automatizada,
              segura y <strong className="text-white">100% conforme a la normativa vigente</strong>.
            </p>
          </div>
        </div>

        {/* Validaciones Oficiales */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
          <div
            className="slide-in-element bg-gray-800 p-6 rounded-lg shadow-lg flex items-start space-x-4 hover:bg-gray-750 transition-colors duration-300"
            style={{ animationDelay: "100ms" }}
          >
            <Shield className="w-10 h-10 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Integración Oficial AEAT</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Compatible con el sistema SII, declaración 303, 130 y renta, con validación de errores en tiempo real y
                certificación oficial.
              </p>
            </div>
          </div>

          <div
            className="slide-in-element bg-gray-800 p-6 rounded-lg shadow-lg flex items-start space-x-4 hover:bg-gray-750 transition-colors duration-300"
            style={{ animationDelay: "200ms" }}
          >
            <FileCheck className="w-10 h-10 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Interoperabilidad con PEPPOL</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Sistema certificado para operar con UBL, Facturae y redes europeas de facturación electrónica bajo
                estándares oficiales.
              </p>
            </div>
          </div>

          <div
            className="slide-in-element bg-gray-800 p-6 rounded-lg shadow-lg flex items-start space-x-4 hover:bg-gray-750 transition-colors duration-300"
            style={{ animationDelay: "300ms" }}
          >
            <CheckCircle className="w-10 h-10 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Precisión del 0% de Error</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Motor fiscal validado con control automático de reglas tributarias y verificación de envíos electrónicos
                certificados.
              </p>
            </div>
          </div>
        </div>

        {/* Badges de Certificación */}
        <div
          className="slide-in-element grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          style={{ animationDelay: "400ms" }}
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:bg-gray-800/70 transition-colors duration-300">
            <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xs font-semibold text-white mb-1">Validado por AEAT</div>
            <div className="text-xs text-gray-400">Certificación Oficial</div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:bg-gray-800/70 transition-colors duration-300">
            <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xs font-semibold text-white mb-1">PEPPOL Ready</div>
            <div className="text-xs text-gray-400">Estándar Europeo</div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:bg-gray-800/70 transition-colors duration-300">
            <FileCheck className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xs font-semibold text-white mb-1">SII Compatible</div>
            <div className="text-xs text-gray-400">Suministro Inmediato</div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:bg-gray-800/70 transition-colors duration-300">
            <CheckCircle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xs font-semibold text-white mb-1">ISO 27001</div>
            <div className="text-xs text-gray-400">Seguridad Certificada</div>
          </div>
        </div>

        {/* Disclaimer Legal */}
        <div className="slide-in-element text-center" style={{ animationDelay: "500ms" }}>
          <div className="max-w-4xl mx-auto bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">TRIBUTARIAPP</strong> cumple con las normativas técnicas de integración
              establecidas por la Agencia Tributaria Española (AEAT) y los estándares europeos de interoperabilidad
              (PEPPOL, UBL, Facturae). Toda la generación y envío de modelos tributarios se realiza bajo protocolos
              cifrados, auditables y con validadores antifallo.{" "}
              <strong className="text-green-400">Margen de error fiscal estimado: 0%</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
