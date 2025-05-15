"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Clock, 
  DollarSign,
  Search
} from "lucide-react";
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

// Type pour les services
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
}

// Données fictives pour les services
const MOCK_SERVICES: Service[] = [
  {
    id: "service-1",
    name: "Consultation juridique",
    description: "Consultation juridique personnalisée pour répondre à vos questions.",
    price: 150,
    duration: 60,
    category: "Juridique",
    isActive: true
  },
  {
    id: "service-2",
    name: "Rédaction de contrat",
    description: "Rédaction de contrats personnalisés adaptés à vos besoins.",
    price: 250,
    duration: 120,
    category: "Juridique",
    isActive: true
  },
  {
    id: "service-3",
    name: "Conseil fiscal",
    description: "Conseils fiscaux pour optimiser votre situation.",
    price: 180,
    duration: 90,
    category: "Finance",
    isActive: true
  }
];

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setServices(MOCK_SERVICES);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les services en fonction de la recherche
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fonction pour supprimer un service
  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Fonction pour activer/désactiver un service
  const toggleServiceStatus = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-tabali-text">Mes services</h1>
          <p className="text-tabali-muted-text">Gérez les services que vous proposez à vos clients</p>
        </div>
        <Link href="/dashboard-provider/services/new">
          <button className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Nouveau service</span>
          </button>
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tabali-muted-text" />
        <input
          type="text"
          placeholder="Rechercher un service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
        />
      </div>

      {/* Liste des services */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 bg-slate-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-tabali-muted-text">Aucun service ne correspond à votre recherche.</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredServices.map((service) => (
                <motion.div key={service.id} variants={item}>
                  <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium text-tabali-text">{service.name}</h3>
                            <Badge 
                              variant={service.isActive ? "default" : "outline"}
                              className={service.isActive 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : "bg-gray-50 text-gray-700 border-gray-200"}
                            >
                              {service.isActive ? "Actif" : "Inactif"}
                            </Badge>
                          </div>
                          <p className="text-sm text-tabali-muted-text mt-1">{service.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-tabali-text">
                              <DollarSign className="h-4 w-4 text-tabali-primary" />
                              <span>{service.price}€</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-tabali-text">
                              <Clock className="h-4 w-4 text-tabali-primary" />
                              <span>{service.duration} min</span>
                            </div>
                            <div className="text-xs px-2 py-1 bg-tabali-muted/30 rounded-md">
                              {service.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button 
                            onClick={() => toggleServiceStatus(service.id)}
                            className="p-2 text-tabali-text hover:bg-tabali-muted/50 rounded-md transition-all"
                            title={service.isActive ? "Désactiver" : "Activer"}
                          >
                            {service.isActive ? "Désactiver" : "Activer"}
                          </button>
                          <Link href={`/dashboard-provider/services/${service.id}/edit`}>
                            <button className="p-2 text-tabali-primary hover:bg-tabali-primary/10 rounded-md transition-all">
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => deleteService(service.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
