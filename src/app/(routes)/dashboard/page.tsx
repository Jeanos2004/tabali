"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOCK_PROVIDERS } from "@/lib/constants";

export default function DashboardPage() {
  const [userType, setUserType] = useState<"client" | "provider" | "admin">("client");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    bookings: 0,
    completed: 0,
    upcoming: 0,
    favorites: 0,
    revenue: 0,
    pendingReviews: 0,
  });

  // Simuler un chargement de données
  useEffect(() => {
    const timer = setTimeout(() => {
      // Vérifier si l'URL contient un paramètre userType
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("userType");
      
      if (typeParam === "provider" || typeParam === "admin") {
        setUserType(typeParam);
      }

      // Générer des statistiques fictives selon le type d'utilisateur
      if (typeParam === "provider") {
        setStats({
          bookings: 24,
          completed: 18,
          upcoming: 6,
          favorites: 0,
          revenue: 1250000,
          pendingReviews: 3,
        });
      } else if (typeParam === "admin") {
        setStats({
          bookings: 156,
          completed: 124,
          upcoming: 32,
          favorites: 0,
          revenue: 7800000,
          pendingReviews: 15,
        });
      } else {
        setStats({
          bookings: 8,
          completed: 5,
          upcoming: 3,
          favorites: 4,
          revenue: 0,
          pendingReviews: 2,
        });
      }

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-[120px] bg-slate-100 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {userType === "client"
            ? "Tableau de bord client"
            : userType === "provider"
            ? "Tableau de bord prestataire"
            : "Tableau de bord administrateur"}
        </h1>
        <p className="text-slate-500">
          {userType === "client"
            ? "Gérez vos réservations et vos prestataires favoris"
            : userType === "provider"
            ? "Gérez vos services et vos réservations"
            : "Supervisez l'activité de la plateforme"}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Réservations totales</p>
                  <h3 className="text-2xl font-bold">{stats.bookings}</h3>
                </div>
                <div className="rounded-full bg-[#008751]/10 p-3 text-[#008751]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Réservations à venir</p>
                  <h3 className="text-2xl font-bold">{stats.upcoming}</h3>
                </div>
                <div className="rounded-full bg-[#FCD116]/10 p-3 text-[#FCD116]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Réservations terminées</p>
                  <h3 className="text-2xl font-bold">{stats.completed}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {userType === "client" && (
          <motion.div variants={item}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Prestataires favoris</p>
                    <h3 className="text-2xl font-bold">{stats.favorites}</h3>
                  </div>
                  <div className="rounded-full bg-red-100 p-3 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {(userType === "provider" || userType === "admin") && (
          <motion.div variants={item}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Revenu total</p>
                    <h3 className="text-2xl font-bold">{stats.revenue.toLocaleString()} GNF</h3>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <line x1="12" x2="12" y1="2" y2="22"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Avis en attente</p>
                  <h3 className="text-2xl font-bold">{stats.pendingReviews}</h3>
                </div>
                <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {userType === "client"
              ? "Réservations récentes"
              : userType === "provider"
              ? "Dernières demandes"
              : "Dernières activités"}
          </h2>
          <Link href="/dashboard/bookings">
            <Button variant="outline" size="sm">
              Voir tout
            </Button>
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {[...Array(3)].map((_, index) => (
            <motion.div key={index} variants={item}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-[#008751] to-[#FCD116] opacity-70"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">
                            {userType === "client"
                              ? `Réservation avec ${MOCK_PROVIDERS[index].name}`
                              : userType === "provider"
                              ? `Demande de Client ${index + 1}`
                              : `Réservation #${100 + index}`}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {new Date(
                              Date.now() - index * 24 * 60 * 60 * 1000
                            ).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-800"
                                : index === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {index === 0
                              ? "En attente"
                              : index === 1
                              ? "Confirmé"
                              : "Terminé"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {userType === "client" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Prestataires recommandés</h2>
            <Link href="/search">
              <Button variant="outline" size="sm">
                Rechercher
              </Button>
            </Link>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MOCK_PROVIDERS.map((provider, index) => (
              <motion.div key={provider.id} variants={item}>
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-[#008751] to-[#FCD116] opacity-70"></div>
                      </div>
                      <div>
                        <h3 className="font-medium">{provider.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3 text-[#FCD116]"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>
                            {provider.rating} ({provider.reviewCount} avis)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {provider.services.slice(0, 2).map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[#008751]/10 text-[#008751]"
                        >
                          {service}
                        </span>
                      ))}
                      {provider.services.length > 2 && (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700">
                          +{provider.services.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Link href={`/profile/${provider.id}`}>
                        <Button variant="outline" size="sm">
                          Voir le profil
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
