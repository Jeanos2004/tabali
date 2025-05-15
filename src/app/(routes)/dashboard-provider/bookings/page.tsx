"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle, 
  Filter,
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

// Interface pour les réservations
interface Booking {
  id: string;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  duration: number;
  status: string; // confirmed, pending, cancelled, completed
  price: number;
  notes: string;
}

// Données fictives pour les réservations
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "booking-1",
    serviceName: "Consultation juridique",
    clientName: "Sophie Martin",
    clientEmail: "sophie.martin@example.com",
    date: "2025-05-20",
    time: "10:00",
    duration: 60,
    status: "confirmed", // confirmed, pending, cancelled, completed
    price: 150,
    notes: "Première consultation pour conseil juridique"
  },
  {
    id: "booking-2",
    serviceName: "Rédaction de contrat",
    clientName: "Thomas Dubois",
    clientEmail: "thomas.dubois@example.com",
    date: "2025-05-21",
    time: "14:30",
    duration: 120,
    status: "pending",
    price: 250,
    notes: "Contrat de prestation de services"
  },
  {
    id: "booking-3",
    serviceName: "Conseil fiscal",
    clientName: "Julie Leroy",
    clientEmail: "julie.leroy@example.com",
    date: "2025-05-18",
    time: "09:00",
    duration: 90,
    status: "cancelled",
    price: 180,
    notes: "Annulé par le client"
  },
  {
    id: "booking-4",
    serviceName: "Consultation juridique",
    clientName: "Marc Petit",
    clientEmail: "marc.petit@example.com",
    date: "2025-05-15",
    time: "16:00",
    duration: 60,
    status: "completed",
    price: 150,
    notes: "Consultation terminée"
  }
];

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export default function BookingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setBookings(MOCK_BOOKINGS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les réservations en fonction de la recherche et du statut
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Fonction pour mettre à jour le statut d'une réservation
  const updateBookingStatus = (id: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case "confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Fonction pour obtenir le texte du statut en français
  const getStatusText = (status: string) => {
    switch(status) {
      case "confirmed":
        return "Confirmée";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulée";
      case "completed":
        return "Terminée";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-tabali-text">Réservations</h1>
        <p className="text-tabali-muted-text">Gérez les réservations de vos clients</p>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tabali-muted-text" />
          <input
            type="text"
            placeholder="Rechercher un client ou un service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tabali-muted-text" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50 appearance-none bg-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="confirmed">Confirmées</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulées</option>
            <option value="completed">Terminées</option>
          </select>
        </div>
      </div>

      {/* Liste des réservations */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 bg-slate-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-tabali-muted-text">Aucune réservation ne correspond à votre recherche.</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredBookings.map((booking) => (
                <motion.div key={booking.id} variants={item}>
                  <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-medium text-tabali-text">{booking.serviceName}</h3>
                            <Badge 
                              className={getStatusBadgeStyle(booking.status)}
                            >
                              {getStatusText(booking.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-tabali-primary" />
                              <div>
                                <p className="text-sm font-medium">{booking.clientName}</p>
                                <p className="text-xs text-tabali-muted-text">{booking.clientEmail}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-tabali-primary" />
                              <span className="text-sm">{formatDate(booking.date)}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-tabali-primary" />
                              <span className="text-sm">{booking.time} ({booking.duration} min)</span>
                            </div>
                          </div>
                          
                          {booking.notes && (
                            <p className="text-sm text-tabali-muted-text mt-2 italic">
                              Note: {booking.notes}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 self-end md:self-center">
                          {booking.status === "pending" && (
                            <>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                className="p-2 text-green-500 hover:bg-green-50 rounded-md transition-all"
                                title="Confirmer"
                              >
                                <CheckCircle2 className="h-5 w-5" />
                              </button>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-all"
                                title="Annuler"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          
                          {booking.status === "confirmed" && (
                            <button 
                              onClick={() => updateBookingStatus(booking.id, "completed")}
                              className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-all"
                            >
                              Marquer comme terminée
                            </button>
                          )}
                          
                          <Link href={`/dashboard-provider/bookings/${booking.id}`}>
                            <button className="px-3 py-1 text-sm bg-tabali-muted/50 text-tabali-text rounded-md hover:bg-tabali-muted transition-all">
                              Détails
                            </button>
                          </Link>
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
