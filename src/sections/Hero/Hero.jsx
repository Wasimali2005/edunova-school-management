import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

/* ----------------------------------------------------------
   Framer Motion variants
   ---------------------------------------------------------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

const slideRight = {
  hidden:  { opacity: 0, x: 48, scale: 0.96 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
  },
}

const cardFloat = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: 'backOut', delay },
  },
})

/* ----------------------------------------------------------
   Inline SVG components
   ---------------------------------------------------------- */
function PlayTriangle() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M2.5 1.5l8 4.5-8 4.5V1.5z" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GraduationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3L2 8l10 5 10-5-10-5z" fill="currentColor" opacity="0.9" />
      <path d="M2 16l10 5 10-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 1l2.39 4.84 5.35.78-3.87 3.77.91 5.32L10 13.27 5.22 15.71l.91-5.32L2.26 6.62l5.35-.78L10 1z" />
    </svg>
  )
}

/* ----------------------------------------------------------
   Hero illustration — SVG fallback (no external image needed)
   ---------------------------------------------------------- */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background gradient fill */}
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#1e40af" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5b21b6" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="240" cy="240" r="200" fill="url(#bgGrad)" />

      {/* Desk surface */}
      <rect x="100" y="290" width="280" height="14" rx="7" fill="url(#deskGrad)" />

      {/* Monitor stand */}
      <rect x="227" y="265" width="26" height="32" rx="4" fill="#334155" />

      {/* Monitor body */}
      <rect x="140" y="150" width="200" height="120" rx="12" fill="#0f172a" />
      <rect x="148" y="158" width="184" height="104" rx="8" fill="url(#screenGrad)" opacity="0.9" />

      {/* Screen content lines */}
      <rect x="165" y="175" width="100" height="8"  rx="4" fill="rgba(255,255,255,0.7)" />
      <rect x="165" y="191" width="70"  height="6"  rx="3" fill="rgba(255,255,255,0.4)" />
      <rect x="165" y="207" width="120" height="6"  rx="3" fill="rgba(255,255,255,0.35)" />
      <rect x="165" y="221" width="90"  height="6"  rx="3" fill="rgba(255,255,255,0.35)" />
      <rect x="165" y="237" width="60"  height="20" rx="10" fill="rgba(255,255,255,0.2)" />

      {/* Books stack — left */}
      <rect x="115" y="268" width="60" height="10" rx="3" fill="#3b82f6" />
      <rect x="118" y="260" width="54" height="10" rx="3" fill="#8b5cf6" />
      <rect x="121" y="252" width="48" height="10" rx="3" fill="#06b6d4" />

      {/* Coffee cup — right */}
      <rect x="325" y="260" width="34" height="30" rx="4" fill="#475569" />
      <rect x="327" y="262" width="30" height="5"  rx="2" fill="rgba(255,255,255,0.15)" />
      <path d="M359 272 Q370 272 370 280 Q370 288 359 288" stroke="#475569" strokeWidth="3" fill="none" />
      {/* Steam */}
      <path d="M334 255 Q337 248 334 241" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M342 255 Q345 248 342 241" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Student figure — simplified */}
      {/* Head */}
      <circle cx="240" cy="120" r="28" fill="#fcd34d" />
      {/* Hair */}
      <path d="M212 118 Q215 94 240 92 Q265 94 268 118" fill="#92400e" />
      {/* Body */}
      <rect x="218" y="148" width="44" height="56" rx="8" fill="#3b82f6" />
      {/* Arms */}
      <rect x="196" y="152" width="24" height="12" rx="6" fill="#3b82f6" />
      <rect x="260" y="152" width="24" height="12" rx="6" fill="#3b82f6" />
      {/* Hands */}
      <circle cx="193" cy="158" r="8" fill="#fcd34d" />
      <circle cx="287" cy="158" r="8" fill="#fcd34d" />

      {/* Pencil in right hand */}
      <rect x="282" y="136" width="6" height="28" rx="3" fill="#fbbf24" transform="rotate(15 285 150)" />

      {/* Floating stars around screen */}
      <circle cx="168" cy="148" r="4" fill="#fbbf24" opacity="0.8" />
      <circle cx="315" cy="144" r="3" fill="#4ade80" opacity="0.8" />
      <circle cx="330" cy="170" r="2.5" fill="#a78bfa" opacity="0.7" />
    </svg>
  )
}

/* ----------------------------------------------------------
   Hero Section
   ---------------------------------------------------------- */
export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero — EduNova learning platform">
      {/* Subtle grid background texture */}
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ---- Left: Text content ---- */}
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div className={styles.eyebrow} variants={fadeUp}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            #1 Online Learning Platform
          </motion.div>

          {/* Headline */}
          <motion.h1 className={styles.heading} variants={fadeUp}>
            Future-focused learning{' '}
            <span className={styles.headingHighlight}>
              built for you.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p className={styles.subtitle} variants={fadeUp}>
            EduNova is committed to providing world-class learning experiences
            tailored to support emerging career opportunities — at your own pace.
          </motion.p>

          {/* Stats row */}
          <motion.div className={styles.stats} variants={fadeUp} aria-label="Platform statistics">
            <div className={styles.stat}>
              <span className={styles.statValue}>50K+</span>
              <span className={styles.statLabel}>Students</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <span className={styles.statValue}>200+</span>
              <span className={styles.statLabel}>Courses</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <span className={styles.statValue}>98%</span>
              <span className={styles.statLabel}>Satisfaction</span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div className={styles.cta} variants={fadeUp}>
            <Link
              to="/courses"
              className={styles.ctaPrimary}
              aria-label="Browse all courses"
            >
              View Our Courses
              <ArrowRight />
            </Link>

            <Link
              to="/demo"
              className={styles.ctaSecondary}
              aria-label="Watch a demo video"
            >
              <span className={styles.playIcon} aria-hidden="true">
                <PlayTriangle />
              </span>
              Watch Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* ---- Right: Visual ---- */}
        <motion.div
          className={styles.visual}
          variants={slideRight}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.blobWrap}>
            {/* Animated blob background */}
            <div className={styles.blob} aria-hidden="true">
              <div className={styles.blobBg} />
            </div>

            {/* Hero illustration inside blob clip */}
            <div className={styles.blobImage} role="img" aria-label="Students learning online">
              <HeroIllustration />
            </div>

            {/* Floating decorative orbs */}
            <div className={styles.orb + ' ' + styles.orbGreen} aria-hidden="true" />
            <div className={styles.orb + ' ' + styles.orbYellow} aria-hidden="true" />
            <div className={styles.orb + ' ' + styles.orbRing}   aria-hidden="true" />
            <div className={styles.orb + ' ' + styles.orbAccent} aria-hidden="true" />

            {/* Floating achievement card */}
            <motion.div
              className={styles.floatCard}
              variants={cardFloat(0.7)}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            >
              <div className={styles.floatCardIcon}>
                <GraduationIcon />
              </div>
              <div className={styles.floatCardText}>
                <span className={styles.floatCardValue}>12,400+</span>
                <span className={styles.floatCardLabel}>Graduates</span>
              </div>
            </motion.div>

            {/* Floating rating card */}
            <motion.div
              className={styles.floatRating}
              variants={cardFloat(0.9)}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            >
              <div className={styles.stars} aria-label="5 star rating">
                {[1,2,3,4,5].map((s) => <StarIcon key={s} />)}
              </div>
              <div className={styles.floatRatingText}>
                <span className={styles.floatRatingValue}>4.9 / 5.0</span>
                <span className={styles.floatRatingLabel}>Student rating</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#courses"
        className={styles.scrollIndicator}
        aria-label="Scroll down to courses"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.scrollMouse} aria-hidden="true">
          <div className={styles.scrollWheel} />
        </div>
        Scroll
      </motion.a>
    </section>
  )
}
