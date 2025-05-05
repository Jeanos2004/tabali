"use client";

import { MOCK_PROVIDERS } from "@/lib/constants";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturedProviders() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="tabali-badge tabali-badge-secondary inline-block mb-4">
          Prestataires Vérifiés
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight font-tabali-serif">
          Nos <span className="text-tabali-secondary">meilleurs prestataires</span> à votre service
        </h2>
        <p className="text-tabali-muted-foreground max-w-2xl mx-auto text-lg">
          Des professionnels qualifiés et vérifiés, prêts à vous offrir un service de qualité.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {MOCK_PROVIDERS.map((provider) => (
          <motion.div key={provider.id} variants={item} className="group">
            <Card className="tabali-card-premium bg-white h-full transition-all duration-300 group-hover:shadow-tabali-lg group-hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-tabali-primary to-tabali-secondary"></div>
              
              <CardContent className="p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-tabali-muted flex-shrink-0 shadow-tabali-sm border-2 border-white">
                    <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-80"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl font-tabali-serif group-hover:text-tabali-primary transition-colors duration-300">{provider.name}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-tabali-muted-foreground mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={i < Math.floor(provider.rating) ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={i < Math.floor(provider.rating) ? "text-tabali-secondary" : "text-tabali-muted"}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-tabali-muted-foreground">({provider.reviewCount} avis)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-medium text-tabali-foreground mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tabali-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Services
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors bg-tabali-primary-50 text-tabali-primary border border-tabali-primary-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-tabali-foreground mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tabali-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Localisation
                    </h4>
                    <p className="text-sm text-tabali-muted-foreground">{provider.location.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-tabali-foreground mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tabali-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tarif horaire
                    </h4>
                    <p className="text-sm font-medium text-tabali-secondary">{provider.hourlyRate.toLocaleString()} GNF</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-8 pt-0">
                <Link href={`/profile/${provider.id}`} className="w-full tabali-hover-lift">
                  <Button variant="outline" className="w-full tabali-btn tabali-btn-outline group relative overflow-hidden rounded-full">
                    <span className="tabali-btn-content flex items-center justify-center">
                      Voir le profil
                      <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <Link 
          href="/search?type=provider"
          className="tabali-btn tabali-btn-secondary hover:text-tabali-muted tabali-btn-large group relative overflow-hidden rounded-full inline-flex items-center"
        >
          <span className="tabali-btn-content flex items-center">
            Voir tous les prestataires
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
