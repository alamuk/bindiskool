import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - BirdiSkool',
  description: 'BirdiSkool Privacy Policy - How we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-brand-indigo mb-8">
                Privacy Policy
              </h1>
              <p className="text-brand-slate mb-8">Last updated: December 2024</p>
              
              <div className="prose max-w-none">
                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">1. Information We Collect</h2>
                <p className="text-brand-slate mb-4">
                  We collect information you provide directly to us when you:
                </p>
                <ul className="list-disc pl-6 text-brand-slate mb-6">
                  <li>Apply for our programs (Implementer, Conclave, CRM waitlist)</li>
                  <li>Contact us through our contact form</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Interact with our website</li>
                </ul>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="text-brand-slate mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-brand-slate mb-6">
                  <li>Process and respond to your inquiries and applications</li>
                  <li>Provide you with information about our programs and services</li>
                  <li>Send you updates, newsletters, and promotional materials</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">3. Information Sharing</h2>
                <p className="text-brand-slate mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 text-brand-slate mb-6">
                  <li>To service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">4. Data Security</h2>
                <p className="text-brand-slate mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized 
                  access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
                  or electronic storage is 100% secure.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">5. Your Rights (GDPR)</h2>
                <p className="text-brand-slate mb-4">
                  If you are a resident of the European Union, you have the following rights:
                </p>
                <ul className="list-disc pl-6 text-brand-slate mb-6">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure of your data</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">6. Cookies and Analytics</h2>
                <p className="text-brand-slate mb-6">
                  We use cookies and similar technologies to improve your experience on our website. We also use 
                  Google Analytics to understand how visitors interact with our site. You can control cookie settings 
                  through your browser preferences.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">7. Healthcare Professional Confidentiality</h2>
                <p className="text-brand-slate mb-6">
                  We understand the importance of confidentiality in healthcare. Any information shared about your 
                  practice, patient demographics, or business operations will be kept strictly confidential and used 
                  only for the purpose of providing our services.
                </p>

                <h2 className="font-playfair text-2xl font-bold text-brand-indigo mt-8 mb-4">8. Contact Us</h2>
                <p className="text-brand-slate mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
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
