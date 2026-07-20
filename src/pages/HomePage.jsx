import Hero from '../sections/Hero'

/**
 * HomePage — assembles all home page sections.
 * Additional sections (Courses, Instructors, Testimonials, etc.)
 * will be added in subsequent phases.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      {/* Phase 6+ sections will be composed here */}
    </main>
  )
}
