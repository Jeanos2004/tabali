"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#008751]">Tabali</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
            >
              Accueil
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
            >
              Rechercher
            </Link>
            <Link
              href="/booking"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
            >
              Réservation
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
            >
              Tableau de bord
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
            >
              À propos
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="secondary">Connexion</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="default">Inscription</Button>
            </Link>
          </div>
          <button
            ref={buttonRef}
            className="flex items-center justify-center rounded-md p-2.5 text-slate-700 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-16 inset-x-0 z-40 bg-white shadow-md md:hidden animate-slide-down"
        >
          <nav className="flex flex-col gap-4 py-6 px-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
              onClick={() => setIsMenuOpen(false)}
            >
              Rechercher
            </Link>
            <Link
              href="/booking"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
              onClick={() => setIsMenuOpen(false)}
            >
              Réservation
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
              onClick={() => setIsMenuOpen(false)}
            >
              Tableau de bord
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#008751]"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>

            <div className="flex flex-col gap-2 pt-2">
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Inscription</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
