"use client";

import { useState } from "react";
import { AuthForm } from "@/components/ui/auth-form";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("type") || "client";
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    setIsLoading(true);
    setError("");

    // Simuler une inscription
    setTimeout(() => {
      setIsLoading(false);
      
      // Dans une application réelle, nous enverrions ces données à une API
      console.log("Tentative d'inscription avec:", {
        ...data,
        userType: data.userType || userType,
      });
      
      // Simuler une inscription réussie
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-t-2 border-b-2 border-[#008751] rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500">Création de votre compte...</p>
          </div>
        ) : (
          <AuthForm type="register" onSubmit={handleSubmit} />
        )}
      </motion.div>
    </div>
  );
}
