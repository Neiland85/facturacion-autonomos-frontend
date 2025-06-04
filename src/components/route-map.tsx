"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCustomRouter } from "@/contexts/router-context"
import HomeComponent from "./route-components/home"
import UsuariosComponent from "./route-components/usuarios"
import ClientesComponent from "./route-components/clientes"
import FacturasComponent from "./route-components/facturas"
import Login from "../app/login/page";
import Register from "../app/register/page";
import Dashboard from "../app/dashboard/page";
import NotFound from "../app/admin/not-found";
import AdminLogin from "../app/admin/admin-login";
import AdminDashboard from "../app/admin/dashboard/page";

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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<UsuariosComponent />} />
        <Route path="/clientes" element={<ClientesComponent />} />
        <Route path="/facturas" element={<FacturasComponent />} />

        {/* Rutas de administración */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<NotFound />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
