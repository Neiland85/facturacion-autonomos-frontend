"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Calendar, Shield, ExternalLink, AlertTriangle } from "lucide-react"
import type { CompanyInfo } from "@/services/company-verification"

interface CompanyVerificationCardProps {
  company: CompanyInfo
  onClose?: () => void
}

export function CompanyVerificationCard({ company, onClose }: CompanyVerificationCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400 bg-green-400/10 border-green-400/20"
    if (confidence >= 70) return "text-blue-400 bg-blue-400/10 border-blue-400/20"
    if (confidence >= 50) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    return "text-red-400 bg-red-400/10 border-red-400/20"
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 90) return "Verificación Alta"
    if (confidence >= 70) return "Verificación Media"
    if (confidence >= 50) return "Verificación Básica"
    return "Verificación Baja"
  }

  return (
    <Card className="bg-gray-800/50 border-gray-600 animate-in slide-in-from-bottom-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{company.name}</h3>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {company.domain}
              </p>
            </div>
          </div>
          <Badge className={`${getConfidenceColor(company.confidence)} border`}>
            <Shield className="w-3 h-3 mr-1" />
            {getConfidenceText(company.confidence)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span>{company.industry}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{company.size}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{company.location}</span>
          </div>
          {company.founded && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Fundada en {company.founded}</span>
            </div>
          )}
        </div>

        {company.description && (
          <p className="text-sm text-gray-400 mb-4 p-3 bg-gray-700/30 rounded-lg">{company.description}</p>
        )}

        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-500 mb-2">Fuentes de verificación:</p>
          <div className="flex flex-wrap gap-2">
            {company.sources.map((source, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                {source}
              </Badge>
            ))}
          </div>
        </div>

        {company.confidence < 70 && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-400 font-medium">Verificación parcial</p>
              <p className="text-xs text-yellow-300/80">
                Algunos datos pueden requerir verificación adicional. Nuestro equipo revisará tu registro.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
