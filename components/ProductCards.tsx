'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Crown, CheckCircle, Lightbulb } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function ProductCards() {
  const [foundationPaymentType, setFoundationPaymentType] = useState<'upfront' | 'monthly'>('monthly');
  const [implementerPaymentType, setImplementerPaymentType] = useState<'upfront' | 'monthly'>('upfront');
  const [conclavePaymentType, setConclavePaymentType] = useState<'upfront' | 'monthly'>('upfront');

  const handleApplyFoundation = () => {
    trackEvent('click', 'product', 'apply_foundation');
    window.location.href = '/foundation';
  };

  const handleApplyImplementer = () => {
    trackEvent('click', 'product', 'apply_implementer');
    window.location.href = '/implementer';
  };

  const handleApplyConclave = () => {
    trackEvent('click', 'product', 'apply_conclave');
    window.location.href = '/conclave';
  };

  return (
    <section className="py-20 bg-gray-50" id="products">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-indigo mb-8">
            Choose Your Path to Freedom
          </h2>
          <p className="text-xl text-brand-slate leading-relaxed">
            Three distinct programs designed to meet you where you are and take you where you want to go.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Foundation Card */}
          <Card className="bg-white rounded-2xl shadow-brand hover-lift border border-gray-100 flex flex-col" data-testid="card-foundation">
            <CardContent className="p-8 flex flex-col flex-grow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-brand-emerald" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-2">Foundation</h3>
                <p className="text-brand-slate mb-6">Build Your Base</p>
                
                {/* Payment Toggle */}
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => setFoundationPaymentType('upfront')}
                    className={`px-4 py-2 rounded-lg text-sm font-montserrat font-semibold transition-all ${
                      foundationPaymentType === 'upfront'
                        ? 'bg-brand-emerald text-white'
                        : 'bg-gray-100 text-brand-slate hover:bg-gray-200'
                    }`}
                    data-testid="toggle-foundation-upfront"
                  >
                    Pay Upfront
                  </button>
                  <button
                    onClick={() => setFoundationPaymentType('monthly')}
                    className={`px-4 py-2 rounded-lg text-sm font-montserrat font-semibold transition-all ${
                      foundationPaymentType === 'monthly'
                        ? 'bg-brand-emerald text-white'
                        : 'bg-gray-100 text-brand-slate hover:bg-gray-200'
                    }`}
                    data-testid="toggle-foundation-monthly"
                  >
                    Monthly
                  </button>
                </div>

                <div className="text-center">
                  {foundationPaymentType === 'upfront' ? (
                    <>
                      <span className="font-playfair text-4xl font-bold text-brand-indigo">£5,000</span>
                      <span className="text-brand-slate"> + VAT</span>
                      <p className="text-sm text-brand-slate mt-1">One-time payment for the year</p>
                    </>
                  ) : (
                    <>
                      <span className="font-playfair text-4xl font-bold text-brand-indigo">£500</span>
                      <span className="text-brand-slate">/month</span>
                      <p className="text-sm text-brand-slate mt-1">12 months (£6,000 total + VAT)</p>
                    </>
                  )}
                  <p className="text-xs text-brand-slate mt-2">£0–£100K earners</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Monthly 1:1 + weekly group coaching</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Brand clarity, offer design & niche definition</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Website, SEO & Google Ads setup</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">CRM setup & financial tracking</span>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyFoundation}
                className="w-full bg-brand-emerald hover:bg-green-700 text-white font-montserrat font-semibold py-3 mt-auto"
                data-testid="button-apply-foundation"
              >
                Apply for Foundation
              </Button>
            </CardContent>
          </Card>

          {/* Implementer Card */}
          <Card className="bg-white rounded-2xl shadow-brand hover-lift border border-gray-100 flex flex-col" data-testid="card-implementer">
            <CardContent className="p-8 flex flex-col flex-grow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-2">Implementer</h3>
                <p className="text-brand-slate mb-6">Accelerate Growth</p>
                
                {/* Payment Toggle */}
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => setImplementerPaymentType('upfront')}
                    className={`px-4 py-2 rounded-lg text-sm font-montserrat font-semibold transition-all ${
                      implementerPaymentType === 'upfront'
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-brand-slate hover:bg-gray-200'
                    }`}
                    data-testid="toggle-implementer-upfront"
                  >
                    Pay Upfront
                  </button>
                  <button
                    onClick={() => setImplementerPaymentType('monthly')}
                    className={`px-4 py-2 rounded-lg text-sm font-montserrat font-semibold transition-all ${
                      implementerPaymentType === 'monthly'
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-brand-slate hover:bg-gray-200'
                    }`}
                    data-testid="toggle-implementer-monthly"
                  >
                    Monthly
                  </button>
                </div>

                <div className="text-center">
                  {implementerPaymentType === 'upfront' ? (
                    <>
                      <span className="font-playfair text-4xl font-bold text-brand-indigo">£5,500</span>
                      <span className="text-brand-slate"> + VAT</span>
                      <p className="text-sm text-brand-slate mt-1">One-time payment</p>
                    </>
                  ) : (
                    <>
                      <span className="font-playfair text-4xl font-bold text-brand-indigo">£2,000</span>
                      <span className="text-brand-slate">/month</span>
                      <p className="text-sm text-brand-slate mt-1">3 months (£6,000 total + VAT)</p>
                    </>
                  )}
                  <p className="text-xs text-brand-slate mt-2">£100K–£250K earners</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Weekly 1:1 + group acceleration calls</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Google + Meta Ads build & optimization</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">CRM automation & YouTube setup</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Call audit, script refinement & operations</span>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyImplementer}
                className="w-full bg-brand-blue hover:bg-blue-700 text-white font-montserrat font-semibold py-3 mt-auto"
                data-testid="button-apply-implementer"
              >
                Apply for Implementer
              </Button>
            </CardContent>
          </Card>
          
          {/* Conclave Card */}
          <Card className="bg-gradient-to-br from-brand-gold to-yellow-500 rounded-2xl shadow-brand hover-lift border border-yellow-200 relative overflow-hidden flex flex-col" data-testid="card-conclave">
            <div className="absolute top-4 right-4">
              <span className="bg-brand-indigo text-white text-xs font-montserrat font-semibold px-3 py-1 rounded-full">INVITE ONLY</span>
            </div>
            
            <CardContent className="p-8 flex flex-col flex-grow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-2">Conclave</h3>
                <p className="text-white/90 mb-6">Lead with Influence</p>
                
                {/* Payment Toggle */}
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => setConclavePaymentType('upfront')}
                    className={`px-4 py-2 rounded-lg text-sm font-montserrat font-semibold transition-all ${
                      conclavePaymentType === 'upfront'
                        ? 'bg-white text-brand-gold'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    data-testid="toggle-conclave-upfront"
                  >
                    Pay Upfront
                  </button>
                  <button
                    onClick={() => setConclavePaymentType('monthly')}
                    className={`px-4 py-2 rounded-lg text-sm font-montserrat font-semibold transition-all ${
                      conclavePaymentType === 'monthly'
                        ? 'bg-white text-brand-gold'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    data-testid="toggle-conclave-monthly"
                  >
                    Monthly
                  </button>
                </div>

                <div className="text-center">
                  {conclavePaymentType === 'upfront' ? (
                    <>
                      <span className="font-playfair text-4xl font-bold text-white">£24,000</span>
                      <span className="text-white/80"> + VAT</span>
                      <p className="text-sm text-white/80 mt-1">One-time payment for the year</p>
                    </>
                  ) : (
                    <>
                      <span className="font-playfair text-4xl font-bold text-white">£2,400</span>
                      <span className="text-white/80">/month</span>
                      <p className="text-sm text-white/80 mt-1">12 months (£28,800 total + VAT)</p>
                    </>
                  )}
                  <p className="text-xs text-white/80 mt-2">£250K+ earners</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white">Weekly 1:1 with senior faculty + mastermind</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white">2× annual luxury retreats + monthly intensives</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white">PR positioning, book strategy & keynote training</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white">Access to BirdiSkool Ventures & Birdi AI Labs</span>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyConclave}
                className="w-full bg-white text-brand-gold hover:bg-gray-100 font-montserrat font-semibold py-3 mt-auto"
                data-testid="button-apply-conclave"
              >
                Apply for Conclave
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
