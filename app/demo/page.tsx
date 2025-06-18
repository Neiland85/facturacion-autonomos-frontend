import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo Gratuita - TributariApp",
  description: "Solicita una demostración gratuita de TributariApp y descubre cómo automatizar tu gestión fiscal",
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Solicita tu Demo Gratuita</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Descubre cómo TributariApp puede transformar la gestión fiscal de tu empresa en solo 30 minutos
            </p>
          </div>

          {/* Demo Form */}
          <div className="bg-gray-900 rounded-2xl p-8 sm:p-12">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email corporativo *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@empresa.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label htmlFor="employees" className="block text-sm font-medium text-gray-300 mb-2">
                  Tamaño de la empresa
                </label>
                <select
                  id="employees"
                  name="employees"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona el tamaño</option>
                  <option value="1-10">1-10 empleados</option>
                  <option value="11-50">11-50 empleados</option>
                  <option value="51-200">51-200 empleados</option>
                  <option value="200+">Más de 200 empleados</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Cuéntanos sobre tus necesidades
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe brevemente tus retos actuales con la gestión fiscal..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="privacy" className="text-sm text-gray-400">
                  Acepto la{" "}
                  <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                    política de privacidad
                  </a>{" "}
                  y el tratamiento de mis datos para recibir información comercial.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Solicitar Demo Gratuita
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <p className="text-sm text-gray-400">
                ✓ Demo personalizada de 30 minutos • ✓ Sin compromiso • ✓ Respuesta en 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
