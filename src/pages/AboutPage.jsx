import AboutHero from './about/AboutHero'
import AboutStory from './about/AboutStory'
import MissionVision from './about/MissionVision'
import AboutWhyChoose from './about/AboutWhyChoose'
import ManagementBenefits from './about/ManagementBenefits'
import CTA from '../sections/CTA'

/**
 * AboutPage — dedicated About Us page with full school story,
 * mission, benefits, and call to action.
 */
export default function AboutPage() {
  return (
    <main id="main-content">
      <AboutHero />
      <AboutStory />
      <MissionVision />
      <AboutWhyChoose />
      <ManagementBenefits />
      <CTA />
    </main>
  )
}
