'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ProviderNotFound() {
  return (
    <div className="container py-8 md:py-12 mx-auto max-w-6xl text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 font-tabali-serif">
        Prestataire non trouvé
      </h1>
      <p className="text-tabali-muted-foreground mb-6 max-w-xl mx-auto">
        Le prestataire que vous recherchez n&apos;existe pas ou a été supprimé.
      </p>
      <Link href="/search">
        <Button className="tabali-btn tabali-btn-primary">Retour à la recherche</Button>
      </Link>
    </div>
  )
}
