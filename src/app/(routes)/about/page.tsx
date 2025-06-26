"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Users,
  Target,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTeamMember, setCurrentTeamMember] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Notre Équipe",
      content: (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="bg-slate-100 rounded-lg p-8 flex-1 min-h-[300px] flex items-center justify-center border border-slate-200">
            <Users size={80} className="text-slate-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Une équipe passionnée
            </h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Tabali est porté par une équipe de professionnels dévoués, unis
              par une vision commune : révolutionner la mise en relation entre
              prestataires et clients.
            </p>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Forts d&apos;une expertise diversifiée en technologie, marketing
              et service client, nous incarnons l&apos;innovation et
              représentons une nouvelle génération d&apos;entrepreneurs.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Présentation de Tabali",
      content: (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="bg-slate-100 rounded-lg p-8 flex-1 min-h-[300px] flex items-center justify-center border border-slate-200">
            <Target size={80} className="text-slate-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Une plateforme innovante
            </h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Tabali est une plateforme révolutionnaire au service de la mise en
              relation professionnelle. Elle offre aux clients et prestataires
              un accès rapide à des services de qualité, ainsi qu&apos;un
              accompagnement personnalisé grâce à une technologie de pointe.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Tabali répond aux besoins urgents de connexion tout en
              encourageant une meilleure gestion des relations professionnelles.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Notre mission sociale",
      content: (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="bg-slate-100 rounded-lg p-8 flex-1 min-h-[300px] flex items-center justify-center border border-slate-200">
            <Heart size={80} className="text-slate-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
              Impact social et économique
            </h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Tabali vise à renforcer l&apos;inclusion professionnelle et
              l&apos;autonomie économique, en offrant aux prestataires et
              clients un accès simple, rapide et sécurisé à des services adaptés
              à leurs besoins.
            </p>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Tabali lutte contre l&apos;isolement professionnel, encourage la
              collaboration et soutient l&apos;entrepreneuriat. Notre mission
              est de permettre à chacun de mieux vivre son quotidien
              professionnel et de construire un avenir plus stable et digne.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Foula Fofana",
      title: "CEO & Fondateur",
      description:
        "Visionnaire passionné par l'innovation technologique, Foula dirige la stratégie globale de Tabali. Fort de 8 ans d'expérience en entrepreneuriat, il incarne le leadership moderne.",
      phone: "+224 624 36 68 97",
      speciality: "Stratégie & Leadership",
      image: "/team/foula.png",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:foula@tabali.com" },
      ],
    },
    {
      id: 2,
      name: "Fanta Camara",
      title: "CTO & Co-fondatrice",
      description:
        "Experte en développement logiciel avec 6 ans d'expérience, Fanta supervise l'architecture technique de la plateforme et l'innovation produit.",
      phone: "+224 621 XX XX XX",
      speciality: "Développement & Architecture",
      image: "/team/fanta.png",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:fanta@tabali.com" },
      ],
    },
    {
      id: 3,
      name: "Jeanos Ouanouno",
      title: "Directeur Marketing",
      description:
        "Spécialiste en marketing digital et growth hacking, Jeanos développe la stratégie d'acquisition et de fidélisation des utilisateurs de Tabali.",
      phone: "+224 622 XX XX XX",
      speciality: "Marketing & Growth",
      image: "/team/jeanos.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:jeanos@tabali.com" },
      ],
    },
    {
      id: 4,
      name: "Aliou Bailo Kouyaté",
      title: "Responsable UX/UI",
      description:
        "Créative et centrée utilisateur, Kouyaté conçoit des expériences intuitives et engageantes pour tous les utilisateurs de la plateforme Tabali.",
      phone: "+224 623 XX XX XX",
      speciality: "Design & Expérience Utilisateur",
      image: "/team/aliou-bailo-kouyate.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:kouyaté@tabali.com" },
      ],
    },
    {
      id: 5,
      name: "Cécé Alexis Koulémou",
      title: "Responsable Marketing Digital",
      description:
        "Stratège marketing passionné, Koulémou développe des campagnes innovantes et pilote la croissance digitale de Tabali à travers l'Afrique de l'Ouest.",
      phone: "+224 625 XX XX XX",
      speciality: "Marketing Digital & Growth",
      image: "/team/alexis-bg.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:koulemou@tabali.com" },
      ],
    },
    {
      id: 6,
      name: "Ibrahima Diogo Bah",
      title: "Responsable Sécurité & Infrastructure",
      description:
        "Expert en cybersécurité, Bah assure la protection des données et la robustesse de l'infrastructure technologique de la plateforme Tabali.",
      phone: "+224 627 XX XX XX",
      speciality: "Sécurité & Infrastructure Cloud",
      image: "/team/amadou-diogo-bah.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:bah@tabali.com" },
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextTeamMember = () => {
    setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length);
  };

  const prevTeamMember = () => {
    setCurrentTeamMember(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* En-tête de la page */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              À propos de Tabali
            </h1>
            <p className="text-slate-600 text-lg">
              Découvrez notre équipe, notre mission et notre vision pour
              l&apos;avenir des services professionnels.
            </p>
          </div>

          {/* Section Équipe/Fondateur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Notre Équipe
                </h2>

                <div className="relative min-h-[400px]">
                  <motion.div
                    key={currentTeamMember}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col lg:flex-row items-center gap-12"
                  >
                    <div className="lg:w-1/3">
                      <div className="relative rounded-lg overflow-hidden aspect-square border border-slate-200 hover:shadow-lg transition-shadow duration-300 p-4 bg-white">
                        <Image
                          src={teamMembers[currentTeamMember].image}
                          alt={teamMembers[currentTeamMember].name}
                          fill
                          className="object-contain object-center scale-90"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      </div>
                    </div>

                    <div className="lg:w-2/3">
                      <h3 className="text-2xl font-bold mb-2 text-slate-800">
                        {teamMembers[currentTeamMember].name}
                      </h3>
                      <p className="text-lg mb-2 text-[#008751] font-medium">
                        {teamMembers[currentTeamMember].title}
                      </p>
                      <p className="text-sm mb-4 text-slate-500 font-medium">
                        {teamMembers[currentTeamMember].speciality}
                      </p>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {teamMembers[currentTeamMember].description}
                      </p>

                      <div className="flex items-center gap-2 mb-4 text-slate-600">
                        <Phone size={18} />
                        <span>{teamMembers[currentTeamMember].phone}</span>
                      </div>

                      <div className="flex gap-4">
                        {teamMembers[currentTeamMember].social.map(
                          (social, index) => (
                            <a
                              key={index}
                              href={social.link}
                              className="p-2 rounded-full bg-slate-100 hover:bg-[#008751] hover:text-white transition-all duration-300 text-slate-600"
                            >
                              <social.icon size={20} />
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation buttons pour l'équipe */}
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevTeamMember}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751]"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextTeamMember}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751]"
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </div>

                  {/* Indicateurs pour l'équipe */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {teamMembers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTeamMember(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTeamMember
                            ? "bg-[#008751]"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card>
              <CardContent className="p-8">
                <div className="relative min-h-[400px]">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {slides[currentSlide].content}
                  </motion.div>

                  {/* Navigation buttons */}
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevSlide}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751]"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751]"
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </div>

                  {/* Slide indicators */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-[#008751]"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section Contact/CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">
                  Rejoignez l&apos;aventure Tabali
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                  Tu veux en savoir plus sur notre équipe, notre histoire, ou
                  nos valeurs ? N&apos;hésite pas à nous contacter !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-[#008751] hover:bg-[#006d42] text-white font-medium"
                  >
                    Nous contacter
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white font-medium"
                  >
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}