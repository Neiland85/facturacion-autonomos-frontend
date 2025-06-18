"use client"

import { Button } from "@/components/ui/button"

export function ConfidenceBlock() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Confidence Statement */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
            Trusted by thousands of businesses across Europe
          </h2>

          {/* Corporate Text */}
          <div className="space-y-6 mb-12">
            <p className="text-lg text-gray-300 leading-relaxed">
              Join the growing network of companies that have transformed their tax management with our enterprise-grade
              automation platform.
            </p>

            <p className="text-base text-gray-400 leading-relaxed">
              From startups to established enterprises, businesses rely on Tributariapp to ensure compliance, reduce
              costs, and eliminate manual tax processes. Our platform handles complex European tax regulations
              automatically, giving you more time to focus on what matters most.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 py-8 border-t border-b border-gray-800">
            <div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">€2.4M</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Taxes Processed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">15min</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Average Setup</div>
            </div>
          </div>

          {/* Security & Compliance Badges */}
          <div className="mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-6">Security & Compliance</p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
              {/* PCI DSS Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-xs font-bold text-white text-center leading-tight">
                    PCI
                    <br />
                    DSS
                  </div>
                </div>
                <span className="text-xs text-gray-500">Level 1</span>
              </div>

              {/* GDPR Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-xs font-bold text-white text-center leading-tight">
                    GDPR
                    <br />
                    Ready
                  </div>
                </div>
                <span className="text-xs text-gray-500">Compliant</span>
              </div>

              {/* ISO 27001 Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-xs font-bold text-white text-center leading-tight">
                    ISO
                    <br />
                    27001
                  </div>
                </div>
                <span className="text-xs text-gray-500">Certified</span>
              </div>

              {/* SOC 2 Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-xs font-bold text-white text-center leading-tight">
                    SOC 2<br />
                    Type II
                  </div>
                </div>
                <span className="text-xs text-gray-500">Audited</span>
              </div>

              {/* EU Tax Compliance Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-xs font-bold text-white text-center leading-tight">
                    EU TAX
                    <br />
                    Ready
                  </div>
                </div>
                <span className="text-xs text-gray-500">Certified</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-3 text-base transition-colors"
            >
              Start your free trial
            </Button>
            <p className="text-xs text-gray-500">No credit card required • 30-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  )
}
