import { EmailSignUpForm } from "@/components/email-sign-up-form"
import { HeroTwoColumn } from "@/components/hero-two-column"
import { RegistrationForm } from "@/components/registration-form"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import { FeaturesSection } from "@/components/features-section"
import { BenefitsSection } from "@/components/benefits-section"
import { FintechFooter } from "@/components/fintech-footer"
import { InstitutionalQuote } from "@/components/institutional-quote"
import { ConfidenceBlock } from "@/components/confidence-block"
import { ComplianceSection } from "@/components/compliance-section"
import { DemoButton } from "@/components/demo-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <HeroTwoColumn />

      {/* Features Section */}
      <FeaturesSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Compliance Section */}
      <ComplianceSection />

      {/* Institutional Quote */}
      <InstitutionalQuote />

      {/* Confidence Block */}
      <ConfidenceBlock />

      {/* Demo Button Section */}
      <section className="py-12 bg-gray-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">¿Listo para transformar tu gestión fiscal?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Descubre cómo TributariApp puede automatizar completamente tus procesos fiscales
          </p>
          <DemoButton size="lg" />
        </div>
      </section>

      {/* Sección del formulario de registro */}
      <section id="demo-form" className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Comienza tu Transformación Fiscal</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Únete a cientos de empresas que ya están revolucionando su gestión tributaria
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="fade-in-up w-full max-w-3xl mx-auto" style={{ animationDelay: "0.6s" }}>
          <div className="mb-6 text-center">
            <p className="text-sm text-neutral-500 mb-4">
              Sé el primero en conocer el futuro de la automatización fiscal
            </p>
          </div>
          <EmailSignUpForm />
        </div>

        <div className="fade-in-up space-y-4 text-center" style={{ animationDelay: "0.8s" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-neutral-600">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Automatización Inteligente
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Cumplimiento Normativo
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Seguridad Empresarial
            </span>
          </div>
        </div>
      </div>

      {/* Fintech Footer */}
      <FintechFooter />

      <CookieConsentBanner />
    </div>
  )
}
