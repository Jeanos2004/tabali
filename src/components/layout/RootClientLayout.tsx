// src/components/layout/RootClientLayout.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import { usePathname } from "next/navigation";

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

// Composant client séparé qui utilise useSearchParams
function RootClientLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<string | null>(null);
  const pathname = usePathname();
  const isAuthPage = pathname?.includes("/auth/");

  useEffect(() => {
    // Utiliser useSearchParams au lieu de window.location.search
    const typeParam = searchParams?.get("userType");
    if (typeParam === "provider" || typeParam === "admin") {
      setUserType(typeParam);
    }
  }, [searchParams]);

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        data-user-type={userType}
      >
        {isAuthPage && <Navbar />}
        <main className="flex-1">{children}</main>
        {isAuthPage && <Footer />}
      </body>
    </html>
  );
}

// Ajout des imports manquants
import { useSearchParams } from "next/navigation";

// Layout principal avec Suspense
export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <html>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <Navbar />
          <main className="flex-1">
            <div className="container py-8 flex justify-center">
              <div className="w-12 h-12 border-t-2 border-b-2 border-[#008751] rounded-full animate-spin"></div>
            </div>
          </main>
          <Footer />
        </body>
      </html>
    }>
      <RootClientLayoutContent>{children}</RootClientLayoutContent>
    </Suspense>
  );
}
