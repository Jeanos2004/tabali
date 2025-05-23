"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess('Message envoyé avec succès !');
      setFormData({ prenom: '', nom: '', email: '', sujet: '', message: '' });
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="formulaire-contact" className="flex-1 space-y-6 scroll-mt-40">
      {success && <div className="mb-4 text-green-700 bg-green-100 p-3 rounded text-center">{success}</div>}
      {error && <div className="mb-4 text-red-700 bg-red-100 p-3 rounded text-center">{error}</div>}

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="prenom" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Prénom</label>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Votre prénom" required className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary" />
        </div>
        <div className="flex-1">
          <label htmlFor="nom" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Nom</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" required className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="votre@email.com" required className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary" />
      </div>

      <div>
        <label htmlFor="sujet" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Sujet</label>
        <input type="text" id="sujet" name="sujet" value={formData.sujet} onChange={handleChange} placeholder="Sujet de votre message" required className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Message</label>
        <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary" />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-tabali-primary text-white font-medium py-2 px-4 rounded-md hover:bg-tabali-primary-dark transition disabled:opacity-50">
        {loading ? 'Envoi en cours...' : 'Envoyer'}
      </button>
    </form>
  );
}
