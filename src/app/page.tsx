import { HeroSection } from '@/components/ui/hero-section';
import { ServicesGrid } from '@/components/ui/services-grid';
import { HowItWorks } from '@/components/ui/how-it-works';
import { FeaturedProviders } from '@/components/ui/featured-providers';
import { Testimonials } from '@/components/ui/testimonials';
import { CTASection } from '@/components/ui/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="bg-white flex justify-center">
        <ServicesGrid />
      </section>

      {/* How It Works Section */}
      <section className="bg-white flex justify-center pb-0">
        <HowItWorks />
      </section>

      {/* Featured Providers Section */}
      <section className="bg-tabali-muted flex justify-center">
        <FeaturedProviders />
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50 flex justify-center">
        <Testimonials />
      </section>

      {/* CTA Section */}
      <section className="bg-white flex justify-center">
        <CTASection />
      </section>
    </div>
  );
}
