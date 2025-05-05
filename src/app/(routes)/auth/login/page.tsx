"use client";

import { useState } from "react";
import { AuthForm } from "@/components/ui/auth-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";

// Composant client séparé qui utilise useSearchParams
function LoginContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    setIsLoading(true);
    setError("");

    // Simuler une connexion
    setTimeout(() => {
      setIsLoading(false);
      
      // Dans une application réelle, nous enverrions ces données à une API
      console.log("Tentative de connexion avec:", data);
      
      // Simuler une connexion réussie
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
            <p className="text-slate-500">Connexion en cours...</p>
          </div>
        ) : (
          <AuthForm type="login" onSubmit={handleSubmit} />
        )}
      </motion.div>
    </div>
  );
}

// Page principale avec Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container py-12 md:py-16"><div className="max-w-md mx-auto p-8 flex justify-center"><div className="w-12 h-12 border-t-2 border-b-2 border-[#008751] rounded-full animate-spin"></div></div></div>}>
      <LoginContent />
    </Suspense>
  );
}
