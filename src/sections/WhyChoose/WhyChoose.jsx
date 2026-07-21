import { motion } from 'framer-motion'
import {
  Layers,
  Zap,
  ShieldCheck,
  Headphones,
  TrendingUp,
  BadgePercent,
} from 'lucide-react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import SectionHeader from '../../components/SectionHeader'
import styles from './WhyChoose.module.css'

/* ----------------------------------------------------------
   Benefit data
   ---------------------------------------------------------- */
const BENEFITS = [
  {
    id: 'unified-platform',
    icon: Layers,
    iconColor: 'iconBlue',
    title: 'Unified School Management',
    description:
      'Replace scattered spreadsheets and disconnected tools with one platform that handles students, staff, fees, exams, and communication seamlessly.',
    featured: true,
    stat: '6 modules',
    statLabel: 'in one dashboard',
  },
  {
    id: 'rapid-deployment',
    icon: Zap,
    iconColor: 'iconAmber',
    title: 'Rapid Deployment',
    description:
      'Go live in under 30 minutes with guided setup, CSV imports, and pre-built templates — no IT team required.',
  },
  {
    id: 'enterprise-security',
    icon: ShieldCheck,
    iconColor: 'iconGreen',
    title: 'Enterprise-Grade Security',
    description:
      'End-to-end encryption, role-based access controls, and GDPR compliance keep your institution\'s data protected.',
  },
  {
    id: 'dedicated-support',
    icon: Headphones,
    iconColor: 'iconViolet',
    title: 'Dedicated Support',
    description:
      'Onboarding specialists and 24/7 support via chat and email ensure your team never gets stuck.',
  },
  {
    id: 'scalable-growth',
    icon: TrendingUp,
    iconColor: 'iconCyan',
    title: 'Scales With Your Growth',
    description:
      'From a single campus to a multi-branch institution — EduNova grows alongside your enrolment without performance drops.',
  },
  {
    id: 'transparent-pricing',
    icon: BadgePercent,
    iconColor: 'iconRose',
    title: 'Transparent Pricing',
    description:
      'No hidden fees, no per-module upsells. One predictable plan covers every feature your school needs.',
    wide: true,
  },
]

/* ----------------------------------------------------------
   Trust metrics — shown in the featured card
   ---------------------------------------------------------- */
const METRICS = [
  { value: '500+', label: 'Schools' },
  { value: '98%', label: 'Retention' },
  { value: '4.9★', label: 'Rating' },
]

/* ----------------------------------------------------------
   Framer Motion variants
   ---------------------------------------------------------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardHover = {
  y: -5,
  transition: { duration: 0.25, ease: 'easeOut' },
}

/* ----------------------------------------------------------
   BenefitCard subcomponent
   ---------------------------------------------------------- */
function BenefitCard({ benefit }) {
  const Icon = benefit.icon
  const cardClasses = [
    styles.benefitCard,
    benefit.featured ? styles.featured : '',
    benefit.wide ? styles.wide : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.div variants={cardVariants} whileHover={cardHover}>
      <Card
        as="article"
        padding="none"
        shadow="sm"
        accentBar={benefit.featured}
        className={cardClasses}
        aria-label={benefit.title}
      >
        <div className={styles.cardInner}>
          <div
            className={`${styles.iconWrap} ${styles[benefit.iconColor]}`}
            aria-hidden="true"
          >
            <Icon size={benefit.featured ? 28 : 22} strokeWidth={1.75} />
          </div>

          <div className={styles.textBlock}>
            <h3 className={styles.cardTitle}>{benefit.title}</h3>
            <p className={styles.cardDesc}>{benefit.description}</p>
          </div>

          {benefit.featured && (
            <div className={styles.featuredFooter} aria-label="Platform highlights">
              <div className={styles.featuredStat}>
                <span className={styles.statValue}>{benefit.stat}</span>
                <span className={styles.statLabel}>{benefit.statLabel}</span>
              </div>

              <div className={styles.metricsRow}>
                {METRICS.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {benefit.wide && (
            <Badge variant="primary" size="sm" className={styles.priceBadge}>
              No hidden fees
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

/* ----------------------------------------------------------
   WhyChoose Section
   ---------------------------------------------------------- */
export default function WhyChoose() {
  return (
    <motion.section
      id="why-choose"
      className={styles.section}
      aria-labelledby="why-choose-heading"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        {/* Section header */}
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Why Choose EduNova"
            title={
              <>
                The smarter way to{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(120deg, var(--color-brand) 0%, var(--color-accent-brand) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  manage your school
                </span>
              </>
            }
            titleAs="h2"
            id="why-choose-heading"
            subtitle="Trusted by hundreds of institutions worldwide. EduNova combines powerful features with simplicity, so your team can focus on education — not administration."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className={styles.bento}
          role="list"
          aria-label="Reasons to choose EduNova"
        >
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              role="listitem"
              className={
                benefit.featured
                  ? styles.bentoFeatured
                  : benefit.wide
                    ? styles.bentoWide
                    : ''
              }
            >
              <BenefitCard benefit={benefit} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
