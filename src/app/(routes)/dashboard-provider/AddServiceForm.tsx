"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function AddServiceForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    location: "",
    contact: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pour vérifier si le fichier image est bien sélectionné
    if (form.image) {
      console.log("Image sélectionnée :", form.image.name);
    }

    console.log("Formulaire envoyé :", form);
    // Tu pourras ensuite envoyer les données au serveur ici
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-tabali-text">
      <div>
        <Label htmlFor="name" className="text-tabali-primary">Nom du service</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ex: Location de voiture"
        />
      </div>

      <div className="bg-gray-800 text-white border border-gray-600">
        <Label htmlFor="category" className="text-white">Catégorie</Label>

       <div className="bg-gray-900 text-white border border-gray-700">
          <Select onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="hebergement">Hébergement</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="restauration">Restauration</SelectItem>
              <SelectItem value="plomberie">Plomberie</SelectItem>
              <SelectItem value="electricite">Électricité</SelectItem>
              <SelectItem value="menuiserie">Menuiserie</SelectItem>
              <SelectItem value="maconnerie">Maçonnerie</SelectItem>
              <SelectItem value="peinture">Peinture</SelectItem>
              <SelectItem value="jardinage">Jardinage</SelectItem>
              <SelectItem value="menage">Ménage</SelectItem>
              <SelectItem value="deménagement">Déménagement</SelectItem>
              <SelectItem value="informatique">Informatique</SelectItem>
              <SelectItem value="serrurerie">Serrurerie</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <div>
        <Label htmlFor="description" className="text-tabali-primary">Description détaillée</Label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Décris ton service ici"
        />
      </div>

      <div>
        <Label htmlFor="price" className="text-tabali-primary">Prix (GNF)</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Ex: 500000"
        />
      </div>

      <div>
        <Label htmlFor="duration" className="text-tabali-primary">Durée ou disponibilité</Label>
        <Input
          id="duration"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Ex: Tous les jours de 8h à 18h"
        />
      </div>

      <div>
        <Label htmlFor="location" className="text-tabali-primary">Lieu</Label>
        <Input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Ex: Conakry, Kaloum"
        />
      </div>

      <div>
        <Label htmlFor="contact" className="text-tabali-primary">Contact rapide (email ou téléphone)</Label>
        <Input
          id="contact"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Ex: +224 625 00 00 00"
        />
      </div>

      <div>
        <Label htmlFor="image" className="text-tabali-primary">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-tabali-primary text-white hover:bg-yellow-500 hover:text-tabali-primary transition-all"
      >
        Enregistrer le service
      </Button>
    </form>
  );
}
