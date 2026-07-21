import { motion } from 'framer-motion'
import {
  HeartHandshake,
  Lightbulb,
  Globe,
  Award,
} from 'lucide-react'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import { pageVariants, fadeUp, cardVariants, gradientTextStyle } from './motionVariants'
import styles from './AboutWhyChoose.module.css'

const REASONS = [
  {
    id: 'people-first',
    icon: HeartHandshake,
    iconColor: 'iconRose',
    title: 'People-First Design',
    description:
      'Every screen is designed with real educators in mind — intuitive workflows that require zero training for most daily tasks.',
  },
  {
    id: 'innovation',
    icon: Lightbulb,
    iconColor: 'iconAmber',
    title: 'Continuous Innovation',
    description:
      'We ship regular updates based on direct feedback from school administrators, teachers, and parents in our community.',
  },
  {
    id: 'global-reach',
    icon: Globe,
    iconColor: 'iconCyan',
    title: 'Global Reach, Local Support',
    description:
      'Serving schools across 12+ countries with localised support teams who understand regional education requirements.',
  },
  {
    id: 'proven-track',
    icon: Award,
    iconColor: 'iconGreen',
    title: 'Proven Track Record',
    description:
      'A 98% customer retention rate and 4.9-star average rating reflect our commitment to long-term school partnerships.',
  },
]

export default function AboutWhyChoose() {
  return (
    <motion.section
      id="why-choose"
      className={styles.section}
      aria-labelledby="about-why-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Why Choose EduNova"
            title={
              <>
                The platform schools{' '}
                <span style={gradientTextStyle}>trust and recommend</span>
              </>
            }
            titleAs="h2"
            id="about-why-heading"
            subtitle="We go beyond software — EduNova is a partner in your school's digital transformation journey."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        <div className={styles.grid} role="list" aria-label="Reasons to choose EduNova">
          {REASONS.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div key={reason.id} role="listitem" variants={cardVariants}>
                <Card
                  as="article"
                  padding="none"
                  shadow="sm"
                  className={styles.card}
                  aria-label={reason.title}
                >
                  <div className={styles.cardInner}>
                    <div
                      className={`${styles.iconWrap} ${styles[reason.iconColor]}`}
                      aria-hidden="true"
                    >
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <h3 className={styles.cardTitle}>{reason.title}</h3>
                    <p className={styles.cardDesc}>{reason.description}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
