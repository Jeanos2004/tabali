"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
  MapPin,
  Calendar,
  Award,
  Globe,
  Shield,
  Zap,
  Handshake,
  Download,
  UserPlus,
  ChevronDown,
  Star,
  Quote,
  ExternalLink,
  Building,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [counters, setCounters] = useState({
    users: 0,
    projects: 0,
    years: 0,
    partners: 0,
  });

  // Refs pour les animations au scroll
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Animation des compteurs
  useEffect(() => {
    const targets = { users: 15000, projects: 2500, years: 3, partners: 50 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setCounters((prev) => ({
        users: Math.min(prev.users + targets.users / steps, targets.users),
        projects: Math.min(
          prev.projects + targets.projects / steps,
          targets.projects
        ),
        years: Math.min(prev.years + targets.years / steps, targets.years),
        partners: Math.min(
          prev.partners + targets.partners / steps,
          targets.partners
        ),
      }));
    }, stepDuration);

    setTimeout(() => clearInterval(interval), duration);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Notre Équipe",
      content: (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="bg-gradient-to-br from-[#008751]/10 to-[#008751]/20 rounded-lg p-8 flex-1 min-h-[300px] flex items-center justify-center border border-[#008751]/20">
            <Users size={80} className="text-[#008751]" />
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
          <div className="bg-gradient-to-br from-[#008751]/10 to-[#008751]/20 rounded-lg p-8 flex-1 min-h-[300px] flex items-center justify-center border border-[#008751]/20">
            <Target size={80} className="text-[#008751]" />
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
          <div className="bg-gradient-to-br from-[#008751]/10 to-[#008751]/20 rounded-lg p-8 flex-1 min-h-[300px] flex items-center justify-center border border-[#008751]/20">
            <Heart size={80} className="text-[#008751]" />
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
        "Visionnaire passionné par l'innovation technologique, Foula dirige la stratégie globale de Tabali. Fort d'une expérience en entrepreneuriat, il incarne le leadership moderne.",
      phone: "+224 624 36 68 97",
      speciality: "Stratégie & Leadership",
      image: "/team/foula.jpg",
      social: [
        { icon: Linkedin, link: "#", name: "LinkedIn" },
        { icon: Facebook, link: "#", name: "Facebook" },
        { icon: Mail, link: "mailto:foula@tabali.com", name: "Email" },
      ],
    },
    {
      id: 2,
      name: "Jeanos Ouanouno",
      title: "CTO – Directeur Technique & Responsable Infrastructure Cloud",
      description:
        "Expert en développement logiciel et infrastructure cloud, Jeanos supervise la technologie de Tabali. Avec une expérience solide, il est le garant de la performance et de la sécurité de la plateforme.",
      phone: "+224 622 XX XX XX",
      speciality: "Développement & Infrastructure",
      image: "/team/jeanos.jpg",
      social: [
        { icon: Linkedin, link: "#", name: "LinkedIn" },
        { icon: Facebook, link: "#", name: "Facebook" },
        { icon: Mail, link: "mailto:jeanos@tabali.com", name: "Email" },
      ],
    },
    {
      id: 3,
      name: "Fanta Camara",
      title: "Responsable Marketing & Développement Produit",
      description:
        "Spécialiste en marketing digital et growth hacking, Fanta développe la stratégie d'acquisition et de fidélisation des utilisateurs de Tabali.",
      phone: "+224 621 XX XX XX",
      speciality: "Marketing & Growth",
      image: "/team/fanta.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:fanta@tabali.com" },
      ],
    },
    {
      id: 4,
      name: "Aliou Bailo Kouyaté",
      title: "RELATIONS USERS",
      description:
        "Expert en expérience utilisateur, Aliou est responsable de la satisfaction client et de l'optimisation de l'interface de la plateforme Tabali.",
      phone: "+224 623 XX XX XX",
      speciality: "Expérience Utilisateur & Support Client",
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
      title: "Développeur Front-end",
      description:
        "Passionné par le développement web, Alexis crée des interfaces utilisateur modernes et performantes pour la plateforme Tabali.",
      phone: "+224 625 XX XX XX",
      speciality: "Développement Front-end",
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
      title: "Responsable Users",
      description:
        "Ibrahima est le point de contact privilégié pour les utilisateurs de Tabali. Il assure une communication fluide et un support de qualité.",
      phone: "+224 627 XX XX XX",
      speciality: "Support Client & Communication",
      image: "/team/diogo.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:bah@tabali.com" },
      ],
    },
    {
      id: 7,
      name: "Elhadj Ibrahima Diallo",
      title: "Responsable Financier",
      description:
        "Elhadj veille à la bonne gestion des ressources financières de Tabali, prépare les budgets, suit les prévisions et accompagne les levées de fonds.",
      phone: "+224 620 XX XX XX",
      speciality: "Gestion Financière & Budgétisation",
      image: "/team/aissatou.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:aissatou@tabali.com" },
      ],
    },
    {
      id: 8,
      name: "Bakary Kourouma",
      title: "Responsable Partenariats",
      description:
        "Elhadj développe et entretient les collaborations stratégiques de Tabali, ouvrant de nouvelles opportunités pour la croissance et la visibilité de la plateforme.",
      phone: "+224 628 XX XX XX",
      speciality: "Relations & Négociations",
      image: "/team/mohamed-camara.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:mohamed@tabali.com" },
      ],
    },
    {
      id: 9,
      name: "Mohamed Diouné",
      title: "Designer UI/UX",
      description:
        "Mohamed conçoit des interfaces modernes et intuitives, en veillant à l'expérience utilisateur optimale pour tous les clients de Tabali.",
      phone: "+224 626 XX XX XX",
      speciality: "Design & Expérience Utilisateur",
      image: "/team/dioune.jpg",
      social: [
        { icon: Linkedin, link: "#" },
        { icon: Facebook, link: "#" },
        { icon: Mail, link: "mailto:fatoumata@tabali.com" },
      ],
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marie Camara",
      role: "Entrepreneur",
      company: "MC Solutions",
      content:
        "Tabali a révolutionné ma façon de trouver des clients. Interface intuitive, support réactif, je recommande vivement !",
      rating: 5,
      image: "/testimonials/marie.jpg",
    },
    {
      id: 2,
      name: "Ibrahim Diallo",
      role: "Consultant IT",
      company: "Tech Guinée",
      content:
        "Grâce à Tabali, j'ai pu développer mon activité et toucher de nouveaux marchés. Une plateforme exceptionnelle !",
      rating: 5,
      image: "/testimonials/ibrahim.jpg",
    },
    {
      id: 3,
      name: "Fatou Bah",
      role: "Designer",
      company: "Creative Studio",
      content:
        "L'équipe Tabali est à l'écoute et la plateforme facilite vraiment les collaborations professionnelles.",
      rating: 5,
      image: "/testimonials/fatou.jpg",
    },
  ];

  const timeline = [
    {
      year: "2022",
      title: "Naissance de Tabali",
      description:
        "Création de l'entreprise avec une vision claire : démocratiser l'accès aux services professionnels.",
    },
    {
      year: "2023",
      title: "Lancement de la plateforme",
      description:
        "Mise en ligne de la première version avec 100 prestataires et 500 utilisateurs.",
    },
    {
      year: "2024",
      title: "Expansion nationale",
      description:
        "Extension à toute la Guinée avec 2000+ prestataires et 10000+ utilisateurs.",
    },
    {
      year: "2025",
      title: "Innovation continue",
      description:
        "Nouvelles fonctionnalités IA et expansion vers les pays voisins.",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Confiance",
      description:
        "Nous garantissons des échanges sécurisés et transparents entre tous nos utilisateurs.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Nous intégrons les dernières technologies pour améliorer constamment l'expérience utilisateur.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description:
        "Nous favorisons les partenariats durables et les relations de qualité.",
    },
    {
      icon: Globe,
      title: "Accessibilité",
      description:
        "Notre plateforme est conçue pour être accessible à tous, partout en Guinée.",
    },
  ];

  const partners = [
    {
      name: "Orange Guinée",
      logo: "/partners/orange.png",
      type: "Partenaire Technologique",
    },
    {
      name: "Ecobank",
      logo: "/partners/ecobank.png",
      type: "Partenaire Financier",
    },
    { name: "UGB", logo: "/partners/ugb.png", type: "Partenaire Bancaire" },
    {
      name: "MTN Guinée",
      logo: "/partners/mtn.png",
      type: "Partenaire Mobile",
    },
  ];

  const offices = [
    {
      city: "Conakry",
      address: "Quartier Almamya, Kaloum",
      phone: "+224 624 36 68 97",
      email: "conakry@tabali.com",
      hours: "Lun-Ven: 8h-18h, Sam: 9h-13h",
      type: "Siège Social",
      coordinates: { lat: 9.5372, lng: -13.6785 },
    },
    {
      city: "Kankan",
      address: "Centre-ville, près du marché",
      phone: "+224 625 XX XX XX",
      email: "kankan@tabali.com",
      hours: "Lun-Ven: 8h-17h",
      type: "Bureau Régional",
      coordinates: { lat: 10.3853, lng: -9.3069 },
    },
  ];

  const faqs = [
    {
      question: "Depuis quand Tabali existe-t-il ?",
      answer:
        "Tabali a été créé en 2025 avec pour mission de révolutionner la mise en relation professionnelle en Guinée. Nous avons lancé notre plateforme publiquement en 2023 et n'avons cessé de grandir depuis.",
    },
    {
      question: "Combien d'utilisateurs utilisent Tabali ?",
      answer:
        "Nous comptons actuellement plus de 15 000 utilisateurs actifs et 2 500 prestataires certifiés sur notre plateforme. Ces chiffres augmentent chaque mois grâce à la confiance que nous accordent nos clients.",
    },
    {
      question: "Dans quelles villes Tabali est-il disponible ?",
      answer:
        "Tabali est disponible dans toutes les grandes villes de Guinée : Conakry (siège social), Kankan, Labé, N'Zérékoré, Boké, Mamou, Faranah, Kindia et bien d'autres. Nous étendons constamment notre couverture.",
    },
    {
      question: "Comment garantissez-vous la qualité des prestataires ?",
      answer:
        "Tous nos prestataires passent par un processus de vérification rigoureux incluant la validation de leurs compétences, expériences, documents d'identité, et références clients. Nous effectuons également des contrôles qualité réguliers.",
    },
    {
      question: "Quels sont vos projets d'expansion ?",
      answer:
        "Nous planifions une expansion vers les pays voisins (Mali, Sénégal, Côte d'Ivoire) d'ici 2026. Nous développons également de nouvelles fonctionnalités basées sur l'intelligence artificielle pour améliorer l'expérience utilisateur.",
    },
    {
      question: "Comment puis-je devenir partenaire de Tabali ?",
      answer:
        "Nous sommes toujours ouverts aux partenariats stratégiques ! Contactez-nous via notre formulaire de partenariat ou directement par email à partenariat@tabali.com pour discuter des opportunités de collaboration.",
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: { key: string }) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* En-tête de la page */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              À propos de Tabali
            </h1>
            <p className="text-slate-600 text-lg max-w-3xl">
              Découvrez notre équipe, notre mission et notre vision pour
              l&apos;avenir des services professionnels en Guinée et au-delà.
            </p>
          </div>

          {/* Section Statistiques */}
          <div ref={statsRef} className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Tabali en chiffres
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-[#008751] mb-2 group-hover:text-[#006d42]">
                      {Math.round(counters.users).toLocaleString()}+
                    </div>
                    <div className="text-slate-600">Utilisateurs actifs</div>
                  </div>
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-[#008751] mb-2 group-hover:text-[#006d42]">
                      {Math.round(counters.projects).toLocaleString()}+
                    </div>
                    <div className="text-slate-600">Projets réalisés</div>
                  </div>
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-[#008751] mb-2 group-hover:text-[#006d42]">
                      {Math.round(counters.years)}
                    </div>
                    <div className="text-slate-600">
                      Années d&apos;expérience
                    </div>
                  </div>
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-[#008751] mb-2 group-hover:text-[#006d42]">
                      {Math.round(counters.partners)}+
                    </div>
                    <div className="text-slate-600">Partenaires</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Équipe/Fondateur */}
          <div className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Notre Équipe de Direction
                </h2>

                <div className="relative min-h-[500px]">
                  <div
                    key={currentTeamMember}
                    className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                  >
                    <div className="lg:w-1/3">
                      <div className="relative rounded-xl overflow-hidden aspect-square shadow-lg hover:shadow-xl transition-all duration-300">
                        <Image
                          src={teamMembers[currentTeamMember].image}
                          alt={teamMembers[currentTeamMember].name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                        <Phone size={18} className="text-[#008751]" />
                        <span>{teamMembers[currentTeamMember].phone}</span>
                      </div>

                      <div className="flex gap-4">
                        {teamMembers[currentTeamMember].social.map(
                          (social, index) => (
                            <a
                              key={index}
                              href={social.link}
                              className="p-2 rounded-full bg-slate-100 hover:bg-[#008751] hover:text-white transition-all duration-300 text-slate-600 group"
                              target="_blank"
                            >
                              <social.icon
                                size={20}
                                className="group-hover:scale-110 transition-transform duration-200"
                              />
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation et indicateurs pour l'équipe */}
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevTeamMember}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751] transition-all duration-300"
                      aria-label="Membre précédent"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextTeamMember}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751] transition-all duration-300"
                      aria-label="Membre suivant"
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </div>

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {teamMembers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTeamMember(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTeamMember
                            ? "bg-[#008751] scale-110"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Aller au membre ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Slider amélioré */}
          <div className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="relative min-h-[400px]">
                  <div key={currentSlide}>{slides[currentSlide].content}</div>

                  {/* Navigation buttons */}
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevSlide}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751] transition-all duration-300"
                      aria-label="Section précédente"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      className="hover:bg-[#008751] hover:text-white hover:border-[#008751] transition-all duration-300"
                      aria-label="Section suivante"
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
                            ? "bg-[#008751] scale-110"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Aller à la section ${index + 1}: ${
                          slides[index].title
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline de l'entreprise */}
          <div ref={timelineRef} className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Notre Parcours
                </h2>
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div
                      key={item.year}
                      className={`flex items-start gap-6 ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-[#008751] rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-default">
                        <Calendar
                          size={24}
                          className="group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div
                        className={`flex-grow bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
                          index % 2 === 0 ? "lg:text-left" : "lg:text-right"
                        }`}
                      >
                        <div className="text-lg font-bold text-[#008751] mb-2">
                          {item.year}
                        </div>
                        <div className="text-xl font-semibold text-slate-800 mb-2">
                          {item.title}
                        </div>
                        <div className="text-slate-600">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Valeurs de l'entreprise */}
          <div ref={valuesRef} className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Nos Valeurs Fondamentales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value) => (
                    <div
                      key={value.title}
                      className="text-center p-6 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-default"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#008751] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:bg-[#006d42] transition-all duration-300">
                        <value.icon
                          size={32}
                          className="text-white group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-slate-800 group-hover:text-[#008751] transition-colors duration-200">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Témoignages */}
          <div ref={testimonialsRef} className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Témoignages Clients
                </h2>
                <div className="relative min-h-[300px]">
                  <div
                    key={currentTestimonial}
                    className="text-center max-w-2xl mx-auto"
                  >
                    <div className="mb-6">
                      <Quote
                        size={40}
                        className="text-[#008751] mx-auto mb-4"
                      />
                      <p className="text-lg text-slate-600 italic mb-4 leading-relaxed">
                        &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                      </p>
                      <div className="flex justify-center mb-4">
                        {[
                          ...Array(testimonials[currentTestimonial].rating),
                        ].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                        <Users size={20} className="text-slate-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {testimonials[currentTestimonial].role} •{" "}
                          {testimonials[currentTestimonial].company}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicateurs pour les témoignages */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? "bg-[#008751] scale-110"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Témoignage ${index + 1} de ${
                          testimonials[index].name
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Partenaires/Certifications */}
          <div className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Nos Partenaires de Confiance
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center min-h-[120px] group cursor-default"
                    >
                      <div className="text-slate-400 text-center group-hover:text-[#008751] transition-colors duration-200">
                        <Award
                          size={40}
                          className="mx-auto mb-2 group-hover:scale-110 transition-transform duration-200"
                        />
                        <div className="text-sm font-medium mb-1">
                          {partner.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {partner.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-slate-600 mb-4">
                    Intéressé par un partenariat avec Tabali ?
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white transition-all duration-300"
                  >
                    <Handshake className="mr-2" size={18} />
                    Devenir partenaire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Localisation avec carte interactive */}
          <div className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Nos Bureaux & Zones de Service
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {offices.map((office) => (
                    <div
                      key={office.city}
                      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#008751] rounded-full flex items-center justify-center flex-shrink-0">
                          <Building size={24} className="text-white" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-slate-800">
                              {office.city}
                            </h3>
                            <span className="text-xs px-2 py-1 bg-[#008751]/10 text-[#008751] rounded-full font-medium">
                              {office.type}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-[#008751]" />
                              <span>{office.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={16} className="text-[#008751]" />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={16} className="text-[#008751]" />
                              <span>{office.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-[#008751]" />
                              <span>{office.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-[#008751]/5 to-[#008751]/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-slate-800 text-center">
                    Zones de Service
                  </h3>
                  <p className="text-slate-600 mb-4 text-center">
                    Tabali est présent dans toutes les grandes villes de Guinée
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "Conakry",
                      "Kankan",
                      "Labé",
                      "N'Zérékoré",
                      "Boké",
                      "Mamou",
                      "Faranah",
                      "Kindia",
                    ].map((city) => (
                      <div
                        key={city}
                        className="flex items-center gap-2 text-slate-600 hover:text-[#008751] transition-colors duration-200"
                      >
                        <MapPin size={16} className="text-[#008751]" />
                        <span className="font-medium">{city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section Expandable */}
          <div className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                  Questions Fréquemment Posées
                </h2>
                <div className="space-y-4 max-w-3xl mx-auto">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200"
                    >
                      <button
                        onClick={() =>
                          setOpenFAQ(openFAQ === index ? null : index)
                        }
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#008751] focus:ring-inset"
                        aria-expanded={openFAQ === index}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <span className="font-medium text-slate-800 pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                            openFAQ === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFAQ === index && (
                        <div
                          id={`faq-answer-${index}`}
                          className="p-4 pt-0 text-slate-600 border-t border-slate-100 animate-in slide-in-from-top duration-200"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-slate-600 mb-4">
                    Vous avez d&apos;autres questions ?
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white transition-all duration-300"
                  >
                    <Mail className="mr-2" size={18} />
                    Contactez notre support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Contact/CTA améliorée */}
          <div>
            <Card className="overflow-hidden bg-gradient-to-br from-[#008751]/5 to-[#008751]/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-slate-800">
                  Rejoignez l&apos;Écosystème Tabali
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                  Que vous souhaitiez en savoir plus sur notre équipe, notre
                  histoire, nos valeurs, ou explorer des opportunités de
                  collaboration, nous sommes là pour vous accompagner.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                    <UserPlus
                      size={40}
                      className="text-[#008751] mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                    />
                    <h3 className="font-bold text-slate-800 mb-2">
                      Rejoindre l&apos;équipe
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Découvrez nos opportunités de carrière et rejoignez une
                      équipe passionnée.
                    </p>
                    <Button
                      size="sm"
                      className="bg-[#008751] hover:bg-[#006d42] text-white w-full transition-all duration-300"
                    >
                      Voir les postes
                    </Button>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                    <Handshake
                      size={40}
                      className="text-[#008751] mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                    />
                    <h3 className="font-bold text-slate-800 mb-2">
                      Devenir partenaire
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Explorez nos opportunités de partenariat stratégique.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white w-full transition-all duration-300"
                    >
                      En savoir plus
                    </Button>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                    <Download
                      size={40}
                      className="text-[#008751] mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                    />
                    <h3 className="font-bold text-slate-800 mb-2">
                      Notre présentation
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Téléchargez notre dossier de présentation complet.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 text-slate-600 hover:bg-slate-100 w-full transition-all duration-300"
                    >
                      Télécharger PDF
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    size="lg"
                    className="bg-[#008751] hover:bg-[#006d42] text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="mr-2" size={20} />
                    Nous contacter
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white font-medium transition-all duration-300"
                  >
                    <ExternalLink className="mr-2" size={20} />
                    Visiter notre plateforme
                  </Button>
                </div>

                {/* Contact rapide */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-600">
                    <div className="flex flex-col items-center gap-2">
                      <Phone size={18} className="text-[#008751]" />
                      <span className="font-medium">Téléphone</span>
                      <span className="text-sm">+224 624 36 68 97</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Mail size={18} className="text-[#008751]" />
                      <span className="font-medium">Email</span>
                      <span className="text-sm">contact@tabali.com</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <MapPin size={18} className="text-[#008751]" />
                      <span className="font-medium">Adresse</span>
                      <span className="text-sm">Conakry, Guinée</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
