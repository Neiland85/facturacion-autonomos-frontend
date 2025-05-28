// Types
interface AdminUser {
  id: string
  username: string
  role: "admin" | "superadmin"
  name: string
  email: string
}

interface AuthResult {
  success: boolean
  user?: AdminUser
  token?: string
  error?: string
}

// In a real application, this would be a server-side API call
// For demo purposes, we're implementing it client-side
export async function authenticateAdmin(username: string, password: string): Promise<AuthResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // These would be stored securely on the server in a real application
  const validAdmins = [
    {
      id: "admin-1",
      username: "admin",
      password: "Admin@123456", // In a real app, this would be hashed
      role: "admin" as const,
      name: "Administrador",
      email: "admin@ejemplo.com",
    },
    {
      id: "admin-2",
      username: "superadmin",
      password: "Super@123456", // In a real app, this would be hashed
      role: "superadmin" as const,
      name: "Super Administrador",
      email: "superadmin@ejemplo.com",
    },
  ]

  // Find admin by username
  const admin = validAdmins.find((a) => a.username === username)

  if (!admin) {
    return {
      success: false,
      error: "Usuario no encontrado",
    }
  }

  // Check password
  if (admin.password !== password) {
    return {
      success: false,
      error: "Contraseña incorrecta",
    }
  }

  // Generate JWT token (in a real app)
  const token = `mock-admin-jwt-${Math.random().toString(36).substring(2, 15)}`

  // Store auth data in localStorage
  localStorage.setItem("adminToken", token)
  localStorage.setItem(
    "adminUser",
    JSON.stringify({
      id: admin.id,
      username: admin.username,
      role: admin.role,
      name: admin.name,
      email: admin.email,
    }),
  )

  return {
    success: true,
    user: {
      id: admin.id,
      username: admin.username,
      role: admin.role,
      name: admin.name,
      email: admin.email,
    },
    token,
  }
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === "undefined") {
    return null
  }

  const userJson = localStorage.getItem("adminUser")
  if (!userJson) {
    return null
  }

  try {
    return JSON.parse(userJson) as AdminUser
  } catch (error) {
    console.error("Error parsing admin user:", error)
    return null
  }
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem("adminToken")
}

export function isAdminAuthenticated(): boolean {
  return !!getAdminToken() && !!getAdminUser()
}

export function logoutAdmin(): void {
  localStorage.removeItem("adminToken")
  localStorage.removeItem("adminUser")
}

export function hasAdminRole(requiredRole: "admin" | "superadmin"): boolean {
  const user = getAdminUser()

  if (!user) {
    return false
  }

  if (requiredRole === "admin") {
    // Both admin and superadmin roles can access admin resources
    return user.role === "admin" || user.role === "superadmin"
  }

  // Only superadmin role can access superadmin resources
  return user.role === "superadmin"
}
