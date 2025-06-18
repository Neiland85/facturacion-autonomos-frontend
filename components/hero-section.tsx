"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedBackground } from "./animated-background"
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import { AnimatedSymbol } from "./animated-symbol"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setStatus("error")
      setMessage("Por favor, introduce tu correo electrónico.")
      return
    }

    setStatus("submitting")
    setMessage("")

    // Simular registro
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email.includes("@") && email.includes(".")) {
      setStatus("success")
      setMessage("¡Perfecto! Te contactaremos pronto para el programa beta.")
      setEmail("")
    } else {
      setStatus("error")
      setMessage("Por favor, introduce un correo electrónico válido.")
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-950 overflow-hidden">
      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-gray-950/20" style={{ zIndex: 2 }} />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <div className="space-y-8 sm:space-y-12">
          {/* Título principal */}
          <div className="space-y-4">
            {/* Símbolo animado y título */}
            <div className="flex flex-col items-center space-y-6">
              <AnimatedSymbol />
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none">
                El Futuro de la
                <br />
                <span className="text-blue-400">Gestión Fiscal</span>
              </h1>
            </div>

            {/* Subtítulo */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Automatización inteligente para empresas españolas. Cumplimiento normativo, optimización fiscal y
              reporting en tiempo real.
            </p>
          </div>

          {/* Formulario de registro */}
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-400 font-medium">PROGRAMA BETA EXCLUSIVO</p>
              <p className="text-gray-500 text-sm">
                Únete a empresas líderes que ya están transformando su gestión fiscal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status !== "idle" && status !== "submitting") {
                    setStatus("idle")
                    setMessage("")
                  }
                }}
                disabled={status === "submitting"}
                className="h-14 px-6 text-base bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                          focus-visible:border-blue-500 transition-all duration-200"
                aria-label="Correo electrónico para registro beta"
              />

              <Button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full h-14 text-base font-semibold bg-blue-600 hover:bg-blue-700 
                          text-white border-0 transition-all duration-200 
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Registrando...
                  </>
                ) : (
                  <>
                    Acceder al Beta
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Mensaje de estado */}
            {message && (
              <div
                className={`flex items-center justify-center gap-2 text-sm transition-opacity duration-300 ${
                  status === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                )}
                {message}
              </div>
            )}
          </div>

          {/* Indicadores de confianza */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-xs text-gray-500 pt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Cumplimiento AEAT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Seguridad Bancaria</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>IA Avanzada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
