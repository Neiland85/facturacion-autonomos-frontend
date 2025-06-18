"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Copy, ExternalLink, Key, Shield, Zap } from "lucide-react"
import { useState } from "react"

export function ApiDocumentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/companies",
      description: "Obtener información de empresas registradas",
      auth: true,
    },
    {
      method: "POST",
      path: "/api/v1/invoices",
      description: "Crear nueva factura",
      auth: true,
    },
    {
      method: "GET",
      path: "/api/v1/reports/tax",
      description: "Generar informe fiscal",
      auth: true,
    },
    {
      method: "POST",
      path: "/api/v1/deductions/analyze",
      description: "Analizar deducciones automáticas",
      auth: true,
    },
  ]

  const codeExamples = {
    curl: `curl -X GET "https://api.tributariapp.com/v1/companies" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch('https://api.tributariapp.com/v1/companies', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`,
    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.tributariapp.com/v1/companies',
    headers=headers
)

data = response.json()`,
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API de TributariApp</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          API RESTful completa para integrar la automatización fiscal en sus aplicaciones. Gestione facturas, genere
          informes y optimice deducciones mediante programación.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
              <Key className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-lg text-blue-900">Autenticación</CardTitle>
            <CardDescription className="text-blue-700">
              Obtenga su API key y configure la autenticación Bearer token
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Obtener API Key
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-lg text-green-900">Inicio Rápido</CardTitle>
            <CardDescription className="text-green-700">
              Guía paso a paso para realizar su primera llamada a la API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
              Ver Guía
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-lg text-purple-900">Seguridad</CardTitle>
            <CardDescription className="text-purple-700">
              Información sobre límites de velocidad, HTTPS y mejores prácticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" variant="outline" className="border-purple-600 text-purple-700 hover:bg-purple-100">
              Leer Más
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* API Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Referencia de API</CardTitle>
          <CardDescription>Endpoints disponibles en la API de TributariApp v1.0</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant={endpoint.method === "GET" ? "secondary" : "default"}
                    className={`font-mono text-xs ${
                      endpoint.method === "GET" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm font-mono text-gray-700">{endpoint.path}</code>
                  <span className="text-sm text-gray-600">{endpoint.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  {endpoint.auth && (
                    <Badge variant="outline" className="text-xs">
                      Auth Required
                    </Badge>
                  )}
                  <Button size="sm" variant="ghost" className="text-xs">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Ejemplos de Código</CardTitle>
          <CardDescription>Ejemplos de implementación en diferentes lenguajes de programación</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([language, code]) => (
              <TabsContent key={language} value={language}>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(code, language)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    {copiedCode === language ? "Copiado!" : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">SDKs y Librerías</CardTitle>
            <CardDescription>Librerías oficiales para acelerar su desarrollo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <p className="font-medium text-gray-900">Node.js SDK</p>
                <p className="text-sm text-gray-600">npm install @tributariapp/node</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <p className="font-medium text-gray-900">Python SDK</p>
                <p className="text-sm text-gray-600">pip install tributariapp</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div>
                <p className="font-medium text-gray-900">PHP SDK</p>
                <p className="text-sm text-gray-600">composer require tributariapp/php</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Soporte y Comunidad</CardTitle>
            <CardDescription>Recursos adicionales para desarrolladores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Code className="w-4 h-4 mr-2" />
              Ejemplos en GitHub
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Postman Collection
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Estado de la API
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Rate Limits */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-900">Límites de Velocidad</CardTitle>
          <CardDescription className="text-yellow-700">
            Información importante sobre los límites de la API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-yellow-900">Plan Básico</p>
              <p className="text-yellow-700">1,000 requests/hora</p>
            </div>
            <div>
              <p className="font-medium text-yellow-900">Plan Profesional</p>
              <p className="text-yellow-700">10,000 requests/hora</p>
            </div>
            <div>
              <p className="font-medium text-yellow-900">Plan Enterprise</p>
              <p className="text-yellow-700">Límites personalizados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
