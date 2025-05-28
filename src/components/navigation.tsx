"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, Users, FileText, User, LogIn } from "lucide-react"
import { isAuthenticated, logout } from "@/lib/auth"

const navigationItems = [
  { name: "Usuarios", href: "/usuarios", icon: User, requiresAuth: true },
  { name: "Clientes", href: "/clientes", icon: Users, requiresAuth: true },
  { name: "Facturas", href: "/facturas", icon: FileText, requiresAuth: true },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status on client side
    setAuthenticated(isAuthenticated())
  }, [pathname])

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
    window.location.href = "/login"
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Facturación Autónomos</span>
            </Link>
            <div className="hidden md:ml-10 md:block">
              <div className="flex space-x-4">
                {navigationItems
                  .filter((item) => !item.requiresAuth || authenticated)
                  .map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                        )}
                      >
                        <Icon className="mr-1.5 h-4 w-4" />
                        {item.name}
                      </Link>
                    )
                  })}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* User profile/login section - desktop */}
          <div className="hidden md:block">
            <div className="flex items-center">
              {authenticated ? (
                <button
                  onClick={handleLogout}
                  className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cerrar sesión
                </button>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <LogIn className="mr-1.5 h-4 w-4" />
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={cn("md:hidden", {
            block: mobileMenuOpen,
            hidden: !mobileMenuOpen,
          })}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigationItems
              .filter((item) => !item.requiresAuth || authenticated)
              .map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-base font-medium",
                      isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                    {item.name}
                  </Link>
                )
              })}

            {!authenticated && (
              <>
                <Link
                  href="/login"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="mr-3 h-5 w-5" aria-hidden="true" />
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 mt-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}

            {authenticated && (
              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
