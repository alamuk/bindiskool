"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/birdiskool-logo.png";

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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* ===== TOP HEADER BAR (shared) ===== */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
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

            {/* ===== DESKTOP NAV (compartment 1) ===== */}
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

            {/* Mobile toggle button (only icon on small screens) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
              data-testid="mobile-menu-toggle"
            >
              <Menu className="h-6 w-6 text-brand-indigo" />
            </Button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE FULL-SCREEN DRAWER (compartment 2) ===== */}
      <div
        className={`fixed inset-0 z-50 md:hidden transform transition-transform duration-300 ease-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Solid background for the whole drawer */}
        <div className="absolute inset-0 bg-white" />

        {/* Optional dark overlay behind the sliding panel – uncomment if you want a dimmed background
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
        */}

        {/* Sliding panel */}
        <div className="relative z-10 flex h-full flex-col bg-white">
          {/* Drawer header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <Link
              href="/"
              className="flex items-center py-2 px-2 bg-white rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src={logoImage}
                alt="BirdiSkool"
                height={32}
                width={160}
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "32px",
                }}
              />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-brand-indigo" />
            </Button>
          </div>

          {/* Mobile nav items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-lg font-montserrat font-medium text-brand-indigo hover:text-brand-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-lg font-montserrat font-medium text-brand-indigo hover:text-brand-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Optional footer area inside drawer */}
          <div className="border-t border-gray-200 px-4 py-4 text-xs text-gray-500">
            © {new Date().getFullYear()} BirdiSkool Ltd.
          </div>
        </div>
      </div>
    </>
  );
}
