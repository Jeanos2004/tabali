"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MOCK_PROVIDERS } from "@/lib/constants";
import { Provider } from "@/types";

import { motion } from "framer-motion";
import { ProviderHeader } from '@/components/profile/ProviderHeader'
import { ProviderTabs } from '@/components/profile/ProviderTabs'
import { ProviderLocation } from "@/components/profile/ProviderLocation";
import { ProviderBookingCard } from '@/components/profile/ProviderBookingCard'
import { ProviderNotFound } from '@/components/profile/ProviderNotFound'



export default function ProviderProfilePage() {
  const params = useParams();
  const providerId = params.id as string;
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <ProviderNotFound />
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
              <ProviderHeader provider={provider} />

              <ProviderTabs provider={provider} />

              <ProviderLocation provider={provider} />
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          > 
          <ProviderBookingCard provider={provider} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
