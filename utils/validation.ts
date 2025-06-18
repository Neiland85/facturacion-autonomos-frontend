// Dominios de email gratuitos que no son empresariales
const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "yahoo.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "protonmail.com",
  "tutanota.com",
  "yandex.com",
  "mail.ru",
  "gmx.com",
  "web.de",
  "orange.fr",
  // Dominios españoles gratuitos
  "terra.es",
  "ya.com",
  "latinmail.com",
  "correo.es",
  "hispavista.com",
]

// Dominios empresariales comunes españoles
const SPANISH_BUSINESS_DOMAINS = [
  "telefonica.com",
  "bbva.com",
  "santander.com",
  "iberdrola.com",
  "repsol.com",
  "endesa.com",
  "mapfre.com",
  "ferrovial.com",
  "indra.es",
  "acciona.com",
  "acs.es",
  "sacyr.com",
]

// Palabras que no deberían aparecer en nombres reales
const INVALID_NAME_WORDS = [
  "test",
  "prueba",
  "admin",
  "administrador",
  "usuario",
  "user",
  "demo",
  "ejemplo",
  "sample",
  "fake",
  "falso",
  "temporal",
  "temp",
  "asdf",
  "qwerty",
  "abc",
  "xyz",
  "null",
  "undefined",
]

export interface EmailValidationResult {
  isValid: boolean
  isBusinessEmail: boolean
  domain: string
  suggestion?: string
  error?: string
}

export interface NameValidationResult {
  isValid: boolean
  hasFullName: boolean
  error?: string
  suggestion?: string
}

export function validateBusinessEmail(email: string): EmailValidationResult {
  const emailLower = email.toLowerCase().trim()

  // Validación básica de formato
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailLower)) {
    return {
      isValid: false,
      isBusinessEmail: false,
      domain: "",
      error: "Formato de email inválido",
    }
  }

  const domain = emailLower.split("@")[1]

  // Verificar si es un dominio gratuito
  if (FREE_EMAIL_DOMAINS.includes(domain)) {
    return {
      isValid: false,
      isBusinessEmail: false,
      domain,
      error: "Por favor, utiliza tu email empresarial",
      suggestion: "Usa tu dirección de correo corporativo para acceder a funciones empresariales",
    }
  }

  // Verificar dominios sospechosos (muy cortos o con patrones extraños)
  if (domain.length < 4 || !domain.includes(".")) {
    return {
      isValid: false,
      isBusinessEmail: false,
      domain,
      error: "El dominio del email parece inválido",
    }
  }

  // Verificar si es un dominio empresarial conocido
  const isKnownBusiness = SPANISH_BUSINESS_DOMAINS.includes(domain)

  return {
    isValid: true,
    isBusinessEmail: true,
    domain,
    suggestion: isKnownBusiness ? "Dominio empresarial verificado" : undefined,
  }
}

export function validateFullName(name: string): NameValidationResult {
  const nameTrimmed = name.trim()
  const nameLower = nameTrimmed.toLowerCase()

  // Verificar longitud mínima
  if (nameTrimmed.length < 2) {
    return {
      isValid: false,
      hasFullName: false,
      error: "El nombre es demasiado corto",
    }
  }

  // Verificar longitud máxima
  if (nameTrimmed.length > 100) {
    return {
      isValid: false,
      hasFullName: false,
      error: "El nombre es demasiado largo",
    }
  }

  // Verificar caracteres válidos (letras, espacios, acentos, guiones)
  const validNameRegex = /^[a-záéíóúüñç\s\-']+$/i
  if (!validNameRegex.test(nameTrimmed)) {
    return {
      isValid: false,
      hasFullName: false,
      error: "El nombre contiene caracteres no válidos",
      suggestion: "Solo se permiten letras, espacios y guiones",
    }
  }

  // Verificar que no contenga palabras inválidas
  const containsInvalidWord = INVALID_NAME_WORDS.some((word) => nameLower.includes(word))

  if (containsInvalidWord) {
    return {
      isValid: false,
      hasFullName: false,
      error: "Por favor, introduce tu nombre real",
      suggestion: 'Evita usar palabras como "test", "prueba" o "admin"',
    }
  }

  // Verificar que tenga al menos dos palabras (nombre y apellido)
  const words = nameTrimmed.split(/\s+/).filter((word) => word.length > 0)

  if (words.length < 2) {
    return {
      isValid: true, // Técnicamente válido, pero no completo
      hasFullName: false,
      suggestion: "Incluye tu nombre y apellido para una mejor experiencia",
    }
  }

  // Verificar que cada palabra tenga al menos 2 caracteres
  const hasShortWords = words.some((word) => word.length < 2)
  if (hasShortWords) {
    return {
      isValid: false,
      hasFullName: false,
      error: "Cada parte del nombre debe tener al menos 2 caracteres",
    }
  }

  // Verificar que no todas las palabras sean iguales
  const uniqueWords = new Set(words.map((word) => word.toLowerCase()))
  if (uniqueWords.size === 1 && words.length > 1) {
    return {
      isValid: false,
      hasFullName: false,
      error: "Por favor, introduce un nombre válido",
    }
  }

  return {
    isValid: true,
    hasFullName: true,
    suggestion: words.length > 2 ? "Nombre completo verificado" : undefined,
  }
}

// Función para sugerir correcciones de dominios comunes
export function suggestEmailCorrection(email: string): string | null {
  const domain = email.split("@")[1]?.toLowerCase()

  const corrections: Record<string, string> = {
    "gmai.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gmail.co": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
    "outlok.com": "outlook.com",
    "outloo.com": "outlook.com",
  }

  if (domain && corrections[domain]) {
    return email.replace(domain, corrections[domain])
  }

  return null
}
