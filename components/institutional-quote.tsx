"use client"

export function InstitutionalQuote() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            {/* Quote marks */}
            <div className="absolute -top-4 -left-4 text-6xl text-gray-600 font-serif opacity-30">"</div>
            <div className="absolute -bottom-8 -right-4 text-6xl text-gray-600 font-serif opacity-30">"</div>

            {/* Quote content */}
            <blockquote className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-8 font-serif italic">
                Tributariapp is building the future of self-employment taxation in Europe.
              </p>
            </blockquote>

            {/* Attribution */}
            <footer className="border-t border-gray-700 pt-6">
              <div className="flex flex-col items-center space-y-2">
                <cite className="text-gray-300 font-medium text-lg not-italic">European Fintech Association</cite>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Industry Analysis Report 2024</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
