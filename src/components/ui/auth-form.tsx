/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Camera } from "lucide-react";

interface AuthFormProps {
  type: "login" | "register";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  onSocialLogin?: (provider: "google" | "facebook") => void;
}


export function AuthForm({ type, onSubmit, onSocialLogin }: AuthFormProps) {
  const [formData, setFormData] = useState({
    // Étape 1 - Informations de base
    email: "",
    password: "",
    confirmPassword: "",

    // Étape 2 - Informations personnelles
    name: "",
    phone: "",
    address: "",
    city: "",
    profilePicture: null,
    userType: "client",

    // Étape 3 - Informations prestataire
    services: [] as string[],
    experience: "",
    serviceRadius: 5,
    rates: "",
    availability: {
      monday: { from: "", to: "", enabled: false },
      tuesday: { from: "", to: "", enabled: false },
      wednesday: { from: "", to: "", enabled: false },
      thursday: { from: "", to: "", enabled: false },
      friday: { from: "", to: "", enabled: false },
      saturday: { from: "", to: "", enabled: false },
      sunday: { from: "", to: "", enabled: false },
    },
    idCard: null,
    selfie: null,
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  // Liste des services disponibles
  const availableServices = [
    "Plomberie",
    "Électricité",
    "Menuiserie",
    "Maçonnerie",
    "Peinture",
    "Jardinage",
    "Ménage",
    "Déménagement",
    "Informatique",
    "Serrurerie",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleServiceChange = (service: string) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData({
      ...formData,
      services: updatedServices,
    });
  };

  const handleAvailabilityChange = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [day]: {
          ...formData.availability[day as keyof typeof formData.availability],
          [field]: value,
        },
      },
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({
        ...formData,
        [field]: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "profilePicture") {
          setProfilePreview(reader.result as string);
        } else if (field === "idCard") {
          setIdCardPreview(reader.result as string);
        } else if (field === "selfie") {
          setSelfiePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);

      // Effacer l'erreur lorsque l'utilisateur modifie le champ
      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: "",
        });
      }
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (type === "register" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^\d{8,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide";
    }

    if (!formData.address) {
      newErrors.address = "L'adresse est requise";
    }

    if (!formData.city) {
      newErrors.city = "La ville/quartier est requis(e)";
    }

    if (formData.userType === "provider" && !formData.profilePicture) {
      newErrors.profilePicture =
        "La photo de profil est requise pour les prestataires";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.services.length === 0) {
      newErrors.services = "Veuillez sélectionner au moins un service";
    }

    if (!formData.experience) {
      newErrors.experience = "La description de votre expérience est requise";
    }

    if (!formData.rates) {
      newErrors.rates = "Veuillez indiquer vos tarifs";
    }

    let hasAvailability = false;
    Object.values(formData.availability).forEach((day) => {
      if (day.enabled && day.from && day.to) {
        hasAvailability = true;
      }
    });

    if (!hasAvailability) {
      newErrors.availability = "Veuillez indiquer au moins une disponibilité";
    }

    if (!formData.idCard) {
      newErrors.idCard = "La pièce d'identité est requise";
    }

    if (!formData.selfie) {
      newErrors.selfie = "La photo selfie est requise pour vérification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      if (formData.userType === "provider") {
        setStep(3);
      } else {
        handleSubmit();
      }
    } else if (step === 3 && validateStep3()) {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  // Détermine le nombre total d'étapes en fonction du type d'utilisateur
  const totalSteps = formData.userType === "provider" ? 3 : 2;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {type === "login" ? "Connexion" : "Inscription"}
          </h1>
          <p className="text-slate-500">
            {type === "login"
              ? "Connectez-vous à votre compte Tabali"
              : "Créez un compte pour utiliser Tabali"}
          </p>
        </div>
       
        {/* Boutons d'authentification sociale */}
        <div className="mb-6 space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => handleSocialLogin("google")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="mr-2"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuer avec Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => handleSocialLogin("facebook")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="mr-2"
            >
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Continuer avec Facebook
          </Button>
        </div>
         {/* Séparateur */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">ou</span>
          </div>
        </div>

        {type === "register" && (
          <div className="flex justify-between mb-6">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNumber = index + 1;
              return (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-[#008751] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`ml-2 text-sm ${
                      step >= stepNumber ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {stepNumber === 1
                      ? "Compte"
                      : stepNumber === 2
                      ? "Profil"
                      : "Prestataire"}
                  </span>
                  {stepNumber < totalSteps && (
                    <div className="w-12 h-0.5 mx-2 bg-slate-200"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {type === "register" && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: 0612345678"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.address
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Ville/Quartier
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.city
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Photo de profil{" "}
                {formData.userType === "provider"
                  ? "(Obligatoire)"
                  : "(Optionnel)"}
              </label>
              <div className="mt-1 flex items-center">
                {profilePreview ? (
                  <div className="relative">
                    <img
                      src={profilePreview}
                      alt="Aperçu du profil"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white p-1 w-5 h-5 flex items-center justify-center text-xs"
                      onClick={() => {
                        setFormData({ ...formData, profilePicture: null });
                        setProfilePreview(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Camera size={24} className="text-gray-400" />
                  </span>
                )}
                <label
                  htmlFor="profile-upload"
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008751] focus:ring-offset-2 cursor-pointer"
                >
                  Choisir une photo
                </label>
                <input
                  id="profile-upload"
                  name="profilePicture"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profilePicture")}
                />
              </div>
              {errors.profilePicture && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.profilePicture}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="userType"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Type de compte
              </label>
              <select
                id="userType"
                name="userType"
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#008751] focus:ring-[#008751] sm:text-sm"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="client">Client</option>
                <option value="provider">Prestataire</option>
              </select>
            </div>
          </motion.div>
        )}

        {step === 3 && formData.userType === "provider" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Types de services proposés
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {availableServices.map((service) => (
                  <div key={service} className="flex items-center">
                    <input
                      id={`service-${service}`}
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="h-4 w-4 text-[#008751] focus:ring-[#008751] border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`service-${service}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>
              {errors.services && (
                <p className="mt-1 text-sm text-red-600">{errors.services}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Description de votre expérience
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={3}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.experience
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.experience}
                onChange={handleChange}
                placeholder="Parlez brièvement de votre expérience professionnelle..."
              />
              {errors.experience && (
                <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="serviceRadius"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Zone d&apos;intervention (rayon en km): {formData.serviceRadius}{" "}
                km
              </label>
              <input
                type="range"
                id="serviceRadius"
                name="serviceRadius"
                min="1"
                max="50"
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                value={formData.serviceRadius}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="rates"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Tarifs indicatifs
              </label>
              <input
                type="text"
                id="rates"
                name="rates"
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.rates
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-[#008751] focus:ring-[#008751]"
                }`}
                value={formData.rates}
                onChange={handleChange}
                placeholder="Ex: 50-100 GNF/heure, forfait à partir de 200 GNF, etc."
              />
              {errors.rates && (
                <p className="mt-1 text-sm text-red-600">{errors.rates}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Disponibilités
              </label>
              {errors.availability && (
                <p className="mt-1 mb-2 text-sm text-red-600">
                  {errors.availability}
                </p>
              )}
              <div className="space-y-2">
                {Object.keys(formData.availability).map((day) => {
                  const dayKey = day as keyof typeof formData.availability;
                  const dayData = formData.availability[dayKey];
                  const dayNames: Record<string, string> = {
                    monday: "Lundi",
                    tuesday: "Mardi",
                    wednesday: "Mercredi",
                    thursday: "Jeudi",
                    friday: "Vendredi",
                    saturday: "Samedi",
                    sunday: "Dimanche",
                  };

                  return (
                    <div key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`day-${day}`}
                        checked={dayData.enabled}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            day,
                            "enabled",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-[#008751] focus:ring-[#008751] border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`day-${day}`}
                        className="w-24 text-sm text-gray-700"
                      >
                        {dayNames[day]}
                      </label>
                      <div className="flex space-x-2 items-center">
                        <input
                          type="time"
                          id={`time-from-${day}`}
                          value={dayData.from}
                          onChange={(e) =>
                            handleAvailabilityChange(
                              day,
                              "from",
                              e.target.value
                            )
                          }
                          disabled={!dayData.enabled}
                          className="text-sm p-1 border rounded"
                        />
                        <span className="text-sm">à</span>
                        <input
                          type="time"
                          id={`time-to-${day}`}
                          value={dayData.to}
                          onChange={(e) =>
                            handleAvailabilityChange(day, "to", e.target.value)
                          }
                          disabled={!dayData.enabled}
                          className="text-sm p-1 border rounded"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="idCard"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Pièce d&apos;identité (CNI) - Obligatoire
              </label>
              <div className="mt-1 flex items-center">
                {idCardPreview ? (
                  <div className="relative">
                    <img
                      src={idCardPreview}
                      alt="Aperçu de la pièce d'identité"
                      className="h-20 object-cover rounded border border-gray-300"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white p-1 w-5 h-5 flex items-center justify-center text-xs"
                      onClick={() => {
                        setFormData({ ...formData, idCard: null });
                        setIdCardPreview(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="h-20 w-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                    <span className="text-gray-500 text-sm">ID</span>
                  </div>
                )}
                <label
                  htmlFor="id-upload"
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008751] focus:ring-offset-2 cursor-pointer"
                >
                  Télécharger CNI
                </label>
                <input
                  id="id-upload"
                  name="idCard"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "idCard")}
                />
              </div>
              {errors.idCard && (
                <p className="mt-1 text-sm text-red-600">{errors.idCard}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="selfie"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Photo selfie (pour vérification d&apos;identité) - Obligatoire
              </label>
              <div className="mt-1 flex items-center">
                {selfiePreview ? (
                  <div className="relative">
                    <img
                      src={selfiePreview}
                      alt="Aperçu du selfie"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white p-1 w-5 h-5 flex items-center justify-center text-xs"
                      onClick={() => {
                        setFormData({ ...formData, selfie: null });
                        setSelfiePreview(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Camera size={24} className="text-gray-400" />
                  </span>
                )}
                <label
                  htmlFor="selfie-upload"
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#008751] focus:ring-offset-2 cursor-pointer"
                >
                  Prendre un selfie
                </label>
                <input
                  id="selfie-upload"
                  name="selfie"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "selfie")}
                />
              </div>
              {errors.selfie && (
                <p className="mt-1 text-sm text-red-600">{errors.selfie}</p>
              )}
            </div>
          </motion.div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 1 && type === "register" ? (
            <Button variant="outline" onClick={handlePrevStep}>
              Retour
            </Button>
          ) : (
            <div></div>
          )}

          {type === "login" ? (
            <Button
              className="w-full bg-[#008751] hover:bg-[#006b40]"
              onClick={handleSubmit}
            >
              Se connecter
            </Button>
          ) : (
            <Button
              className="bg-[#008751] hover:bg-[#006b40]"
              onClick={handleNextStep}
            >
              {step < totalSteps ? "Continuer" : "S'inscrire"}
            </Button>
          )}
        </div>

        <div className="mt-6 text-center text-sm">
          {type === "login" ? (
            <>
              Vous n&apos;avez pas de compte ?{" "}
              <Link
                href="/auth/register"
                className="text-[#008751] font-medium hover:underline"
              >
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <>
              Vous avez déjà un compte ?{" "}
              <Link
                href="/auth/login"
                className="text-[#008751] font-medium hover:underline"
              >
                Se connecter
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
