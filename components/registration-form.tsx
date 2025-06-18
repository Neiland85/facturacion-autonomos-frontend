"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Loader2,
  CheckCircle,
  AlertTriangle,
  User,
  Mail,
  TestTube,
  Sparkles,
  Shield,
  AlertCircle,
  Check,
  Info,
  Building2,
  Search,
  X,
  FileText,
  HelpCircle,
} from "lucide-react"
import {
  validateBusinessEmail,
  validateFullName,
  suggestEmailCorrection,
  type EmailValidationResult,
  type NameValidationResult,
} from "@/utils/validation"
import {
  verifyCompany,
  getSimilarDomains,
  isDomainSuspicious,
  type CompanyInfo,
  type VerificationResult,
} from "@/services/company-verification"
import {
  validateFiscalId,
  verifyFiscalId,
  crossVerifyFiscalAndDomain,
  formatFiscalId,
  type FiscalValidationResult,
  type FiscalVerificationResult,
} from "@/utils/fiscal-validation"
import { CompanyVerificationCard } from "./company-verification-card"
import { FiscalVerificationCard } from "./fiscal-verification-card"

interface FormData {
  name: string
  email: string
  fiscalId: string
  isTester: string
  interests: string[]
}

interface FormErrors {
  name?: string
  email?: string
  fiscalId?: string
  isTester?: string
  interests?: string
}

interface ValidationState {
  name: NameValidationResult | null
  email: EmailValidationResult | null
  fiscalId: FiscalValidationResult | null
}

interface CompanyVerificationState {
  status: "idle" | "verifying" | "verified" | "failed" | "suspicious"
  company?: CompanyInfo
  error?: string
  suggestions?: string[]
}

interface FiscalVerificationState {
  status: "idle" | "verifying" | "verified" | "failed"
  result?: FiscalVerificationResult
  crossVerification?: {
    matches: boolean
    confidence: number
    reason?: string
  }
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    fiscalId: "",
    isTester: "",
    interests: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [validation, setValidation] = useState<ValidationState>({
    name: null,
    email: null,
    fiscalId: null,
  })
  const [companyVerification, setCompanyVerification] = useState<CompanyVerificationState>({
    status: "idle",
  })
  const [fiscalVerification, setFiscalVerification] = useState<FiscalVerificationState>({
    status: "idle",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null)
  const [showCompanyCard, setShowCompanyCard] = useState(false)
  const [showFiscalCard, setShowFiscalCard] = useState(false)
  const [showFiscalField, setShowFiscalField] = useState(false)

  const interestOptions = [
    { id: "ai", label: "Inteligencia Artificial", icon: "🤖" },
    { id: "invoicing", label: "Facturación", icon: "📄" },
    { id: "crypto", label: "Criptomonedas", icon: "₿" },
    { id: "automation", label: "Automatización", icon: "⚡" },
  ]

  // Validación en tiempo real del nombre
  useEffect(() => {
    if (formData.name.trim()) {
      const nameValidation = validateFullName(formData.name)
      setValidation((prev) => ({ ...prev, name: nameValidation }))
    } else {
      setValidation((prev) => ({ ...prev, name: null }))
    }
  }, [formData.name])

  // Validación en tiempo real del CIF/NIF
  useEffect(() => {
    if (formData.fiscalId.trim()) {
      const fiscalValidation = validateFiscalId(formData.fiscalId)
      setValidation((prev) => ({ ...prev, fiscalId: fiscalValidation }))

      // Si es válido, verificar con registros oficiales
      if (fiscalValidation.isValid) {
        handleFiscalVerification(fiscalValidation.formatted)
      } else {
        setFiscalVerification({ status: "idle" })
        setShowFiscalCard(false)
      }
    } else {
      setValidation((prev) => ({ ...prev, fiscalId: null }))
      setFiscalVerification({ status: "idle" })
      setShowFiscalCard(false)
    }
  }, [formData.fiscalId])

  // Validación en tiempo real del email y verificación de empresa
  useEffect(() => {
    if (formData.email.trim()) {
      const emailValidation = validateBusinessEmail(formData.email)
      setValidation((prev) => ({ ...prev, email: emailValidation }))

      // Verificar empresa si el email es válido
      if (emailValidation.isValid && emailValidation.isBusinessEmail) {
        handleCompanyVerification(emailValidation.domain)
      } else {
        setCompanyVerification({ status: "idle" })
        setShowCompanyCard(false)
        setShowFiscalField(false)
      }

      // Verificar si hay sugerencia de corrección
      if (!emailValidation.isValid) {
        const suggestion = suggestEmailCorrection(formData.email)
        setEmailSuggestion(suggestion)
      } else {
        setEmailSuggestion(null)
      }
    } else {
      setValidation((prev) => ({ ...prev, email: null }))
      setCompanyVerification({ status: "idle" })
      setEmailSuggestion(null)
      setShowCompanyCard(false)
      setShowFiscalField(false)
    }
  }, [formData.email])

  // Verificación cruzada cuando ambos están disponibles
  useEffect(() => {
    if (
      companyVerification.status === "verified" &&
      fiscalVerification.status === "verified" &&
      companyVerification.company &&
      fiscalVerification.result
    ) {
      const crossVerification = crossVerifyFiscalAndDomain(
        fiscalVerification.result,
        companyVerification.company.domain,
      )
      setFiscalVerification((prev) => ({ ...prev, crossVerification }))
    }
  }, [companyVerification.status, fiscalVerification.status])

  const handleCompanyVerification = async (domain: string) => {
    // Verificar si el dominio parece sospechoso
    if (isDomainSuspicious(domain)) {
      setCompanyVerification({
        status: "suspicious",
        error: "Este dominio parece sospechoso",
        suggestions: ["Verifica que sea el dominio oficial de tu empresa"],
      })
      return
    }

    setCompanyVerification({ status: "verifying" })

    try {
      const result: VerificationResult = await verifyCompany(domain)

      if (result.success && result.company) {
        setCompanyVerification({
          status: "verified",
          company: result.company,
        })
        setShowCompanyCard(true)
        // Mostrar campo fiscal si la empresa no está completamente verificada
        if (result.company.confidence < 90) {
          setShowFiscalField(true)
        }
      } else {
        setCompanyVerification({
          status: "failed",
          error: result.error,
          suggestions: result.suggestions || getSimilarDomains(domain),
        })
        // Mostrar campo fiscal para verificación adicional
        setShowFiscalField(true)
      }
    } catch (error) {
      setCompanyVerification({
        status: "failed",
        error: "Error al verificar la empresa",
      })
      setShowFiscalField(true)
    }
  }

  const handleFiscalVerification = async (fiscalId: string) => {
    setFiscalVerification({ status: "verifying" })

    try {
      const result = await verifyFiscalId(fiscalId)

      if (result.success) {
        setFiscalVerification({
          status: "verified",
          result,
        })
        setShowFiscalCard(true)
      } else {
        setFiscalVerification({
          status: "failed",
          result,
        })
      }
    } catch (error) {
      setFiscalVerification({
        status: "failed",
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validar nombre con validación avanzada
    const nameValidation = validateFullName(formData.name)
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error
    }

    // Validar email con validación empresarial
    const emailValidation = validateBusinessEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error
    }

    // Validar CIF/NIF si se ha introducido
    if (formData.fiscalId.trim()) {
      const fiscalValidation = validateFiscalId(formData.fiscalId)
      if (!fiscalValidation.isValid) {
        newErrors.fiscalId = fiscalValidation.error
      }
    }

    // Validar selección de tester
    if (!formData.isTester) {
      newErrors.isTester = "Por favor, selecciona una opción"
    }

    // Validar intereses (al menos uno)
    if (formData.interests.length === 0) {
      newErrors.interests = "Selecciona al menos un área de interés"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setStatus("error")
      setMessage("Por favor, corrige los errores en el formulario")
      return
    }

    setStatus("submitting")
    setMessage("")

    // Simular envío del formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStatus("success")
      const companyName = fiscalVerification.result?.companyName || companyVerification.company?.name || "tu empresa"
      setMessage(`¡Registro completado exitosamente para ${companyName}! Te contactaremos pronto.`)

      // Limpiar formulario después del éxito
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          fiscalId: "",
          isTester: "",
          interests: [],
        })
        setValidation({ name: null, email: null, fiscalId: null })
        setCompanyVerification({ status: "idle" })
        setFiscalVerification({ status: "idle" })
        setShowCompanyCard(false)
        setShowFiscalCard(false)
        setShowFiscalField(false)
        setStatus("idle")
        setMessage("")
      }, 4000)
    } catch (error) {
      setStatus("error")
      setMessage("Ha ocurrido un error. Por favor, inténtalo de nuevo.")
    }
  }

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interestId] : prev.interests.filter((id) => id !== interestId),
    }))

    // Limpiar error de intereses si se selecciona al menos uno
    if (checked && errors.interests) {
      setErrors((prev) => ({ ...prev, interests: undefined }))
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpiar errores cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const applySuggestedEmail = () => {
    if (emailSuggestion) {
      setFormData((prev) => ({ ...prev, email: emailSuggestion }))
      setEmailSuggestion(null)
    }
  }

  const getFieldValidationIcon = (field: "name" | "email" | "fiscalId") => {
    const validationResult = validation[field]
    if (!validationResult) return null

    if (validationResult.isValid) {
      return <Check className="w-4 h-4 text-green-400" />
    } else {
      return <AlertCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getFieldValidationColor = (field: "name" | "email" | "fiscalId") => {
    const validationResult = validation[field]
    if (!validationResult) return ""

    if (validationResult.isValid) {
      return "border-green-500"
    } else {
      return "border-red-500"
    }
  }

  const getCompanyVerificationIcon = () => {
    switch (companyVerification.status) {
      case "verifying":
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
      case "verified":
        return <Building2 className="w-4 h-4 text-green-400" />
      case "failed":
      case "suspicious":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default:
        return null
    }
  }

  const getFiscalVerificationIcon = () => {
    switch (fiscalVerification.status) {
      case "verifying":
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
      case "verified":
        return <FileText className="w-4 h-4 text-green-400" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Únete a TributariApp</CardTitle>
          <CardDescription className="text-gray-400 text-base">
            Regístrate para acceder a la próxima generación de automatización fiscal
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nombre con validación avanzada */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre completo
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Introduce tu nombre y apellido"
                  className={`h-12 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500
                    transition-all duration-200 ease-in-out pr-10
                    ${focusedField === "name" ? "border-blue-500 ring-2 ring-blue-500/20" : ""}
                    ${errors.name ? "border-red-500" : getFieldValidationColor("name")}
                    hover:border-gray-500 focus-visible:outline-none`}
                  disabled={status === "submitting"}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">{getFieldValidationIcon("name")}</div>
                {focusedField === "name" && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                )}
              </div>

              {/* Mensajes de validación del nombre */}
              {errors.name && (
                <p className="text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-left-2">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}

              {validation.name?.suggestion && !errors.name && (
                <p className="text-sm text-blue-400 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {validation.name.suggestion}
                </p>
              )}

              {validation.name?.isValid && validation.name.hasFullName && (
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Nombre completo verificado
                </p>
              )}
            </div>

            {/* Campo Email con validación empresarial y verificación de empresa */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Correo electrónico empresarial
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="tu@empresa.com"
                  className={`h-12 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500
                    transition-all duration-200 ease-in-out pr-10
                    ${focusedField === "email" ? "border-blue-500 ring-2 ring-blue-500/20" : ""}
                    ${errors.email ? "border-red-500" : getFieldValidationColor("email")}
                    hover:border-gray-500 focus-visible:outline-none`}
                  disabled={status === "submitting"}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getCompanyVerificationIcon() || getFieldValidationIcon("email")}
                </div>
                {focusedField === "email" && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                )}
              </div>

              {/* Estado de verificación de empresa */}
              {companyVerification.status === "verifying" && (
                <p className="text-sm text-blue-400 flex items-center gap-1">
                  <Search className="w-3 h-3" />
                  Verificando empresa...
                </p>
              )}

              {companyVerification.status === "verified" && companyVerification.company && (
                <div className="space-y-2">
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Empresa verificada: {companyVerification.company.name}
                  </p>
                  {!showCompanyCard && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCompanyCard(true)}
                      className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Ver detalles de la empresa
                    </Button>
                  )}
                </div>
              )}

              {(companyVerification.status === "failed" || companyVerification.status === "suspicious") && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-yellow-400 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {companyVerification.error}
                  </p>
                  {companyVerification.suggestions && (
                    <div className="space-y-1">
                      <p className="text-xs text-yellow-300">Sugerencias:</p>
                      <ul className="text-xs text-yellow-300/80 space-y-1">
                        {companyVerification.suggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Sugerencia de corrección de email */}
              {emailSuggestion && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-400 mb-2">¿Quisiste decir?</p>
                  <button
                    type="button"
                    onClick={applySuggestedEmail}
                    className="text-sm text-blue-300 hover:text-blue-200 underline"
                  >
                    {emailSuggestion}
                  </button>
                </div>
              )}

              {/* Mensajes de validación del email */}
              {errors.email && (
                <p className="text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-left-2">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}

              {validation.email?.suggestion && !errors.email && (
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {validation.email.suggestion}
                </p>
              )}

              {validation.email?.isBusinessEmail && companyVerification.status !== "verified" && (
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Email empresarial verificado
                </p>
              )}
            </div>

            {/* Campo CIF/NIF (condicional) */}
            {showFiscalField && (
              <div className="space-y-2 animate-in slide-in-from-top-4">
                <Label htmlFor="fiscalId" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  CIF/NIF de la empresa (opcional)
                  <button
                    type="button"
                    className="ml-1 text-gray-400 hover:text-gray-300"
                    title="El CIF es para empresas, el NIF para autónomos. Ayuda a verificar tu empresa."
                  >
                    <HelpCircle className="w-3 h-3" />
                  </button>
                </Label>
                <div className="relative">
                  <Input
                    id="fiscalId"
                    type="text"
                    value={formData.fiscalId}
                    onChange={(e) => handleInputChange("fiscalId", e.target.value.toUpperCase())}
                    onFocus={() => setFocusedField("fiscalId")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="A12345674 o 12345678Z"
                    className={`h-12 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500
                      transition-all duration-200 ease-in-out pr-10 font-mono
                      ${focusedField === "fiscalId" ? "border-blue-500 ring-2 ring-blue-500/20" : ""}
                      ${errors.fiscalId ? "border-red-500" : getFieldValidationColor("fiscalId")}
                      hover:border-gray-500 focus-visible:outline-none`}
                    disabled={status === "submitting"}
                    maxLength={9}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getFiscalVerificationIcon() || getFieldValidationIcon("fiscalId")}
                  </div>
                  {focusedField === "fiscalId" && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                  )}
                </div>

                {/* Información sobre CIF/NIF */}
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <p className="text-xs text-blue-400 mb-1">
                    <Info className="w-3 h-3 inline mr-1" />
                    Información sobre identificación fiscal:
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>
                      • <strong>CIF:</strong> Para empresas (ej: A12345674)
                    </li>
                    <li>
                      • <strong>NIF:</strong> Para autónomos (ej: 12345678Z)
                    </li>
                    <li>
                      • <strong>NIE:</strong> Para extranjeros (ej: X1234567L)
                    </li>
                  </ul>
                </div>

                {/* Estado de verificación fiscal */}
                {fiscalVerification.status === "verifying" && (
                  <p className="text-sm text-blue-400 flex items-center gap-1">
                    <Search className="w-3 h-3" />
                    Verificando con registros oficiales...
                  </p>
                )}

                {fiscalVerification.status === "verified" && fiscalVerification.result && (
                  <div className="space-y-2">
                    <p className="text-sm text-green-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {fiscalVerification.result.type} verificado: {fiscalVerification.result.companyName}
                    </p>
                    {!showFiscalCard && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFiscalCard(true)}
                        className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Ver detalles fiscales
                      </Button>
                    )}
                  </div>
                )}

                {fiscalVerification.status === "failed" && fiscalVerification.result?.error && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {fiscalVerification.result.error}
                  </p>
                )}

                {/* Mensajes de validación del CIF/NIF */}
                {errors.fiscalId && (
                  <p className="text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-left-2">
                    <AlertTriangle className="w-3 h-3" />
                    {errors.fiscalId}
                  </p>
                )}

                {validation.fiscalId?.isValid && !errors.fiscalId && (
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {validation.fiscalId.type} válido: {formatFiscalId(validation.fiscalId.formatted)}
                  </p>
                )}
              </div>
            )}

            {/* Tarjeta de información de la empresa */}
            {showCompanyCard && companyVerification.company && (
              <div className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCompanyCard(false)}
                  className="absolute top-2 right-2 z-10 h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
                <CompanyVerificationCard company={companyVerification.company} />
              </div>
            )}

            {/* Tarjeta de verificación fiscal */}
            {showFiscalCard && fiscalVerification.result && (
              <div className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFiscalCard(false)}
                  className="absolute top-2 right-2 z-10 h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
                <FiscalVerificationCard
                  result={fiscalVerification.result}
                  crossVerification={fiscalVerification.crossVerification}
                />
              </div>
            )}

            {/* Radio Buttons - Tester */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <TestTube className="w-4 h-4" />
                ¿Quieres participar como tester?
              </Label>
              <RadioGroup
                value={formData.isTester}
                onValueChange={(value) => handleInputChange("isTester", value)}
                className="flex gap-6"
                disabled={status === "submitting"}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="yes"
                    id="tester-yes"
                    className="border-gray-600 text-blue-400 focus-visible:ring-blue-500"
                  />
                  <Label
                    htmlFor="tester-yes"
                    className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
                  >
                    Sí, me interesa
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="no"
                    id="tester-no"
                    className="border-gray-600 text-blue-400 focus-visible:ring-blue-500"
                  />
                  <Label
                    htmlFor="tester-no"
                    className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
                  >
                    No, por ahora
                  </Label>
                </div>
              </RadioGroup>
              {errors.isTester && (
                <p className="text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-left-2">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.isTester}
                </p>
              )}
            </div>

            {/* Checkboxes - Áreas de Interés */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Áreas de interés (selecciona todas las que apliquen)
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200
                      ${
                        formData.interests.includes(option.id)
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50"
                      }`}
                  >
                    <Checkbox
                      id={option.id}
                      checked={formData.interests.includes(option.id)}
                      onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      disabled={status === "submitting"}
                    />
                    <Label
                      htmlFor={option.id}
                      className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="text-lg">{option.icon}</span>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.interests && (
                <p className="text-sm text-red-400 flex items-center gap-1 animate-in slide-in-from-left-2">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.interests}
                </p>
              )}
            </div>

            {/* Botón de Envío */}
            <Button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base
                        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registrando...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  ¡Registrado!
                </>
              ) : (
                "Completar Registro"
              )}
            </Button>

            {/* Mensaje de Estado */}
            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-3 animate-in slide-in-from-bottom-2 ${
                  status === "success"
                    ? "bg-green-500/10 border border-green-500/20 text-green-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{message}</p>
              </div>
            )}
          </form>

          {/* Información adicional */}
          <div className="pt-6 border-t border-gray-700">
            <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-400 font-medium mb-1">Verificación Empresarial Completa</p>
                <p className="text-xs text-gray-400">
                  Verificamos tu empresa mediante dominio de email y, opcionalmente, con tu CIF/NIF en registros
                  oficiales españoles (AEAT, Registro Mercantil Central) para garantizar máxima seguridad.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Al registrarte, aceptas nuestros términos de servicio y política de privacidad.
              <br />
              Tus datos están protegidos y nunca serán compartidos con terceros.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
