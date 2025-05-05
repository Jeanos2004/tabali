"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';

export function ServicesGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  // Création d'objets service à partir du tableau SERVICES
  const services = SERVICES.map(serviceName => ({
    id: serviceName.toLowerCase().replace(/\s+/g, '-'),
    name: serviceName,
    description: `Services professionnels de ${serviceName.toLowerCase()} pour particuliers et entreprises.`,
    icon: getIconForService(serviceName)
  }));
  
  // Fonction pour obtenir l'icône correspondant au service
  function getIconForService(serviceName: string): React.ReactNode {
    switch(serviceName) {
      case 'Ménage':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 22v-3h18v3"></path>
            <path d="M18 10.2V4H6v6.2"></path>
            <circle cx="12" cy="15" r="3"></circle>
          </svg>
        );
      case 'Plomberie':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v8"></path>
            <path d="M4.93 10.93 8 14"></path>
            <path d="M2 18h2"></path>
            <path d="M20 18h2"></path>
            <path d="M19.07 10.93 16 14"></path>
            <path d="M12 22v-4"></path>
            <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
          </svg>
        );
      case 'Électricité':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 18h-5"></path>
            <path d="M15.545 14h-7.09"></path>
            <path d="m20 10-5.545 6.545a1.5 1.5 0 0 1-2.91-.09V6.545a1.5 1.5 0 0 1 2.91-.09L20 13"></path>
            <path d="M4 10h8"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          </svg>
        );
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="tabali-badge tabali-badge-primary inline-block mb-4">
          Services Professionnels
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight font-tabali-serif">
          Des services de qualité pour <span className="text-tabali-primary">tous vos besoins</span>
        </h2>
        <p className="text-tabali-muted-foreground max-w-2xl mx-auto text-lg">
          Découvrez notre large gamme de services professionnels disponibles partout en Guinée.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {services.map((service) => (
          <motion.div 
            key={service.id}
            variants={itemVariants}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group"
          >
            <Link 
              href={`/search?service=${service.id}`} 
              className="block h-full"
            >
              <div className={`tabali-card-premium h-full p-8 flex flex-col items-center text-center transition-all duration-300 ${hoveredId === service.id ? 'transform -translate-y-2' : ''}`}>
                <div 
                  className={`w-20 h-20 flex items-center justify-center rounded-full mb-6 transition-all duration-500 ${hoveredId === service.id ? 'tabali-bg-gradient-primary text-white scale-110' : 'bg-tabali-primary-50 text-tabali-primary'}`}
                  style={{
                    boxShadow: hoveredId === service.id ? 
                      `0 0 0 8px rgba(var(--tabali-primary-rgb), 0.1)` : 'none'
                  }}
                >
                  <div className="text-2xl">{service.icon}</div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 font-tabali-serif transition-colors duration-300 group-hover:text-tabali-primary">
                  {service.name}
                </h3>
                
                <p className="text-tabali-muted-foreground text-sm flex-grow">
                  {service.description}
                </p>
                
                <div className={`mt-6 flex items-center justify-center text-sm font-medium transition-all duration-300 ${hoveredId === service.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <span className="tabali-btn tabali-btn-ghost tabali-btn-small group inline-flex items-center">
                    <span>Découvrir</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Animated glow effect */}
            {hoveredId === service.id && (
              <motion.div 
                className="absolute inset-0 -z-10 rounded-lg pointer-events-none opacity-70 blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, var(--tabali-primary) 0%, var(--tabali-secondary) 100%)'
                }}
              />
            )}
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
          href="/search"
          className="tabali-btn tabali-btn-primary tabali-btn-large group relative overflow-hidden rounded-full inline-flex items-center"
        >
          <span className="tabali-btn-content flex items-center">
            Voir tous les services
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