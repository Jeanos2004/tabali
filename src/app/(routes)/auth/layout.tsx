import type { Metadata } from "next";
import { Suspense } from "react";

// Suppression de l'import des polices Google qui cause des problèmes avec Turbopack
// Nous utiliserons des polices via CSS standard à la place

export const metadata: Metadata = {
  title: "Tabali - Authentification",
  description: "Connectez-vous ou inscrivez-vous sur Tabali",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}