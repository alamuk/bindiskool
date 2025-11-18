"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/birdiskool-logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    {
      href: "https://inder-oatroyqt.scoreapp.com/",
      label: "Scorecard",
      external: true,
    },
    { href: "/implementer", label: "Implementer" },
    { href: "/conclave", label: "Conclave" },
    { href: "/crm", label: "CRM" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center py-2 px-2 bg-white rounded"
            data-testid="logo-link"
          >
            <Image
              src={logoImage}
              alt="BirdiSkool"
              height={36}
              width={180}
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "36px",
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat text-sm font-medium text-brand-indigo hover:text-brand-blue transition-colors"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-montserrat text-sm font-medium text-brand-indigo hover:text-brand-blue transition-colors"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-brand-indigo" />
            ) : (
              <Menu className="h-6 w-6 text-brand-indigo" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 font-montserrat text-base font-medium text-brand-indigo hover:text-brand-blue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 font-montserrat text-base font-medium text-brand-indigo hover:text-brand-blue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
