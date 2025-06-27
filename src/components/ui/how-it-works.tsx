"use client";

import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Créez votre compte Tabali",
    description: "Inscrivez-vous gratuitement sur Tabali en quelques clics. Complétez votre profil pour accéder à tous les services disponibles en Guinée.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M20 8v6M23 11h-6"></path>
      </svg>
    ),
  },
  {
    title: "Trouvez le service idéal",
    description: "Utilisez notre moteur de recherche avancé pour filtrer par localisation, catégorie et prix. Consultez les avis vérifiés pour faire le meilleur choix.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
        <path d="M11 8v6"></path>
        <path d="M8 11h6"></path>
      </svg>
    ),
  },
  {
    title: "Réservez et payez en sécurité",
    description: "Sélectionnez une date et heure, puis effectuez votre paiement via Orange Money, Mobile Money ou carte bancaire. Votre paiement est sécurisé et n'est versé qu'après le service.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
        <line x1="16" x2="16" y1="2" y2="6"></line>
        <line x1="8" x2="8" y1="2" y2="6"></line>
        <line x1="3" x2="21" y1="10" y2="10"></line>
        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 18h.01"></path>
        <path d="M12 18h.01"></path>
        <path d="M16 18h.01"></path>
      </svg>
    ),
  },
  {
    title: "Évaluez et recommandez",
    description: "Après le service, notez votre expérience et laissez un commentaire. Vos avis aident la communauté Tabali à s'améliorer et récompensent les meilleurs prestataires.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  
  // Effet pour animer automatiquement les étapes
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    },
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      {/* Background elements premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-tabali-primary-50/30 to-white z-0" />
      <div className="absolute top-0 left-0 w-full h-64 bg-tabali-primary-50/40 transform -skew-y-6 z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-tabali-secondary-50/30 z-0" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-tabali-primary-50/20 blur-3xl z-0" />
      
      {/* Motifs géométriques subtils */}
      <div className="absolute inset-0 opacity-5 z-0" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="tabali-badge tabali-badge-primary inline-block mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          >
            Simple et Efficace
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-tabali-serif">
            Comment <span className="text-tabali-primary relative">
              ça marche
              <motion.span 
                className="absolute bottom-1 left-0 w-full h-2 bg-tabali-secondary-300/50 rounded-full z-0"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h2>
          
          <p className="text-tabali-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Tabali simplifie la mise en relation entre clients et prestataires de services en quelques étapes simples.
          </p>
        </motion.div>
        
        {/* Desktop view - Horizontal steps */}
        <div className="block">
          <div 
            ref={ref}
            className="relative"
          >
            {/* Progress bar - ajusté pour être responsive */}
            <div className="absolute top-16 sm:top-20 md:top-24 left-0 right-0 h-1 sm:h-1.5 bg-tabali-primary-100/50 rounded-full z-0">
              <motion.div 
                className="h-full tabali-bg-gradient-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(activeStep + 1) * (100 / steps.length)}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
              {steps.map((step, index) => (
                <div 
                  key={step.title}
                  className={`relative z-10 ${index === activeStep ? 'scale-105' : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`p-4 sm:p-6 md:p-8 rounded-xl h-full flex flex-col items-center text-center transition-all duration-500 ${index === activeStep 
                    ? 'tabali-card-premium bg-white shadow-tabali-md transform -translate-y-1' 
                    : 'tabali-card bg-white/90 shadow-tabali-sm hover:shadow-tabali-md cursor-pointer hover:-translate-y-1'}`}
                  >
                    {/* Step number with animated border */}
                    <div className="relative mb-4 md:mb-6">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center z-10 relative transition-all duration-300 ${index === activeStep 
                        ? 'tabali-bg-gradient-primary text-white shadow-tabali-sm' 
                        : 'bg-white border-2 border-tabali-primary-200 text-tabali-primary'}`}
                      >
                        <span className="text-lg md:text-xl font-bold">{index + 1}</span>
                      </div>
                      {index === activeStep && (
                        <motion.div 
                          className="absolute -inset-3 rounded-full bg-tabali-primary-100/60 z-0"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.7, 0.4]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Icon with animated background */}
                    <div className="relative mb-3 md:mb-5">
                      <div className={`p-2 md:p-3 rounded-lg transition-colors duration-300 ${index === activeStep ? 'text-tabali-primary' : 'text-tabali-muted-foreground'}`}>
                        <div className="w-8 h-8 md:w-10 md:h-10">
                          {step.icon}
                        </div>
                      </div>
                      {index === activeStep && (
                        <motion.div 
                          className="absolute inset-0 bg-tabali-primary-50/70 rounded-lg z-[-1]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                    
                    <h3 className={`text-base md:text-xl font-semibold mb-2 md:mb-3 transition-colors duration-300 font-tabali-serif ${index === activeStep ? 'text-tabali-primary' : 'text-tabali-foreground'}`}>
                      {step.title}
                    </h3>
                    
                    <p className="text-tabali-muted-foreground text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connector line and arrow - responsive */}
                  {index < steps.length - 1 && (
                    <>
                      {/* Connecteur horizontal pour tablettes et desktop */}
                      <div className="hidden sm:block absolute -right-3 top-16 sm:top-20 md:top-24 transform translate-x-1/2 z-20">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 md:h-8 md:w-8 text-tabali-primary" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.div>
                      </div>
                      
                      {/* Connecteur vertical pour mobile */}
                      <div className="sm:hidden absolute left-1/2 -bottom-4 transform -translate-x-1/2 z-20">
                        <motion.div
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-tabali-primary" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l5 5m0 0l5-5m-5 5V6" />
                          </svg>
                        </motion.div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile view - Vertical steps */}
        <div className="hidden">
          <motion.div 
            ref={ref}
            className="relative space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Vertical progress line */}
            <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-tabali-primary-100/50 z-0">
              <motion.div 
                className="w-full tabali-bg-gradient-primary"
                initial={{ height: "0%" }}
                animate={{ height: `${(activeStep + 1) * (100 / steps.length)}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                variants={itemVariants}
                className="relative z-10"
                onClick={() => setActiveStep(index)}
              >
                <div className={`flex items-start p-5 rounded-xl transition-all duration-300 ${index === activeStep 
                  ? 'bg-white shadow-tabali-md border-l-4 border-tabali-primary transform -translate-x-1' 
                  : 'bg-white/90 hover:bg-white hover:shadow-tabali-sm cursor-pointer'}`}
                >
                  {/* Step number */}
                  <div className="relative mr-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 relative transition-all duration-300 ${index === activeStep 
                      ? 'tabali-bg-gradient-primary text-white shadow-tabali-sm' 
                      : 'bg-white border-2 border-tabali-primary-200 text-tabali-primary'}`}
                    >
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    {index === activeStep && (
                      <motion.div 
                        className="absolute -inset-2 rounded-full bg-tabali-primary-100/60 z-0"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className={`mr-3 transition-colors duration-300 ${index === activeStep ? 'text-tabali-primary' : 'text-tabali-muted-foreground'}`}>
                        {step.icon}
                      </div>
                      
                      <h3 className={`text-lg font-semibold transition-colors duration-300 font-tabali-serif ${index === activeStep ? 'text-tabali-primary' : 'text-tabali-foreground'}`}>
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-tabali-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="#featured-providers"
            className="tabali-btn tabali-btn-primary tabali-btn-large group relative overflow-hidden rounded-full inline-flex items-center tabali-hover-lift hover:text-white"
          >
            <span className="tabali-btn-content flex items-center ">
              Découvrir nos prestataires
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
