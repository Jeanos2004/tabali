import React from 'react';

export default function ContactInfo() {
  return (
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
  );
}
