'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Provider} from '@/types'

interface ProviderTabsProps {
  provider: Provider
}

export function ProviderTabs({ provider }: ProviderTabsProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'gallery'>('services')

  return (
    <div className="mb-8">
      <div className="border-b border-slate-200 mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-2 text-sm font-medium ${
              activeTab === 'services'
                ? 'border-b-2 border-[#008751] text-[#008751]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-[#008751] text-[#008751]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Avis
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-2 text-sm font-medium ${
              activeTab === 'gallery'
                ? 'border-b-2 border-[#008751] text-[#008751]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Galerie
          </button>
        </div>
      </div>

      {/* Onglet Services */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Services proposés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provider.services.map((service) => (
              <Card key={service}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#008751]/10 p-2 text-[#008751]">
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
                        className="h-5 w-5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{service}</h3>
                      <p className="text-sm text-slate-500">
                        À partir de {provider.hourlyRate.toLocaleString()} GNF/heure
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Onglet Avis */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Avis clients</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-[#008751] to-[#FCD116] opacity-50" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">Client {index + 1}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill={i < 5 - index * 0.5 ? 'currentColor' : 'none'}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3 text-[#FCD116]"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mb-1">Il y a {index + 1} mois</p>
                      <p className="text-sm">
                        {index === 0
                          ? `Service impeccable ! ${provider.name} a été très professionnel et a fait un excellent travail.`
                          : index === 1
                          ? 'Bon service, ponctuel et efficace. Je recommande.'
                          : "Prestataire compétent mais un peu en retard. Travail satisfaisant dans l'ensemble."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Onglet Galerie */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Galerie photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-slate-100 rounded-lg overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#008751]/20 to-[#FCD116]/20" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
