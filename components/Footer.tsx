import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-indigo py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="font-playfair text-2xl font-bold text-white">Birdi</span>
              <span className="font-playfair text-2xl font-bold text-brand-gold">Skool</span>
            </Link>
            <p className="text-white/80 mb-6 max-w-md">
              Helping healthcare professionals turn skill into scale, creating the impact, income, and lifestyle they deserve.
            </p>
            <a 
              href="mailto:contact@birdiskool.com" 
              className="text-brand-gold hover:underline font-montserrat"
              data-testid="email-contact"
            >
              contact@birdiskool.com
            </a>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/implementer" className="text-white/80 hover:text-white transition-colors">
                  12-Week Implementer
                </Link>
              </li>
              <li>
                <Link href="/conclave" className="text-white/80 hover:text-white transition-colors">
                  BirdiSkool Conclave
                </Link>
              </li>
              <li>
                <Link href="/crm" className="text-white/80 hover:text-white transition-colors">
                  BirdiSkool Core (CRM)
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© 2024 BirdiSkool Ltd. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Linkedin className="h-4 w-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Twitter className="h-4 w-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Youtube className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
