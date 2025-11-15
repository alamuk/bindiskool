import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Award, Users, Target, CheckCircle } from 'lucide-react';
import founderImage from '@assets/5c2ae072-35e8-407c-8f9b-d7923157e4e9_1759266484418.jpeg';

export const metadata: Metadata = {
  title: 'About BirdiSkool - Founded by Inder Birdi, Entrepreneur of the Year 2025',
  description: 'Meet Inder Birdi, Entrepreneur of the Year 2025 (Entrepreneurs Circle) and founder of BirdiSkool. A 7-figure practice surgeon transforming how healthcare professionals build successful practices.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-brand">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
                About BirdiSkool
              </h1>
              <h2 className="text-xl md:text-2xl mb-8 opacity-90">
                Transforming hidden experts into visible leaders
              </h2>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-8">
                    Built by Someone Who's Walked the Path
                  </h2>
                  <div className="space-y-6 text-brand-slate">
                    <p>
                      BirdiSkool was founded by Inder, a practicing surgeon who built a 7-figure private practice 
                      while pioneering minimally invasive surgical techniques that have transformed patient outcomes.
                    </p>
                    <p>
                      After years of clinical excellence, Inder realized that being exceptional at medicine doesn't 
                      automatically translate to business success. The journey from skilled practitioner to successful 
                      entrepreneur requires a different set of tools—tools that weren't taught in medical school.
                    </p>
                    <p>
                      Through trial, error, and eventual success, Inder developed the systems and strategies that 
                      transformed a struggling practice into a thriving 7-figure enterprise. Now, these proven 
                      methodologies form the foundation of BirdiSkool's programs.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl shadow-brand overflow-hidden bg-gray-100 relative">
                    <Image
                      src={founderImage}
                      alt="Inder Birdi - Founder of BirdiSkool"
                      fill
                      className="object-cover"
                      data-testid="img-founder"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-indigo/95 to-transparent p-6 text-white">
                      <p className="font-montserrat font-semibold text-lg" data-testid="text-founder-name">Inder Birdi</p>
                      <p className="text-sm opacity-90">Founder & 7-Figure Surgeon</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-brand-gold" />
                        <p className="text-xs opacity-90" data-testid="text-founder-award">Entrepreneur of the Year 2025</p>
                      </div>
                      <p className="text-xs opacity-75">Entrepreneurs Circle</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-brand-gold" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-2">Entrepreneur of the Year 2025</h3>
                  <p className="text-brand-slate">Recognized by Entrepreneurs Circle for excellence in building and scaling healthcare businesses</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-brand-emerald" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-2">7-Figure Practice</h3>
                  <p className="text-brand-slate">Built and scaled a successful private practice from startup to 7-figure revenue</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-brand-gold" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-brand-indigo mb-2">Pioneer</h3>
                  <p className="text-brand-slate">Developed new surgical approaches that improve patient outcomes and recovery times</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-12 text-center">
                Our Mission
              </h2>
              
              <div className="bg-white rounded-2xl p-8 shadow-brand">
                <div className="text-center mb-8">
                  <h3 className="font-playfair text-2xl font-bold text-brand-indigo mb-4">
                    Transform Hidden Experts into Visible Leaders
                  </h3>
                  <p className="text-xl text-brand-slate leading-relaxed">
                    Every healthcare professional has the potential to build a practice that serves more patients, 
                    generates sustainable income, and creates the lifestyle they deserve—all while maintaining 
                    the highest standards of care.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">What We Believe</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Clinical excellence and business success can coexist</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Healthcare marketing must respect patient trust and compliance</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Systems and processes enable better patient care</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Every practitioner deserves financial freedom</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">How We're Different</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Founded and led by a practicing healthcare professional</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Strategies tested in real healthcare environments</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Focus on implementation, not just education</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5" />
                        <span className="text-sm">Compliance and ethics built into every strategy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-indigo mb-12">
                Why BirdiSkool Exists
              </h2>
              
              <div className="bg-gradient-brand rounded-2xl p-8 text-white">
                <p className="text-xl leading-relaxed mb-6">
                  "Too many brilliant healthcare professionals struggle with the business side of practice. 
                  They're exceptional clinicians but feel lost when it comes to marketing, systems, and growth. 
                  This gap between clinical skill and business acumen is what BirdiSkool exists to bridge."
                </p>
                <p className="font-montserrat font-semibold">
                  — Inder Birdi, Founder
                </p>
              </div>
              
              <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="font-playfair text-3xl font-bold text-brand-blue mb-2">500+</div>
                  <p className="text-brand-slate">Healthcare professionals helped</p>
                </div>
                <div>
                  <div className="font-playfair text-3xl font-bold text-brand-emerald mb-2">£10M+</div>
                  <p className="text-brand-slate">Additional revenue generated</p>
                </div>
                <div>
                  <div className="font-playfair text-3xl font-bold text-brand-gold mb-2">95%</div>
                  <p className="text-brand-slate">Client satisfaction rate</p>
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
