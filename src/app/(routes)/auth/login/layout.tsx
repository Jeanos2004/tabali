import type { Metadata } from "next";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tabali - Connectez-vous avec des prestataires de services en Guinée",
  description: "Tabali connecte particuliers et prestataires (ménage, plomberie, électricité, etc.) en Guinée pour tous vos besoins quotidiens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <main className="flex-1"><Suspense>{children}</Suspense></main>
      </>
  );
}
