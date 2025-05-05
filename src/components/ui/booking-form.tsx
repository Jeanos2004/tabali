"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface BookingFormProps {
  onFormChange: (formData: {
    service: string;
    address: string;
    description: string;
    isComplete: boolean;
  }) => void;
  services: string[];
}

export function BookingForm({ onFormChange, services }: BookingFormProps) {
  const [formData, setFormData] = useState({
    service: "",
    address: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Vérifier si le formulaire est complet
    const isComplete = Boolean(
      newFormData.service && 
      newFormData.address
    );
    
    onFormChange({
      ...newFormData,
      isComplete,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
              Service requis *
            </label>
            <select
              id="service"
              name="service"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#008751] focus:ring-[#008751] sm:text-sm"
              value={formData.service}
              onChange={handleChange}
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

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
              Adresse d&apos;intervention *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#008751] focus:ring-[#008751] sm:text-sm"
              placeholder="Entrez l'adresse complète"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
              Description du besoin
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#008751] focus:ring-[#008751] sm:text-sm"
              placeholder="Décrivez votre besoin en détail pour aider le prestataire à se préparer"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="text-sm text-slate-500">
            * Champs obligatoires
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
