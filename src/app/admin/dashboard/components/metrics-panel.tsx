"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, Users, Wallet, AlertTriangle } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for user registration trend
const userData = [
  { month: "Ene", users: 120 },
  { month: "Feb", users: 140 },
  { month: "Mar", users: 170 },
  { month: "Abr", users: 200 },
  { month: "May", users: 220 },
  { month: "Jun", users: 270 },
  { month: "Jul", users: 290 },
]

// Mock data for invoice trend
const invoiceData = [
  { month: "Ene", count: 65, amount: 32500 },
  { month: "Feb", count: 78, amount: 41200 },
  { month: "Mar", count: 90, amount: 52000 },
  { month: "Abr", count: 102, amount: 61500 },
  { month: "May", count: 110, amount: 72000 },
  { month: "Jun", count: 132, amount: 83500 },
  { month: "Jul", count: 145, amount: 95000 },
]

export function MetricsPanel() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Usuarios Totales</p>
                <p className="text-3xl font-bold">1,247</p>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" /> +12.5% este mes
                </div>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Facturas Generadas</p>
                <p className="text-3xl font-bold">3,842</p>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" /> +8.2% este mes
                </div>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Facturación Total</p>
                <p className="text-3xl font-bold">€2.4M</p>
                <div className="mt-1 flex items-center text-xs font-medium text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" /> +15.3% este mes
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Incidencias Activas</p>
                <p className="text-3xl font-bold">24</p>
                <div className="mt-1 flex items-center text-xs font-medium text-red-600">
                  <TrendingUp className="mr-1 h-3 w-3" /> +4 nuevas hoy
                </div>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Usuarios",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-users)"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    name="Usuarios"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Facturación</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Número de Facturas",
                  color: "hsl(var(--chart-1))",
                },
                amount: {
                  label: "Importe Total (€)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={invoiceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="count"
                    stroke="var(--color-count)"
                    name="Número de Facturas"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--color-amount)"
                    name="Importe Total (€)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
