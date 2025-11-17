import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { AwardsBanner } from "@/components/AwardsBanner";
import { ScorecardSection } from "@/components/ScorecardSection";
import { ProductCards } from "@/components/ProductCards";
import { CRMSection } from "@/components/CRMSection";
import { HomeBlogSection } from "@/components/HomeBlogSection";

import { TrendingDown, Clock, Target, Check, Award } from "lucide-react";
import founderImage from "@assets/553332c3-96f5-450e-bc01-263f80bc2e3d_1759441538062.jpg";

export const metadata: Metadata = {
  title: "BirdiSkool - Your private practice should set you free",
  description:
    "BirdiSkool shows healthcare professionals how to turn skill into scale, so you can create the impact, income, and lifestyle you deserve.",
};

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <AwardsBanner />

        {/* Problem Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-indigo mb-8">
                Clinical brilliance ≠ business success
              </h2>
              <p className="text-xl text-brand-slate leading-relaxed mb-12">
                You're exceptional at what you do. Your patients trust you with
                their lives. But when it comes to growing your practice, scaling
                your impact, and building the business you dreamed of,
                everything feels uncertain.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">
                    Inconsistent Revenue
                  </h3>
                  <p className="text-brand-slate">
                    Unpredictable patient flow and seasonal dips
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">
                    Time Overwhelm
                  </h3>
                  <p className="text-brand-slate">
                    Working harder but not smarter or freer
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">
                    Unclear Strategy
                  </h3>
                  <p className="text-brand-slate">
                    No roadmap from where you are to where you want to be
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ScorecardSection />

        {/* Solution Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-indigo mb-8">
                Why agencies and courses fail you
              </h2>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Founder Image */}
              <div className="relative mb-8">
                <div className="aspect-square rounded-2xl shadow-brand overflow-hidden bg-gray-100 relative max-w-md mx-auto">
                  <Image
                    src={founderImage}
                    alt="Inder Birdi - Founder of BirdiSkool"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                    quality={95}
                    data-testid="img-founder-home"
                  />
                </div>
              </div>

              {/* Founder Name and Title */}
              <div className="text-center mb-6">
                <h3
                  className="font-playfair text-3xl font-bold text-brand-indigo mb-2"
                  data-testid="text-founder-name-home"
                >
                  Inder Birdi
                </h3>
                <p className="text-lg text-brand-slate mb-4">
                  7-Figure Surgeon &amp; BirdiSkool Founder
                </p>

                {/* Featured Award Badge */}
                <div
                  className="inline-flex items-center gap-3 bg-linear-to-r from-brand-gold/10 to-brand-gold/5 border-2 border-brand-gold/30 rounded-full px-6 py-3 mb-8"
                  data-testid="badge-ec-winner"
                >
                  <Award
                    className="h-6 w-6 text-brand-gold"
                    data-testid="icon-award"
                  />
                  <span
                    className="font-montserrat font-bold text-brand-indigo"
                    data-testid="text-ec-winner"
                  >
                    Entrepreneur Circle 2025 UK Winner
                  </span>
                </div>
              </div>

              {/* Descriptor Text */}
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <p className="text-xl text-brand-slate leading-relaxed">
                  Most marketing agencies don't understand healthcare
                  compliance. Most business courses aren't built for medical
                  professionals. BirdiSkool is different—created by a 7-figure
                  surgeon who understands both worlds.
                </p>
              </div>

              {/* BirdiSkool Difference */}
              <div className="mt-12">
                <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-8 text-center">
                  The BirdiSkool Difference
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-emerald rounded-full flex items-center justify-center mt-1 shrink-0">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-lg mb-2">
                        Built by Experienced Healthcare Professionals
                      </h4>
                      <p className="text-brand-slate">
                        Created by a practicing surgeon who built a 7-figure
                        practice
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-emerald rounded-full flex items-center justify-center mt-1 shrink-0">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-lg mb-2">
                        Learning + Implementation
                      </h4>
                      <p className="text-brand-slate">
                        Not just theory—hands-on guidance to implement what you
                        learn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-emerald rounded-full flex items-center justify-center mt-1 shrink-0">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-lg mb-2">
                        Compliance-First
                      </h4>
                      <p className="text-brand-slate">
                        Every strategy respects healthcare regulations and
                        patient trust
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductCards />
        <CRMSection />

        {/* ⭐ Dynamic Blog Section as separate component */}
        <HomeBlogSection />

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-brand">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-8">
                Ready to set your practice free?
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Join hundreds of healthcare professionals who've transformed
                their practices with BirdiSkool. Choose your path to freedom
                today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/implementer"
                  className="bg-brand-gold hover:bg-yellow-500 text-brand-indigo font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-all hover-lift shadow-lg inline-block"
                >
                  Apply for Implementer
                </Link>
                <Link
                  href="/conclave"
                  className="bg-white text-brand-indigo hover:bg-gray-100 font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-all hover-lift shadow-lg inline-block"
                >
                  Apply for Conclave
                </Link>
                <Link
                  href="/crm"
                  className="bg-brand-emerald hover:bg-green-700 text-white font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-all hover-lift shadow-lg inline-block"
                >
                  Join CRM Waitlist
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
