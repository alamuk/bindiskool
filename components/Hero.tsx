"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const handleApplyFoundation = () => {
    trackEvent("click", "cta", "apply_foundation_hero");
    window.location.href = "/foundation";
  };

  const handleApplyImplementer = () => {
    trackEvent("click", "cta", "apply_implementer_hero");
    window.location.href = "/implementer";
  };

  const handleApplyConclave = () => {
    trackEvent("click", "cta", "apply_conclave_hero");
    window.location.href = "/conclave";
  };

  return (
    <section className="relative bg-gradient-brand py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your private practice should set you{" "}
            <span className="text-brand-gold">free</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            BirdiSkool shows healthcare professionals how to turn skill into
            scale, so you can create the impact, income, and lifestyle you
            deserve.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <Button
              onClick={handleApplyFoundation}
              className="bg-brand-emerald hover:bg-green-600 text-white font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-all hover-lift shadow-lg"
              data-testid="button-apply-foundation"
            >
              Foundation Programme
            </Button>
            <Button
              onClick={handleApplyImplementer}
              className="bg-brand-gold hover:bg-yellow-500 text-brand-indigo font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-all hover-lift shadow-lg"
              data-testid="button-apply-implementer"
            >
              Implementer Programme
            </Button>
            <Button
              onClick={handleApplyConclave}
              className="bg-white hover:bg-white/90 text-brand-indigo font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-all hover-lift shadow-lg"
              data-testid="button-apply-conclave"
            >
              Conclave Mastermind
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
