"use client"

import { useCustomRouter } from "@/contexts/router-context"
import HomeComponent from "./route-components/home"
import UsuariosComponent from "./route-components/usuarios"
import ClientesComponent from "./route-components/clientes"
import FacturasComponent from "./route-components/facturas"

export function RouteMap() {
  const { currentPath } = useCustomRouter()

  // Map paths to components
  switch (currentPath) {
    case "/":
      return <HomeComponent />
    case "/usuarios":
      return <UsuariosComponent />
    case "/clientes":
      return <ClientesComponent />
    case "/facturas":
      return <FacturasComponent />
    default:
      // For nested routes, check if they start with a specific path
      if (currentPath.startsWith("/usuarios/")) {
        return <UsuariosComponent />
      } else if (currentPath.startsWith("/clientes/")) {
        return <ClientesComponent />
      } else if (currentPath.startsWith("/facturas/")) {
        return <FacturasComponent />
      }
      // Fallback to home component
      return <HomeComponent />
  }
}
