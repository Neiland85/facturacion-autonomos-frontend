"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { ReactNode } from "react"

type Route = {
  path: string
  element: ReactNode
}

type RouterContextType = {
  routes: Route[]
  currentPath: string
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextType | null>(null)

export function RouterProvider({
  children,
  routes,
}: {
  children: ReactNode
  routes: Route[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState(pathname || "/")

  // Update current path when pathname changes
  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname)
    }
  }, [pathname])

  const navigate = (path: string) => {
    router.push(path)
  }

  return <RouterContext.Provider value={{ routes, currentPath, navigate }}>{children}</RouterContext.Provider>
}

export function useCustomRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error("useCustomRouter must be used within a RouterProvider")
  }
  return context
}
