"use client"

import { ChevronDown } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

interface FeaturesButtonProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "internal" | "external" | "page"
  href?: string
}

export function FeaturesButton({ className = "", size = "md", variant = "internal", href }: FeaturesButtonProps) {
  const { trackButtonClick, trackFeaturesView } = useAnalytics()

  const handleClick = () => {
    // Track button click
    trackButtonClick("ver_funcionalidades", {
      variant,
      size,
      href: href || "default",
      button_location: "hero_section",
    })

    // Track features view conversion
    trackFeaturesView(variant, {
      button_size: size,
      custom_href: href,
      click_source: "features_button",
    })

    switch (variant) {
      case "internal":
        // Scroll to internal features section
        const featuresElement = document.getElementById("features")
        if (featuresElement) {
          featuresElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        break
      case "external":
        // Open external features link
        const externalUrl = href || "https://tributariapp.es/funcionalidades"
        window.open(externalUrl, "_blank", "noopener,noreferrer")
        break
      case "page":
        // Navigate to internal features page
        const internalUrl = href || "/funcionalidades"
        window.location.href = internalUrl
        break
    }
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm h-10",
    md: "px-6 py-3 text-base h-12",
    lg: "px-8 py-4 text-lg h-14",
  }

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        border border-white
        bg-transparent hover:bg-white
        text-white hover:text-gray-900
        font-medium
        rounded-lg
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
        active:scale-95
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
      }}
    >
      <span>Ver Funcionalidades</span>
      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
    </button>
  )
}
