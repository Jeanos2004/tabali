"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  Calendar, 
  Plus, 
  Trash2, 
  Save,
  AlertCircle
} from "lucide-react";

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

// Interfaces pour les disponibilités
interface Day {
  id: number;
  name: string;
}

interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface NewSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

// Jours de la semaine
const DAYS_OF_WEEK: Day[] = [
  { id: 1, name: "Lundi" },
  { id: 2, name: "Mardi" },
  { id: 3, name: "Mercredi" },
  { id: 4, name: "Jeudi" },
  { id: 5, name: "Vendredi" },
  { id: 6, name: "Samedi" },
  { id: 0, name: "Dimanche" }
];

// Heures disponibles (de 8h à 20h)
const AVAILABLE_HOURS = Array.from({ length: 25 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
}).filter(time => {
  const hour = parseInt(time.split(":")[0]);
  return hour < 20 || (hour === 20 && time.split(":")[1] === "00");
});

// Données fictives pour les disponibilités
const MOCK_AVAILABILITY: AvailabilitySlot[] = [
  {
    id: "slot-1",
    dayOfWeek: 1, // Lundi
    startTime: "09:00",
    endTime: "12:00"
  },
  {
    id: "slot-2",
    dayOfWeek: 1, // Lundi
    startTime: "14:00",
    endTime: "18:00"
  },
  {
    id: "slot-3",
    dayOfWeek: 3, // Mercredi
    startTime: "10:00",
    endTime: "15:00"
  },
  {
    id: "slot-4",
    dayOfWeek: 5, // Vendredi
    startTime: "10:00",
    endTime: "15:00"
  }
];

export default function AvailabilityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [newSlot, setNewSlot] = useState<NewSlot>({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00"
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setAvailabilitySlots(MOCK_AVAILABILITY);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Vérifier si le nouveau créneau est valide
  const validateNewSlot = () => {
    if (newSlot.startTime >= newSlot.endTime) {
      setError("L'heure de début doit être antérieure à l'heure de fin");
      return false;
    }

    // Vérifier les chevauchements avec les créneaux existants pour le même jour
    const overlappingSlot = availabilitySlots.find(slot => 
      slot.dayOfWeek === newSlot.dayOfWeek && 
      ((newSlot.startTime < slot.endTime && newSlot.endTime > slot.startTime) ||
       (slot.startTime < newSlot.endTime && slot.endTime > newSlot.startTime))
    );

    if (overlappingSlot) {
      setError("Ce créneau chevauche un créneau existant pour ce jour");
      return false;
    }

    return true;
  };

  // Ajouter un nouveau créneau de disponibilité
  const addAvailabilitySlot = () => {
    setError("");

    if (!validateNewSlot()) {
      return;
    }

    const newAvailabilitySlot = {
      id: `slot-${Date.now()}`,
      ...newSlot
    };

    setAvailabilitySlots([...availabilitySlots, newAvailabilitySlot]);
    
    // Réinitialiser le formulaire
    setNewSlot({
      dayOfWeek: 1,
      startTime: "09:00",
      endTime: "17:00"
    });

    // Afficher un message de succès
    setSuccessMessage("Créneau de disponibilité ajouté avec succès");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Supprimer un créneau de disponibilité
  const removeAvailabilitySlot = (id: string) => {
    setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== id));
    
    // Afficher un message de succès
    setSuccessMessage("Créneau de disponibilité supprimé avec succès");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Enregistrer toutes les disponibilités
  const saveAvailability = () => {
    setIsSaving(true);
    
    // Simuler l'enregistrement des données
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Disponibilités enregistrées avec succès");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  // Fonction supprimée car non utilisée

  // Trier les créneaux par jour et heure de début
  const sortedSlots = [...availabilitySlots].sort((a, b) => {
    if (a.dayOfWeek !== b.dayOfWeek) {
      return a.dayOfWeek - b.dayOfWeek;
    }
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-tabali-text">Disponibilité</h1>
        <p className="text-tabali-muted-text">Gérez vos créneaux de disponibilité pour les réservations</p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 bg-slate-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Ajouter un nouveau créneau */}
          <motion.div variants={item}>
            <Card className="border-tabali-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium text-tabali-text mb-4 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-tabali-primary" />
                  Ajouter un créneau de disponibilité
                </h2>

                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-tabali-muted-text mb-1">
                      Jour de la semaine
                    </label>
                    <select
                      value={newSlot.dayOfWeek}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewSlot({ ...newSlot, dayOfWeek: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                    >
                      {DAYS_OF_WEEK.map((day) => (
                        <option key={day.id} value={day.id}>
                          {day.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-tabali-muted-text mb-1">
                      Heure de début
                    </label>
                    <select
                      value={newSlot.startTime}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                    >
                      {AVAILABLE_HOURS.map((time) => (
                        <option key={`start-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-tabali-muted-text mb-1">
                      Heure de fin
                    </label>
                    <select
                      value={newSlot.endTime}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                    >
                      {AVAILABLE_HOURS.map((time) => (
                        <option key={`end-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={addAvailabilitySlot}
                    className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter ce créneau</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Créneaux existants */}
          <motion.div variants={item}>
            <Card className="border-tabali-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium text-tabali-text mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-tabali-primary" />
                  Mes créneaux de disponibilité
                </h2>

                {sortedSlots.length === 0 ? (
                  <div className="text-center py-6 bg-tabali-muted/20 rounded-md">
                    <Clock className="h-12 w-12 text-tabali-muted-text mx-auto mb-2" />
                    <p className="text-tabali-muted-text">Vous n&apos;avez pas encore défini de créneaux de disponibilité.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Grouper par jour de la semaine */}
                    {DAYS_OF_WEEK.map((day) => {
                      const daySlots = sortedSlots.filter(slot => slot.dayOfWeek === day.id);
                      if (daySlots.length === 0) return null;
                      
                      return (
                        <div key={day.id} className="border border-tabali-border rounded-md overflow-hidden">
                          <div className="bg-tabali-muted/20 px-4 py-2 font-medium">
                            {day.name}
                          </div>
                          <div className="divide-y divide-tabali-border">
                            {daySlots.map((slot) => (
                              <div key={slot.id} className="px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-tabali-primary" />
                                  <span>{slot.startTime} - {slot.endTime}</span>
                                </div>
                                <button
                                  onClick={() => removeAvailabilitySlot(slot.id)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-all"
                                  title="Supprimer ce créneau"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={saveAvailability}
                    disabled={isSaving}
                    className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Enregistrer toutes les disponibilités</span>
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
