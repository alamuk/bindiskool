import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact BirdiSkool - Get in Touch',
  description: 'Contact BirdiSkool for healthcare practice growth support. Email us at contact@birdiskool.com or use our contact form.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-brand">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
                Get in Touch
              </h1>
              <h2 className="text-xl md:text-2xl mb-8 opacity-90">
                Ready to transform your practice? We're here to help.
              </h2>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-brand-blue" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-2">Email Us</h3>
                  <a 
                    href="mailto:contact@birdiskool.com" 
                    className="text-brand-blue hover:underline"
                    data-testid="email-contact-main"
                  >
                    contact@birdiskool.com
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-brand-emerald" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-2">Location</h3>
                  <p className="text-brand-slate">
                    United Kingdom<br />
                    Serving healthcare professionals globally
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-brand-gold" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-2">Response Time</h3>
                  <p className="text-brand-slate">
                    Within 24 hours<br />
                    Monday - Friday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-brand-slate">
                Whether you have questions about our programs or need guidance on your practice growth journey, 
                we're here to help you succeed.
              </p>
            </div>
            
            <ContactForm 
              formType="contact" 
              title="Contact BirdiSkool"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-12 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Who is BirdiSkool designed for?
                  </h3>
                  <p className="text-brand-slate">
                    BirdiSkool is designed for healthcare professionals including surgeons, GPs, dentists, consultants, 
                    and other medical practitioners who want to grow their private practice while maintaining excellent 
                    patient care standards.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    How is BirdiSkool different from other business programs?
                  </h3>
                  <p className="text-brand-slate">
                    BirdiSkool is founded and led by a practicing surgeon who built a 7-figure practice. Our strategies 
                    are healthcare-specific, compliance-focused, and tested in real medical environments. We understand 
                    the unique challenges healthcare professionals face.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    What's the time commitment for your programs?
                  </h3>
                  <p className="text-brand-slate">
                    The 12-Week Implementer requires 2-3 hours per week. The Conclave involves weekly 1:1 sessions, 
                    group calls, and quarterly intensives. All programs are designed to work around your clinical schedule.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-montserrat text-lg font-semibold text-brand-indigo mb-3">
                    Do you guarantee results?
                  </h3>
                  <p className="text-brand-slate">
                    While we can't guarantee specific outcomes, our strategies are proven and tested. Success depends on 
                    implementation and commitment. We provide all the tools, training, and support needed for success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
