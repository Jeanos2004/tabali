"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { theme } from "@/lib/theme";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <div
      ref={ref}
      className="relative h-[90vh] md:h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
      
      {/* Animated patterns */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-hero-pattern bg-repeat opacity-30"></div>
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: backgroundY,
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "15px 15px"
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </div>
      
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-hero-main bg-cover bg-center"
        style={{
          y: isMobile ? 0 : backgroundY,
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="container relative z-20 text-center"
        style={{ y: isMobile ? 0 : textY, opacity: opacityText }}
      >
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/20">
              La plateforme de services #1 en Guinée
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            variants={itemVariants}
          >
            Trouvez des prestataires de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48b47f] via-[#FCD116] to-[#f15973]">confiance</span> pour tous vos besoins
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/90 md:text-2xl"
            variants={itemVariants}
          >
            Tabali connecte particuliers et professionnels en Guinée pour des services de qualité
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            variants={itemVariants}
          >
            <Link href="/search">
              <button className="btn-fancy bg-white text-[#008751] hover:text-[#008751] font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
                Trouver un prestataire
              </button>
            </Link>
            <Link href="/auth/register?type=provider">
              <button className="btn-fancy bg-transparent text-white font-medium px-8 py-3 rounded-full border border-white/30 hover:border-white/80 backdrop-blur-sm hover:bg-white/10 transform transition-all duration-300 hover:-translate-y-1">
                Devenir prestataire
              </button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="pt-12 flex justify-center items-center gap-8"
            variants={itemVariants}
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  style={{ 
                    zIndex: 4-i,
                    background: `linear-gradient(135deg, ${theme.colors.primary[400]} 0%, ${theme.colors.primary[600]} 100%)`,
                    opacity: 0.9 - (i * 0.1)
                  }}
                />
              ))}
            </div>
            <div className="text-white/90 text-sm">
              <span className="font-bold">+1000</span> prestataires disponibles
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
