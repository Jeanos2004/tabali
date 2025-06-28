'use client';

import { useState } from 'react';

export default function AddServicePage() {
  const [form, setForm] = useState({
    nom: '',
    categorie: '',
    description: '',
    prix: '',
    duree: '',
    lieu: '',
    contact: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service à soumettre :', form);
    alert('Service ajouté avec succès !');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white w-full md:w-1/2 p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold mb-4">Ajouter un service</h2>

        <div>
          <label className="block font-medium">Nom du service</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Catégorie</label>
          <select
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Sélectionner --</option>
            <option value="Hébergement">Hébergement</option>
            <option value="Transport">Transport</option>
            <option value="Restauration">Restauration</option>
            <option value="Service à domicile">Service à domicile</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Prix (GNF)</label>
          <input
            type="number"
            name="prix"
            value={form.prix}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Durée / Disponibilité</label>
          <input
            type="text"
            name="duree"
            value={form.duree}
            onChange={handleChange}
            placeholder="ex : 2 jours / Tous les vendredis"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Lieu</label>
          <input
            type="text"
            name="lieu"
            value={form.lieu}
            onChange={handleChange}
            placeholder="ex : Conakry"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Contact (téléphone ou email)</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="ex : +224 620 00 00 00"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Image du service</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Ajouter le service
        </button>
      </form>

      {/* Preview live */}
      <div className="hidden md:block md:w-1/2 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Aperçu du service</h3>
        <div className="space-y-2">
          <p><strong>Nom :</strong> {form.nom}</p>
          <p><strong>Catégorie :</strong> {form.categorie}</p>
          <p><strong>Description :</strong> {form.description}</p>
          <p><strong>Prix :</strong> {form.prix} GNF</p>
          <p><strong>Durée :</strong> {form.duree}</p>
          <p><strong>Lieu :</strong> {form.lieu}</p>
          <p><strong>Contact :</strong> {form.contact}</p>
          {form.image && (
            <div className="mt-4">
              <p className="font-medium">Image sélectionnée :</p>
              <img
                src={URL.createObjectURL(form.image)}
                alt="Aperçu"
                className="w-full h-auto rounded border mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
