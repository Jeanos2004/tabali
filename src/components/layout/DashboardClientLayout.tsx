// src/components/layout/DashboardClientLayout.tsx
"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<"client" | "provider" | "admin">("client");

  useEffect(() => {
    // S'exécute uniquement côté client
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("userType");
    if (typeParam === "provider" || typeParam === "admin") {
      setUserType(typeParam);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardSidebar userType={userType} />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
