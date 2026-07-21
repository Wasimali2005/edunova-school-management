import { motion } from 'framer-motion'
import SectionHeader from '../../components/SectionHeader'
import Badge from '../../components/Badge'
import { pageVariants, fadeUp, gradientTextStyle } from './motionVariants'
import styles from './AboutStory.module.css'

const STATS = [
  { value: '500+', label: 'Schools onboarded' },
  { value: '50K+', label: 'Active students' },
  { value: '12+', label: 'Countries served' },
  { value: '98%', label: 'Customer retention' },
]

export default function AboutStory() {
  return (
    <motion.section
      id="about-edunova"
      className={styles.section}
      aria-labelledby="about-story-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div className={styles.textCol} variants={fadeUp}>
            <SectionHeader
              eyebrow="Our Story"
              title={
                <>
                  Built by educators,{' '}
                  <span style={gradientTextStyle}>for educators</span>
                </>
              }
              titleAs="h2"
              id="about-story-heading"
              subtitle="EduNova was founded with a simple belief: school administration software should be as intuitive as the tools teachers use every day."
              align="left"
              size="md"
              divider
            />

            <div className={styles.body}>
              <p>
                What started as a small project to help a local academy manage
                attendance and fees has grown into a comprehensive platform trusted
                by hundreds of institutions across the globe.
              </p>
              <p>
                Our team of former teachers, administrators, and engineers work
                side by side to understand the real challenges schools face — from
                chaotic enrolment seasons to parent communication gaps — and build
                solutions that actually work in the classroom and the front office.
              </p>
            </div>

            <Badge variant="accent" size="lg">
              Est. 2019 · Serving schools worldwide
            </Badge>
          </motion.div>

          <motion.div className={styles.visualCol} variants={fadeUp}>
            <div className={styles.illustration} aria-hidden="true">
              <SchoolIllustration />
            </div>

            <div className={styles.statsGrid} role="list" aria-label="EduNova platform statistics">
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.statCard} role="listitem">
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function SchoolIllustration() {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aboutGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" rx="24" fill="url(#aboutGrad)" />
      <rect x="60" y="140" width="280" height="100" rx="8" fill="var(--color-primary-100)" />
      <polygon points="200,50 80,130 320,130" fill="var(--color-brand)" opacity="0.85" />
      <rect x="120" y="160" width="40" height="50" rx="4" fill="var(--color-primary-200)" />
      <rect x="180" y="160" width="40" height="50" rx="4" fill="var(--color-primary-200)" />
      <rect x="240" y="160" width="40" height="50" rx="4" fill="var(--color-primary-200)" />
      <rect x="175" y="100" width="50" height="35" rx="4" fill="var(--color-accent-200)" />
      <circle cx="340" cy="70" r="30" fill="var(--color-warning-100)" opacity="0.8" />
      <circle cx="60" cy="200" r="20" fill="var(--color-success-100)" opacity="0.8" />
    </svg>
  )
}
