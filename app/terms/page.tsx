import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - BirdiSkool',
  description: 'BirdiSkool Terms of Service - Terms and conditions for using our services and programs.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-indigo mb-8">
                Terms of Service
              </h1>
              <p className="text-brand-slate mb-8">Last updated: December 2024</p>
              
              <div className="prose max-w-none">
                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="text-brand-slate mb-6">
                  By accessing and using BirdiSkool's website and services, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">2. Service Description</h2>
                <p className="text-brand-slate mb-4">
                  BirdiSkool provides business education and consulting services specifically designed for healthcare 
                  professionals, including:
                </p>
                <ul className="list-disc pl-6 text-brand-slate mb-6">
                  <li>12-Week Implementer Program</li>
                  <li>BirdiSkool Conclave (Elite Mastermind)</li>
                  <li>BirdiSkool Core CRM System (when available)</li>
                  <li>Educational content and resources</li>
                </ul>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">3. Professional Disclaimer</h2>
                <p className="text-brand-slate mb-6">
                  BirdiSkool provides business education and consulting services. We do not provide medical, legal, 
                  or financial advice. All content is for educational purposes only. You should consult with 
                  appropriate professionals regarding specific medical, legal, or financial matters affecting your practice.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">4. Program Terms and Payments</h2>
                <p className="text-brand-slate mb-4">
                  <strong>Application Process:</strong> All programs require an application process. Acceptance is at 
                  BirdiSkool's discretion.
                </p>
                <p className="text-brand-slate mb-4">
                  <strong>Payment Terms:</strong> Payment is required in full upon acceptance unless alternative 
                  arrangements are made in writing.
                </p>
                <p className="text-brand-slate mb-6">
                  <strong>Refund Policy:</strong> Refunds are considered on a case-by-case basis within 7 days of 
                  program commencement, subject to program materials accessed.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">5. Intellectual Property</h2>
                <p className="text-brand-slate mb-6">
                  All content, materials, and resources provided by BirdiSkool are protected by copyright and other 
                  intellectual property laws. You may not reproduce, distribute, or create derivative works without 
                  express written permission.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">6. Confidentiality and Professional Standards</h2>
                <p className="text-brand-slate mb-6">
                  BirdiSkool respects the confidential nature of healthcare practice information. We maintain strict 
                  confidentiality regarding any practice-specific information shared during our programs. Participants 
                  are expected to maintain similar confidentiality regarding other participants' information.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">7. Code of Conduct</h2>
                <p className="text-brand-slate mb-4">
                  All participants must:
                </p>
                <ul className="list-disc pl-6 text-brand-slate mb-6">
                  <li>Maintain professional standards consistent with their healthcare qualifications</li>
                  <li>Respect other participants and BirdiSkool staff</li>
                  <li>Not share proprietary materials or content outside the program</li>
                  <li>Comply with all applicable healthcare regulations and professional standards</li>
                </ul>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">8. Limitation of Liability</h2>
                <p className="text-brand-slate mb-6">
                  BirdiSkool shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages resulting from your use of our services. Our total liability shall not exceed the amount 
                  paid for the specific service in question.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">9. Governing Law</h2>
                <p className="text-brand-slate mb-6">
                  These terms shall be governed by and construed in accordance with the laws of England and Wales. 
                  Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">10. Contact Information</h2>
                <p className="text-brand-slate mb-4">
                  For questions regarding these terms, please contact us at:
                </p>
                <p className="text-brand-slate">
                  Email: <a href="mailto:contact@birdiskool.com" className="text-brand-blue hover:underline">contact@birdiskool.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
