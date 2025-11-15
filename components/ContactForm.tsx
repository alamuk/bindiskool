'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

interface ContactFormProps {
  formType: 'contact' | 'foundation' | 'implementer' | 'conclave' | 'crm';
  title: string;
}

export function ContactForm({ formType, title }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const { toast } = useToast();

  // Map formType -> human-readable formName sent to API
  const formNameMap: Record<ContactFormProps['formType'], string> = {
    contact: 'Website Contact Form',
    foundation: 'Foundation Programme Enquiry',
    implementer: 'Implementer Program Application',
    conclave: 'Conclave Programme Application',
    crm: 'CRM / GoHighLevel Support Enquiry',
  };

  const formName = formNameMap[formType];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submit handler started');

    // Honeypot check
    if (honeypot) {
      console.warn('Bot detected');
      return;
    }

    // GDPR consent check
    if (!gdprConsent) {
      console.log('GDPR consent not checked');
      toast({
        title: 'Consent Required',
        description: 'Please agree to the data processing terms to continue.',
        variant: 'destructive',
      });
      return;
    }

    console.log('Starting submission...');
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      console.log('FormData created');

      // Capture UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);

      const data = {
        formName, // 👈 nice label for backend / GHL
        firstName: formData.get('firstName') as string | null,
        lastName: formData.get('lastName') as string | null,
        email: formData.get('email') as string | null,
        phone: formData.get('phone') as string | null,
        role: formData.get('role') as string | null,
        message: formData.get('message') as string | null,
        practice: formData.get('practice') as string | null,
        experience: formData.get('experience') as string | null,
        referralSource: formData.get('referralSource') as string | null,
        gdprConsent,
        marketingConsent,
        timestamp: new Date().toISOString(),
        source: window.location.pathname,
        website: honeypot, // 👈 honeypot: backend checks data.website
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || '',
      };

      console.log('Data object created, about to fetch...');

      // 👇 CHANGE: send to /api/form (your new handler)
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Fetch completed, status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', response.status, errorText);
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();
      console.log('Response parsed:', result);

      if (!result.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      trackEvent('form_submit', 'engagement', formType);

      toast({
        title: 'Success!',
        description: "Your form has been submitted. We'll be in touch soon.",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
      setGdprConsent(false);
      setMarketingConsent(false);
      setHoneypot('');
    } catch (error) {
      console.error('CATCH BLOCK - Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      toast({
        title: 'Error',
        description: `There was a problem submitting your form: ${errorMessage}. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      console.log('Finally block - resetting isSubmitting');
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl text-brand-indigo">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - name must be "website" */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                data-testid="input-firstname"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                data-testid="input-lastname"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              data-testid="input-email"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+44 7XXX XXXXXX"
              data-testid="input-phone"
            />
          </div>

          {formType !== 'contact' && (
            <>
              <div>
                <Label htmlFor="role">Your Role *</Label>
                <Input
                  id="role"
                  name="role"
                  type="text"
                  placeholder="e.g., Surgeon, GP, Dentist, Consultant"
                  required
                  data-testid="input-role"
                />
              </div>

              <div>
                <Label htmlFor="practice">Practice/Clinic Name</Label>
                <Input
                  id="practice"
                  name="practice"
                  type="text"
                  data-testid="input-practice"
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  data-testid="input-experience"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="message">
              {formType === 'contact'
                ? 'Message *'
                : 'Tell us about your goals and challenges *'}
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              data-testid="textarea-message"
            />
          </div>

          <div>
            <Label htmlFor="referralSource">How did you hear about us?</Label>
            <Input
              id="referralSource"
              name="referralSource"
              type="text"
              placeholder="e.g., Google, LinkedIn, Referral"
              data-testid="input-referral"
            />
          </div>

          <div className="space-y-4 pt-2 border-t">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="gdprConsent"
                checked={gdprConsent}
                onCheckedChange={(checked) =>
                  setGdprConsent(checked === true)
                }
                required
                data-testid="checkbox-gdpr"
              />
              <Label
                htmlFor="gdprConsent"
                className="text-sm font-normal leading-tight cursor-pointer"
              >
                I consent to BirdiSkool processing my personal data to respond to
                my enquiry. Your data will be handled in accordance with our
                Privacy Policy. *
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketingConsent"
                checked={marketingConsent}
                onCheckedChange={(checked) =>
                  setMarketingConsent(checked === true)
                }
                data-testid="checkbox-marketing"
              />
              <Label
                htmlFor="marketingConsent"
                className="text-sm font-normal leading-tight cursor-pointer"
              >
                I would like to receive marketing communications about BirdiSkool
                programmes, resources, and events.
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-blue hover:bg-blue-700 text-white font-montserrat font-semibold py-3"
            disabled={isSubmitting}
            data-testid="button-submit"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
