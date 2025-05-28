"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "./admin-login"
import { isAdminAuthenticated } from "@/lib/admin-auth"

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is already authenticated
    if (isAdminAuthenticated()) {
      router.push("/admin/dashboard")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <AdminLogin />
}
