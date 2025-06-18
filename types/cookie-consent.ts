export interface CookiePreferences {
  essential: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export interface CookieConsentState {
  consentGiven: boolean
  hasInteracted: boolean
  preferences: CookiePreferences
}

export interface CookieConsentData {
  given: boolean
  hasInteracted: boolean
  timestamp: string
}
