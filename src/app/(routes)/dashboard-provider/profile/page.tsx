"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  FileText, 
  Camera,
  Save,
} from "lucide-react";
import Image from "next/image";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

// Interface pour le profil du prestataire
interface ProviderProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  profession: string;
  specialization: string;
  bio: string;
  education: string;
  experience: string;
  languages: string[];
  profilePicture: string | null;
}

// Données fictives pour le profil du prestataire
const MOCK_PROFILE: ProviderProfile = {
  id: "provider-1",
  firstName: "Jeanos",
  lastName: "Ouranos",
  email: "jeanosOuranos@tabali.com",
  phone: "+33 6 12 34 56 78",
  address: "123 Avenue des Champs-Élysées, 75008 Paris",
  profession: "Avocat",
  specialization: "Droit des affaires",
  bio: "Avocat spécialisé en droit des affaires avec plus de 10 ans d'expérience. Je propose des consultations juridiques personnalisées pour les entreprises et les particuliers.",
  education: "Master en Droit des Affaires - Université Paris 1 Panthéon-Sorbonne",
  experience: "10 ans d'expérience en cabinet d'avocats",
  languages: ["Français", "Anglais", "Espagnol"],
  profilePicture: "/placeholder-avatar.jpg"
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProviderProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setProfile(MOCK_PROFILE);
      setFormData(MOCK_PROFILE);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simuler l'enregistrement des données
    setTimeout(() => {
      if (formData) {
        setProfile(formData);
      }
      setIsEditing(false);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-tabali-text">Mon profil</h1>
        <p className="text-tabali-muted-text">Gérez vos informations personnelles et professionnelles</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 bg-slate-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Actions */}
          <div className="flex justify-end">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all"
              >
                Modifier mon profil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-tabali-muted text-tabali-text rounded-md hover:bg-tabali-muted/90 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Enregistrer</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Informations personnelles */}
          <motion.div variants={item}>
            <Card className="border-tabali-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo de profil */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-tabali-muted">
                      <Image
                        src={profile?.profilePicture || "/placeholder-avatar.jpg"}
                        alt={`${profile?.firstName} ${profile?.lastName}`}
                        fill
                        className="object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <button className="text-sm text-tabali-primary">
                        Changer la photo
                      </button>
                    )}
                  </div>

                  {/* Formulaire d'informations personnelles */}
                  <div className="flex-1 space-y-4">
                    <h2 className="text-xl font-medium text-tabali-text flex items-center gap-2">
                      <User className="h-5 w-5 text-tabali-primary" />
                      Informations personnelles
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-tabali-muted-text mb-1">
                          Prénom
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="firstName"
                            value={formData?.firstName || ""}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                          />
                        ) : (
                          <p className="text-tabali-text">{profile?.firstName || ""}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-tabali-muted-text mb-1">
                          Nom
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="lastName"
                            value={formData?.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                          />
                        ) : (
                          <p className="text-tabali-text">{profile?.lastName}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-tabali-muted-text mb-1 flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                          />
                        ) : (
                          <p className="text-tabali-text">{profile?.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-tabali-muted-text mb-1 flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Téléphone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData?.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                          />
                        ) : (
                          <p className="text-tabali-text">{profile?.phone}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-tabali-muted-text mb-1 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Adresse
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            value={formData?.address}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                          />
                        ) : (
                          <p className="text-tabali-text">{profile?.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Informations professionnelles */}
          <motion.div variants={item}>
            <Card className="border-tabali-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium text-tabali-text flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-tabali-primary" />
                  Informations professionnelles
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-tabali-muted-text mb-1">
                        Profession
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="profession"
                          value={formData?.profession}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                        />
                      ) : (
                        <p className="text-tabali-text">{profile?.profession}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-tabali-muted-text mb-1">
                        Spécialisation
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="specialization"
                          value={formData?.specialization}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                        />
                      ) : (
                        <p className="text-tabali-text">{profile?.specialization}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-tabali-muted-text mb-1 flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Biographie
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData?.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                      />
                    ) : (
                      <p className="text-tabali-text">{profile?.bio}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-tabali-muted-text mb-1">
                      Formation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="education"
                        value={formData?.education}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                      />
                    ) : (
                      <p className="text-tabali-text">{profile?.education}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-tabali-muted-text mb-1">
                      Expérience
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={formData?.experience}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                      />
                    ) : (
                      <p className="text-tabali-text">{profile?.experience}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-tabali-muted-text mb-1">
                      Langues parlées
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="languages"
                        value={formData?.languages ? formData?.languages.join(", ") : ""}
                        onChange={(e) => {
                          if (formData) {
                            setFormData({
                              ...formData,
                              languages: e.target.value.split(",").map(lang => lang.trim())
                            });
                          }
                        }}
                        className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                        placeholder="Séparées par des virgules"
                      />
                    ) : (
                      <p className="text-tabali-text">{profile?.languages ? profile.languages.join(", ") : ""}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
