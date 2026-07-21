import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Badge from '../../components/Badge'
import { fadeUp } from './motionVariants'
import styles from './AboutHero.module.css'

export default function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-heading">
      <div className={styles.gridPattern} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.nav
          className={styles.breadcrumb}
          aria-label="Breadcrumb"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
          <span aria-current="page">About Us</span>
        </motion.nav>

        <motion.div
          className={styles.content}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Badge variant="primary" dot className={styles.badge}>
            About EduNova
          </Badge>

          <h1 id="about-hero-heading" className={styles.heading}>
            Empowering schools to{' '}
            <span className={styles.highlight}>deliver excellence</span>
          </h1>

          <p className={styles.subtitle}>
            We build modern school management software that helps educators focus
            on what matters most — shaping the next generation of learners.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
