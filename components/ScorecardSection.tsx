'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function ScorecardSection() {
  const handleGetScorecard = () => {
    trackEvent('click', 'scorecard', 'get_free_scorecard');
    window.open('https://inder-oatroyqt.scoreapp.com/', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-700" id="scorecard">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-6">
              Discover Your Growth Potential with BirdiSkool's Free Scorecard
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <p className="text-xl md:text-2xl text-white font-semibold mb-6 text-center">
              Take our quick and insightful scorecard to find out where your practice stands today and uncover opportunities for growth.
            </p>
            
            <div className="space-y-4 text-white/90 text-lg mb-8">
              <p>
                In just a few minutes, you'll get a clear picture of your strengths and areas to improve, along with tailored guidance to help you move forward with confidence.
              </p>
              <p>
                The best part? It's <span className="font-bold text-brand-gold">completely free</span> — no strings attached. Whether you're just starting out or looking to scale, this scorecard is designed to give you clarity and direction on your journey.
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={handleGetScorecard}
                className="bg-brand-gold hover:bg-yellow-500 text-brand-indigo font-montserrat font-bold px-6 sm:px-10 py-4 sm:py-6 rounded-lg text-base sm:text-xl transition-all hover-lift shadow-xl inline-flex items-center gap-2 sm:gap-3"
                data-testid="button-get-scorecard"
              >
                <span className="hidden sm:inline">Get your FREE Scorecard here</span>
                <span className="sm:hidden">Get FREE Scorecard</span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <p className="text-white/70 text-sm mt-4">
                No credit card required • Takes less than 5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
