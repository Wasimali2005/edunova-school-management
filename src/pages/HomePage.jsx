import Hero from '../sections/Hero'
import Features from '../sections/Features'
import HowItWorks from '../sections/HowItWorks'
import WhyChoose from '../sections/WhyChoose'
import Testimonials from '../sections/Testimonials'

/**
 * HomePage — assembles all home page sections.
 * Additional sections will be added in subsequent phases.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Features />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      {/* Phase 10+ sections will be composed here */}
    </main>
  )
}
