"use client"
import { LottieAnimation } from "./lottie-animation"
import { Sparkles, TrendingUp, FileText } from "lucide-react"
import { DemoButton } from "./demo-button"
import { FeaturesButton } from "./features-button"

export function HeroTwoColumn() {
  return (
    <section className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-12 lg:py-0">
          {/* Columna Izquierda - Contenido */}
          <div className="space-y-8 lg:space-y-12">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Tecnología de vanguardia</span>
            </div>

            {/* Titular principal */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                Estamos automatizando la{" "}
                <span className="text-blue-400 relative">
                  administración fiscal
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400/30 rounded-full" />
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
                Inteligencia artificial que transforma la gestión tributaria de tu empresa. Cumplimiento automático,
                optimización fiscal y reporting inteligente.
              </p>
            </div>

            {/* Características clave */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">IA Avanzada</p>
                  <p className="text-xs text-gray-400">Automatización inteligente</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Optimización</p>
                  <p className="text-xs text-gray-400">Ahorro fiscal garantizado</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Cumplimiento</p>
                  <p className="text-xs text-gray-400">100% normativa AEAT</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <DemoButton size="lg" />
                <FeaturesButton size="lg" />
              </div>

              <p className="text-sm text-gray-500">
                ✓ Sin compromiso • ✓ Configuración en 24h • ✓ Soporte especializado
              </p>
            </div>

            {/* Indicadores de confianza */}
            <div className="pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500 mb-4">Empresas que ya confían en nosotros:</p>
              <div className="flex items-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-gray-600">PYME</div>
                <div className="text-2xl font-bold text-gray-600">SL</div>
                <div className="text-2xl font-bold text-gray-600">SA</div>
                <div className="text-2xl font-bold text-gray-600">COOP</div>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Animación */}
          <div className="relative">
            <div className="relative z-10">
              <LottieAnimation />
            </div>

            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl" />
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-xl" />
              <div className="absolute top-1/2 right-1/2 w-40 h-40 bg-green-500/3 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
