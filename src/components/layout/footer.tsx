import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white flex justify-center">
      <div className="container py-8 sm:py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-tabali-primary">Tabali</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              Tabali connecte particuliers et prestataires de services en Guinée pour tous vos besoins quotidiens.
            </p>
            <div className="pt-2 hidden sm:block lg:hidden xl:block">
              <p className="text-xs font-medium text-tabali-primary">Téléchargez notre application</p>
              <div className="flex gap-3 mt-2">
                <a href="#" className="block">
                  <Image src="/app-store-badge.png" alt="App Store" width={120} height={40} className="h-8 w-auto" />
                </a>
                <a href="#" className="block">
                  <Image src="/google-play-badge.png" alt="Google Play" width={135} height={40} className="h-8 w-auto" />
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tabali-text">Services</h3>
            <ul className="space-y-2 text-slate-500">
              <li>
                <Link href="/search?service=Ménage" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Ménage
                </Link>
              </li>
              <li>
                <Link href="/search?service=Plomberie" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Plomberie
                </Link>
              </li>
              <li>
                <Link href="/search?service=Électricité" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Électricité
                </Link>
              </li>
              <li>
                <Link href="/search?service=Jardinage" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Jardinage
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Voir tous les services
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tabali-text">Informations</h3>
            <ul className="space-y-2 text-slate-500">
              <li>
                <Link href="/about" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-tabali-primary transition-colors duration-200">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tabali-text">Nous contacter</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-500">
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
                  className="h-4 w-4"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+224 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500">
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
                  className="h-4 w-4"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>contact@tabali.gn</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500">
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
                  className="h-4 w-4"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Conakry, Guinée</span>
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-500 hover:text-[#008751]">
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-[#008751]">
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-[#008751]">
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Tabali. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
