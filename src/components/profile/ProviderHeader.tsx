'use client'

import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProviderHeaderProps {
  provider: {
    name: string
    rating: number
    services: string[]
    description: string
  }
}

export function ProviderHeader({ provider }: ProviderHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-[#008751] to-[#FCD116] opacity-70"></div>
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{provider.name}</h1>
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          {provider.rating.toFixed(1)} / 5
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.services.map((service, idx) => (
            <Badge key={idx} variant="secondary">
              {service}
            </Badge>
          ))}
        </div>
        <p className="text-slate-700">{provider.description}</p>
      </div>
    </div>
  )
}
