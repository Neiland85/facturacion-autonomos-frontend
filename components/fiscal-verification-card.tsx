"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, FileText, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import type { FiscalVerificationResult } from "@/utils/fiscal-validation"

interface FiscalVerificationCardProps {
  result: FiscalVerificationResult
  crossVerification?: {
    matches: boolean
    confidence: number
    reason?: string
  }
}

export function FiscalVerificationCard({ result, crossVerification }: FiscalVerificationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "inactive":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      case "suspended":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "inactive":
        return "Inactiva"
      case "suspended":
        return "Suspendida"
      default:
        return "Desconocido"
    }
  }

  const getCrossVerificationIcon = () => {
    if (!crossVerification) return null

    if (crossVerification.matches && crossVerification.confidence > 70) {
      return <CheckCircle className="w-4 h-4 text-green-400" />
    } else if (crossVerification.confidence > 30) {
      return <AlertTriangle className="w-4 h-4 text-yellow-400" />
    } else {
      return <AlertTriangle className="w-4 h-4 text-red-400" />
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-600 animate-in slide-in-from-bottom-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{result.companyName || "Empresa Verificada"}</h3>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <span className="font-mono">{result.fiscalId}</span>
                <Badge variant="outline" className="ml-2 text-xs border-gray-600 text-gray-400">
                  {result.type}
                </Badge>
              </p>
            </div>
          </div>
          <Badge className={`${getStatusColor(result.status)} border`}>
            <Shield className="w-3 h-3 mr-1" />
            {getStatusText(result.status)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {result.activity && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span>{result.activity}</span>
            </div>
          )}
          {result.registrationDate && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Registrada: {new Date(result.registrationDate).toLocaleDateString("es-ES")}</span>
            </div>
          )}
          {result.address && (
            <div className="flex items-center gap-2 text-sm text-gray-300 sm:col-span-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{result.address}</span>
            </div>
          )}
        </div>

        {/* Verificación cruzada */}
        {crossVerification && (
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-start gap-3">
              {getCrossVerificationIcon()}
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">Verificación cruzada con dominio</p>
                <p className="text-xs text-gray-400">{crossVerification.reason}</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          crossVerification.confidence > 70
                            ? "bg-green-500"
                            : crossVerification.confidence > 30
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${crossVerification.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 min-w-fit">{crossVerification.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-700 pt-4 mt-4">
          <p className="text-xs text-gray-500">
            Información verificada con registros oficiales españoles (AEAT, Registro Mercantil Central)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
