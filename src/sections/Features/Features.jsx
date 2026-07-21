import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import styles from './Features.module.css'

/* ----------------------------------------------------------
   Feature data
   ---------------------------------------------------------- */
const FEATURES = [
  {
    id: 'student-management',
    icon: Users,
    iconColor: 'iconBlue',
    title: 'Student Management',
    description:
      'Centralise student profiles, enrolment records, academic history, and personal data in one secure, easy-to-navigate dashboard.',
    href: '/features/student-management',
  },
  {
    id: 'attendance-management',
    icon: CalendarCheck,
    iconColor: 'iconViolet',
    title: 'Attendance Management',
    description:
      'Track daily attendance with real-time reports, automated alerts for absences, and seamless integration with the parent portal.',
    href: '/features/attendance-management',
  },
  {
    id: 'fee-management',
    icon: CreditCard,
    iconColor: 'iconGreen',
    title: 'Fee Management',
    description:
      'Automate fee collection, generate invoices, process online payments, and send overdue reminders — all without manual effort.',
    href: '/features/fee-management',
  },
  {
    id: 'examination-results',
    icon: ClipboardList,
    iconColor: 'iconAmber',
    title: 'Examination & Results',
    description:
      'Schedule exams, publish results instantly, generate grade cards, and provide detailed analytics on student performance trends.',
    href: '/features/examination-results',
  },
  {
    id: 'parent-portal',
    icon: HeartHandshake,
    iconColor: 'iconRose',
    title: 'Parent Portal',
    description:
      'Keep parents informed with a dedicated portal for attendance, grades, fee status, announcements, and direct teacher messaging.',
    href: '/features/parent-portal',
  },
  {
    id: 'teacher-management',
    icon: GraduationCap,
    iconColor: 'iconCyan',
    title: 'Teacher Management',
    description:
      'Manage teacher profiles, timetables, leave requests, payroll, and performance evaluations from a single administration hub.',
    href: '/features/teacher-management',
  },
]

/* ----------------------------------------------------------
   Framer Motion variants
   ---------------------------------------------------------- */
const sectionVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardHover = {
  y: -6,
  transition: { duration: 0.25, ease: 'easeOut' },
}

const cardTap = {
  y: -2,
  scale: 0.99,
  transition: { duration: 0.12 },
}

/* ----------------------------------------------------------
   FeatureCard
   ---------------------------------------------------------- */
function FeatureCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover={cardHover}
      whileTap={cardTap}
    >
      <Card
        as="article"
        padding="none"
        shadow="sm"
        className={styles.featureCard}
        aria-label={feature.title}
      >
        {/* Ordinal number */}
        <span className={styles.cardNumber} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={styles.cardInner}>
          {/* Icon */}
          <div
            className={`${styles.iconWrap} ${styles[feature.iconColor]}`}
            aria-hidden="true"
          >
            <Icon size={24} strokeWidth={1.75} />
          </div>

          {/* Text */}
          <div className={styles.textBlock}>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDesc}>{feature.description}</p>
          </div>

          {/* Learn more link */}
          <Link
            to={feature.href}
            className={styles.cardFooter}
            aria-label={`Learn more about ${feature.title}`}
          >
            Learn more
            <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

/* ----------------------------------------------------------
   Features Section
   ---------------------------------------------------------- */
export default function Features() {
  return (
    <motion.section
      id="features"
      className={styles.section}
      aria-labelledby="features-heading"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        {/* Section header */}
        <motion.div variants={headerVariants}>
          <SectionHeader
            eyebrow="Core Modules"
            title={
              <>
                Everything you need to{' '}
                <span style={{
                  background: 'linear-gradient(120deg, var(--color-brand) 0%, var(--color-accent-brand) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  run your school
                </span>
              </>
            }
            titleAs="h2"
            subtitle="Six powerful modules designed to streamline every aspect of school administration — from enrolment to examination, all in one platform."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className={styles.grid}
          role="list"
          aria-label="Feature modules"
        >
          {FEATURES.map((feature, index) => (
            <div role="listitem" key={feature.id}>
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div className={styles.cta} variants={headerVariants}>
          <span className={styles.ctaText}>Ready to modernise your institution?</span>
          <Link to="/demo" className={styles.ctaLink} aria-label="Book a free demo">
            Book a Free Demo
            <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
