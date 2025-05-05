// src/components/layout/DashboardClientLayout.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
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
