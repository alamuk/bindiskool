import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Crown, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conclave - Lead with Influence | BirdiSkool',
  description: 'Conclave: From Success to Significance. Elite mastermind for £250K+ earners. Scale your impact, personal brand, and business value. £24,000/year invite-only.',
};

export default function ConclavePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-gold to-yellow-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Crown className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
                Conclave
              </h1>
              <h2 className="text-2xl md:text-3xl text-white mb-8">
                Lead with Influence — From Success to Significance
              </h2>
              <div className="text-center mb-8">
                <div className="mb-4">
                  <span className="font-playfair text-5xl md:text-6xl font-bold text-white">£24,000</span>
                  <span className="text-xl ml-2 text-white/80">+ VAT upfront</span>
                  <p className="text-lg mt-2 text-white/80">or £2,400/month for 12 months (£28,800 total)</p>
                </div>
              </div>
              <div className="bg-brand-indigo text-white text-sm font-montserrat font-semibold px-6 py-3 rounded-full inline-block">
                INVITE ONLY — £250K+ EARNERS
              </div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-8 text-center">
                Scale Beyond Your Own Delivery
              </h2>
              
              <div className="bg-gray-50 rounded-2xl p-8 mb-16">
                <p className="text-xl text-brand-slate leading-relaxed mb-6">
                  The Conclave helps elite healthcare entrepreneurs scale beyond their own delivery — building leadership, 
                  brand authority, media presence, and new ventures.
                </p>
                <p className="text-lg text-brand-slate leading-relaxed">
                  For clinicians earning £250K+ who want to become industry leaders, not just practitioners. This is where 
                  success transforms into lasting significance.
                </p>
              </div>

              {/* Who Should Apply */}
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-6">Who This Is For</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>Clinicians earning £250K+ annually</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>Ready to scale beyond personal delivery</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>Committed to building industry authority</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>Open to exploring new ventures & partnerships</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-6">What You'll Achieve</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>Leadership beyond clinical practice</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>Media presence & thought leadership</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>New business ventures & profit centers</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span>Access to elite peer network</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Features */}
              <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-8 text-center">
                Your Conclave Experience
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-brand-gold/10 to-yellow-100 border border-brand-gold/20 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Mentorship</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Weekly 1:1 mentoring with senior faculty</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Personalized strategy & implementation support</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-gold/10 to-yellow-100 border border-brand-gold/20 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Conclave Circle</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Weekly mastermind sessions with elite peers</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">WhatsApp access & monthly in-person intensive</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-gold/10 to-yellow-100 border border-brand-gold/20 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Retreats</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">2× annual 2-day luxury retreats</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Focus on strategy, wellness & expansion</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-gold/10 to-yellow-100 border border-brand-gold/20 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Leadership Development</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Team design & profit centre development</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Delegation frameworks & performance systems</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-gold/10 to-yellow-100 border border-brand-gold/20 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Authority & Media</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">PR positioning & book strategy</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Keynote training & thought-leadership video series</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-gold/10 to-yellow-100 border border-brand-gold/20 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Investment / AI Access</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Access to BirdiSkool Ventures</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Birdi AI Labs & affiliate partnerships</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-gold/10 to-yellow-100 border border-brand-gold/20 rounded-xl p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Peer Mastery</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Small curated group of 10 elite clinicians</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Sharing insights & collaboration opportunities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-6">
                Apply for Conclave
              </h2>
              <p className="text-xl text-brand-slate mb-4">
                Conclave membership is invite-only. Applications are carefully reviewed for fit, commitment, and alignment with our community values.
              </p>
              <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-lg p-4 inline-block">
                <p className="text-brand-indigo font-montserrat font-semibold">
                  £24,000 + VAT upfront or £2,400/month for 12 months
                </p>
                <p className="text-sm text-brand-slate mt-1">
                  Monthly total: £28,800 + VAT | Limited to 10 members
                </p>
              </div>
            </div>
            
            <ContactForm 
              formType="conclave" 
              title="Conclave Membership Application"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
