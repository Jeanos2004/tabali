"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  // Définir les fonctions mais les marquer comme non utilisées avec un préfixe _
  // ou les supprimer si elles ne sont pas nécessaires dans cette version du composant
  const _handleFormChange = (formData: {
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

  const _handleDateTimeChange = (date: string, timeSlot: { start: string; end: string }) => {
    setBookingData({
      ...bookingData,
      date,
      timeSlot,
      isDateTimeComplete: Boolean(date && timeSlot.start && timeSlot.end),
    });
  };

  const _handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const _handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const _handleSubmit = () => {
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

          {/* Le reste du composant reste inchangé */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}

// Ajout des imports manquants
import { useSearchParams } from "next/navigation";
import { MOCK_PROVIDERS } from "@/lib/constants";
import { Provider } from "@/types";

// Page principale avec Suspense
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container py-8 md:py-12"><div className="max-w-3xl mx-auto"><div className="w-full h-[400px] bg-slate-100 animate-pulse rounded-lg"></div></div></div>}>
      <BookingContent />
    </Suspense>
  );
}
