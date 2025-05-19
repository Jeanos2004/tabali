"use client";
import React, { useState } from 'react';

export default function ContactPage() {
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
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        sujet: '',
        message: '',
      });
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-tabali-muted px-4 py-12">
      <div className="w-full max-w-6xl bg-white p-8 rounded-md shadow-tabali-sm mb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-tabali-foreground">Envoyez-nous un message</h2>
          <p className="text-lg text-tabali-muted-foreground mb-4">
            Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos besoins.
          </p>
        
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            {success && (
              <div className="mb-4 text-green-700 bg-green-100 p-3 rounded text-center">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 text-red-700 bg-red-100 p-3 rounded text-center">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="prenom" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  required
                  className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="nom" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary"
              />
            </div>

            <div>
              <label htmlFor="sujet" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Sujet</label>
              <input
                type="text"
                id="sujet"
                name="sujet"
                value={formData.sujet}
                onChange={handleChange}
                placeholder="Sujet de votre message"
                required
                className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-tabali-muted-foreground mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-tabali-border rounded-md p-2 focus:ring-2 focus:ring-tabali-primary focus:border-tabali-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-tabali-primary text-white font-medium py-2 px-4 rounded-md hover:bg-tabali-primary-dark transition disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>

          {/* Informations de contact */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-tabali-foreground mb-6">Informations de contact</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-2xl mr-4 mt-1">📍</div>
                <div>
                  <h4 className="font-medium text-tabali-foreground">Adresse</h4>
                  <p className="text-tabali-muted-foreground">
                    kaloum, Rue KA 038, TABALI BUILDING<br />
                    Conakry, Guinée
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-2xl mr-4 mt-1">✉️</div>
                <div>
                  <h4 className="font-medium text-tabali-foreground">Email</h4>
                  <p className="text-tabali-muted-foreground">contact@tabali.com</p>
                  <p className="text-tabali-muted-foreground">support@tabali.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-2xl mr-4 mt-1">📞</div>
                <div>
                  <h4 className="font-medium text-tabali-foreground">Téléphone</h4>
                  <p className="text-tabali-muted-foreground">+224 623 00 00 00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Service Client - En bas de page et pleine largeur */}
      <div className="w-full bg-tabali-primary/10 py-1 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-tabali-foreground mb-2">Service client</h2>
          <p className="text-tabali-muted-foreground mb-2 max-w-2xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary-dark transition">
            Contacter le support <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
