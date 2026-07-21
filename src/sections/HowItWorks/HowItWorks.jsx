import { motion } from 'framer-motion'
import {
  Building2,
  UserPlus,
  LayoutDashboard,
  Check,
  Clock,
  ShieldCheck,
  Headphones,
} from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import styles from './HowItWorks.module.css'

/* ----------------------------------------------------------
   Step data
   ---------------------------------------------------------- */
const STEPS = [
  {
    id: 'setup',
    number: '01',
    icon: Building2,
    color: 'colorBlue',
    label: 'Step One',
    title: 'Set Up Your School',
    description:
      'Create your institution profile in minutes. Configure classes, departments, academic years, and custom settings — no technical expertise needed.',
    bullets: [
      'Import existing student data via CSV',
      'Configure academic calendar & terms',
      'Set up classes, subjects & timetables',
    ],
  },
  {
    id: 'invite',
    number: '02',
    icon: UserPlus,
    color: 'colorViolet',
    label: 'Step Two',
    title: 'Invite Staff & Students',
    description:
      'Send bulk invitations to teachers, administrators, students, and parents. Each role gets a tailored dashboard with the right permissions.',
    bullets: [
      'Role-based access for every user type',
      'Bulk invite via email or import list',
      'Parents linked to students automatically',
    ],
  },
  {
    id: 'manage',
    number: '03',
    icon: LayoutDashboard,
    color: 'colorGreen',
    label: 'Step Three',
    title: 'Manage Everything',
    description:
      'Run attendance, fees, exams, communication, and reports from one unified dashboard. Real-time data keeps every stakeholder informed.',
    bullets: [
      'Real-time analytics & reporting',
      'Automated fee reminders & receipts',
      'One-click exam result publishing',
    ],
  },
]

/* ----------------------------------------------------------
   Trust-signal strip data
   ---------------------------------------------------------- */
const TRUST_ITEMS = [
  {
    id: 'setup-time',
    icon: Clock,
    title: 'Live in under 30 minutes',
    description: 'Our guided onboarding gets your school running the same day.',
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Bank-grade security',
    description: 'All data is encrypted at rest and in transit. GDPR compliant.',
  },
  {
    id: 'support',
    icon: Headphones,
    title: '24 / 7 support',
    description: 'Dedicated onboarding specialists available via chat and email.',
  },
]

/* ----------------------------------------------------------
   Framer Motion variants
   ---------------------------------------------------------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const stepVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.13,
    },
  }),
}

const connectorVariants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1, opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
  },
}

const stripVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: 0.6 + i * 0.1 },
  }),
}

/* ----------------------------------------------------------
   StepCard subcomponent
   ---------------------------------------------------------- */
function StepCard({ step, index }) {
  const Icon = step.icon

  return (
    <motion.article
      className={styles.stepCard}
      variants={stepVariants}
      custom={index}
      aria-label={`Step ${step.number}: ${step.title}`}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
    >
      {/* Decorative big number (background layer) */}
      <span className={styles.bigNumber} aria-hidden="true">
        {step.number}
      </span>

      {/* Icon node */}
      <div className={styles.iconNode}>
        <div className={styles.iconRing} aria-hidden="true" />
        <div
          className={`${styles.iconCircle} ${styles[step.color]}`}
          aria-hidden="true"
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <span className={styles.stepBadge} aria-hidden="true">
          {step.number}
        </span>
      </div>

      {/* Text block */}
      <div className={styles.textBlock}>
        <span className={styles.stepLabel}>{step.label}</span>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDesc}>{step.description}</p>

        {/* Bullet checklist */}
        <ul className={styles.checkList} aria-label={`Details for ${step.title}`}>
          {step.bullets.map((bullet) => (
            <li key={bullet} className={styles.checkItem}>
              <span className={styles.checkDot} aria-hidden="true">
                <Check size={9} strokeWidth={3} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

/* ----------------------------------------------------------
   HowItWorks Section
   ---------------------------------------------------------- */
export default function HowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      className={styles.section}
      aria-labelledby="how-it-works-heading"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>

        {/* Section header */}
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="How It Works"
            title={
              <>
                Up and running in{' '}
                <span style={{
                  background: 'linear-gradient(120deg, var(--color-brand) 0%, var(--color-accent-brand) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  three simple steps
                </span>
              </>
            }
            titleAs="h2"
            id="how-it-works-heading"
            subtitle="No lengthy onboarding, no dedicated IT team required. EduNova is designed to get your institution live within the same working day."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        {/* Steps track */}
        <div className={styles.stepsTrack} role="list" aria-label="Setup steps">
          {/* Animated connector line — desktop only */}
          <motion.div
            aria-hidden="true"
            variants={connectorVariants}
            style={{
              position: 'absolute',
              top: 52,
              left: 'calc(16.66% + 26px)',
              right: 'calc(16.66% + 26px)',
              height: 2,
              transformOrigin: 'left center',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {STEPS.map((step, index) => (
            <div key={step.id} role="listitem">
              <StepCard step={step} index={index} />
            </div>
          ))}
        </div>

        {/* Trust-signal strip */}
        <div className={styles.strip} role="list" aria-label="Platform guarantees">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                className={styles.stripItem}
                role="listitem"
                variants={stripVariants}
                custom={index}
              >
                <div className={styles.stripIcon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div className={styles.stripText}>
                  <p className={styles.stripTitle}>{item.title}</p>
                  <p className={styles.stripDesc}>{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </motion.section>
  )
}
