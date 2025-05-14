"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

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

// Mock data for bookings
const MOCK_BOOKINGS = [
  {
    id: "booking-1",
    serviceName: "Consultation juridique",
    providerName: "Me. Sophie Martin",
    providerAvatar: "",
    date: "15 Mai 2025",
    time: "14:00 - 15:00",
    location: "Cabinet juridique, Paris",
    status: "upcoming"
  },
  {
    id: "booking-2",
    serviceName: "Conseil financier",
    providerName: "M. Thomas Dubois",
    providerAvatar: "",
    date: "20 Mai 2025",
    time: "10:30 - 11:30",
    location: "En ligne (Zoom)",
    status: "upcoming"
  },
  {
    id: "booking-3",
    serviceName: "Séance de coaching",
    providerName: "Mme. Claire Lefèvre",
    providerAvatar: "",
    date: "5 Mai 2025",
    time: "16:00 - 17:00",
    location: "Centre d'affaires, Lyon",
    status: "completed"
  },
  {
    id: "booking-4",
    serviceName: "Consultation médicale",
    providerName: "Dr. Jean Moreau",
    providerAvatar: "",
    date: "28 Avril 2025",
    time: "09:15 - 09:45",
    location: "Cabinet médical, Bordeaux",
    status: "completed"
  }
];

export default function BookingsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  
  const filteredBookings = MOCK_BOOKINGS.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-serif font-bold text-tabali-text">Mes réservations</h1>
        <p className="text-tabali-muted-text">Gérez vos rendez-vous et consultez l&apos;historique de vos réservations</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md transition-all ${filter === "all" 
            ? "bg-tabali-primary text-white" 
            : "bg-tabali-muted hover:bg-tabali-muted/80"}`}
        >
          Toutes
        </button>
        <button 
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-2 rounded-md transition-all ${filter === "upcoming" 
            ? "bg-tabali-primary text-white" 
            : "bg-tabali-muted hover:bg-tabali-muted/80"}`}
        >
          À venir
        </button>
        <button 
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md transition-all ${filter === "completed" 
            ? "bg-tabali-primary text-white" 
            : "bg-tabali-muted hover:bg-tabali-muted/80"}`}
        >
          Terminées
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <motion.div key={booking.id} variants={item}>
              <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-tabali-muted flex-shrink-0 border border-tabali-border">
                        {booking.providerAvatar ? (
                          <div className="relative w-full h-full">
                            <Image 
                              src={booking.providerAvatar} 
                              alt={booking.providerName} 
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-70 flex items-center justify-center text-white font-bold">
                            {booking.providerName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-tabali-text">{booking.serviceName}</h3>
                        <p className="text-sm text-tabali-muted-text">{booking.providerName}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={booking.status === "upcoming" ? "default" : "secondary"}
                    >
                      {booking.status === "upcoming" ? "À venir" : "Terminée"}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-tabali-muted-text">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-tabali-primary" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-tabali-primary" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-tabali-primary" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-tabali-muted-text">Aucune réservation {filter !== "all" ? (filter === "upcoming" ? "à venir" : "terminée") : ""} trouvée.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
