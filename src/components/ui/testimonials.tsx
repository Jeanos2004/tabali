"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Fatou Camara",
    role: "Cliente régulière",
    content: "J'ai utilisé Tabali pour trouver un plombier en urgence. Le service était rapide et le prestataire très professionnel. Je recommande vivement !",
    avatar: "/avatars/avatar-1.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Mohamed Diallo",
    role: "Propriétaire d'entreprise",
    content: "Tabali nous a permis de trouver des prestataires qualifiés pour l'entretien régulier de nos bureaux. Une plateforme fiable et efficace.",
    avatar: "/avatars/avatar-2.jpg",
    rating: 4
  },
  {
    id: 3,
    name: "Aissatou Barry",
    role: "Mère de famille",
    content: "Le service de garde d'enfants que j'ai trouvé via Tabali est exceptionnel. Ma famille est très satisfaite de la qualité du service.",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5
  },
  {
    id: 4,
    name: "Ibrahim Sow",
    role: "Entrepreneur",
    content: "En tant qu'entrepreneur, je cherchais des électriciens qualifiés pour mon nouveau projet. Grâce à Tabali, j'ai pu comparer plusieurs profils et faire le meilleur choix.",
    avatar: "/avatars/avatar-4.jpg",
    rating: 5
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
  };
  
  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    startAutoplay();
  };
  
  const handleNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % testimonials.length);
    startAutoplay();
  };
  
  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    startAutoplay();
  };
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  
  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i}
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-tabali-primary-50/20 z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-tabali-secondary-50/30 blur-3xl z-0" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-tabali-primary-50/20 blur-3xl z-0" />
      
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
          <span className="tabali-badge tabali-badge-secondary inline-block mb-5">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight font-tabali-serif">
            Ce que <span className="text-tabali-primary">disent nos clients</span>
          </h2>
          <p className="text-tabali-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez les témoignages de nos clients satisfaits qui ont trouvé des prestataires de qualité via Tabali.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Background decorative elements */}
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-tabali-primary-100/50 rounded-full blur-sm hidden md:block"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-tabali-secondary-100/40 rounded-full blur-sm hidden md:block"></div>
          <div className="absolute top-1/4 right-0 transform translate-x-1/2 w-16 h-16 bg-tabali-accent-100/40 rounded-full blur-sm hidden md:block"></div>
          
          {/* Testimonial card premium */}
          <div className="tabali-card-premium p-8 md:p-12 rounded-xl shadow-tabali-md relative overflow-hidden backdrop-blur-sm bg-white/90">
            <div className="absolute top-0 left-0 w-full h-2 tabali-bg-gradient-primary"></div>
            
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-tabali-primary-200 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    {testimonials[activeIndex].rating === 5 ? (
                      <div className="inline-flex items-center px-4 py-1.5 bg-tabali-secondary-50 text-tabali-secondary-700 rounded-full">
                        <span className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-tabali-secondary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </span>
                        <span className="ml-2 font-medium text-sm">Service 5 étoiles</span>
                      </div>
                    ) : (
                      <div className="flex">
                        {renderStars(testimonials[activeIndex].rating)}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-tabali-foreground mb-8 italic font-light leading-relaxed font-tabali-serif">
                    &ldquo;{testimonials[activeIndex].content}&rdquo;
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white shadow-tabali-sm relative">
                      <Image 
                        src={testimonials[activeIndex].avatar} 
                        alt={testimonials[activeIndex].name}
                        fill
                        sizes="(max-width: 768px) 80px, 80px"
                        className="object-cover"
                        onError={() => {
                          // Fallback image handling
                          const fallbackImage = 'https://via.placeholder.com/150';
                          return fallbackImage;
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-lg font-tabali-serif">{testimonials[activeIndex].name}</h4>
                    <p className="text-tabali-muted-foreground">{testimonials[activeIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 shadow-tabali-sm backdrop-blur-sm flex items-center justify-center text-tabali-primary hover:bg-tabali-primary-50/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tabali-primary-300 focus:ring-offset-2 z-20 group"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 shadow-tabali-sm backdrop-blur-sm flex items-center justify-center text-tabali-primary hover:bg-tabali-primary-50/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tabali-primary-300 focus:ring-offset-2 z-20 group"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${index === activeIndex ? 'bg-tabali-primary scale-125' : 'bg-tabali-muted hover:bg-tabali-muted-foreground'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
