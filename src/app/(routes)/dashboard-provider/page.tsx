"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // ✅ ton propre bouton
import { Dialog } from "@/components/ui/dialog"; // ✅ ton composant Dialog personnalisé
import AddServiceForm from "./AddServiceForm"; // ✅ local dans le même dossier
import {
  Calendar,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  PlusCircle
} from "lucide-react";
import { RecentBookingsSection } from "@/components/dashboard-provider/RecentBookingsSection";
import { PopularServicesSection } from "@/components/dashboard-provider/PopularServicesSection";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

// Types
interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalRevenue: number;
  totalClients: number;
  averageRating: number;
}

export default function ProviderDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    totalClients: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalBookings: 42,
        pendingBookings: 7,
        completedBookings: 35,
        totalRevenue: 3850,
        totalClients: 28,
        averageRating: 4.8,
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-tabali-text">Tableau de bord prestataire</h1>
          <p className="text-tabali-muted-text">Bienvenue sur votre espace prestataire Tabali</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 bg-tabali-primary text-white hover:bg-tabali-primary/90"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Nouveau service</span>
        </Button>
      </div>

      {/* Modal d'ajout de service */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-tabali-text">Ajouter un service</h2>
        <AddServiceForm />
      </Dialog>

      {/* Statistiques */}
      <StatsSection isLoading={isLoading} stats={stats} />

      {/* Réservations récentes */}
      <RecentBookingsSection isLoading={isLoading} />

      {/* Services populaires */}
      <PopularServicesSection isLoading={isLoading} />
    </div>
  );
}

// Section des statistiques
function StatsSection({ isLoading, stats }: { isLoading: boolean; stats: DashboardStats }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {/* Total réservations */}
      <motion.div variants={item}>
        <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-tabali-muted-text text-sm">Total réservations</p>
                <h3 className="text-2xl font-bold text-tabali-text mt-1">
                  {isLoading ? "..." : stats.totalBookings}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-tabali-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-tabali-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {isLoading ? "..." : stats.pendingBookings} en attente
              </Badge>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                {isLoading ? "..." : stats.completedBookings} terminées
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenus */}
      <motion.div variants={item}>
        <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-tabali-muted-text text-sm">Revenus</p>
                <h3 className="text-2xl font-bold text-tabali-text mt-1">
                  {isLoading ? "..." : `${stats.totalRevenue} GNF`}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-tabali-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-tabali-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">+12% ce mois-ci</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clients */}
      <motion.div variants={item}>
        <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-tabali-muted-text text-sm">Clients</p>
                <h3 className="text-2xl font-bold text-tabali-text mt-1">
                  {isLoading ? "..." : stats.totalClients}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-tabali-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-tabali-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">+5 nouveaux ce mois-ci</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Évaluation moyenne */}
      <motion.div variants={item}>
        <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-tabali-muted-text text-sm">Évaluation moyenne</p>
                <h3 className="text-2xl font-bold text-tabali-text mt-1">
                  {isLoading ? "..." : stats.averageRating}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-tabali-primary/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-tabali-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(stats.averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-tabali-muted-text ml-2">
                basé sur {isLoading ? "..." : stats.totalBookings} avis
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
