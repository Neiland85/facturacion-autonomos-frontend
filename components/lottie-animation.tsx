"use client"

import { useEffect, useRef } from "react"

export function LottieAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulamos una animación Lottie con elementos SVG animados
    // En producción, aquí cargarías la librería Lottie y tu archivo JSON
    const container = containerRef.current
    if (!container) return

    // Crear elementos SVG animados que representen AI, finanzas y facturas
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", "0 0 400 400")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.style.maxWidth = "500px"
    svg.style.maxHeight = "500px"

    // Elementos de la animación
    const elements = [
      // Círculo principal (representa AI)
      {
        type: "circle",
        cx: 200,
        cy: 200,
        r: 80,
        fill: "none",
        stroke: "#3B82F6",
        strokeWidth: 2,
        opacity: 0.6,
      },
      // Documentos/Facturas
      {
        type: "rect",
        x: 120,
        y: 150,
        width: 60,
        height: 80,
        fill: "#1F2937",
        stroke: "#6B7280",
        strokeWidth: 1,
        rx: 4,
      },
      {
        type: "rect",
        x: 130,
        y: 140,
        width: 60,
        height: 80,
        fill: "#374151",
        stroke: "#9CA3AF",
        strokeWidth: 1,
        rx: 4,
      },
      // Líneas de texto en documentos
      {
        type: "line",
        x1: 140,
        y1: 160,
        x2: 170,
        y2: 160,
        stroke: "#D1D5DB",
        strokeWidth: 1,
      },
      {
        type: "line",
        x1: 140,
        y1: 170,
        x2: 175,
        y2: 170,
        stroke: "#D1D5DB",
        strokeWidth: 1,
      },
      {
        type: "line",
        x1: 140,
        y1: 180,
        x2: 165,
        y2: 180,
        stroke: "#D1D5DB",
        strokeWidth: 1,
      },
      // Elementos de datos/gráficos
      {
        type: "circle",
        cx: 280,
        cy: 160,
        r: 4,
        fill: "#10B981",
      },
      {
        type: "circle",
        cx: 290,
        cy: 180,
        r: 4,
        fill: "#3B82F6",
      },
      {
        type: "circle",
        cx: 300,
        cy: 200,
        r: 4,
        fill: "#8B5CF6",
      },
      // Conexiones (representan automatización)
      {
        type: "path",
        d: "M 200 120 Q 250 140 280 160",
        fill: "none",
        stroke: "#6366F1",
        strokeWidth: 1,
        opacity: 0.4,
      },
      {
        type: "path",
        d: "M 200 280 Q 250 260 290 180",
        fill: "none",
        stroke: "#06B6D4",
        strokeWidth: 1,
        opacity: 0.4,
      },
    ]

    elements.forEach((el, index) => {
      const element = document.createElementNS("http://www.w3.org/2000/svg", el.type)

      Object.entries(el).forEach(([key, value]) => {
        if (key !== "type") {
          element.setAttribute(key, value.toString())
        }
      })

      // Añadir animaciones sutiles
      if (el.type === "circle" && el.r === 80) {
        // Círculo principal rotando lentamente
        const animateTransform = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform")
        animateTransform.setAttribute("attributeName", "transform")
        animateTransform.setAttribute("type", "rotate")
        animateTransform.setAttribute("values", "0 200 200;360 200 200")
        animateTransform.setAttribute("dur", "20s")
        animateTransform.setAttribute("repeatCount", "indefinite")
        element.appendChild(animateTransform)
      }

      if (el.type === "circle" && el.r === 4) {
        // Puntos de datos pulsando
        const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate")
        animate.setAttribute("attributeName", "opacity")
        animate.setAttribute("values", "0.3;1;0.3")
        animate.setAttribute("dur", `${2 + index * 0.5}s`)
        animate.setAttribute("repeatCount", "indefinite")
        element.appendChild(animate)
      }

      if (el.type === "path") {
        // Líneas de conexión animadas
        const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate")
        animate.setAttribute("attributeName", "stroke-dasharray")
        animate.setAttribute("values", "0,100;50,50;100,0")
        animate.setAttribute("dur", "3s")
        animate.setAttribute("repeatCount", "indefinite")
        element.appendChild(animate)
      }

      svg.appendChild(element)
    })

    container.appendChild(svg)

    return () => {
      if (container.contains(svg)) {
        container.removeChild(svg)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      aria-label="Animación representando automatización fiscal con IA"
    />
  )
}
