"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-violet/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-primary">JOLLY</span>{" "}
              <span className="text-gold">JOKER</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/keikat"
              className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Keikat
            </Link>
            <Link
              href="/poytavaraus"
              className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Pöytävaraus
            </Link>
            <a
              href="#yhteystiedot"
              className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Yhteystiedot
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Valikko"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-violet/20">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              href="/keikat"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Keikat
            </Link>
            <Link
              href="/poytavaraus"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Pöytävaraus
            </Link>
            <a
              href="#yhteystiedot"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            >
              Yhteystiedot
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
