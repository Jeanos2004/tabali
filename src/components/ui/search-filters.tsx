"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SERVICES, CITIES } from "@/lib/constants";
import { motion } from "framer-motion";

interface SearchFiltersProps {
  onFilterChange: (filters: {
    service: string;
    location: string;
    minRating: number;
    maxPrice: number;
  }) => void;
  initialFilters?: {
    service: string;
    location: string;
    minRating: number;
    maxPrice: number;
  };
}

export function SearchFilters({
  onFilterChange,
  initialFilters = {
    service: "",
    location: "",
    minRating: 0,
    maxPrice: 100000,
  },
}: SearchFiltersProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (
    key: "service" | "location" | "minRating" | "maxPrice",
    value: string | number
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-xl border border-tabali-border shadow-tabali-sm overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="service" className="block text-sm font-medium text-tabali-foreground mb-1">
              Service
            </label>
            <select
              id="service"
              className="block w-full px-4 py-2 rounded-md border-tabali-border shadow-tabali-sm focus:border-tabali-primary focus:ring-tabali-primary sm:text-sm"
              value={filters.service}
              onChange={(e) => handleFilterChange("service", e.target.value)}
            >
              <option value="">Tous les services</option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="location" className="block text-sm font-medium text-tabali-foreground mb-1">
              Localisation
            </label>
            <select
              id="location"
              className="block w-full px-4 py-2 rounded-md border-tabali-border shadow-tabali-sm focus:border-tabali-primary focus:ring-tabali-primary sm:text-sm"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            >
              <option value="">Toutes les villes</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-tabali-border">
            <div className="flex-1">
              <label htmlFor="minRating" className="block text-sm font-medium text-tabali-foreground mb-1">
                Note minimale
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  id="minRating"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange("minRating", parseFloat(e.target.value))}
                  className="w-full h-2 bg-tabali-muted rounded-lg appearance-none cursor-pointer accent-tabali-primary"
                />
                <span className="text-sm font-medium bg-tabali-primary text-white px-2 py-0.5 rounded-md">{filters.minRating}</span>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-tabali-foreground mb-1">
                Prix maximum (GNF)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  id="maxPrice"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value))}
                  className="w-full h-2 bg-tabali-muted rounded-lg appearance-none cursor-pointer accent-tabali-primary"
                />
                <span className="text-sm font-medium bg-tabali-primary text-white px-2 py-0.5 rounded-md">
                  {new Intl.NumberFormat("fr-GN").format(filters.maxPrice)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            className="text-sm font-medium text-tabali-primary hover:text-tabali-primary-dark transition-colors duration-300 flex items-center gap-1 group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              {isExpanded ? (
                <>
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
                    className="h-4 w-4"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  <span>Masquer les filtres avancés</span>
                </>
              ) : (
                <>
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
                    className="h-4 w-4"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  <span>Afficher les filtres avancés</span>
                </>
              )}
            </span>
          </button>

          <Button 
            type="button" 
            onClick={() => onFilterChange(filters)}
            className="tabali-btn tabali-btn-primary tabali-hover-lift"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Rechercher
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
