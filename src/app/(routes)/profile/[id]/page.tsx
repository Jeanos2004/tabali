"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MOCK_PROVIDERS } from "@/lib/constants";
import { Provider } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProviderMap } from "@/components/ui/provider-map";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProviderProfilePage() {
  const params = useParams();
  const providerId = params.id as string;
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"services" | "reviews" | "gallery">("services");

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      const foundProvider = MOCK_PROVIDERS.find((p) => p.id === providerId);
      setProvider(foundProvider || null);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [providerId]);

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12 w-full mx-auto">
        <div className="w-full h-[200px] bg-slate-100 animate-pulse rounded-lg mb-6"></div>
        <div className="w-3/4 h-8 bg-slate-100 animate-pulse rounded-lg mb-4"></div>
        <div className="w-1/2 h-6 bg-slate-100 animate-pulse rounded-lg mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="w-full h-[400px] bg-slate-100 animate-pulse rounded-lg"></div>
          </div>
          <div>
            <div className="w-full h-[200px] bg-slate-100 animate-pulse rounded-lg mb-4"></div>
            <div className="w-full h-[180px] bg-slate-100 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container py-8 md:py-12 mx-auto max-w-6xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-tabali-serif">Prestataire non trouvé</h1>
        <p className="text-tabali-muted-foreground mb-6 max-w-xl mx-auto">
          Le prestataire que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        <Link href="/search">
          <Button className="tabali-btn tabali-btn-primary">Retour à la recherche</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 mx-auto max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-[#008751] to-[#FCD116] opacity-70"></div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{provider.name}</h1>
                <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
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
                    className="h-4 w-4 text-[#FCD116]"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{provider.rating} ({provider.reviewCount} avis)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 border-transparent bg-[#008751]/10 text-[#008751]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <p className="text-slate-700">{provider.description}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="border-b border-slate-200 mb-6">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab("services")}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === "services"
                        ? "border-b-2 border-[#008751] text-[#008751]"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === "reviews"
                        ? "border-b-2 border-[#008751] text-[#008751]"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Avis
                  </button>
                  <button
                    onClick={() => setActiveTab("gallery")}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === "gallery"
                        ? "border-b-2 border-[#008751] text-[#008751]"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Galerie
                  </button>
                </div>
              </div>

              {activeTab === "services" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Services proposés</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {provider.services.map((service) => (
                      <Card key={service}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-[#008751]/10 p-2 text-[#008751]">
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
                                className="h-5 w-5"
                              >
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-medium">{service}</h3>
                              <p className="text-sm text-slate-500">À partir de {provider.hourlyRate.toLocaleString()} GNF/heure</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Avis clients</h2>
                  <div className="space-y-4">
                    {/* Avis fictifs */}
                    {[...Array(3)].map((_, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                              <div className="w-full h-full bg-gradient-to-br from-[#008751] to-[#FCD116] opacity-50"></div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">Client {index + 1}</h3>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill={i < 5 - index * 0.5 ? "currentColor" : "none"}
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-3 w-3 text-[#FCD116]"
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-slate-500 mb-1">Il y a {index + 1} mois</p>
                              <p className="text-sm">
                                {index === 0
                                  ? `Service impeccable ! ${provider.name} a été très professionnel et a fait un excellent travail.`
                                  : index === 1
                                  ? "Bon service, ponctuel et efficace. Je recommande."
                                  : "Prestataire compétent mais un peu en retard. Travail satisfaisant dans l&apos;ensemble."}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Galerie photos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-slate-100 rounded-lg overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-[#008751]/20 to-[#FCD116]/20"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Localisation</h2>
              <ProviderMap
                providers={[provider]}
                center={[provider.location.lat, provider.location.lng]}
                zoom={14}
              />
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Réserver un service</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-1">Tarif horaire</h3>
                    <p className="text-2xl font-bold text-[#008751]">
                      {provider.hourlyRate.toLocaleString()} GNF
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-1">Disponibilité</h3>
                    <p className="text-sm">
                      {provider.availability.days.join(", ")}
                      <br />
                      {provider.availability.hours.start} - {provider.availability.hours.end}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-1">Zones desservies</h3>
                    <div className="flex flex-wrap gap-1">
                      {provider.areasServed.map((area) => (
                        <span
                          key={area}
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href={`/booking?provider=${provider.id}`}>
                  <Button className="w-full">Réserver maintenant</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
