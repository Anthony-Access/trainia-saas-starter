import { HeroSection } from '@/components/landing/HeroSection'
import { FeatureList } from '@/components/landing/FeatureList'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { PricingSection } from '@/components/landing/PricingSection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureList />
      <HowItWorks />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  )
}
