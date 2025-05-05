"use client";

import { Provider } from "@/types";
import { MOCK_PROVIDERS } from "@/lib/constants";
import dynamic from "next/dynamic";

// Importation dynamique de la carte avec désactivation du SSR
const Map = dynamic(
  () => import("./map-component").then((mod) => mod.MapComponent),
  { ssr: false, loading: () => (
    <div className="w-full h-[400px] md:h-[600px] bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-slate-500">Chargement de la carte...</p>
    </div>
  )}
);

interface ProviderMapProps {
  providers?: Provider[];
  center?: [number, number];
  zoom?: number;
}

export function ProviderMap({
  providers = MOCK_PROVIDERS,
  center = [9.6412, -13.5784], // Coordonnées de Conakry
  zoom = 13,
}: ProviderMapProps) {
  return <Map providers={providers} center={center} zoom={zoom} />;
}
