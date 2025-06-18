"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CookieSettingsLink } from "./cookie-settings-link"

export function CookiePolicyContent() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section className="prose prose-gray max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Resumen Ejecutivo</h2>
          <p className="text-blue-800 leading-relaxed">
            TributariApp utiliza cookies y tecnologías similares para mejorar su experiencia, analizar el uso del sitio
            y personalizar el contenido. Esta política explica qué cookies utilizamos, por qué las utilizamos y cómo
            puede controlar su uso. Su privacidad es importante para nosotros y respetamos su derecho a controlar sus
            datos personales.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ¿Qué son las cookies?</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o móvil)
          cuando visita un sitio web. Permiten que el sitio web reconozca su dispositivo y recuerde información sobre su
          visita, como sus preferencias de idioma y otras configuraciones.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Las cookies pueden ser "de sesión" (se eliminan cuando cierra el navegador) o "persistentes" (permanecen en su
          dispositivo durante un período determinado). También pueden ser "propias" (establecidas por nuestro sitio web)
          o "de terceros" (establecidas por otros sitios web cuyos servicios utilizamos).
        </p>
      </section>

      {/* Legal Basis */}
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl text-gray-900">2. Base Legal para el Procesamiento</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            El procesamiento de sus datos personales a través de cookies se basa en las siguientes bases legales según
            el Reglamento General de Protección de Datos (RGPD):
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900">Cookies Esenciales</h4>
              <p className="text-sm text-gray-600">
                <strong>Base legal:</strong> Interés legítimo (Art. 6.1.f RGPD) - Necesarias para el funcionamiento
                básico del sitio web.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900">Cookies Funcionales, de Análisis y Marketing</h4>
              <p className="text-sm text-gray-600">
                <strong>Base legal:</strong> Consentimiento (Art. 6.1.a RGPD) - Requieren su consentimiento explícito.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cookie Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Tipos de Cookies que Utilizamos</h2>

        <div className="space-y-6">
          {/* Essential Cookies */}
          <Card className="border-gray-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Cookies Esenciales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Estas cookies son estrictamente necesarias para el funcionamiento del sitio web y no pueden ser
                desactivadas. Sin estas cookies, el sitio web no puede funcionar correctamente.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Propósito</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duración</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">session_id</td>
                      <td className="border border-gray-300 px-4 py-2">Mantiene la sesión del usuario</td>
                      <td className="border border-gray-300 px-4 py-2">Sesión</td>
                      <td className="border border-gray-300 px-4 py-2">Propia</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">csrf_token</td>
                      <td className="border border-gray-300 px-4 py-2">Protección contra ataques CSRF</td>
                      <td className="border border-gray-300 px-4 py-2">Sesión</td>
                      <td className="border border-gray-300 px-4 py-2">Propia</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">cookie-consent</td>
                      <td className="border border-gray-300 px-4 py-2">Almacena las preferencias de cookies</td>
                      <td className="border border-gray-300 px-4 py-2">1 año</td>
                      <td className="border border-gray-300 px-4 py-2">Propia</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Functional Cookies */}
          <Card className="border-gray-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Cookies Funcionales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Estas cookies mejoran la funcionalidad del sitio web y proporcionan características personalizadas.
                Pueden ser establecidas por nosotros o por terceros cuyos servicios hemos añadido a nuestras páginas.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Propósito</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duración</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">language_pref</td>
                      <td className="border border-gray-300 px-4 py-2">Preferencia de idioma del usuario</td>
                      <td className="border border-gray-300 px-4 py-2">6 meses</td>
                      <td className="border border-gray-300 px-4 py-2">Propia</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">theme_mode</td>
                      <td className="border border-gray-300 px-4 py-2">Preferencia de tema (claro/oscuro)</td>
                      <td className="border border-gray-300 px-4 py-2">1 año</td>
                      <td className="border border-gray-300 px-4 py-2">Propia</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">accessibility_settings</td>
                      <td className="border border-gray-300 px-4 py-2">Configuraciones de accesibilidad</td>
                      <td className="border border-gray-300 px-4 py-2">1 año</td>
                      <td className="border border-gray-300 px-4 py-2">Propia</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Cookies */}
          <Card className="border-gray-200">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-lg text-yellow-900 flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                Cookies de Análisis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio web, proporcionando
                información sobre las páginas visitadas, el tiempo de permanencia y cualquier mensaje de error.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Propósito</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duración</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Proveedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">_ga</td>
                      <td className="border border-gray-300 px-4 py-2">Distingue usuarios únicos</td>
                      <td className="border border-gray-300 px-4 py-2">2 años</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">_ga_*</td>
                      <td className="border border-gray-300 px-4 py-2">Almacena el estado de la sesión</td>
                      <td className="border border-gray-300 px-4 py-2">2 años</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">_gid</td>
                      <td className="border border-gray-300 px-4 py-2">Distingue usuarios únicos</td>
                      <td className="border border-gray-300 px-4 py-2">24 horas</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Todos los datos de análisis se procesan de forma anónima y agregada. Google
                  Analytics está configurado con anonimización de IP activada.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Marketing Cookies */}
          <Card className="border-gray-200">
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Cookies de Marketing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Estas cookies se utilizan para mostrar anuncios relevantes y medir la efectividad de nuestras campañas
                publicitarias. Pueden ser establecidas por nuestros socios publicitarios.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Propósito</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duración</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Proveedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">_fbp</td>
                      <td className="border border-gray-300 px-4 py-2">Píxel de Facebook para seguimiento</td>
                      <td className="border border-gray-300 px-4 py-2">3 meses</td>
                      <td className="border border-gray-300 px-4 py-2">Facebook</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">li_mc</td>
                      <td className="border border-gray-300 px-4 py-2">LinkedIn Marketing Cookie</td>
                      <td className="border border-gray-300 px-4 py-2">2 años</td>
                      <td className="border border-gray-300 px-4 py-2">LinkedIn</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">_gcl_au</td>
                      <td className="border border-gray-300 px-4 py-2">Google Ads conversion tracking</td>
                      <td className="border border-gray-300 px-4 py-2">90 días</td>
                      <td className="border border-gray-300 px-4 py-2">Google Ads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Rights and Control */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Sus Derechos y Control sobre las Cookies</h2>

        <div className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Gestión de Preferencias</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700">
                Puede gestionar sus preferencias de cookies en cualquier momento utilizando nuestro centro de
                preferencias de cookies:
              </p>
              <div className="flex justify-center">
                <CookieSettingsLink />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Control del Navegador</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">También puede controlar las cookies directamente desde su navegador:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Google Chrome</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Haga clic en el menú Chrome (⋮)</li>
                    <li>Seleccione "Configuración"</li>
                    <li>Vaya a "Privacidad y seguridad"</li>
                    <li>Haga clic en "Cookies y otros datos del sitio"</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Mozilla Firefox</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Haga clic en el menú Firefox (☰)</li>
                    <li>Seleccione "Configuración"</li>
                    <li>Vaya a "Privacidad y seguridad"</li>
                    <li>En "Cookies y datos del sitio"</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Safari</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Vaya a Safari &gt; Preferencias</li>
                    <li>Haga clic en la pestaña "Privacidad"</li>
                    <li>Gestione las cookies y datos del sitio web</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Microsoft Edge</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Haga clic en el menú Edge (⋯)</li>
                    <li>Seleccione "Configuración"</li>
                    <li>Vaya a "Privacidad, búsqueda y servicios"</li>
                    <li>En "Cookies y permisos del sitio"</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Third Party Services */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Servicios de Terceros</h2>

        <div className="space-y-4">
          <p className="text-gray-700">
            Utilizamos varios servicios de terceros que pueden establecer sus propias cookies. Estos servicios tienen
            sus propias políticas de privacidad:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Servicio de análisis web que nos ayuda a entender cómo los usuarios interactúan con nuestro sitio.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Política de Privacidad de Google →
                </a>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Facebook Pixel</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Herramienta de análisis que nos ayuda a medir la efectividad de nuestra publicidad.
                </p>
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Política de Privacidad de Facebook →
                </a>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">LinkedIn Insight Tag</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Nos permite realizar un seguimiento de las conversiones y crear audiencias personalizadas.
                </p>
                <a
                  href="https://www.linkedin.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Política de Privacidad de LinkedIn →
                </a>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Google Ads</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Plataforma publicitaria que nos permite mostrar anuncios relevantes y medir conversiones.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Política de Privacidad de Google →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Data Retention */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Retención de Datos</h2>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Los datos recopilados a través de cookies se conservan durante diferentes períodos según su propósito:
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">Cookies de sesión</span>
                  <span className="text-sm text-gray-600">Se eliminan al cerrar el navegador</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">Cookies funcionales</span>
                  <span className="text-sm text-gray-600">6 meses - 1 año</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">Cookies de análisis</span>
                  <span className="text-sm text-gray-600">24 meses</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">Cookies de marketing</span>
                  <span className="text-sm text-gray-600">90 días - 2 años</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Puede solicitar la eliminación de sus datos en cualquier momento contactando con nuestro Delegado de
                Protección de Datos.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8" />

      {/* Contact Information */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Contacto y Más Información</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Delegado de Protección de Datos</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <p className="text-gray-700">
                Si tiene preguntas sobre esta política de cookies o sobre el tratamiento de sus datos personales:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> dpo@tributariapp.com
                </p>
                <p>
                  <strong>Dirección:</strong> Calle Ejemplo, 123, 28001 Madrid, España
                </p>
                <p>
                  <strong>Teléfono:</strong> +34 900 123 456
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Autoridad de Control</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <p className="text-gray-700">
                Tiene derecho a presentar una reclamación ante la autoridad de control competente:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Agencia Española de Protección de Datos (AEPD)</strong>
                </p>
                <p>C/ Jorge Juan, 6, 28001 Madrid</p>
                <p>Teléfono: 901 100 099</p>
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  www.aepd.es →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Updates */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Actualizaciones de esta Política</h2>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Esta política de cookies puede actualizarse periódicamente para reflejar cambios en nuestras prácticas o
              por otros motivos operativos, legales o reglamentarios.
            </p>

            <p className="text-gray-700 mb-4">Le notificaremos cualquier cambio material mediante:</p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Un aviso prominente en nuestro sitio web</li>
              <li>Una notificación por email (si tiene una cuenta con nosotros)</li>
              <li>Actualización de la fecha de "última actualización" en la parte superior de esta política</li>
            </ul>

            <p className="text-gray-700">
              Le recomendamos que revise esta política periódicamente para mantenerse informado sobre cómo utilizamos
              las cookies.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Acciones Rápidas</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <CookieSettingsLink />
          <a href="mailto:dpo@tributariapp.com" className="text-sm text-blue-600 hover:text-blue-800 underline">
            Contactar con el DPO
          </a>
          <a href="/privacy-policy" className="text-sm text-blue-600 hover:text-blue-800 underline">
            Ver Política de Privacidad
          </a>
        </div>
      </div>
    </div>
  )
}
