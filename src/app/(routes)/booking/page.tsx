"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/ui/booking-form";
import { useSearchParams } from "next/navigation";
import { MOCK_PROVIDERS } from "@/lib/constants";
import { Provider } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// TimeSlot type
type TimeSlot = {
  start: string;
  end: string;
};

// Composant pour la sélection de date et heure
function DateTimeSelection({
  onDateTimeChange,
}: {
  onDateTimeChange: (dateTimeData: {
    date: Date | undefined;
    timeSlot: TimeSlot;
    isComplete: boolean;
  }) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<TimeSlot>({ start: "", end: "" });
  
  // Liste des créneaux horaires disponibles
  const availableTimeSlots: TimeSlot[] = [
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "11:00", end: "12:00" },
    { start: "14:00", end: "15:00" },
    { start: "15:00", end: "16:00" },
    { start: "16:00", end: "17:00" },
    { start: "17:00", end: "18:00" },
  ];

  useEffect(() => {
    const isComplete = date !== undefined && timeSlot.start !== "";
    onDateTimeChange({
      date,
      timeSlot,
      isComplete,
    });
  }, [date, timeSlot, onDateTimeChange]);

  // Implémentation d'un sélecteur de date simplifié
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value ? new Date(e.target.value) : undefined);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              Sélectionnez une date
            </h3>
            <input
              type="date"
              value={date ? date.toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#008751] focus:ring-[#008751] sm:text-sm"
            />
          </div>

          {date && (
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-4">
                Sélectionnez un créneau horaire
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={`${slot.start}-${slot.end}`}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      timeSlot.start === slot.start
                        ? "bg-[#008751] text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {slot.start} - {slot.end}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}

// Composant de confirmation
type BookingData = {
  service: string;
  address: string;
  description: string;
  paymentMethod: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  mobileNumber?: string;
  date: string;
  timeSlot: {
    start: string;
    end: string;
  };
  isFormComplete: boolean;
  isDateTimeComplete: boolean;
};

function ConfirmationStep({
  bookingData,
  provider,
}: {
  bookingData: BookingData;
  provider: Provider | null;
}) {
  // Fonction pour formatter l'affichage de la méthode de paiement
  const getPaymentMethodDisplay = () => {
    switch (bookingData.paymentMethod) {
      case "card":
        return `Carte bancaire ${bookingData.cardNumber ? `(se terminant par ${bookingData.cardNumber.replace(/\s/g, "").slice(-4)})` : ""}`;
      case "paypal":
        return "PayPal";
      case "orangemoney":
        return `Orange Money ${bookingData.mobileNumber ? `(${bookingData.mobileNumber})` : ""}`;
      case "mobilemoney":
        return `Mobile Money ${bookingData.mobileNumber ? `(${bookingData.mobileNumber})` : ""}`;
      case "paycard":
        return "PayCard";
      default:
        return "Non spécifiée";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <h3 className="text-lg font-medium text-slate-800">
            Récapitulatif de votre réservation
          </h3>

          <div className="space-y-4">
            {provider && (
              <div>
                <h4 className="text-sm font-medium text-slate-500">Prestataire</h4>
                <p className="text-slate-800">{provider.name}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-slate-500">Service</h4>
              <p className="text-slate-800">{bookingData.service}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500">Adresse</h4>
              <p className="text-slate-800">{bookingData.address}</p>
            </div>

            {bookingData.description && (
              <div>
                <h4 className="text-sm font-medium text-slate-500">Description</h4>
                <p className="text-slate-800">{bookingData.description}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-slate-500">Date et heure</h4>
              <p className="text-slate-800">
                {bookingData.date && new Date(bookingData.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}{" "}
                de {bookingData.timeSlot.start} à {bookingData.timeSlot.end}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500">Méthode de paiement</h4>
              <p className="text-slate-800">{getPaymentMethodDisplay()}</p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

// Composant client séparé qui utilise useSearchParams
function BookingContent() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("provider");
  
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    address: "",
    description: "",
    paymentMethod: "card",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    mobileNumber: "",
    date: "",
    timeSlot: {
      start: "",
      end: "",
    },
    isFormComplete: false,
    isDateTimeComplete: false,
  });

  // Liste des services disponibles (normalement chargée depuis une API)
  const availableServices = [
    "Plomberie",
    "Électricité",
    "Peinture",
    "Jardinage",
    "Ménage",
    "Déménagement",
    "Bricolage"
  ];

  useEffect(() => {
    // Simulation d'un chargement de données
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
    paymentMethod: string;
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
    mobileNumber?: string;
    isComplete: boolean;
  }) => {
    setBookingData({
      ...bookingData,
      service: formData.service,
      address: formData.address,
      description: formData.description,
      paymentMethod: formData.paymentMethod,
      cardNumber: formData.cardNumber || "",
      cardHolder: formData.cardHolder || "",
      expiryDate: formData.expiryDate || "",
      cvv: formData.cvv || "",
      mobileNumber: formData.mobileNumber || "",
      isFormComplete: formData.isComplete,
    });
  };

  const handleDateTimeChange = (dateTimeData: {
    date: Date | undefined;
    timeSlot: TimeSlot;
    isComplete: boolean;
  }) => {
    setBookingData({
      ...bookingData,
      date: dateTimeData.date ? dateTimeData.date.toISOString() : "",
      timeSlot: dateTimeData.timeSlot,
      isDateTimeComplete: dateTimeData.isComplete,
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
    // Ici, on fera un appel API pour enregistrer la réservation
    console.log("Réservation soumise:", bookingData);
    //  afficher un message de succès pour l'instant
    alert("Réservation confirmée ! Merci pour votre confiance.");
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
            <BookingForm 
              onFormChange={handleFormChange} 
              services={availableServices} 
            />
          )}

          {currentStep === 2 && (
            <DateTimeSelection onDateTimeChange={handleDateTimeChange} />
          )}

          {currentStep === 3 && (
            <ConfirmationStep bookingData={bookingData} provider={provider} />
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
              >
                Précédent
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <Button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !bookingData.isFormComplete) ||
                  (currentStep === 2 && !bookingData.isDateTimeComplete)
                }
              >
                Suivant
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Confirmer la réservation
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Page principale avec Suspense
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container py-8 md:py-12"><div className="max-w-3xl mx-auto"><div className="w-full h-[400px] bg-slate-100 animate-pulse rounded-lg"></div></div></div>}>
      <BookingContent />
    </Suspense>
  );
}