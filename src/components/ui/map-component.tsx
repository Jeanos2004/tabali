"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Provider } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

// Correction pour les icônes Leaflet en Next.js
const markerIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapComponentProps {
  providers: Provider[];
  center: [number, number];
  zoom: number;
}

export function MapComponent({ providers, center, zoom }: MapComponentProps) {
  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden border border-slate-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            position={[provider.location.lat, provider.location.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-base">{provider.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{provider.location.address}</p>
                <div className="flex items-center gap-1 text-sm mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-[#FCD116]"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{provider.rating} ({provider.reviewCount} avis)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {provider.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-[#008751]/10 text-[#008751]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <Link href={`/profile/${provider.id}`}>
                  <Button size="sm" className="w-full">
                    Voir le profil
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}