'use client'

import { Provider } from '@/types'
import { MapComponent } from '@/components/ui/map-component'

type ProviderLocationProps = {
  provider: Provider
}

export function ProviderLocation({ provider }: ProviderLocationProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Localisation</h2>
      <MapComponent
        providers={[provider]}
        center={[provider.location.lat, provider.location.lng]}
        zoom={14}
      />
    </div>
  )
}
