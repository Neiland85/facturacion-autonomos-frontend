"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Building2, Fingerprint, Calculator } from "lucide-react"

const features = [
  {
    id: "ai-reporting",
    icon: Brain,
    title: "Informes con IA",
    subtitle: "Análisis Inteligente",
    description:
      "Generación automática de informes fiscales con inteligencia artificial avanzada. Análisis predictivo y recomendaciones personalizadas para optimizar su carga tributaria.",
    benefits: ["Análisis predictivo", "Recomendaciones personalizadas", "Informes automatizados"],
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200/50",
  },
  {
    id: "bank-integration",
    icon: Building2,
    title: "Integración Bancaria",
    subtitle: "Conexión Segura",
    description:
      "Sincronización directa con más de 50 entidades bancarias españolas. Importación automática de transacciones y categorización inteligente de gastos empresariales.",
    benefits: ["50+ bancos soportados", "Sincronización en tiempo real", "Categorización automática"],
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-600",
    borderColor: "border-green-200/50",
  },
  {
    id: "biometric-auth",
    icon: Fingerprint,
    title: "Autenticación Biométrica",
    subtitle: "Seguridad Avanzada",
    description:
      "Acceso seguro mediante reconocimiento facial y huella dactilar. Cumple con los más altos estándares de seguridad bancaria y protección de datos empresariales.",
    benefits: ["Reconocimiento facial", "Huella dactilar", "Seguridad bancaria"],
    gradient: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200/50",
  },
  {
    id: "automated-deductions",
    icon: Calculator,
    title: "Deducciones Automáticas",
    subtitle: "Optimización Fiscal",
    description:
      "Identificación automática de deducciones fiscales aplicables. Maximiza el ahorro tributario mediante el análisis continuo de gastos y normativa fiscal vigente.",
    benefits: ["Identificación automática", "Máximo ahorro fiscal", "Análisis continuo"],
    gradient: "from-orange-500/10 to-amber-500/10",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200/50",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Funcionalidades Principales
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Tecnología que Transforma
            <br />
            <span className="text-blue-600">su Gestión Fiscal</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra las capacidades avanzadas que hacen de TributariApp la solución más completa para la automatización
            fiscal empresarial en España.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                AI
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                B
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                S
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                D
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Todas las funcionalidades integradas</p>
              <p className="text-xs text-gray-600">Una plataforma completa para su empresa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  feature: (typeof features)[0]
  index: number
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon

  return (
    <Card
      className={`group relative overflow-hidden bg-white border-2 ${feature.borderColor} 
                 hover:border-gray-300 transition-all duration-500 ease-out
                 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1
                 animate-in slide-in-from-bottom-8 fade-in-0`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationDuration: "600ms",
        animationFillMode: "both",
      }}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Animated Border Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                       -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
        />
      </div>

      <CardContent className="relative p-8 sm:p-10">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} 
                        flex items-center justify-center mb-6
                        group-hover:scale-110 transition-transform duration-300 ease-out`}
        >
          <Icon className={`w-8 h-8 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`} />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-gray-600 transition-colors">
              {feature.subtitle}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
              {feature.title}
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
            {feature.description}
          </p>

          {/* Benefits List */}
          <div className="space-y-3 pt-2">
            {feature.benefits.map((benefit, benefitIndex) => (
              <div
                key={benefit}
                className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300 ease-out"
                style={{ transitionDelay: `${benefitIndex * 50}ms` }}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${feature.iconColor.replace("text-", "bg-")} 
                               group-hover:scale-125 transition-transform duration-300`}
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Hover Indicator */}
          <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span>Explorar funcionalidad</span>
              <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Corner Accent */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.gradient} 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0`}
          style={{ clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)" }}
        />
      </CardContent>
    </Card>
  )
}
