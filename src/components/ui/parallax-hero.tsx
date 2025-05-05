"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ParallaxHero() {
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

  return (
    <div
      ref={ref}
      className="relative h-[80vh] md:h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
      
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: isMobile ? 0 : backgroundY,
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="container relative z-20 text-center"
        style={{ y: isMobile ? 0 : textY }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Trouvez des prestataires de confiance pour tous vos besoins
          </h1>
          <p className="text-xl text-white/90 md:text-2xl">
            Tabali connecte particuliers et professionnels en Guinée pour des services de qualité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/search">
              <Button size="lg" className="w-full sm:w-auto">
                Trouver un prestataire
              </Button>
            </Link>
            <Link href="/auth/register?type=provider">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Devenir prestataire
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
