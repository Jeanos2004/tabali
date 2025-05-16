"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-tabali-primary to-tabali-primary-dark py-12 md:py-16 lg:py-20 my-8 md:my-12 mx-4 sm:mx-6 lg:mx-0">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tabali-secondary opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-tabali-accent opacity-10 rounded-full blur-xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            className="text-white max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-tabali-serif">
              Prêt à trouver le prestataire idéal pour vos besoins?
            </h2>
            
            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
              Rejoignez Tabali dès aujourd&apos;hui et connectez-vous avec des prestataires de services qualifiés dans toute la Guinée. Inscription gratuite et sans engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/auth/register" className="tabali-hover-lift">
                <motion.button 
                  className="group relative overflow-hidden rounded-full bg-white text-tabali-primary hover:bg-gray-50 font-medium py-3 px-6 shadow-md transition-all duration-300 hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    S&apos;inscrire gratuitement
                    <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
              
              <Link href="/search" className="tabali-hover-lift">
                <motion.button 
                  className="group relative overflow-hidden rounded-full border-2 border-white/80 text-white hover:bg-white/20 font-medium py-3 px-6 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    Explorer les services
                    <svg className="w-5 h-5 ml-2 opacity-80 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 transition-all duration-300 hover:bg-white/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tabali-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-white/95 text-sm font-medium">+1000 prestataires</span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 transition-all duration-300 hover:bg-white/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tabali-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-white/95 text-sm font-medium">Inscription gratuite</span>
              </div>
              
              <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 transition-all duration-300 hover:bg-white/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tabali-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-white/95 text-sm font-medium">Paiement sécurisé</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-white/15 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/30 shadow-lg max-w-md">
              <h3 className="text-2xl font-bold text-white mb-4 font-tabali-serif">Vous êtes un professionnel ?</h3>
              <p className="text-white/90 mb-6">Rejoignez notre plateforme et trouvez de nouveaux clients pour développer votre activité.</p>
              
              <Link href="/auth/register?type=provider" className="tabali-hover-lift block hover:text-white">
                <motion.button 
                  className="tabali-btn w-full group relative overflow-hidden rounded-full bg-tabali-secondary text-tabali-secondary-foreground hover:bg-tabali-secondary/90 font-medium py-3 px-6 shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    Devenir prestataire
                    <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
              
              <div className="mt-6 flex items-center justify-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border border-white/80 overflow-hidden"
                      style={{ 
                        zIndex: 3-i,
                        background: i % 2 === 0 
                          ? `linear-gradient(135deg, var(--tabali-primary-400) 0%, var(--tabali-primary-600) 100%)`
                          : `linear-gradient(135deg, var(--tabali-secondary-400) 0%, var(--tabali-secondary-600) 100%)`,
                      }}
                    />
                  ))}
                </div>
                <span className="ml-3 text-white/90 text-sm">+500 prestataires actifs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
