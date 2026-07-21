import ContactHero from './contact/ContactHero'
import ContactInfo from './contact/ContactInfo'
import ContactForm from './contact/ContactForm'
import MapSection from './contact/MapSection'
import ContactFAQ from './contact/ContactFAQ'

/**
 * ContactPage — contact information, form, map, and FAQ.
 */
export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
      <ContactFAQ />
    </main>
  )
}
