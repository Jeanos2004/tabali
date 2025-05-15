"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Settings, 
  User, 
  Briefcase, 
  BarChart4, 
  Menu, 
  X 
} from "lucide-react";

interface SidebarLink {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface ProviderDashboardSidebarProps {
  userType: "client" | "provider" | "admin";
}

export function ProviderDashboardSidebar({ userType }: ProviderDashboardSidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const providerLinks: SidebarLink[] = [
    {
      href: "/dashboard-provider",
      label: "Tableau de bord",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      href: "/dashboard-provider/services",
      label: "Mes services",
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      href: "/dashboard-provider/bookings",
      label: "Réservations",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      href: "/dashboard-provider/availability",
      label: "Disponibilité",
      icon: <Clock className="h-5 w-5" />
    },
    {
      href: "/dashboard-provider/analytics",
      label: "Analyses",
      icon: <BarChart4 className="h-5 w-5" />
    },
    {
      href: "/dashboard-provider/profile",
      label: "Mon profil",
      icon: <User className="h-5 w-5" />
    },
  ];

  const adminLinks: SidebarLink[] = [
    {
      href: "/admin",
      label: "Tableau de bord",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      href: "/admin/users",
      label: "Utilisateurs",
      icon: <User className="h-5 w-5" />
    },
    {
      href: "/admin/services",
      label: "Services",
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      href: "/admin/settings",
      label: "Paramètres",
      icon: <Settings className="h-5 w-5" />
    },
  ];

  const links = userType === "admin" ? adminLinks : providerLinks;

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-tabali-primary text-white p-3 rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar for mobile and desktop */}
      <motion.div
        className={`bg-white border-r border-tabali-border w-64 shrink-0 fixed inset-y-0 left-0 z-40 md:static transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        initial={false}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-tabali-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-tabali-primary rounded-md flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="text-xl font-serif font-bold text-tabali-text">Tabali</span>
            </Link>
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-tabali-secondary/20 text-tabali-secondary text-xs font-medium rounded-full">
                {userType === "provider" ? "Prestataire" : "Admin"}
              </span>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-tabali-primary/10 text-tabali-primary"
                          : "text-tabali-muted-text hover:bg-tabali-muted hover:text-tabali-text"
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="absolute left-0 w-1 h-6 bg-tabali-primary rounded-r-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-tabali-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tabali-muted flex items-center justify-center">
                <User className="h-5 w-5 text-tabali-primary" />
              </div>
              <div>
                <p className="font-medium text-tabali-text">Jeanos Ouranos</p>
                <p className="text-xs text-tabali-muted-text">jeanosOuranos@tabali.com</p>
              </div>
            </div>
            <Link
              href="/auth/logout"
              className="mt-4 block w-full text-center px-4 py-2 border border-tabali-border rounded-md hover:bg-tabali-muted/50 transition-all text-sm"
            >
              Déconnexion
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
