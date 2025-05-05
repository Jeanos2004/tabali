// src/components/layout/DashboardClientLayout.tsx
"use client";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Tabali - Connectez-vous avec des prestataires de services en Guinée",
  description: "Tabali connecte particuliers et prestataires (ménage, plomberie, électricité, etc.) en Guinée pour tous vos besoins quotidiens.",
};


import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'URL contient un paramètre userType
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("userType");

      if (typeParam === "provider" || typeParam === "admin") {
        setUserType(typeParam);
      }
    }
  })

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
