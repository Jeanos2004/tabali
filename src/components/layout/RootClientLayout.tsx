// src/components/layout/RootClientLayout.tsx
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si window est défini (côté client uniquement)
    if (typeof window !== "undefined") {
      // Vérifier si l'URL contient un paramètre userType
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("userType");

      if (typeParam === "provider" || typeParam === "admin") {
        setUserType(typeParam);
      }
    }
  }, []);

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
