"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import type { CookiePreferences } from "@/types/cookie-consent"
import Link from "next/link"

interface CookiePreferencesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CookiePreferencesModal({ open, onOpenChange }: CookiePreferencesModalProps) {
  const { preferences, savePreferences } = useCookieConsent()
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences)

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences, open])

  const handleSave = () => {
    savePreferences(localPreferences)
    onOpenChange(false)
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    setLocalPreferences(allAccepted)
    savePreferences(allAccepted)
    onOpenChange(false)
  }

  const handleRejectOptional = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
    setLocalPreferences(essentialOnly)
    savePreferences(essentialOnly)
    onOpenChange(false)
  }

  const updatePreference = (category: keyof CookiePreferences, value: boolean) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Configuración de Cookies</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Gestione sus preferencias de cookies para este sitio web
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Essential Cookies */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium text-gray-900">Cookies Esenciales</Label>
                <p className="text-sm text-gray-600">
                  Necesarias para el funcionamiento básico del sitio web. No se pueden desactivar.
                </p>
              </div>
              <Switch checked={true} disabled={true} className="data-[state=checked]:bg-gray-600" />
            </div>
            <div className="pl-4 border-l-2 border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Estas cookies incluyen:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Cookies de sesión para mantener su estado de inicio de sesión</li>
                <li>• Cookies de seguridad para proteger contra ataques CSRF</li>
                <li>• Cookies de preferencias básicas del sitio</li>
                <li>• Cookies de consentimiento para recordar sus elecciones</li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Functional Cookies */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium text-gray-900">Cookies Funcionales</Label>
                <p className="text-sm text-gray-600">
                  Mejoran la funcionalidad del sitio web y proporcionan características personalizadas.
                </p>
              </div>
              <Switch
                checked={localPreferences.functional}
                onCheckedChange={(checked) => updatePreference("functional", checked)}
                className="data-[state=checked]:bg-gray-600"
              />
            </div>
            <div className="pl-4 border-l-2 border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Estas cookies incluyen:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Preferencias de idioma y región</li>
                <li>• Configuraciones de accesibilidad</li>
                <li>• Preferencias de visualización (modo oscuro/claro)</li>
                <li>• Funciones de chat en vivo y soporte</li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Analytics Cookies */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium text-gray-900">Cookies de Análisis</Label>
                <p className="text-sm text-gray-600">
                  Nos ayudan a entender cómo los visitantes interactúan con el sitio web.
                </p>
              </div>
              <Switch
                checked={localPreferences.analytics}
                onCheckedChange={(checked) => updatePreference("analytics", checked)}
                className="data-[state=checked]:bg-gray-600"
              />
            </div>
            <div className="pl-4 border-l-2 border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Estas cookies incluyen:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Google Analytics para estadísticas de uso</li>
                <li>• Métricas de rendimiento del sitio web</li>
                <li>• Análisis de comportamiento de usuarios (anonimizado)</li>
                <li>• Informes de errores y mejoras técnicas</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2 italic">
                Todos los datos se procesan de forma anónima y agregada.
              </p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Marketing Cookies */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium text-gray-900">Cookies de Marketing</Label>
                <p className="text-sm text-gray-600">
                  Se utilizan para mostrar anuncios relevantes y medir la efectividad de campañas.
                </p>
              </div>
              <Switch
                checked={localPreferences.marketing}
                onCheckedChange={(checked) => updatePreference("marketing", checked)}
                className="data-[state=checked]:bg-gray-600"
              />
            </div>
            <div className="pl-4 border-l-2 border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Estas cookies incluyen:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Cookies de redes sociales (Facebook, LinkedIn, Twitter)</li>
                <li>• Píxeles de seguimiento para campañas publicitarias</li>
                <li>• Cookies de retargeting y remarketing</li>
                <li>• Medición de conversiones y ROI</li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Additional Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Información Adicional</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <p>
                <strong>Duración:</strong> Las cookies pueden ser temporales (se eliminan al cerrar el navegador) o
                persistentes (permanecen hasta su fecha de expiración o eliminación manual).
              </p>
              <p>
                <strong>Terceros:</strong> Algunas cookies son establecidas por servicios de terceros que aparecen en
                nuestras páginas.
              </p>
              <p>
                <strong>Control:</strong> Puede cambiar estas preferencias en cualquier momento desde la configuración
                de cookies en el pie de página.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleRejectOptional}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 
                       font-medium h-10"
            >
              Rechazar Opcionales
            </Button>
            <Button
              variant="outline"
              onClick={handleSave}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 
                       font-medium h-10"
            >
              Guardar Preferencias
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium h-10 border-0"
            >
              Aceptar Todas
            </Button>
          </div>

          {/* Legal Links */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Para más información, consulte nuestra{" "}
              <Link href="/cookie-policy" className="underline hover:no-underline text-gray-700 font-medium">
                Política de Cookies
              </Link>
              {" y "}
              <Link href="/privacy-policy" className="underline hover:no-underline text-gray-700 font-medium">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
