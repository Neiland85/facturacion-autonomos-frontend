"use client"

import { useState } from "react"
import BetaTesterModal from "./beta-tester-modal"

export default function ConstructionNotice() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="fixed top-2 right-2 md:top-4 md:right-4 z-50 max-w-xs">
        <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-3 md:p-4 shadow-lg">
          <div className="space-y-2">
            {/* Título principal con parpadeo intenso */}
            <div className="text-xs md:text-sm font-bold text-yellow-400 animate-flicker-intense">
              ¡Aplicación en Construcción!
            </div>

            {/* Información de lanzamiento con parpadeo sutil */}
            <div className="text-xs text-gray-300 animate-flicker-subtle space-y-1">
              <div>Salida al mercado en</div>
              <div className="font-semibold text-blue-400">Septiembre 2025</div>
              <div>Versión Beta disponible</div>
            </div>

            {/* Call to action clickeable */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-gray-400 pt-1 border-t border-gray-700 w-full text-left hover:text-gray-200 transition-colors cursor-pointer group"
            >
              <span className="group-hover:underline">Solicita ser tester</span> para tenerlo
              <span className="text-green-400 font-medium group-hover:text-green-300"> gratuito un año</span>
            </button>
          </div>
        </div>
      </div>

      <BetaTesterModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
