// Validación de CIF y NIF españoles

export interface FiscalValidationResult {
  isValid: boolean
  type: "CIF" | "NIF" | "NIE" | "unknown"
  formatted: string
  error?: string
}

export interface FiscalVerificationResult {
  success: boolean
  companyName?: string
  fiscalId: string
  type: "CIF" | "NIF" | "NIE"
  status: "active" | "inactive" | "suspended"
  registrationDate?: string
  address?: string
  activity?: string
  error?: string
}

// Letras de control para CIF
const CIF_LETTERS = "JABCDEFGHI"
const CIF_CONTROL_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE"

// Letras válidas para el inicio de CIF
const VALID_CIF_LETTERS = "ABCDEFGHJNPQRSUVW"

// Letras de control para NIF
const NIF_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE"

// Letras de control para NIE
const NIE_LETTERS = "XYZ"

/**
 * Valida el formato y dígito de control de un CIF español
 */
function validateCIF(cif: string): boolean {
  if (cif.length !== 9) return false

  const letter = cif.charAt(0).toUpperCase()
  const numbers = cif.substring(1, 8)
  const control = cif.charAt(8).toUpperCase()

  // Verificar que la primera letra sea válida para CIF
  if (!VALID_CIF_LETTERS.includes(letter)) return false

  // Verificar que los números sean válidos
  if (!/^\d{7}$/.test(numbers)) return false

  // Calcular dígito de control
  let sum = 0
  for (let i = 0; i < 7; i++) {
    const digit = Number.parseInt(numbers.charAt(i))
    if (i % 2 === 0) {
      // Posiciones pares (0, 2, 4, 6): multiplicar por 2
      const doubled = digit * 2
      sum += doubled > 9 ? doubled - 9 : doubled
    } else {
      // Posiciones impares (1, 3, 5): sumar directamente
      sum += digit
    }
  }

  const controlDigit = (10 - (sum % 10)) % 10

  // Algunas organizaciones usan letra, otras número
  const expectedLetter = CIF_LETTERS.charAt(controlDigit)
  const expectedNumber = controlDigit.toString()

  return control === expectedLetter || control === expectedNumber
}

/**
 * Valida el formato y letra de control de un NIF español
 */
function validateNIF(nif: string): boolean {
  if (nif.length !== 9) return false

  const numbers = nif.substring(0, 8)
  const letter = nif.charAt(8).toUpperCase()

  // Verificar que sean 8 números
  if (!/^\d{8}$/.test(numbers)) return false

  // Calcular letra de control
  const remainder = Number.parseInt(numbers) % 23
  const expectedLetter = NIF_LETTERS.charAt(remainder)

  return letter === expectedLetter
}

/**
 * Valida el formato y letra de control de un NIE español
 */
function validateNIE(nie: string): boolean {
  if (nie.length !== 9) return false

  const firstLetter = nie.charAt(0).toUpperCase()
  const numbers = nie.substring(1, 8)
  const controlLetter = nie.charAt(8).toUpperCase()

  // Verificar que la primera letra sea X, Y o Z
  if (!NIE_LETTERS.includes(firstLetter)) return false

  // Verificar que sean 7 números
  if (!/^\d{7}$/.test(numbers)) return false

  // Convertir primera letra a número para el cálculo
  const letterToNumber: Record<string, string> = { X: "0", Y: "1", Z: "2" }
  const fullNumber = letterToNumber[firstLetter] + numbers

  // Calcular letra de control
  const remainder = Number.parseInt(fullNumber) % 23
  const expectedLetter = NIF_LETTERS.charAt(remainder)

  return controlLetter === expectedLetter
}

/**
 * Valida un número de identificación fiscal español (CIF, NIF o NIE)
 */
export function validateFiscalId(fiscalId: string): FiscalValidationResult {
  // Limpiar y normalizar
  const cleaned = fiscalId.replace(/[\s-]/g, "").toUpperCase()

  if (cleaned.length === 0) {
    return {
      isValid: false,
      type: "unknown",
      formatted: "",
      error: "El número de identificación fiscal no puede estar vacío",
    }
  }

  if (cleaned.length !== 9) {
    return {
      isValid: false,
      type: "unknown",
      formatted: cleaned,
      error: "El número debe tener exactamente 9 caracteres",
    }
  }

  // Determinar tipo y validar
  const firstChar = cleaned.charAt(0)

  if (VALID_CIF_LETTERS.includes(firstChar)) {
    // Es un CIF
    const isValid = validateCIF(cleaned)
    return {
      isValid,
      type: "CIF",
      formatted: cleaned,
      error: isValid ? undefined : "El CIF no es válido (dígito de control incorrecto)",
    }
  } else if (NIE_LETTERS.includes(firstChar)) {
    // Es un NIE
    const isValid = validateNIE(cleaned)
    return {
      isValid,
      type: "NIE",
      formatted: cleaned,
      error: isValid ? undefined : "El NIE no es válido (letra de control incorrecta)",
    }
  } else if (/^\d/.test(firstChar)) {
    // Es un NIF
    const isValid = validateNIF(cleaned)
    return {
      isValid,
      type: "NIF",
      formatted: cleaned,
      error: isValid ? undefined : "El NIF no es válido (letra de control incorrecta)",
    }
  } else {
    return {
      isValid: false,
      type: "unknown",
      formatted: cleaned,
      error: "Formato no reconocido. Debe ser CIF, NIF o NIE",
    }
  }
}

/**
 * Formatea un número fiscal para mostrar
 */
export function formatFiscalId(fiscalId: string): string {
  const cleaned = fiscalId.replace(/[\s-]/g, "").toUpperCase()
  if (cleaned.length === 9) {
    // Formato: XX.XXX.XXX-X
    return `${cleaned.substring(0, 2)}.${cleaned.substring(2, 5)}.${cleaned.substring(5, 8)}-${cleaned.charAt(8)}`
  }
  return cleaned
}

/**
 * Simula la verificación con registros oficiales españoles
 */
export async function verifyFiscalId(fiscalId: string): Promise<FiscalVerificationResult> {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

  const validation = validateFiscalId(fiscalId)

  if (!validation.isValid) {
    return {
      success: false,
      fiscalId: validation.formatted,
      type: validation.type as any,
      status: "inactive",
      error: validation.error,
    }
  }

  // Base de datos simulada de empresas españolas
  const knownCompanies: Record<string, Omit<FiscalVerificationResult, "success" | "fiscalId">> = {
    A28007621: {
      companyName: "Telefónica S.A.",
      type: "CIF",
      status: "active",
      registrationDate: "1924-04-19",
      address: "Gran Vía, 28, 28013 Madrid",
      activity: "Telecomunicaciones",
    },
    A48265169: {
      companyName: "Banco Bilbao Vizcaya Argentaria S.A.",
      type: "CIF",
      status: "active",
      registrationDate: "1857-05-28",
      address: "Plaza San Nicolás, 4, 48005 Bilbao",
      activity: "Actividades financieras",
    },
    A39000013: {
      companyName: "Banco Santander S.A.",
      type: "CIF",
      status: "active",
      registrationDate: "1857-05-15",
      address: "Paseo de Pereda, 9-12, 39004 Santander",
      activity: "Actividades financieras",
    },
  }

  // Verificar si existe en la base de datos
  if (knownCompanies[validation.formatted]) {
    return {
      success: true,
      fiscalId: validation.formatted,
      ...knownCompanies[validation.formatted],
    }
  }

  // Simular verificación con probabilidad de éxito
  const successRate = validation.type === "CIF" ? 0.8 : 0.6

  if (Math.random() < successRate) {
    // Generar datos simulados
    const companyTypes = ["S.L.", "S.A.", "S.L.U.", "S.C.", "C.B."]
    const activities = [
      "Servicios empresariales",
      "Comercio al por menor",
      "Construcción",
      "Hostelería",
      "Transporte",
      "Tecnología",
      "Consultoría",
    ]
    const provinces = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Zaragoza", "Málaga"]

    const companyType = companyTypes[Math.floor(Math.random() * companyTypes.length)]
    const baseName = `Empresa ${Math.floor(Math.random() * 1000)}`

    return {
      success: true,
      fiscalId: validation.formatted,
      type: validation.type as any,
      companyName: `${baseName} ${companyType}`,
      status: "active",
      registrationDate: `${1990 + Math.floor(Math.random() * 30)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      address: `Calle Ejemplo, ${Math.floor(Math.random() * 200) + 1}, ${provinces[Math.floor(Math.random() * provinces.length)]}`,
      activity: activities[Math.floor(Math.random() * activities.length)],
    }
  } else {
    return {
      success: false,
      fiscalId: validation.formatted,
      type: validation.type as any,
      status: "inactive",
      error: "No se encontró información en los registros oficiales",
    }
  }
}

/**
 * Verifica si un CIF/NIF coincide con el dominio de email
 */
export function crossVerifyFiscalAndDomain(
  fiscalResult: FiscalVerificationResult,
  domain: string,
): {
  matches: boolean
  confidence: number
  reason?: string
} {
  if (!fiscalResult.success || !fiscalResult.companyName) {
    return { matches: false, confidence: 0, reason: "No se pudo verificar el CIF/NIF" }
  }

  const companyName = fiscalResult.companyName.toLowerCase()
  const domainParts = domain.toLowerCase().split(".")

  // Buscar coincidencias en el nombre de la empresa
  for (const part of domainParts) {
    if (part.length > 3 && companyName.includes(part)) {
      return { matches: true, confidence: 85, reason: "Nombre de empresa coincide con dominio" }
    }
  }

  // Verificar si es una empresa conocida con dominio diferente
  const knownMismatches = [
    { company: "telefónica", domains: ["telefonica", "movistar"] },
    { company: "banco santander", domains: ["santander"] },
    { company: "banco bilbao vizcaya", domains: ["bbva"] },
  ]

  for (const mismatch of knownMismatches) {
    if (companyName.includes(mismatch.company)) {
      for (const knownDomain of mismatch.domains) {
        if (domain.includes(knownDomain)) {
          return { matches: true, confidence: 95, reason: "Empresa verificada con dominio conocido" }
        }
      }
    }
  }

  return { matches: false, confidence: 30, reason: "No se encontró relación clara entre CIF y dominio" }
}
