import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-tabali-muted/20 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image 
            src="/logo.png" 
            alt="Tabali Logo" 
            fill
            className="object-contain"
          />
        </div>
        
        <h1 className="text-6xl font-serif font-bold text-tabali-text">404</h1>
        <h2 className="text-2xl font-medium text-tabali-text mt-2">Page non trouvée</h2>
        
        <p className="text-tabali-muted-text mt-4">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        
        <div className="mt-8 space-y-4">
          <Link 
            href="/"
            className="block w-full py-3 px-4 bg-tabali-primary text-white rounded-md hover:bg-tabali-primary/90 transition-all"
          >
            Retour à l&apos;accueil
          </Link>
          
          <Link 
            href="/dashboard"
            className="block w-full py-3 px-4 border border-tabali-border rounded-md hover:bg-tabali-muted/50 transition-all"
          >
            Aller au tableau de bord
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-tabali-muted-text">
          <p>Besoin d&apos;aide ? <Link href="/contact" className="text-tabali-primary hover:underline">Contactez-nous</Link></p>
        </div>
      </div>
    </div>
  );
}
