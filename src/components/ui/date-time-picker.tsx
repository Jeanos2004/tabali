"use client";

import { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DateTimePickerProps {
  availableDays: string[];
  availableHours: {
    start: string;
    end: string;
  };
  onDateTimeChange: (date: string, timeSlot: { start: string; end: string }) => void;
}

export function DateTimePicker({
  availableDays,
  availableHours,
  onDateTimeChange,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ start: string; end: string } | null>(
    null
  );
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    { start: string; end: string }[]
  >([]);

  // Générer les dates disponibles pour les 14 prochains jours
  useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
      
      // Vérifier si le jour est disponible
      if (availableDays.includes(dayName.charAt(0).toUpperCase() + dayName.slice(1))) {
        const formattedDate = date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        dates.push(formattedDate);
      }
    }
    
    setAvailableDates(dates);
  }, [availableDays]);

  // Générer les créneaux horaires disponibles
  useEffect(() => {
    if (!availableHours) return;
    
    const timeSlots: { start: string; end: string }[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [startHour, startMinute] = availableHours.start.split(":").map(Number);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [endHour, endMinute] = availableHours.end.split(":").map(Number);
    
    // Créer des créneaux d'une heure
    for (let hour = startHour; hour < endHour; hour++) {
      const start = `${hour.toString().padStart(2, "0")}:00`;
      const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
      timeSlots.push({ start, end });
    }
    
    setAvailableTimeSlots(timeSlots);
  }, [availableHours]);

  // Mettre à jour le callback lorsque la date ou le créneau change
  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      onDateTimeChange(selectedDate, selectedTimeSlot);
    }
  }, [selectedDate, selectedTimeSlot, onDateTimeChange]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choisissez une date</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {availableDates.map((date, index) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  selectedDate === date
                    ? "border-[#008751] bg-[#008751]/5"
                    : "hover:border-slate-300"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <CardContent className="p-3 text-center">
                  <p className="text-sm font-medium">
                    {new Date(date.split(" ").reverse().join("-")).toLocaleDateString("fr-FR", {
                      weekday: "short",
                    })}
                  </p>
                  <p className="text-lg font-semibold">
                    {date.split(" ")[0]}
                  </p>
                  <p className="text-xs text-slate-500">
                    {date.split(" ")[1]} {date.split(" ")[2]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Choisissez un créneau horaire</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableTimeSlots.map((timeSlot, index) => (
              <motion.div
                key={`${timeSlot.start}-${timeSlot.end}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedTimeSlot?.start === timeSlot.start
                      ? "border-[#008751] bg-[#008751]/5"
                      : "hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedTimeSlot(timeSlot)}
                >
                  <CardContent className="p-3 text-center">
                    <p className="text-lg font-semibold">
                      {timeSlot.start} - {timeSlot.end}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTimeSlot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#008751]/5 rounded-lg border border-[#008751]/20"
        >
          <p className="text-center font-medium">
            Vous avez sélectionné le{" "}
            <span className="font-semibold">{selectedDate}</span> de{" "}
            <span className="font-semibold">
              {selectedTimeSlot.start} à {selectedTimeSlot.end}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}
