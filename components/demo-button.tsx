"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

interface DemoButtonProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "internal" | "external" | "page"
  href?: string
}

export function DemoButton({ className = "", size = "md", variant = "internal", href }: DemoButtonProps) {
  const { trackButtonClick, trackDemoRequest } = useAnalytics()

  const handleClick = () => {
    // Track button click
    trackButtonClick("solicitar_demo_gratuita", {
      variant,
      size,
      href: href || "default",
      button_location: "hero_section",
    })

    // Track demo request conversion
    trackDemoRequest(variant, {
      button_size: size,
      custom_href: href,
      click_source: "demo_button",
    })

    switch (variant) {
      case "internal":
        // Scroll to internal form
        const formElement = document.getElementById("demo-form")
        if (formElement) {
          formElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        break
      case "external":
        // Open external demo link
        const externalUrl = href || "https://tributariapp.es/demo"
        window.open(externalUrl, "_blank", "noopener,noreferrer")
        break
      case "page":
        // Navigate to internal page
        const internalUrl = href || "/demo"
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
    <Button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        bg-blue-600 hover:bg-blue-700 
        text-white font-semibold
        rounded-lg
        transition-all duration-300 ease-in-out
        transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
        active:scale-95
        border-0
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        backgroundColor: "#3B82F6",
        fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
      }}
    >
      <span>Solicitar Demo Gratuita</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  )
}
