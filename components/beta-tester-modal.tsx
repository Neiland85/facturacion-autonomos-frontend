"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Sparkles, Gift, Users, Zap } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

interface BetaTesterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BetaTesterModal({ open, onOpenChange }: BetaTesterModalProps) {
  const { trackEvent, trackConversion } = useAnalytics()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    experience: "",
    motivation: "",
    acceptTerms: false,
    acceptMarketing: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track beta tester registration
    trackEvent("beta_tester_registration", {
      company: formData.company,
      experience_level: formData.experience,
      source: "construction_notice",
    })

    trackConversion("beta_tester_signup", {
      value: 500, // High value conversion
      currency: "EUR",
    })

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Auto close after success
    setTimeout(() => {
      onOpenChange(false)
      setIsSuccess(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        experience: "",
        motivation: "",
        acceptTerms: false,
        acceptMarketing: false,
      })
    }, 3000)
  }

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!open) return null

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-gray-200 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">¡Registro Exitoso!</h3>
            <p className="text-gray-600 mb-4">
              Te hemos registrado como beta tester. Recibirás un email con los próximos pasos.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-medium">
                🎉 ¡Felicidades! Tendrás acceso gratuito durante un año completo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Únete al Programa Beta
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Sé uno de los primeros en probar TributariApp y obtén acceso gratuito por un año
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Beneficios del programa beta */}
          <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <Gift className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-900 text-sm">Acceso Gratuito</h4>
              <p className="text-xs text-blue-700">Un año completo sin costo</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-900 text-sm">Comunidad Exclusiva</h4>
              <p className="text-xs text-blue-700">Grupo privado de beta testers</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-900 text-sm">Primeras Funciones</h4>
              <p className="text-xs text-blue-700">Acceso anticipado a nuevas features</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email empresarial *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Empresa *
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="mt-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                Experiencia con herramientas fiscales *
              </Label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="mt-1 block w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona tu nivel</option>
                <option value="principiante">Principiante - Poca experiencia</option>
                <option value="intermedio">Intermedio - Uso regular de software fiscal</option>
                <option value="avanzado">Avanzado - Experto en herramientas fiscales</option>
                <option value="profesional">Profesional - Asesor fiscal/contable</option>
              </select>
            </div>

            <div>
              <Label htmlFor="motivation" className="text-sm font-medium text-gray-700">
                ¿Por qué quieres ser beta tester? *
              </Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                rows={3}
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                placeholder="Cuéntanos qué te motiva a probar TributariApp y cómo podrías ayudarnos a mejorar..."
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                  Acepto los términos y condiciones del programa beta y entiendo que proporcionaré feedback constructivo
                  *
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketing"
                  checked={formData.acceptMarketing}
                  onCheckedChange={(checked) => handleInputChange("acceptMarketing", checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="marketing" className="text-sm text-gray-700 leading-relaxed">
                  Acepto recibir comunicaciones sobre el programa beta y actualizaciones del producto
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.acceptTerms}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium text-base"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registrando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Unirme al Programa Beta
                </div>
              )}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Próximos pasos:</strong> Recibirás un email de confirmación con acceso al grupo privado de beta
              testers y las instrucciones para la primera versión de prueba.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
