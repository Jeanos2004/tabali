"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProviderMap } from "@/components/ui/provider-map";
import { SearchFilters } from "@/components/ui/search-filters";
import { ProviderCard } from "@/components/ui/provider-card";
import { MOCK_PROVIDERS } from "@/lib/constants";
import { Provider } from "@/types";
import { motion } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer les filtres initiaux depuis l'URL
  const initialFilters = {
    service: searchParams.get("service") || "",
    location: searchParams.get("location") || "",
    minRating: parseFloat(searchParams.get("minRating") || "0"),
    maxPrice: parseInt(searchParams.get("maxPrice") || "100000"),
  };

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: {
    service: string;
    location: string;
    minRating: number;
    maxPrice: number;
  }) => {
    // Filtrer les prestataires en fonction des critères
    const filtered = providers.filter((provider) => {
      const serviceMatch = !filters.service || provider.services.includes(filters.service);
      const locationMatch = !filters.location || provider.location.address.includes(filters.location);
      const ratingMatch = provider.rating >= filters.minRating;
      const priceMatch = provider.hourlyRate <= filters.maxPrice;

      return serviceMatch && locationMatch && ratingMatch && priceMatch;
    });

    setFilteredProviders(filtered);
  };

  return (
    <div className="container py-8 md:py-12 mx-auto">
      <div className="mb-8">
        <span className="tabali-badge tabali-badge-secondary inline-block mb-4">
          Recherche avancée
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-tabali-serif tracking-tight">Rechercher un <span className="text-tabali-primary">prestataire</span></h1>
        <p className="text-tabali-muted-foreground max-w-2xl text-lg">
          Trouvez le prestataire idéal pour répondre à vos besoins en quelques clics
        </p>
      </div>

      <div className="mb-6">
        <SearchFilters onFilterChange={handleFilterChange} initialFilters={initialFilters} />
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-tabali-muted-foreground font-medium">
          {filteredProviders.length} prestataire{filteredProviders.length !== 1 ? "s" : ""} trouvé
          {filteredProviders.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2 border border-tabali-border rounded-lg p-1 shadow-tabali-sm bg-white">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              viewMode === "list"
                ? "bg-tabali-primary text-white shadow-tabali-sm"
                : "bg-transparent text-tabali-foreground hover:bg-tabali-muted"
            }`}
            onClick={() => setViewMode("list")}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              Liste
            </div>
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              viewMode === "map"
                ? "bg-tabali-primary text-white shadow-tabali-sm"
                : "bg-transparent text-tabali-foreground hover:bg-tabali-muted"
            }`}
            onClick={() => setViewMode("map")}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
              Carte
            </div>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-[300px] bg-slate-100 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      ) : viewMode === "list" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <ProviderCard key={provider.id} provider={provider} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Aucun prestataire trouvé</h3>
              <p className="text-slate-500">
                Essayez de modifier vos critères de recherche pour trouver des prestataires disponibles.
              </p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          <ProviderMap providers={filteredProviders} />
        </motion.div>
      )}
    </div>
  );
}
