// Mock authentication functions - replace with real API calls in production
export async function registerUser(userData: {
  name: string
  email: string
  password: string
}): Promise<{ token: string; user: { name: string; email: string } }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would be an API call to your backend
  // For now, we'll just return a mock successful response
  return {
    token: `mock-jwt-token-${Math.random().toString(36).substring(2, 15)}`,
    user: {
      name: userData.name,
      email: userData.email,
    },
  }
}

export async function loginUser(credentials: {
  email: string
  password: string
}): Promise<{ token: string; user: { name: string; email: string } }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would validate credentials against your backend
  // For demo purposes, we'll accept any email that ends with @ejemplo.com
  if (!credentials.email.endsWith("@ejemplo.com")) {
    throw new Error("Credenciales inválidas. Intente con un correo que termine en @ejemplo.com")
  }

  return {
    token: `mock-jwt-token-${Math.random().toString(36).substring(2, 15)}`,
    user: {
      name: credentials.email.split("@")[0],
      email: credentials.email,
    },
  }
}

export function saveAuthToken(token: string): void {
  localStorage.setItem("auth_token", token)
}

export function saveUserData(user: { name: string; email: string }): void {
  localStorage.setItem("user", JSON.stringify(user))
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

export function getUserData(): { name: string; email: string } | null {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

export function logout(): void {
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user")
}
