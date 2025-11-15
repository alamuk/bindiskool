import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Rocket, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Implementer Program - Accelerate Growth | BirdiSkool',
  description: 'Implementer: From Chaos to Consistency. A 12-week accelerator for £100K-£250K earners. Transform your practice into a high-performing growth machine. £6,000 + VAT.',
};

export default function ImplementerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Rocket className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                Implementer
              </h1>
              <h2 className="text-2xl md:text-3xl text-white mb-8">
                Accelerate Growth — From Chaos to Consistency
              </h2>
              <div className="text-center mb-8">
                <div className="mb-4">
                  <span className="font-playfair text-5xl md:text-6xl font-bold text-white">£5,500</span>
                  <span className="text-xl ml-2 text-white/80">+ VAT upfront</span>
                  <p className="text-lg mt-2 text-white/80">or £2,000/month for 3 months (£6,000 total)</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm text-white text-sm font-montserrat font-semibold px-6 py-3 rounded-full inline-block">
                IDEAL FOR £100K–£250K EARNERS
              </div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-8 text-center">
                Fast Results, Better Systems, Consistent Growth
              </h2>
              
              <div className="bg-gray-50 rounded-2xl p-8 mb-16">
                <p className="text-xl text-brand-slate leading-relaxed mb-6">
                  A 12-week accelerator that transforms a scattered private practice into a high-performing growth 
                  machine — with refined offers, automation, and data-driven marketing.
                </p>
                <p className="text-lg text-brand-slate leading-relaxed">
                  Positioned as the "fast track" for clinicians who want rapid results and are ready to implement 
                  proven systems that scale.
                </p>
              </div>

              {/* Core Features */}
              <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-8 text-center">
                What's Included in 12 Weeks
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Coaching Cadence</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Weekly 1:1 mentoring sessions</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Weekly group acceleration calls</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Marketing Systems</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Google + Meta Ads build and optimization</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Advanced SEO & funnel design</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Sales Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Call audit & script refinement</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Front-end offer optimization</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Automation</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">GoHighLevel CRM workflows setup</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Nurture emails, SMS, booking & reviews automation</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Operations</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Delegation systems & process templates</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Hiring freelancers or PAs guidance</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">YouTube + Video Brand</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Personal brand video creation</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">YouTube channel setup & content strategy</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Measurement</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Monthly financial dashboard reviews</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Marketing performance tracking & optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-12 text-center">
                Your 3-Month Outcomes
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    3–5× Lead Increase
                  </h3>
                  <p className="text-brand-slate">
                    Significant increase in patient leads per month through optimized marketing systems.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    80% Automation
                  </h3>
                  <p className="text-brand-slate">
                    Automated follow-up and enquiry handling, freeing you to focus on patient care.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Streamlined Operations
                  </h3>
                  <p className="text-brand-slate">
                    Clear delegation SOPs and process templates for efficient practice management.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Professional Video Presence
                  </h3>
                  <p className="text-brand-slate">
                    Established video presence and consistent content output across platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-6">
                Apply for Implementer
              </h2>
              <p className="text-xl text-brand-slate mb-4">
                Ready to accelerate your practice growth? Limited seats available for committed practitioners.
              </p>
              <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-lg p-4 inline-block">
                <p className="text-brand-indigo font-montserrat font-semibold">
                  £5,500 + VAT upfront or £2,000/month for 3 months
                </p>
                <p className="text-sm text-brand-slate mt-1">
                  Monthly total: £6,000 + VAT
                </p>
              </div>
            </div>
            
            <ContactForm 
              formType="implementer" 
              title="Implementer Program Application"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
