"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, TrendingUp, Users } from "lucide-react"

const benefits = [
  {
    id: "security",
    icon: Shield,
    title: "Seguridad Garantizada",
    description:
      "Protección de datos de nivel bancario con cifrado end-to-end y cumplimiento total de normativas GDPR y PCI DSS para máxima tranquilidad empresarial.",
  },
  {
    id: "efficiency",
    icon: Clock,
    title: "Eficiencia Operativa",
    description:
      "Reducción del 85% en tiempo de procesamiento fiscal mediante automatización inteligente, liberando recursos para actividades estratégicas de mayor valor.",
  },
  {
    id: "savings",
    icon: TrendingUp,
    title: "Ahorro Fiscal Optimizado",
    description:
      "Identificación automática de deducciones y optimizaciones fiscales que generan un ahorro promedio del 23% en la carga tributaria empresarial.",
  },
  {
    id: "support",
    icon: Users,
    title: "Soporte Especializado",
    description:
      "Equipo de asesores fiscales certificados disponible 24/7 para resolver consultas complejas y garantizar el cumplimiento normativo continuo.",
  },
]

export function BenefitsSection() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-card-id")
            if (cardId) {
              setVisibleCards((prev) => new Set([...prev, cardId]))
            }
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe each card
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const setCardRef = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(id, element)
    } else {
      cardRefs.current.delete(id)
    }
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 mb-8">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            Beneficios Empresariales
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Ventajas Competitivas que
            <br />
            <span className="text-gray-300">Impulsan su Negocio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Descubra cómo TributariApp transforma la gestión fiscal de su empresa, proporcionando beneficios tangibles
            que impactan directamente en su rentabilidad y eficiencia operativa.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              index={index}
              isVisible={visibleCards.has(benefit.id)}
              ref={(el) => setCardRef(benefit.id, el)}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Empresas Activas" },
            { value: "85%", label: "Reducción de Tiempo" },
            { value: "23%", label: "Ahorro Fiscal Promedio" },
            { value: "24/7", label: "Soporte Disponible" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transform transition-all duration-700 ease-out ${
                visibleCards.size > 0 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface BenefitCardProps {
  benefit: (typeof benefits)[0]
  index: number
  isVisible: boolean
}

const BenefitCard = React.forwardRef<HTMLDivElement, BenefitCardProps>(({ benefit, index, isVisible }, ref) => {
  const Icon = benefit.icon

  return (
    <div
      ref={ref}
      data-card-id={benefit.id}
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100"
          : index % 2 === 0
            ? "-translate-x-12 opacity-0"
            : "translate-x-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="group bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-500 hover:bg-gray-800/70 backdrop-blur-sm">
        <CardContent className="p-8 sm:p-10">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-14 h-14 bg-gray-700/50 rounded-xl flex items-center justify-center group-hover:bg-gray-700/70 transition-colors duration-300">
              <Icon className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
              {benefit.title}
            </h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {benefit.description}
            </p>
          </div>

          {/* Subtle Accent Line */}
          <div className="mt-8 pt-6 border-t border-gray-700 group-hover:border-gray-600 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-0.5 bg-gray-600 group-hover:bg-gray-500 transition-all duration-500 group-hover:w-16" />
              <div className="text-xs text-gray-500 font-medium tracking-wider uppercase">Beneficio Clave</div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-700/0 via-gray-600/5 to-gray-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </CardContent>
      </Card>
    </div>
  )
})

BenefitCard.displayName = "BenefitCard"

// Add React import for forwardRef
import React from "react"
