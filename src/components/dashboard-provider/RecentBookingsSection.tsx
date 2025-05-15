"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RecentBookingsSectionProps {
  isLoading: boolean;
}

export function RecentBookingsSection({ isLoading }: RecentBookingsSectionProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-medium text-tabali-text mb-4">Réservations récentes</h2>
      <Card className="border-tabali-border">
        <CardContent className="p-4">
          {isLoading ? (
            <div className="py-8 text-center text-tabali-muted-text">
              Chargement des réservations récentes...
            </div>
          ) : (
            <div className="text-center py-6">
              <Calendar className="h-12 w-12 text-tabali-muted-text mx-auto mb-2" />
              <p className="text-tabali-muted-text">Aucune réservation récente à afficher</p>
              <Link href="/dashboard-provider/bookings">
                <button className="mt-4 text-sm text-tabali-primary hover:underline">
                  Voir toutes les réservations
                </button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
