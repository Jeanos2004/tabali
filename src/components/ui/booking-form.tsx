"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, MapPin, FileText, CreditCard, Calendar, Lock, User, Smartphone } from "lucide-react";

interface BookingFormProps {
  onFormChange: (formData: {
    service: string;
    address: string;
    description: string;
    paymentMethod: string;
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
    mobileNumber?: string;
    isComplete: boolean;
  }) => void;
  services: string[];
}

export default function BookingForm({ onFormChange, services }: BookingFormProps) {
  const [formData, setFormData] = useState({
    service: "",
    address: "",
    description: "",
    paymentMethod: "card", // Méthode de paiement par défaut
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    mobileNumber: "",
  });
  
  const [focused, setFocused] = useState({
    service: false,
    address: false,
    description: false,
    paymentMethod: false,
    cardNumber: false,
    cardHolder: false,
    expiryDate: false,
    cvv: false,
    mobileNumber: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    let formattedValue = value;

    // Format des numéros de carte avec des espaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "") // Efface les espaces existants
        .replace(/(\d{4})/g, "$1 ") // Ajoute un espace après chaque groupe de 4 chiffres
        .trim(); // Supprime les espaces à la fin
    }

    // Format de la date d'expiration
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\//g, "") // Supprime les slashes existants
        .replace(/^(\d{2})(\d{0,2})/, "$1/$2") // Ajoute un slash après les 2 premiers chiffres
        .substring(0, 5); // Limite à 5 caractères (MM/YY)
    }
    
    // Format du numéro de téléphone mobile
    if (name === "mobileNumber") {
      formattedValue = value
        .replace(/\D/g, "") // Supprime les caractères non numériques
        .substring(0, 10); //  Limite à 10 chiffres
    }
    
    const newFormData = { ...formData, [name]: formattedValue };
    setFormData(newFormData);
    
    // Vérifie si le formulaire est complet
    const isComplete = Boolean(
      newFormData.service && 
      newFormData.address && 
      ((newFormData.paymentMethod === "card" && 
        newFormData.cardNumber.replace(/\s/g, "").length === 16 &&
        newFormData.cardHolder &&
        newFormData.expiryDate.length === 5 &&
        newFormData.cvv.length === 3) ||
      newFormData.paymentMethod === "paypal" ||
      (newFormData.paymentMethod === "orangemoney" && 
        newFormData.mobileNumber.length === 10) ||
      (newFormData.paymentMethod === "mobilemoney" && 
        newFormData.mobileNumber.length === 10) ||
      newFormData.paymentMethod === "paycard")
    );
    
    onFormChange({
      ...newFormData,
      isComplete,
    });
  };
  
  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };
  
  const handleBlur = (field: string) => {
    setFocused({ ...focused, [field]: false });
  };

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
     
      <CardContent className="p-6 bg-white">
        <div className="space-y-6">
          <div className="relative">
            <div className={`flex items-center mb-2 ${focused.service || formData.service ? 'text-green-700' : 'text-gray-700'}`}>
              <Clock className="h-5 w-5 mr-2" />
              <label htmlFor="service" className="block text-base font-medium">
                Service requis *
              </label>
            </div>
            <div className={`relative rounded-lg transition-all duration-200 ${focused.service ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
              <select
                id="service"
                name="service"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                value={formData.service}
                onChange={handleChange}
                onFocus={() => handleFocus('service')}
                onBlur={() => handleBlur('service')}
                required
              >
                <option value="">Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <div className={`flex items-center mb-2 ${focused.address || formData.address ? 'text-green-700' : 'text-gray-700'}`}>
              <MapPin className="h-5 w-5 mr-2" />
              <label htmlFor="address" className="block text-base font-medium">
                Adresse d&apos;intervention *
              </label>
            </div>
            <div className={`relative rounded-lg transition-all duration-200 ${focused.address ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
              <input
                type="text"
                id="address"
                name="address"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                placeholder="Entrez l'adresse complète"
                value={formData.address}
                onChange={handleChange}
                onFocus={() => handleFocus('address')}
                onBlur={() => handleBlur('address')}
                required
              />
            </div>
          </div>

          <div className="relative">
            <div className={`flex items-center mb-2 ${focused.description || formData.description ? 'text-green-700' : 'text-gray-700'}`}>
              <FileText className="h-5 w-5 mr-2" />
              <label htmlFor="description" className="block text-base font-medium">
                Description du besoin
              </label>
            </div>
            <div className={`relative rounded-lg transition-all duration-200 ${focused.description ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base resize-none"
                placeholder="Décrivez votre besoin en détail pour aider le prestataire à se préparer"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => handleFocus('description')}
                onBlur={() => handleBlur('description')}
              />
            </div>
          </div>
          
          {/* Section de paiement */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-slate-800 mb-4">
              Informations de paiement *
            </h3>
            
            <div className="relative mb-6">
              <div className={`flex items-center mb-2 ${focused.paymentMethod || formData.paymentMethod ? 'text-green-700' : 'text-gray-700'}`}>
                <CreditCard className="h-5 w-5 mr-2" />
                <label htmlFor="paymentMethod" className="block text-base font-medium">
                  Méthode de paiement *
                </label>
              </div>
              <div className={`relative rounded-lg transition-all duration-200 ${focused.paymentMethod ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  onFocus={() => handleFocus('paymentMethod')}
                  onBlur={() => handleBlur('paymentMethod')}
                  required
                >
                  <option value="card">Carte bancaire</option>
                  <option value="paypal">PayPal</option>
                  <option value="orangemoney">Orange Money</option>
                  <option value="mobilemoney">Mobile Money</option>
                  <option value="paycard">PayCard</option>
                </select>
              </div>
            </div>

            {formData.paymentMethod === "card" && (
              <div className="space-y-6">
                <div className="relative">
                  <div className={`flex items-center mb-2 ${focused.cardNumber || formData.cardNumber ? 'text-green-700' : 'text-gray-700'}`}>
                    <CreditCard className="h-5 w-5 mr-2" />
                    <label htmlFor="cardNumber" className="block text-base font-medium">
                      Numéro de carte *
                    </label>
                  </div>
                  <div className={`relative rounded-lg transition-all duration-200 ${focused.cardNumber ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      onFocus={() => handleFocus('cardNumber')}
                      onBlur={() => handleBlur('cardNumber')}
                      maxLength={19} // 16 digits + 3 spaces
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className={`flex items-center mb-2 ${focused.cardHolder || formData.cardHolder ? 'text-green-700' : 'text-gray-700'}`}>
                    <User className="h-5 w-5 mr-2" />
                    <label htmlFor="cardHolder" className="block text-base font-medium">
                      Titulaire de la carte *
                    </label>
                  </div>
                  <div className={`relative rounded-lg transition-all duration-200 ${focused.cardHolder ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                      placeholder="NOM PRÉNOM"
                      value={formData.cardHolder}
                      onChange={handleChange}
                      onFocus={() => handleFocus('cardHolder')}
                      onBlur={() => handleBlur('cardHolder')}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className={`flex items-center mb-2 ${focused.expiryDate || formData.expiryDate ? 'text-green-700' : 'text-gray-700'}`}>
                      <Calendar className="h-5 w-5 mr-2" />
                      <label htmlFor="expiryDate" className="block text-base font-medium">
                        Date d&apos;expiration *
                      </label>
                    </div>
                    <div className={`relative rounded-lg transition-all duration-200 ${focused.expiryDate ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        onFocus={() => handleFocus('expiryDate')}
                        onBlur={() => handleBlur('expiryDate')}
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`flex items-center mb-2 ${focused.cvv || formData.cvv ? 'text-green-700' : 'text-gray-700'}`}>
                      <Lock className="h-5 w-5 mr-2" />
                      <label htmlFor="cvv" className="block text-base font-medium">
                        CVV *
                      </label>
                    </div>
                    <div className={`relative rounded-lg transition-all duration-200 ${focused.cvv ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        onFocus={() => handleFocus('cvv')}
                        onBlur={() => handleBlur('cvv')}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {(formData.paymentMethod === "orangemoney" || formData.paymentMethod === "mobilemoney") && (
              <div className="space-y-6">
                <div className="relative">
                  <div className={`flex items-center mb-2 ${focused.mobileNumber || formData.mobileNumber ? 'text-green-700' : 'text-gray-700'}`}>
                    <Smartphone className="h-5 w-5 mr-2" />
                    <label htmlFor="mobileNumber" className="block text-base font-medium">
                      Numéro de téléphone *
                    </label>
                  </div>
                  <div className={`relative rounded-lg transition-all duration-200 ${focused.mobileNumber ? 'ring-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'}`}>
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white text-base"
                      placeholder="624366897"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      onFocus={() => handleFocus('mobileNumber')}
                      onBlur={() => handleBlur('mobileNumber')}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                  <p className="text-sm text-blue-700">
                    {formData.paymentMethod === "orangemoney" 
                      ? "Un SMS avec un code de paiement vous sera envoyé pour confirmer votre transaction Orange Money." 
                      : "Vous recevrez une notification sur votre téléphone pour valider votre paiement Mobile Money."}
                  </p>
                </div>
              </div>
            )}
            
            {formData.paymentMethod === "paypal" && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-sm text-blue-700">
                  Vous serez redirigé vers PayPal pour compléter votre paiement après confirmation de votre réservation.
                </p>
              </div>
            )}
            
            {formData.paymentMethod === "paycard" && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-sm text-green-700">
                  Le paiement sera effectué via PayCard lors de la validation de votre commande. Aucune information supplémentaire n&apos;est requise à ce stade.
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Check className="h-5 w-5 text-green-700" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">
                  Les champs marqués d&apos;un astérisque (*) sont obligatoires pour traiter votre demande.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}