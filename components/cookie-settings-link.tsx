"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CookiePreferencesModal } from "./cookie-preferences-modal"

export function CookieSettingsLink() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setShowModal(true)}
        className="text-xs text-gray-400 hover:text-white hover:bg-transparent p-0 h-auto underline transition-colors duration-200"
      >
        Configuración de Cookies
      </Button>

      <CookiePreferencesModal open={showModal} onOpenChange={setShowModal} />
    </>
  )
}
