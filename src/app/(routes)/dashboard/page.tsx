"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MOCK_PROVIDERS } from "@/lib/constants";
import { Calendar, Clock, Star, Heart, CheckCircle, User, Settings, Search } from "lucide-react";

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
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
          <div>
            <Badge className="tabali-badge tabali-badge-secondary mb-2">
              {userType === "client" ? "Espace Client" : userType === "provider" ? "Espace Prestataire" : "Administration"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-tabali-serif text-tabali-foreground">
              {userType === "client"
                ? "Bienvenue sur votre espace"
                : userType === "provider"
                ? "Tableau de bord prestataire"
                : "Tableau de bord administrateur"}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User size={14} />
              <span>Profil</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings size={14} />
              <span>Paramètres</span>
            </Button>
          </div>
        </div>
        
        <p className="text-tabali-muted-foreground text-lg mb-6">
          {userType === "client"
            ? "Gérez vos réservations et découvrez des prestataires de qualité"
            : userType === "provider"
            ? "Gérez vos services et suivez vos réservations"
            : "Supervisez l'activité de la plateforme et gérez les utilisateurs"}
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={item}>
          <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-tabali-muted-foreground mb-1">Réservations totales</p>
                  <h3 className="text-2xl font-bold font-tabali-serif text-tabali-foreground">{stats.bookings}</h3>
                </div>
                <div className="rounded-full bg-tabali-primary/10 p-3 text-tabali-primary">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-tabali-muted-foreground mb-1">Réservations à venir</p>
                  <h3 className="text-2xl font-bold font-tabali-serif text-tabali-foreground">{stats.upcoming}</h3>
                </div>
                <div className="rounded-full bg-tabali-secondary/10 p-3 text-tabali-secondary">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-tabali-muted-foreground mb-1">Réservations terminées</p>
                  <h3 className="text-2xl font-bold font-tabali-serif text-tabali-foreground">{stats.completed}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {userType === "client" && (
          <motion.div variants={item}>
            <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-tabali-muted-foreground mb-1">Prestataires favoris</p>
                    <h3 className="text-2xl font-bold font-tabali-serif text-tabali-foreground">{stats.favorites}</h3>
                  </div>
                  <div className="rounded-full bg-pink-100 p-3 text-pink-600">
                    <Heart className="h-6 w-6" />
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
          <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-tabali-muted-foreground mb-1">Avis en attente</p>
                  <h3 className="text-2xl font-bold font-tabali-serif text-tabali-foreground">{stats.pendingReviews}</h3>
                </div>
                <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-tabali-serif text-tabali-foreground">
            {userType === "client"
              ? "Réservations récentes"
              : userType === "provider"
              ? "Dernières demandes"
              : "Dernières activités"}
          </h2>
          <Link href="/dashboard/bookings">
            <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-tabali-primary/10">
              <span>Voir tout</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
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
              <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-tabali-muted flex-shrink-0 border border-tabali-border">
                      {index < MOCK_PROVIDERS.length && MOCK_PROVIDERS[index].profileImage ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={MOCK_PROVIDERS[index].profileImage} 
                            alt={MOCK_PROVIDERS[index].name} 
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-70 flex items-center justify-center text-white font-bold">
                          {userType === "client" ? 
                            MOCK_PROVIDERS[index]?.name?.charAt(0) || "P" : 
                            `C${index + 1}`
                          }
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-tabali-foreground">
                            {userType === "client"
                              ? `Réservation avec ${MOCK_PROVIDERS[index].name}`
                              : userType === "provider"
                              ? `Demande de Client ${index + 1}`
                              : `Réservation #${100 + index}`}
                          </h3>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-tabali-muted-foreground">
                              {new Date(
                                Date.now() - index * 24 * 60 * 60 * 1000
                              ).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <span className="text-xs text-tabali-muted-foreground">•</span>
                            <p className="text-sm text-tabali-muted-foreground">
                              {index === 0 ? "Plomberie" : index === 1 ? "Électricité" : "Menuiserie"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              index === 0
                                ? "bg-amber-100 text-amber-800"
                                : index === 1
                                ? "bg-tabali-primary/10 text-tabali-primary"
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
            <h2 className="text-2xl font-bold font-tabali-serif text-tabali-foreground">Prestataires recommandés</h2>
            <Link href="/search">
              <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-tabali-primary/10">
                <Search className="h-4 w-4" />
                <span>Rechercher</span>
              </Button>
            </Link>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MOCK_PROVIDERS.map((provider) => (
              <motion.div key={provider.id} variants={item}>
                <Card className="h-full border-tabali-border hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-tabali-muted flex-shrink-0 border border-tabali-border">
                        {provider.profileImage ? (
                          <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-70 flex items-center justify-center text-white font-bold">
                            {provider.name.charAt(0)}
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-70 flex items-center justify-center text-white font-bold">
                            {provider.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium font-tabali-serif text-tabali-foreground">{provider.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-tabali-muted-foreground">
                          <Star className="h-3 w-3 text-tabali-secondary fill-tabali-secondary" />
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
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-tabali-primary/10 text-tabali-primary"
                        >
                          {service}
                        </span>
                      ))}
                      {provider.services.length > 2 && (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-tabali-muted text-tabali-muted-foreground">
                          +{provider.services.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Link href={`/profile/${provider.id}`}>
                        <Button variant="outline" size="sm" className="hover:bg-tabali-primary/10 hover:text-tabali-primary transition-colors">
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
