// src/components/layout/RootClientLayout.tsx
"use client";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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

  // Utilisation de useEffect pour s'assurer que ce code s'exécute uniquement côté client
  useEffect(() => {
    // Le code à l'intérieur de useEffect s'exécute uniquement côté client
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("userType");

    if (typeParam === "provider" || typeParam === "admin") {
      setUserType(typeParam);
    }
  }, []);

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        data-user-type={userType}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
