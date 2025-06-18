// Analytics service for tracking user interactions and conversions
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  userId?: string
  timestamp?: Date
}

export interface ConversionEvent extends AnalyticsEvent {
  conversionType: "demo_request" | "features_view" | "form_submit" | "page_view"
  value?: number
  currency?: string
}

class AnalyticsService {
  private isInitialized = false
  private userId: string | null = null

  // Initialize analytics (Google Analytics, Mixpanel, etc.)
  init(config?: { userId?: string; debug?: boolean }) {
    if (typeof window === "undefined") return

    this.userId = config?.userId || null
    this.isInitialized = true

    // Initialize Google Analytics 4 if gtag is available
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID", {
        user_id: this.userId,
        custom_map: { custom_parameter: "custom_value" },
      })
    }

    // Initialize other analytics providers here
    if (config?.debug) {
      console.log("Analytics initialized", { userId: this.userId })
    }
  }

  // Track general events
  track(event: AnalyticsEvent) {
    if (!this.isInitialized || typeof window === "undefined") return

    const eventData = {
      ...event,
      userId: event.userId || this.userId,
      timestamp: event.timestamp || new Date(),
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    }

    // Send to Google Analytics
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", event.name, {
        event_category: "engagement",
        event_label: event.name,
        custom_parameters: event.properties,
        user_id: this.userId,
      })
    }

    // Send to custom analytics endpoint
    this.sendToCustomEndpoint(eventData)

    // Debug logging
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", eventData)
    }
  }

  // Track conversion events
  trackConversion(event: ConversionEvent) {
    if (!this.isInitialized || typeof window === "undefined") return

    const conversionData = {
      ...event,
      userId: event.userId || this.userId,
      timestamp: event.timestamp || new Date(),
      url: window.location.href,
      sessionId: this.getSessionId(),
    }

    // Send to Google Analytics as conversion
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "conversion", {
        send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID",
        event_category: "conversion",
        event_label: event.conversionType,
        value: event.value || 0,
        currency: event.currency || "EUR",
        custom_parameters: event.properties,
      })
    }

    // Send to custom conversion endpoint
    this.sendToConversionEndpoint(conversionData)

    // Debug logging
    if (process.env.NODE_ENV === "development") {
      console.log("Conversion Event:", conversionData)
    }
  }

  // Track button clicks specifically
  trackButtonClick(buttonName: string, properties?: Record<string, any>) {
    this.track({
      name: "button_click",
      properties: {
        button_name: buttonName,
        click_timestamp: Date.now(),
        ...properties,
      },
    })
  }

  // Track demo requests
  trackDemoRequest(method: "scroll" | "page" | "external", properties?: Record<string, any>) {
    this.trackConversion({
      name: "demo_request_initiated",
      conversionType: "demo_request",
      value: 100, // Assign value to demo requests
      properties: {
        request_method: method,
        ...properties,
      },
    })
  }

  // Track features page views
  trackFeaturesView(method: "scroll" | "page" | "external", properties?: Record<string, any>) {
    this.trackConversion({
      name: "features_viewed",
      conversionType: "features_view",
      value: 50, // Assign value to features views
      properties: {
        view_method: method,
        ...properties,
      },
    })
  }

  // Send to custom analytics endpoint
  private async sendToCustomEndpoint(eventData: any) {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })
    } catch (error) {
      console.error("Failed to send analytics event:", error)
    }
  }

  // Send to custom conversion endpoint
  private async sendToConversionEndpoint(conversionData: any) {
    try {
      await fetch("/api/analytics/conversion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conversionData),
      })
    } catch (error) {
      console.error("Failed to send conversion event:", error)
    }
  }

  // Get or create session ID
  private getSessionId(): string {
    if (typeof window === "undefined") return "server-side"

    let sessionId = sessionStorage.getItem("analytics_session_id")
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("analytics_session_id", sessionId)
    }
    return sessionId
  }

  // Set user ID for tracking
  setUserId(userId: string) {
    this.userId = userId
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID", {
        user_id: userId,
      })
    }
  }
}

// Export singleton instance
export const analytics = new AnalyticsService()

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
