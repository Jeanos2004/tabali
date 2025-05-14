"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

// Mock data for favorite providers
const MOCK_FAVORITES = [
  {
    id: "provider-1",
    name: "Me. Sophie Martin",
    avatar: "",
    profession: "Avocate",
    rating: 4.8,
    location: "Paris",
    phone: "+33 1 23 45 67 89",
    services: ["Consultation juridique", "Rédaction de contrats"]
  },
  {
    id: "provider-2",
    name: "M. Thomas Dubois",
    avatar: "",
    profession: "Conseiller financier",
    rating: 4.9,
    location: "Lyon",
    phone: "+33 6 12 34 56 78",
    services: ["Conseil en investissement", "Planification financière"]
  },
  {
    id: "provider-3",
    name: "Mme. Claire Lefèvre",
    avatar: "",
    profession: "Coach professionnelle",
    rating: 4.7,
    location: "Bordeaux",
    phone: "+33 7 89 01 23 45",
    services: ["Coaching de carrière", "Développement personnel"]
  }
];

export default function FavoritesPage() {
  const [filter, setFilter] = useState<"all" | string>("all");
  
  const filteredFavorites = filter === "all" 
    ? MOCK_FAVORITES 
    : MOCK_FAVORITES.filter(provider => provider.profession.toLowerCase().includes(filter.toLowerCase()));

  // Extract unique professions for filtering
  const professions = Array.from(new Set(MOCK_FAVORITES.map(provider => provider.profession)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-serif font-bold text-tabali-text">Mes favoris</h1>
        <p className="text-tabali-muted-text">Retrouvez vos prestataires préférés</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button 
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md transition-all ${filter === "all" 
            ? "bg-tabali-primary text-white" 
            : "bg-tabali-muted hover:bg-tabali-muted/80"}`}
        >
          Tous
        </button>
        {professions.map((profession, index) => (
          <button 
            key={index}
            onClick={() => setFilter(profession)}
            className={`px-4 py-2 rounded-md transition-all ${filter === profession 
              ? "bg-tabali-primary text-white" 
              : "bg-tabali-muted hover:bg-tabali-muted/80"}`}
          >
            {profession}
          </button>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((provider) => (
            <motion.div key={provider.id} variants={item}>
              <Card className="border-tabali-border hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-tabali-muted flex-shrink-0 border border-tabali-border">
                      {provider.avatar ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={provider.avatar} 
                            alt={provider.name} 
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-70 flex items-center justify-center text-white font-bold text-xl">
                          {provider.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-tabali-text">{provider.name}</h3>
                      <p className="text-sm text-tabali-muted-text">{provider.profession}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm text-tabali-muted-text flex-1">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-tabali-primary" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-tabali-primary" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-tabali-text mb-1">Services proposés:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-tabali-border">
                    <Link 
                      href={`/profile/${provider.id}`}
                      className="block w-full text-center py-2 bg-tabali-muted hover:bg-tabali-muted/80 rounded-md transition-all text-sm font-medium"
                    >
                      Voir le profil
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 col-span-full">
            <p className="text-tabali-muted-text">Aucun prestataire favori trouvé.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
