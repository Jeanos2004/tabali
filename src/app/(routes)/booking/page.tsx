"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PROVIDERS } from "@/lib/constants";
import { Provider } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { BookingForm } from "@/components/ui/booking-form";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("provider");
  
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    address: "",
    description: "",
    date: "",
    timeSlot: {
      start: "",
      end: "",
    },
    isFormComplete: false,
    isDateTimeComplete: false,
  });

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      if (providerId) {
        const foundProvider = MOCK_PROVIDERS.find((p) => p.id === providerId);
        setProvider(foundProvider || null);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [providerId]);

  const handleFormChange = (formData: {
    service: string;
    address: string;
    description: string;
    isComplete: boolean;
  }) => {
    setBookingData({
      ...bookingData,
      service: formData.service,
      address: formData.address,
      description: formData.description,
      isFormComplete: formData.isComplete,
    });
  };

  const handleDateTimeChange = (date: string, timeSlot: { start: string; end: string }) => {
    setBookingData({
      ...bookingData,
      date,
      timeSlot,
      isDateTimeComplete: Boolean(date && timeSlot.start && timeSlot.end),
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Ici, nous simulons simplement une réservation réussie
    // Dans une application réelle, nous enverrions ces données à une API
    console.log("Réservation soumise:", {
      providerId,
      ...bookingData,
    });
    setCurrentStep(3);
  };

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="w-full h-[400px] bg-slate-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!provider && providerId) {
    return (
      <div className="container py-8 md:py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Prestataire non trouvé</h1>
        <p className="text-slate-500 mb-6">
          Le prestataire que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        <Link href="/search">
          <Button>Retour à la recherche</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Réserver un service</h1>
          {provider ? (
            <p className="text-slate-500">
              Vous êtes en train de réserver un service avec{" "}
              <span className="font-medium text-slate-700">{provider.name}</span>
            </p>
          ) : (
            <p className="text-slate-500">
              Remplissez le formulaire ci-dessous pour réserver un service
            </p>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-[#008751] text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    currentStep >= step ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  {step === 1
                    ? "Informations"
                    : step === 2
                    ? "Date & Heure"
                    : "Confirmation"}
                </span>
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Informations de réservation</h2>
              <BookingForm
                onFormChange={handleFormChange}
                services={provider ? provider.services : []}
              />
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!bookingData.isFormComplete}
                >
                  Continuer
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Choisissez une date et un horaire</h2>
              {provider && (
                <DateTimePicker
                  availableDays={provider.availability.days}
                  availableHours={provider.availability.hours}
                  onDateTimeChange={handleDateTimeChange}
                />
              )}
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Retour
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!bookingData.isDateTimeComplete}
                >
                  Confirmer la réservation
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[#008751]/10 p-6 text-[#008751]">
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
                    className="h-12 w-12"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Réservation confirmée !</h2>
              <p className="text-slate-500 mb-6">
                Votre réservation a été enregistrée avec succès. Vous recevrez bientôt une
                confirmation par email.
              </p>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Prestataire</span>
                      <span className="font-medium">{provider?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Service</span>
                      <span className="font-medium">{bookingData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Date</span>
                      <span className="font-medium">{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Heure</span>
                      <span className="font-medium">
                        {bookingData.timeSlot.start} - {bookingData.timeSlot.end}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Adresse</span>
                      <span className="font-medium">{bookingData.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4 justify-center">
                <Link href="/dashboard">
                  <Button>Voir mes réservations</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Retour à l&apos;accueil</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
