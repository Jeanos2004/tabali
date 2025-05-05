"use client";

import { Provider } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProviderCardProps {
  provider: Provider;
  index: number;
}

export function ProviderCard({ provider, index }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="tabali-card-premium h-full transition-all duration-300 hover:shadow-tabali-lg group-hover:-translate-y-2 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-tabali-primary to-tabali-secondary"></div>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-tabali-muted flex-shrink-0 shadow-tabali-sm border-2 border-white">
              <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-80"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg font-tabali-serif">{provider.name}</h3>
              <div className="flex items-center gap-1 text-sm text-tabali-muted-foreground">
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
                  className="h-4 w-4 text-tabali-secondary"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>{provider.rating} ({provider.reviewCount} avis)</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-1">Services</h4>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 border-transparent bg-[#008751]/10 text-[#008751]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-1">Localisation</h4>
              <p className="text-sm">{provider.location.address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-1">Tarif horaire</h4>
              <p className="text-sm">{provider.hourlyRate.toLocaleString()} GNF</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-2">
          <Link href={`/profile/${provider.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Voir le profil
            </Button>
          </Link>
          <Link href={`/booking?provider=${provider.id}`} className="flex-1">
            <Button className="w-full">
              Réserver
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
