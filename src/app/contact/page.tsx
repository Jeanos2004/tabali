"use client";
import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import SupportInfo from "./SupportInfo";

export default function ContactPage() {
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
          <ContactForm />
          <ContactInfo />
        </div>
      </div>

      <SupportInfo />
    </main>
  );
}
