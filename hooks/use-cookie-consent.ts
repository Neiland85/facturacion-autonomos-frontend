"use client"

import { useState, useEffect, useCallback } from "react"
import type { CookiePreferences, CookieConsentState } from "@/types/cookie-consent"

const COOKIE_CONSENT_KEY = "cookie-consent"
const COOKIE_PREFERENCES_KEY = "cookie-preferences"

const defaultPreferences: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
}

export function useCookieConsent() {
  const [state, setState] = useState<CookieConsentState>({
    consentGiven: false,
    hasInteracted: false,
    preferences: defaultPreferences,
  })

  // Load consent state from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const consentData = localStorage.getItem(COOKIE_CONSENT_KEY)
      const preferencesData = localStorage.getItem(COOKIE_PREFERENCES_KEY)

      if (consentData) {
        const consent = JSON.parse(consentData)
        const preferences = preferencesData ? JSON.parse(preferencesData) : defaultPreferences

        setState({
          consentGiven: consent.given || false,
          hasInteracted: consent.hasInteracted || false,
          preferences,
        })
      }
    } catch (error) {
      console.error("Error loading cookie consent data:", error)
    }
  }, [])

  // Save consent state to localStorage
  const saveConsentState = useCallback(
    (newState: Partial<CookieConsentState>) => {
      if (typeof window === "undefined") return

      try {
        const updatedState = { ...state, ...newState }
        setState(updatedState)

        localStorage.setItem(
          COOKIE_CONSENT_KEY,
          JSON.stringify({
            given: updatedState.consentGiven,
            hasInteracted: updatedState.hasInteracted,
            timestamp: new Date().toISOString(),
          }),
        )

        localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updatedState.preferences))

        // Trigger custom event for other parts of the app
        window.dispatchEvent(
          new CustomEvent("cookieConsentChanged", {
            detail: updatedState,
          }),
        )
      } catch (error) {
        console.error("Error saving cookie consent data:", error)
      }
    },
    [state],
  )

  // Accept all cookies
  const acceptAll = useCallback(() => {
    const allAcceptedPreferences: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    }

    saveConsentState({
      consentGiven: true,
      hasInteracted: true,
      preferences: allAcceptedPreferences,
    })

    // Load analytics and marketing scripts
    loadOptionalScripts(allAcceptedPreferences)
  }, [saveConsentState])

  // Reject optional cookies (keep only essential)
  const rejectAll = useCallback(() => {
    const essentialOnlyPreferences: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    }

    saveConsentState({
      consentGiven: true,
      hasInteracted: true,
      preferences: essentialOnlyPreferences,
    })

    // Remove optional cookies
    removeOptionalCookies()
  }, [saveConsentState])

  // Save custom preferences
  const savePreferences = useCallback(
    (preferences: CookiePreferences) => {
      saveConsentState({
        consentGiven: true,
        hasInteracted: true,
        preferences,
      })

      // Load or remove scripts based on preferences
      loadOptionalScripts(preferences)
      if (!preferences.analytics || !preferences.marketing) {
        removeOptionalCookies()
      }
    },
    [saveConsentState],
  )

  // Reset consent (for testing or user request)
  const resetConsent = useCallback(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      localStorage.removeItem(COOKIE_PREFERENCES_KEY)

      setState({
        consentGiven: false,
        hasInteracted: false,
        preferences: defaultPreferences,
      })

      // Remove all optional cookies
      removeOptionalCookies()

      window.dispatchEvent(new CustomEvent("cookieConsentReset"))
    } catch (error) {
      console.error("Error resetting cookie consent:", error)
    }
  }, [])

  return {
    consentGiven: state.consentGiven,
    hasInteracted: state.hasInteracted,
    preferences: state.preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  }
}

// Helper function to load optional scripts based on preferences
function loadOptionalScripts(preferences: CookiePreferences) {
  if (typeof window === "undefined") return

  // Load Google Analytics if analytics cookies are accepted
  if (preferences.analytics && !window.gtag) {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
    document.head.appendChild(script)

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      window.gtag = gtag
      gtag("js", new Date())
      gtag("config", "GA_MEASUREMENT_ID", {
        anonymize_ip: true,
        cookie_flags: "SameSite=Strict;Secure",
      })
    }
  }

  // Load marketing scripts if marketing cookies are accepted
  if (preferences.marketing) {
    // Facebook Pixel, LinkedIn Insight Tag, etc. would go here
    console.log("Loading marketing scripts...")
  }

  // Load functional scripts if functional cookies are accepted
  if (preferences.functional) {
    // Chat widgets, preference storage, etc. would go here
    console.log("Loading functional scripts...")
  }
}

// Helper function to remove optional cookies
function removeOptionalCookies() {
  if (typeof window === "undefined") return

  // Get all cookies
  const cookies = document.cookie.split(";")

  // List of cookie patterns to remove (analytics and marketing)
  const cookiesToRemove = [
    "_ga",
    "_gid",
    "_gat", // Google Analytics
    "_fbp",
    "_fbc", // Facebook
    "li_at",
    "li_mc", // LinkedIn
    "hubspotutk", // HubSpot
    // Add more patterns as needed
  ]

  cookies.forEach((cookie) => {
    const [name] = cookie.split("=")
    const cookieName = name.trim()

    // Remove cookies that match patterns
    cookiesToRemove.forEach((pattern) => {
      if (cookieName.startsWith(pattern)) {
        // Remove cookie by setting expiration date in the past
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
      }
    })
  })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
