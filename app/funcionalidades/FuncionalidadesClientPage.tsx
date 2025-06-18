"use client"

import { Brain, Building2, Fingerprint, Calculator, Shield, Zap, FileText, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Inteligencia Artificial Avanzada",
    description:
      "Motor de IA que analiza y procesa automáticamente tus datos fiscales, identificando oportunidades de optimización y asegurando el cumplimiento normativo.",
    benefits: [
      "Análisis predictivo de obligaciones fiscales",
      "Detección automática de errores y inconsistencias",
      "Recomendaciones personalizadas de optimización",
      "Aprendizaje continuo de patrones empresariales",
    ],
  },
  {
    icon: Building2,
    title: "Integración Bancaria Total",
    description:
      "Conexión directa con más de 50 entidades bancarias españolas para importación automática y categorización inteligente de transacciones.",
    benefits: [
      "Sincronización en tiempo real con cuentas bancarias",
      "Categorización automática de gastos e ingresos",
      "Conciliación bancaria automatizada",
      "Soporte para múltiples entidades financieras",
    ],
  },
  {
    icon: Fingerprint,
    title: "Seguridad Biométrica",
    description:
      "Acceso seguro mediante reconocimiento facial y huella dactilar, cumpliendo con los más altos estándares de seguridad bancaria.",
    benefits: [
      "Autenticación biométrica multifactor",
      "Cifrado de extremo a extremo",
      "Cumplimiento PCI DSS y ISO 27001",
      "Auditoría completa de accesos",
    ],
  },
  {
    icon: Calculator,
    title: "Optimización Fiscal Automática",
    description:
      "Identificación y aplicación automática de deducciones fiscales, maximizando el ahorro tributario de tu empresa.",
    benefits: [
      "Detección automática de deducciones aplicables",
      "Cálculo optimizado de cuotas tributarias",
      "Planificación fiscal predictiva",
      "Alertas de oportunidades de ahorro",
    ],
  },
  {
    icon: Shield,
    title: "Cumplimiento Normativo",
    description:
      "Garantía de cumplimiento con todas las normativas fiscales españolas y europeas, con actualizaciones automáticas.",
    benefits: [
      "Cumplimiento automático con AEAT y PEPPOL",
      "Actualizaciones normativas en tiempo real",
      "Validación previa de declaraciones",
      "Historial completo de cumplimiento",
    ],
  },
  {
    icon: Zap,
    title: "Automatización Completa",
    description:
      "Automatización end-to-end de todos los procesos fiscales, desde la captura de datos hasta la presentación de declaraciones.",
    benefits: [
      "Generación automática de declaraciones",
      "Presentación electrónica programada",
      "Workflows personalizables",
      "Integración con sistemas ERP",
    ],
  },
  {
    icon: FileText,
    title: "Gestión Documental",
    description:
      "Sistema completo de gestión documental con OCR avanzado para digitalización y clasificación automática de documentos.",
    benefits: [
      "Digitalización automática con OCR",
      "Clasificación inteligente de documentos",
      "Archivo digital organizado",
      "Búsqueda avanzada y etiquetado",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting Inteligente",
    description:
      "Dashboards interactivos y reportes personalizados con análisis avanzado de datos fiscales y financieros.",
    benefits: [
      "Dashboards en tiempo real",
      "Reportes personalizables",
      "Análisis de tendencias fiscales",
      "Exportación a múltiples formatos",
    ],
  },
]

export default function FuncionalidadesClientPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Funcionalidades Completas</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Descubre todas las capacidades de TributariApp para automatizar y optimizar la gestión fiscal de tu empresa
            con tecnología de vanguardia
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Todas estas funcionalidades están disponibles desde el primer día. Solicita una demo personalizada y
            descubre cómo TributariApp puede transformar tu empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/demo")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Demo Gratuita
            </button>
            <button
              onClick={() => (window.location.href = "/#demo-form")}
              className="border border-white bg-transparent hover:bg-white text-white hover:text-gray-900 font-medium py-4 px-8 rounded-lg transition-all duration-300"
            >
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
