"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProviderDashboardSidebar } from "@/components/layout/provider-dashboard-sidebar";

// Composant client séparé qui utilise useSearchParams
function ProviderDashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"client" | "provider" | "admin">("provider");

  useEffect(() => {
    // Utiliser useSearchParams au lieu de window.location.search
    const typeParam = searchParams?.get("userType");
    if (typeParam === "client" || typeParam === "admin") {
      setUserType(typeParam as "client" | "admin");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProviderDashboardSidebar userType={userType} />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}

// Layout principal avec Suspense
export default function ProviderDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-64 bg-slate-100 animate-pulse"></div>
        <div className="flex-1 p-4 md:p-8">
          <div className="w-full h-[200px] bg-slate-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    }>
      <ProviderDashboardLayoutContent>{children}</ProviderDashboardLayoutContent>
    </Suspense>
  );
}
