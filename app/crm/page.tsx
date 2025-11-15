import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Database, CheckCircle, Settings, BarChart3, Users, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BirdiSkool Core (CRM) - Coming Soon | BirdiSkool',
  description: 'BirdiSkool Core CRM - Complete practice management system with automation, booking, follow-ups, and dashboards. Join the waitlist for founder pricing at £295/month.',
};

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-emerald to-green-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Database className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                BirdiSkool Core (CRM)
              </h1>
              <h2 className="text-2xl md:text-3xl text-white mb-8">
                Complete practice management - Coming Soon
              </h2>
              <div className="text-center mb-8">
                <span className="font-playfair text-5xl md:text-6xl font-bold text-white">£295</span>
                <span className="text-xl ml-2 text-white/80">/month</span>
                <p className="text-lg mt-2 text-white/80">Founder's early access pricing</p>
              </div>
              <div className="bg-white text-brand-emerald text-sm font-montserrat font-semibold px-6 py-3 rounded-full inline-block">
                LAUNCHING Q2 2025
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-12 text-center">
                Built Specifically for Healthcare Professionals
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="h-8 w-8 text-brand-emerald" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-4">Smart Automation</h3>
                  <p className="text-brand-slate">Automate patient journeys, follow-ups, and administrative tasks while maintaining personal touch.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-8 w-8 text-brand-blue" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-4">Booking System</h3>
                  <p className="text-brand-slate">Seamless online booking with compliance features, automated confirmations, and intelligent scheduling.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="h-8 w-8 text-brand-gold" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-4">Practice Dashboards</h3>
                  <p className="text-brand-slate">Real-time insights into practice performance, patient acquisition, and revenue optimization.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-8 text-center">
                  Complete Feature Set
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Patient Management</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Complete patient records & history</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Automated follow-up sequences</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Smart appointment reminders</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Patient communication hub</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Business Intelligence</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Revenue tracking & forecasting</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Patient acquisition analytics</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Treatment outcome tracking</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Performance benchmarking</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Marketing Tools</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Compliant email campaigns</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Referral tracking system</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Review management</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Social media scheduling</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Training & Support</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Video training library included</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Done-for-you setup options</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Ongoing technical support</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Regular feature updates</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Form */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-6">
                Join the Waitlist
              </h2>
              <p className="text-xl text-brand-slate mb-4">
                Be the first to experience BirdiSkool Core and secure founder's pricing when we launch in Q2 2025.
              </p>
              <div className="bg-brand-emerald/10 rounded-lg p-6 mb-8">
                <p className="font-montserrat font-semibold text-brand-emerald text-lg">
                  Waitlist members save £100/month off regular pricing
                </p>
              </div>
            </div>
            
            <ContactForm 
              formType="crm" 
              title="BirdiSkool Core (CRM) Waitlist"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
