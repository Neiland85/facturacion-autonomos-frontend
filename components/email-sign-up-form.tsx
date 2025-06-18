"use client"

import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

export function EmailSignUpForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      setStatus("error")
      setMessage("El correo electrónico no puede estar vacío.")
      return
    }
    setStatus("submitting")
    setMessage("")

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Validación básica de email
    if (email.includes("@") && email.includes(".")) {
      setStatus("success")
      setMessage("¡Gracias! Te notificaremos cuando lancemos la plataforma.")
      setEmail("") // Limpiar input en caso de éxito
    } else {
      setStatus("error")
      setMessage("Por favor, introduce una dirección de correo válida.")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Introduce tu correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== "idle" && status !== "submitting") {
              // Permitir reescribir para limpiar error/éxito
              setStatus("idle")
              setMessage("")
            }
          }}
          disabled={status === "submitting"}
          required
          className="w-full h-12 px-4 text-base bg-neutral-800/50 border-neutral-700 placeholder:text-neutral-500 
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                     focus-visible:ring-offset-2 focus-visible:ring-offset-background 
                     focus-visible:border-neutral-500 
                     transition-all duration-200 ease-in-out"
          aria-label="Correo electrónico para notificación de lanzamiento"
        />
        <Button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="w-full h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 ease-in-out"
        >
          {status === "submitting" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Notificarme"}
        </Button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm flex items-center justify-center transition-opacity duration-300 ${
            status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-muted-foreground"
          }`}
        >
          {status === "success" && <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0" />}
          {status === "error" && <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0" />}
          {message}
        </p>
      )}
    </div>
  )
}
