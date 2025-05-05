"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    userType: "client",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
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

        {type === "register" && (
          <div className="flex justify-between mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s
                      ? "bg-[#008751] text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {s}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    step >= s ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  {s === 1 ? "Compte" : "Profil"}
                </span>
                {s < 2 && (
                  <div className="w-12 h-0.5 mx-2 bg-slate-200"></div>
                )}
              </div>
            ))}
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
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
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
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
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
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
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
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
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
              <label htmlFor="userType" className="block text-sm font-medium text-slate-700 mb-1">
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

        <div className="mt-6 flex justify-between">
          {step > 1 && type === "register" ? (
            <Button variant="outline" onClick={handlePrevStep}>
              Retour
            </Button>
          ) : (
            <div></div>
          )}
          
          {type === "login" ? (
            <Button className="w-full" onClick={handleSubmit}>
              Se connecter
            </Button>
          ) : (
            <Button onClick={handleNextStep}>
              {step < 2 ? "Continuer" : "S'inscrire"}
            </Button>
          )}
        </div>

        <div className="mt-6 text-center text-sm">
          {type === "login" ? (
            <>
              Vous n&apos;avez pas de compte ?{" "}
              <Link href="/auth/register" className="text-[#008751] font-medium hover:underline">
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <>
              Vous avez déjà un compte ?{" "}
              <Link href="/auth/login" className="text-[#008751] font-medium hover:underline">
                Se connecter
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
