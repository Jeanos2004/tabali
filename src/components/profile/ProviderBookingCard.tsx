'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Provider } from '@/types'

type ProviderBookingCardProps = {
  provider: Provider
}

export function ProviderBookingCard({ provider }: ProviderBookingCardProps) {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Réserver un service</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-1">Tarif horaire</h3>
            <p className="text-2xl font-bold text-[#008751]">
              {provider.hourlyRate.toLocaleString()} GNF
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-1">Disponibilité</h3>
            <p className="text-sm">
              {provider.availability.days.join(', ')}
              <br />
              {provider.availability.hours.start} - {provider.availability.hours.end}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-1">Zones desservies</h3>
            <div className="flex flex-wrap gap-1">
              {provider.areasServed.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link href={`/booking?provider=${provider.id}`}>
          <Button className="w-full">Réserver maintenant</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
