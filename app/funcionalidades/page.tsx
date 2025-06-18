import type { Metadata } from "next"
import FuncionalidadesClientPage from "./FuncionalidadesClientPage"

export const metadata: Metadata = {
  title: "Funcionalidades - TributariApp",
  description: "Descubre todas las funcionalidades de TributariApp para automatizar tu gestión fiscal",
}

export default function FuncionalidadesPage() {
  return <FuncionalidadesClientPage />
}
