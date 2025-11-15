import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Lightbulb, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Foundation Program - Build Your Base | BirdiSkool',
  description: 'Foundation: From Idea to Income. Build the foundations of a profitable private practice for £0-£100K earners. £500/month with 12-month commitment.',
};

export default function FoundationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-emerald to-green-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Lightbulb className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                Foundation
              </h1>
              <h2 className="text-2xl md:text-3xl text-white mb-8">
                Build Your Base — From Idea to Income
              </h2>
              <div className="text-center mb-8">
                <div className="mb-4">
                  <span className="font-playfair text-5xl md:text-6xl font-bold text-white">£5,000</span>
                  <span className="text-xl ml-2 text-white/80">+ VAT upfront</span>
                  <p className="text-lg mt-2 text-white/80">or £500/month for 12 months (£6,000 total)</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm text-white text-sm font-montserrat font-semibold px-6 py-3 rounded-full inline-block">
                IDEAL FOR £0–£100K EARNERS
              </div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-8 text-center">
                Transform Your Clinical Excellence Into Practice Success
              </h2>
              
              <div className="bg-gray-50 rounded-2xl p-8 mb-16">
                <p className="text-xl text-brand-slate leading-relaxed mb-6">
                  The Foundation program helps doctors and health professionals build the foundations of a profitable 
                  private practice — learning how to attract their first consistent flow of patients, master the digital 
                  basics, and establish systems that prevent burnout.
                </p>
                <p className="text-lg text-brand-slate leading-relaxed">
                  You'll go from uncertainty to clarity, building a functioning practice online and offline with 1–2 new 
                  patients per week from organic and paid activity.
                </p>
              </div>

              {/* Core Features */}
              <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-8 text-center">
                What's Included
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Mentorship & Coaching</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">1× monthly 1:1 session with expert mentor</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Weekly group coaching calls</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Marketing Foundations</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Personal brand clarity & positioning</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Offer design, niche definition & value ladder</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Digital Setup</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Website & Google My Business setup</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">SEO optimization & Google Ads introduction</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Content Creation</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Weekly content themes & templates</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Blog, social posts, and video guidance</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Sales & Systems</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Telephone handling scripts</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Enquiry flow & CRM setup (GoHighLevel)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Financial & Legal</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Monthly scorecard tracking revenue, costs & ROI</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Contract templates & compliance essentials</span>
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
                Your 12-Month Outcomes
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-emerald/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-emerald" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Functioning Practice
                  </h3>
                  <p className="text-brand-slate">
                    A fully operational private practice online and offline, ready to serve patients professionally.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-emerald/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-emerald" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Consistent Patient Flow
                  </h3>
                  <p className="text-brand-slate">
                    1–2 new patients per week from organic and paid marketing activities.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-emerald/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-emerald" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Clear Metrics Dashboard
                  </h3>
                  <p className="text-brand-slate">
                    Marketing and financial metrics dashboard to track your growth and ROI.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-12 h-12 bg-brand-emerald/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-brand-emerald" />
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Brand Authority
                  </h3>
                  <p className="text-brand-slate">
                    Established authority across website, social media, and your professional network.
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
                Apply for Foundation
              </h2>
              <p className="text-xl text-brand-slate mb-4">
                Ready to build the foundation of your private practice? Start your journey from idea to income.
              </p>
              <div className="bg-brand-emerald/10 border border-brand-emerald/20 rounded-lg p-4 inline-block">
                <p className="text-brand-indigo font-montserrat font-semibold">
                  £5,000 + VAT upfront or £500/month for 12 months
                </p>
                <p className="text-sm text-brand-slate mt-1">
                  Monthly total: £6,000 + VAT
                </p>
              </div>
            </div>
            
            <ContactForm 
              formType="foundation" 
              title="Foundation Program Application"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
