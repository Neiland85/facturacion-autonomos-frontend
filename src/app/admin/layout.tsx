"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin") {
      setIsLoading(false)
      return
    }

    // Check if admin is authenticated
    if (!isAdminAuthenticated()) {
      router.push("/admin")
    } else {
      setIsLoading(false)
    }
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
