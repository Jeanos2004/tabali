'use client'

import React from "react"

type Provider = {
  name: string
  rating: number
  reviewCount: number
  services: string[]
  description: string
}

type ProviderHeaderProps = {
  provider: Provider
}

export const ProviderHeader = ({ provider }: ProviderHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-[#008751] to-[#FCD116] opacity-70"></div>
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{provider.name}</h1>
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
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
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.services.map((service) => (
            <span
              key={service}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 border-transparent bg-[#008751]/10 text-[#008751]"
            >
              {service}
            </span>
          ))}
        </div>
        <p className="text-slate-700">{provider.description}</p>
      </div>
    </div>
  )
}
