import Hero from '../sections/Hero'
import Features from '../sections/Features'

/**
 * HomePage — assembles all home page sections.
 * Additional sections will be added in subsequent phases.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Features />
      {/* Phase 7+ sections will be composed here */}
    </main>
  )
}
