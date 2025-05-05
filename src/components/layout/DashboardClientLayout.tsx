// src/components/layout/DashboardClientLayout.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

// Composant client séparé qui utilise useSearchParams
function DashboardClientLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"client" | "provider" | "admin">("client");

  useEffect(() => {
    // Utiliser useSearchParams au lieu de window.location.search
    const typeParam = searchParams?.get("userType");
    if (typeParam === "provider" || typeParam === "admin") {
      setUserType(typeParam as "provider" | "admin");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardSidebar userType={userType} />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}

// Ajout des imports manquants
import { useSearchParams } from "next/navigation";

// Layout principal avec Suspense
export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-64 bg-slate-100 animate-pulse"></div>
        <div className="flex-1 p-4 md:p-8">
          <div className="w-full h-[200px] bg-slate-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    }>
      <DashboardClientLayoutContent>{children}</DashboardClientLayoutContent>
    </Suspense>
  );
}
