import React from 'react';

export default function SupportInfo() {
  return (
    <div className="w-full bg-tabali-primary/10 py-1 max-w-4xl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-tabali-foreground mb-2">Service client</h2>
        <p className="text-tabali-muted-foreground mb-2 max-w-2xl mx-auto">
          Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.
        </p>
        <a href="#formulaire-contact">
          <button className="inline-flex items-center px-6 py-2 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary-dark transition">
            Contacter le support <span className="ml-2">→</span>
          </button>
        </a>

      </div>
    </div>
  );
}
