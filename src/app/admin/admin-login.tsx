"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2, Shield } from "lucide-react"
import { authenticateAdmin } from "@/lib/admin-auth"

interface LoginFormData {
  username: string
  password: string
}

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTime, setLockTime] = useState(0)

  // Check if the account is locked
  useEffect(() => {
    const storedLockTime = localStorage.getItem("adminLockTime")
    const storedLoginAttempts = localStorage.getItem("adminLoginAttempts")

    if (storedLockTime) {
      const lockTimeValue = Number.parseInt(storedLockTime, 10)
      const currentTime = new Date().getTime()

      if (lockTimeValue > currentTime) {
        setIsLocked(true)
        setLockTime(Math.ceil((lockTimeValue - currentTime) / 1000))
      } else {
        localStorage.removeItem("adminLockTime")
        setIsLocked(false)
      }
    }

    if (storedLoginAttempts) {
      setLoginAttempts(Number.parseInt(storedLoginAttempts, 10))
    }
  }, [])

  // Countdown timer for locked account
  useEffect(() => {
    if (isLocked && lockTime > 0) {
      const timer = setTimeout(() => {
        setLockTime(lockTime - 1)

        if (lockTime <= 1) {
          setIsLocked(false)
          localStorage.removeItem("adminLockTime")
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isLocked, lockTime])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear login error when user makes changes
    if (loginError) {
      setLoginError(null)
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if account is locked
    if (isLocked) {
      return
    }

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setLoginError(null)

    try {
      // Authenticate admin
      const result = await authenticateAdmin(formData.username, formData.password)

      if (result.success) {
        // Reset login attempts on success
        setLoginAttempts(0)
        localStorage.removeItem("adminLoginAttempts")

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
      } else {
        // Increment login attempts
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)
        localStorage.setItem("adminLoginAttempts", newAttempts.toString())

        // Lock account after 5 failed attempts
        if (newAttempts >= 5) {
          const lockDuration = 15 * 60 * 1000 // 15 minutes
          const lockUntil = new Date().getTime() + lockDuration

          setIsLocked(true)
          setLockTime(lockDuration / 1000)
          localStorage.setItem("adminLockTime", lockUntil.toString())

          setLoginError("Demasiados intentos fallidos. Cuenta bloqueada durante 15 minutos.")
        } else {
          setLoginError(result.error || "Credenciales inválidas. Por favor, inténtalo de nuevo.")
        }
      }
    } catch (error) {
      setLoginError("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Format remaining lock time
  const formatLockTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Acceso Administrativo</h2>
          <p className="mt-2 text-sm text-gray-600">Área restringida solo para administradores autorizados</p>
        </div>

        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        {isLocked ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
            <h3 className="font-medium">Cuenta temporalmente bloqueada</h3>
            <p className="text-sm mt-1">
              Demasiados intentos fallidos. Por favor, inténtalo de nuevo en {formatLockTime(lockTime)}.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <label htmlFor="username" className="sr-only">
                  Nombre de usuario
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border ${
                    errors.username ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Nombre de usuario"
                  disabled={isLoading || isLocked}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 pr-10 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Contraseña"
                  disabled={isLoading || isLocked}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    disabled={isLoading || isLocked}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

            <div>
              <button
                type="submit"
                disabled={isLoading || isLocked}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Verificando...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Este es un área restringida. Los intentos de acceso no autorizados serán registrados.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
