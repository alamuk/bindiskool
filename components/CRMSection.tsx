'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Database, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function CRMSection() {
  const handleJoinWaitlist = () => {
    trackEvent('click', 'product', 'join_crm_waitlist');
    window.location.href = '/crm';
  };

  return (
    <section className="py-20 bg-white" id="crm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-indigo mb-6">
            BirdiSkool Core CRM
          </h2>
          <p className="text-xl text-brand-slate leading-relaxed">
            The all-in-one practice management system built specifically for healthcare professionals
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-white rounded-2xl shadow-brand hover-lift border border-gray-100 relative" data-testid="card-crm">
            <div className="absolute top-4 right-4">
              <span className="bg-brand-blue text-white text-xs font-montserrat font-semibold px-3 py-1 rounded-full">COMING SOON</span>
            </div>
            
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 text-center md:text-left">
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6">
                    <Database className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="font-playfair text-3xl font-bold text-brand-indigo mb-3">BirdiSkool Core</h3>
                  <p className="text-brand-slate mb-6">Complete Practice Management</p>
                  
                  <div className="text-center md:text-left mb-6">
                    <span className="font-playfair text-4xl font-bold text-brand-indigo">£295</span>
                    <span className="text-brand-slate">/month</span>
                    <p className="text-sm text-brand-slate mt-2">Founder's early access pricing</p>
                  </div>

                  <Button 
                    onClick={handleJoinWaitlist}
                    className="w-full bg-brand-blue hover:bg-blue-700 text-white font-montserrat font-semibold py-4 text-lg"
                    data-testid="button-join-waitlist-crm"
                  >
                    Join Early Access List
                  </Button>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="font-montserrat text-lg font-semibold text-brand-indigo mb-4">Everything You Need to Run Your Practice</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Complete CRM with patient lifecycle management</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automated booking system & appointment reminders</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Follow-up workflows & treatment plan tracking</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Comprehensive patient dashboards & analytics</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Video training library for your team</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Done-for-you upgrade options available</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-brand-blue/5 border border-brand-blue/20 rounded-lg p-4">
                    <p className="text-sm text-brand-indigo font-montserrat font-semibold">
                      🎯 Early Access Benefit: Lock in £295/month pricing before we go to market at £495/month
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
