import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dans une application réelle, nous récupérerions le type d'utilisateur depuis une API
  // Pour cette démo, nous simulons un utilisateur client par défaut
  const [userType, setUserType] = useState<"client" | "provider" | "admin">("client");

  // Simuler un changement de type d'utilisateur pour la démo
  useEffect(() => {
    // Vérifier si l'URL contient un paramètre userType
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("userType");
      
      if (typeParam === "provider" || typeParam === "admin") {
        setUserType(typeParam);
      }
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardSidebar userType={userType} />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
