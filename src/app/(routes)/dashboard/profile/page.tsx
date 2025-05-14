"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon, LockIcon, ShieldIcon, BellIcon, EyeIcon, EyeOffIcon } from "lucide-react";
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

// Mock user data
const MOCK_USER = {
  name: "Jeanos Ouranos",
  email: "jeanosOuranos@tabali.com",
  phone: "+224 620 327 906",
  address: "Conakry - Cimenterie",
  avatar: "",
  memberSince: "Janvier 2025",
  security: {
    twoFactorAuth: false,
    loginNotifications: true,
    lastPasswordChange: "15 Avril 2025",
    sessionTimeout: 30 // minutes
  }
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(MOCK_USER);
  const [formData, setFormData] = useState(MOCK_USER);
  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Fonction pour gérer les changements dans les champs de formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Fonction pour gérer les changements dans les paramètres de sécurité
  const handleSecurityToggle = (setting: string) => {
    setFormData({
      ...formData,
      security: {
        ...formData.security,
        [setting]: !formData.security[setting as keyof typeof formData.security]
      }
    });
  };

  // Fonction pour gérer le changement de la valeur du timeout de session
  
  
  // Fonction pour enregistrer les modifications
  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  // Fonction pour annuler les modifications
  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  // Fonction pour gérer le changement de mot de passe
  const handlePasswordChange = () => {
    // Validation simple
    if (newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    // Simuler un changement de mot de passe réussi
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
    
    // Mettre à jour la date de dernier changement de mot de passe
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('fr-FR', { month: 'long' })} ${today.getFullYear()}`;
    
    setUserData({
      ...userData,
      security: {
        ...userData.security,
        lastPasswordChange: formattedDate
      }
    });

    setFormData({
      ...formData,
      security: {
        ...formData.security,
        lastPasswordChange: formattedDate
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-tabali-text">Mon profil</h1>
          <p className="text-tabali-muted-text">Gérez vos informations personnelles et vos paramètres de sécurité</p>
        </div>
        {isEditing ? (
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button 
              onClick={handleCancel}
              className="px-4 py-2 border border-tabali-border rounded-md hover:bg-tabali-muted/50 transition-all"
            >
              Annuler
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all"
            >
              Enregistrer
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all mt-4 sm:mt-0"
          >
            Modifier le profil
          </button>
        )}
      </div>
      
      <div className="flex border-b border-tabali-border mb-6">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-2 font-medium ${activeTab === "personal" ? "text-tabali-primary border-b-2 border-tabali-primary" : "text-tabali-muted-text"}`}
        >
          Informations personnelles
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 font-medium ${activeTab === "security" ? "text-tabali-primary border-b-2 border-tabali-primary" : "text-tabali-muted-text"}`}
        >
          Sécurité
        </button>
      </div>

      {activeTab === "personal" ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
        {/* Profile Card */}
        <motion.div variants={item} className="md:col-span-1">
          <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-tabali-muted border-2 border-tabali-primary mb-4">
                {MOCK_USER.avatar ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={MOCK_USER.avatar} 
                      alt={MOCK_USER.name} 
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-tabali-primary to-tabali-secondary opacity-70 flex items-center justify-center text-white font-bold text-4xl">
                    {MOCK_USER.name.charAt(0)}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-medium text-tabali-text">{MOCK_USER.name}</h2>
              <p className="text-tabali-muted-text text-sm mt-1">Client</p>
              <p className="text-sm text-tabali-muted-text mt-2">Membre depuis {MOCK_USER.memberSince}</p>
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all w-full"
              >
                {isEditing ? "Enregistrer" : "Modifier le profil"}
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={item} className="md:col-span-2">
          <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-medium text-tabali-text mb-4">Informations de contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tabali-muted flex items-center justify-center">
                    <MailIcon className="h-5 w-5 text-tabali-primary" />
                  </div>
                  {isEditing ? (
                    <div className="flex-1">
                      <label className="block text-sm text-tabali-muted-text">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-tabali-muted-text">Email</p>
                      <p className="font-medium text-tabali-text">{userData.email}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tabali-muted flex items-center justify-center">
                    <PhoneIcon className="h-5 w-5 text-tabali-primary" />
                  </div>
                  {isEditing ? (
                    <div className="flex-1">
                      <label className="block text-sm text-tabali-muted-text">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-tabali-muted-text">Téléphone</p>
                      <p className="font-medium text-tabali-text">{userData.phone}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tabali-muted flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-tabali-primary" />
                  </div>
                  {isEditing ? (
                    <div className="flex-1">
                      <label className="block text-sm text-tabali-muted-text">Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-tabali-border rounded-md focus:outline-none focus:ring-2 focus:ring-tabali-primary/50"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-tabali-muted-text">Adresse</p>
                      <p className="font-medium text-tabali-text">{userData.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item}>
            <Card className="border-tabali-border hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-medium text-tabali-text">Paramètres de sécurité</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-tabali-muted flex items-center justify-center">
                        <ShieldIcon className="h-5 w-5 text-tabali-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-tabali-text">Authentification à deux facteurs</p>
                        <p className="text-sm text-tabali-muted-text">Renforce la sécurité de votre compte</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => isEditing && handleSecurityToggle("twoFactorAuth")}
                        className={`w-12 h-6 rounded-full relative transition-all ${formData.security.twoFactorAuth ? "bg-tabali-primary" : "bg-tabali-muted"} ${!isEditing && "opacity-70 cursor-not-allowed"}`}
                        disabled={!isEditing}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.security.twoFactorAuth ? "left-7" : "left-1"}`}></span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-tabali-muted flex items-center justify-center">
                        <BellIcon className="h-5 w-5 text-tabali-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-tabali-text">Notifications de connexion</p>
                        <p className="text-sm text-tabali-muted-text">Recevez un e-mail lors d&apos;une nouvelle connexion</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => isEditing && handleSecurityToggle("loginNotifications")}
                        className={`w-12 h-6 rounded-full relative transition-all ${formData.security.loginNotifications ? "bg-tabali-primary" : "bg-tabali-muted"} ${!isEditing && "opacity-70 cursor-not-allowed"}`}
                        disabled={!isEditing}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.security.loginNotifications ? "left-7" : "left-1"}`}></span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-tabali-muted flex items-center justify-center">
                        <LockIcon className="h-5 w-5 text-tabali-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-tabali-text">Mot de passe</p>
                        <p className="text-sm text-tabali-muted-text">Dernier changement: {userData.security.lastPasswordChange}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      className="px-3 py-1 text-sm border border-tabali-border rounded-md hover:bg-tabali-muted/50 transition-all"
                    >
                      Changer
                    </button>
                  </div>
                  
                  {isChangingPassword && (
                    <div className="mt-4 p-4 border border-tabali-border rounded-md bg-tabali-muted/10">
                      <h4 className="text-md font-medium mb-3">Changer votre mot de passe</h4>
                      {passwordError && (
                        <p className="text-red-500 text-sm mb-3">{passwordError}</p>
                      )}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm mb-1">Mot de passe actuel</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="w-full px-3 py-2 border border-tabali-border rounded-md"
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-tabali-muted-text"
                            >
                              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Nouveau mot de passe</label>
                          <input 
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-tabali-border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Confirmer le mot de passe</label>
                          <input 
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-tabali-border rounded-md"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={handlePasswordChange}
                            className="px-4 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all"
                          >
                            Enregistrer
                          </button>
                          <button 
                            onClick={() => {
                              setIsChangingPassword(false);
                              setPasswordError("");
                              setCurrentPassword("");
                              setNewPassword("");
                              setConfirmPassword("");
                            }}
                            className="px-4 py-2 border border-tabali-border rounded-md hover:bg-tabali-muted/50 transition-all"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
