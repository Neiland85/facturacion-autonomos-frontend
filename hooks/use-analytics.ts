"use client"

import { useEffect, useCallback } from "react"
import { analytics, type AnalyticsEvent, type ConversionEvent } from "@/lib/analytics"

export function useAnalytics() {
  // Initialize analytics on mount
  useEffect(() => {
    analytics.init({
      debug: process.env.NODE_ENV === "development",
    })
  }, [])

  // Track general events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    analytics.track(event)
  }, [])

  // Track conversions
  const trackConversion = useCallback((event: ConversionEvent) => {
    analytics.trackConversion(event)
  }, [])

  // Track button clicks with enhanced data
  const trackButtonClick = useCallback((buttonName: string, additionalProperties?: Record<string, any>) => {
    const properties = {
      timestamp: Date.now(),
      page_url: typeof window !== "undefined" ? window.location.href : "",
      page_title: typeof document !== "undefined" ? document.title : "",
      ...additionalProperties,
    }

    analytics.trackButtonClick(buttonName, properties)
  }, [])

  // Track demo requests with context
  const trackDemoRequest = useCallback((method: "scroll" | "page" | "external", context?: Record<string, any>) => {
    analytics.trackDemoRequest(method, {
      source_page: typeof window !== "undefined" ? window.location.pathname : "",
      ...context,
    })
  }, [])

  // Track features views with context
  const trackFeaturesView = useCallback((method: "scroll" | "page" | "external", context?: Record<string, any>) => {
    analytics.trackFeaturesView(method, {
      source_page: typeof window !== "undefined" ? window.location.pathname : "",
      ...context,
    })
  }, [])

  // Track page views
  const trackPageView = useCallback(
    (pageName?: string) => {
      if (typeof window === "undefined") return

      trackEvent({
        name: "page_view",
        properties: {
          page_name: pageName || document.title,
          page_url: window.location.href,
          page_path: window.location.pathname,
          referrer: document.referrer,
        },
      })
    },
    [trackEvent],
  )

  // Track form interactions
  const trackFormInteraction = useCallback(
    (formName: string, action: "start" | "complete" | "abandon", fieldName?: string) => {
      trackEvent({
        name: "form_interaction",
        properties: {
          form_name: formName,
          action,
          field_name: fieldName,
          timestamp: Date.now(),
        },
      })
    },
    [trackEvent],
  )

  return {
    trackEvent,
    trackConversion,
    trackButtonClick,
    trackDemoRequest,
    trackFeaturesView,
    trackPageView,
    trackFormInteraction,
    setUserId: analytics.setUserId.bind(analytics),
  }
}
