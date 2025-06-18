// Simulación de APIs de verificación empresarial
// En producción, integrarías con servicios reales como Clearbit, Hunter.io, etc.

export interface CompanyInfo {
  name: string
  domain: string
  industry: string
  size: string
  location: string
  founded?: number
  description?: string
  logo?: string
  verified: boolean
  confidence: number // 0-100
  sources: string[]
}

export interface VerificationResult {
  success: boolean
  company?: CompanyInfo
  error?: string
  suggestions?: string[]
}

// Base de datos simulada de empresas españolas verificadas
const VERIFIED_SPANISH_COMPANIES: Record<string, CompanyInfo> = {
  "telefonica.com": {
    name: "Telefónica S.A.",
    domain: "telefonica.com",
    industry: "Telecomunicaciones",
    size: "Grande (>10,000 empleados)",
    location: "Madrid, España",
    founded: 1924,
    description: "Multinacional española de telecomunicaciones",
    verified: true,
    confidence: 100,
    sources: ["Registro Mercantil", "CNMV", "Base de datos oficial"],
  },
  "bbva.com": {
    name: "Banco Bilbao Vizcaya Argentaria",
    domain: "bbva.com",
    industry: "Servicios Financieros",
    size: "Grande (>10,000 empleados)",
    location: "Bilbao, España",
    founded: 1857,
    description: "Grupo financiero multinacional español",
    verified: true,
    confidence: 100,
    sources: ["Banco de España", "CNMV", "Registro Mercantil"],
  },
  "santander.com": {
    name: "Banco Santander S.A.",
    domain: "santander.com",
    industry: "Servicios Financieros",
    size: "Grande (>10,000 empleados)",
    location: "Santander, España",
    founded: 1857,
    description: "Banco multinacional español",
    verified: true,
    confidence: 100,
    sources: ["Banco de España", "CNMV"],
  },
  "iberdrola.com": {
    name: "Iberdrola S.A.",
    domain: "iberdrola.com",
    industry: "Energía",
    size: "Grande (>10,000 empleados)",
    location: "Bilbao, España",
    founded: 1901,
    description: "Empresa eléctrica multinacional española",
    verified: true,
    confidence: 100,
    sources: ["CNMV", "Registro Mercantil"],
  },
  "repsol.com": {
    name: "Repsol S.A.",
    domain: "repsol.com",
    industry: "Petróleo y Gas",
    size: "Grande (>10,000 empleados)",
    location: "Madrid, España",
    founded: 1987,
    description: "Compañía energética multinacional española",
    verified: true,
    confidence: 100,
    sources: ["CNMV", "Registro Mercantil"],
  },
}

// Simulación de verificación con APIs externas
async function verifyWithExternalAPI(domain: string): Promise<CompanyInfo | null> {
  // Simular llamada a API externa (Clearbit, Hunter.io, etc.)
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

  // Generar datos simulados para dominios no conocidos
  const companyName = domain
    .split(".")[0]
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const industries = ["Tecnología", "Consultoría", "Servicios", "Comercio", "Manufactura", "Educación"]
  const sizes = ["Pequeña (1-50 empleados)", "Mediana (51-250 empleados)", "Grande (251-1000 empleados)"]
  const locations = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Zaragoza"]

  // 70% de probabilidad de encontrar la empresa
  if (Math.random() > 0.3) {
    return {
      name: `${companyName} S.L.`,
      domain,
      industry: industries[Math.floor(Math.random() * industries.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      location: `${locations[Math.floor(Math.random() * locations.length)]}, España`,
      founded: 1990 + Math.floor(Math.random() * 30),
      description: `Empresa española especializada en ${industries[Math.floor(Math.random() * industries.length)].toLowerCase()}`,
      verified: true,
      confidence: 60 + Math.floor(Math.random() * 30), // 60-90% confidence
      sources: ["Base de datos externa", "Registro público"],
    }
  }

  return null
}

// Verificación con registros españoles simulados
async function verifyWithSpanishRegistry(domain: string): Promise<CompanyInfo | null> {
  // Simular consulta a registros mercantiles españoles
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Verificar si el dominio tiene formato español típico
  const spanishDomainPatterns = [".es", "spain", "espana", "madrid", "barcelona", "valencia"]
  const isSpanishDomain = spanishDomainPatterns.some((pattern) => domain.includes(pattern))

  if (isSpanishDomain && Math.random() > 0.4) {
    const companyName = domain
      .split(".")[0]
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return {
      name: `${companyName} S.L.`,
      domain,
      industry: "Servicios Empresariales",
      size: "Mediana (51-250 empleados)",
      location: "España",
      description: "Empresa registrada en España",
      verified: true,
      confidence: 85,
      sources: ["Registro Mercantil Central", "AEAT"],
    }
  }

  return null
}

export async function verifyCompany(domain: string): Promise<VerificationResult> {
  try {
    // 1. Verificar en base de datos de empresas conocidas
    if (VERIFIED_SPANISH_COMPANIES[domain]) {
      return {
        success: true,
        company: VERIFIED_SPANISH_COMPANIES[domain],
      }
    }

    // 2. Verificar con registros españoles
    const spanishResult = await verifyWithSpanishRegistry(domain)
    if (spanishResult) {
      return {
        success: true,
        company: spanishResult,
      }
    }

    // 3. Verificar con APIs externas
    const externalResult = await verifyWithExternalAPI(domain)
    if (externalResult) {
      return {
        success: true,
        company: externalResult,
      }
    }

    // 4. No se encontró la empresa
    return {
      success: false,
      error: "No pudimos verificar esta empresa en nuestras bases de datos",
      suggestions: [
        "Verifica que el dominio sea correcto",
        "Asegúrate de usar el dominio principal de tu empresa",
        "Contacta con soporte si tu empresa es nueva o muy pequeña",
      ],
    }
  } catch (error) {
    return {
      success: false,
      error: "Error al verificar la empresa. Inténtalo de nuevo.",
    }
  }
}

// Función para obtener sugerencias de dominios similares
export function getSimilarDomains(domain: string): string[] {
  const baseDomain = domain.split(".")[0]
  const suggestions = [
    `${baseDomain}.es`,
    `${baseDomain}.com`,
    `${baseDomain}-spain.com`,
    `${baseDomain}group.com`,
    `www.${domain}`,
  ]

  return suggestions.filter((suggestion) => suggestion !== domain).slice(0, 3)
}

// Función para verificar si un dominio parece legítimo
export function isDomainSuspicious(domain: string): boolean {
  const suspiciousPatterns = [
    /^\d+/, // Empieza con números
    /temp|test|fake|demo|example/, // Palabras sospechosas
    /(.)\1{3,}/, // Caracteres repetidos
    /^[a-z]{1,3}\./, // Dominios muy cortos
    /\.(tk|ml|ga|cf)$/, // TLDs gratuitos sospechosos
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(domain.toLowerCase()))
}
