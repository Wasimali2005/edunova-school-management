import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HelpCircle, ArrowRight } from 'lucide-react'
import Accordion from '../../components/Accordion'
import Button from '../../components/Button'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import { pageVariants, fadeUp, gradientTextStyle } from '../about/motionVariants'
import styles from './ContactFAQ.module.css'

const FAQ_ITEMS = [
  {
    id: 'demo',
    title: 'How do I schedule a free demo?',
    content:
      'Click "Book a Free Demo" anywhere on our site or email hello@edunova.com with your school name and preferred time. Our onboarding team will set up a personalised walkthrough within 24 hours.',
    defaultOpen: true,
  },
  {
    id: 'support',
    title: 'What support options are available?',
    content:
      'All plans include email and chat support during business hours. Premium plans add dedicated account managers and 24/7 phone support for urgent issues.',
  },
  {
    id: 'migration',
    title: 'Can you help migrate our existing data?',
    content:
      'Yes. Our team provides free CSV import assistance for student records, staff data, and fee history. We also offer paid white-glove migration for larger institutions.',
  },
  {
    id: 'pricing',
    title: 'How does pricing work?',
    content:
      'EduNova uses a simple per-student monthly pricing model with no hidden fees. Visit our Pricing page or contact us for a custom quote based on your enrolment size.',
  },
  {
    id: 'security',
    title: 'Is my school\'s data secure?',
    content:
      'Absolutely. All data is encrypted at rest and in transit. We are GDPR compliant, perform regular security audits, and offer role-based access controls for every user type.',
  },
]

export default function ContactFAQ() {
  return (
    <motion.section
      className={styles.section}
      aria-labelledby="faq-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Help box */}
          <motion.div className={styles.helpBox} variants={fadeUp}>
            <Card padding="lg" shadow="sm" className={styles.helpCard}>
              <div className={styles.helpIcon} aria-hidden="true">
                <HelpCircle size={32} strokeWidth={1.5} />
              </div>
              <h2 className={styles.helpTitle}>Need more help?</h2>
              <p className={styles.helpText}>
                Can&apos;t find the answer you&apos;re looking for? Our support
                team is ready to assist with setup, billing, and technical
                questions.
              </p>
              <div className={styles.helpActions}>
                <Button
                  as={Link}
                  to="/help"
                  variant="primary"
                  size="md"
                  iconRight={<ArrowRight size={16} strokeWidth={2} />}
                >
                  Visit Help Centre
                </Button>
                <Button
                  as={Link}
                  to="/demo"
                  variant="outline"
                  size="md"
                >
                  Book a Demo
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* FAQ accordion */}
          <motion.div className={styles.faqCol} variants={fadeUp}>
            <SectionHeader
              eyebrow="FAQ"
              title={
                <>
                  Frequently asked{' '}
                  <span style={gradientTextStyle}>questions</span>
                </>
              }
              titleAs="h2"
              id="faq-heading"
              subtitle="Quick answers to common questions about EduNova."
              align="left"
              size="md"
              divider
            />

            <Accordion
              items={FAQ_ITEMS}
              variant="bordered"
              multiple
              className={styles.accordion}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
