import { HeroSection } from '@/components/landing/HeroSection'
import { FeatureList } from '@/components/landing/FeatureList'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  // ✅ SEO: Schema.org structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Memo-IA",
    "applicationCategory": "BusinessApplication",
    "description": "Générez automatiquement vos mémoires techniques et répondez à 3x plus d'appels d'offres sans recruter",
    "operatingSystem": "Web",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "49",
      "highPrice": "249",
      "priceCurrency": "EUR",
      "priceValidUntil": "2025-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "bestRating": "5"
    },
    "creator": {
      "@type": "Organization",
      "name": "Memo-IA",
      "url": "https://memo-ia.fr"
    }
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />
      <FeatureList />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  )
}
