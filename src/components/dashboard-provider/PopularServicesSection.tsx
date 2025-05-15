"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PopularServicesSectionProps {
  isLoading: boolean;
}

export function PopularServicesSection({ isLoading }: PopularServicesSectionProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-medium text-tabali-text mb-4">Services populaires</h2>
      <Card className="border-tabali-border">
        <CardContent className="p-4">
          {isLoading ? (
            <div className="py-8 text-center text-tabali-muted-text">
              Chargement des services populaires...
            </div>
          ) : (
            <div className="text-center py-6">
              <PlusCircle className="h-12 w-12 text-tabali-muted-text mx-auto mb-2" />
              <p className="text-tabali-muted-text">Aucun service à afficher</p>
              <Link href="/dashboard-provider/services">
                <button className="mt-4 text-sm text-tabali-primary hover:underline">
                  Gérer vos services
                </button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
