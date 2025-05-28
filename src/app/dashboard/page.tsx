"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserData, isAuthenticated, logout } from "@/lib/auth"
import { LogOut } from "lucide-react"
import UserDashboard from "./user-dashboard"
import MobileDashboard from "./mobile-dashboard"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    // Get user data
    const userData = getUserData()
    setUser(userData)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido, {user.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </button>
      </div>

      {/* Desktop Dashboard (hidden on mobile) */}
      <div className="hidden sm:block">
        <UserDashboard />
      </div>

      {/* Mobile Dashboard (hidden on desktop) */}
      <MobileDashboard />
    </div>
  )
}
