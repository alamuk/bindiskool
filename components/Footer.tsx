import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-indigo py-12 sm:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand + intro */}
          <div className="md:col-span-2 text-center md:text-left">
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start space-x-2 mb-4"
            >
              <span className="font-playfair text-2xl font-bold text-white">
                Birdi
              </span>
              <span className="font-playfair text-2xl font-bold text-brand-gold">
                Skool
              </span>
            </Link>

            <p className="text-white/80 mb-4 sm:mb-6 max-w-md mx-auto md:mx-0 text-sm sm:text-base">
              Helping healthcare professionals turn skill into scale, creating
              the impact, income, and lifestyle they deserve.
            </p>

            <a
              href="mailto:contact@birdiskool.com"
              className="inline-block text-sm sm:text-base text-brand-gold hover:underline font-montserrat"
              data-testid="email-contact"
            >
              contact@birdiskool.com
            </a>
          </div>

          {/* Programs */}
          <div className="text-center md:text-left">
            <h4 className="font-montserrat font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Programs
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/implementer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  12-Week Implementer
                </Link>
              </li>
              <li>
                <Link
                  href="/conclave"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  BirdiSkool Conclave
                </Link>
              </li>
              <li>
                <Link
                  href="/crm"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  BirdiSkool Core (CRM)
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <h4 className="font-montserrat font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Company
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 mt-10 pt-6 sm:mt-12 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs sm:text-sm text-center md:text-left">
            © 2026 BirdiSkool Ltd. All rights reserved.
          </p>

          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Youtube className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
