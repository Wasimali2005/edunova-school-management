import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Badge from '../../components/Badge'
import { fadeUp } from '../about/motionVariants'
import styles from './ContactHero.module.css'

export default function ContactHero() {
  return (
    <section className={styles.hero} aria-labelledby="contact-hero-heading">
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
          <span aria-current="page">Contact</span>
        </motion.nav>

        <motion.div
          className={styles.content}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Badge variant="primary" dot className={styles.badge}>
            Contact Us
          </Badge>

          <h1 id="contact-hero-heading" className={styles.heading}>
            We&apos;d love to{' '}
            <span className={styles.highlight}>hear from you</span>
          </h1>

          <p className={styles.subtitle}>
            Have a question about EduNova? Our team is here to help schools get
            started, troubleshoot issues, and explore the right plan for your
            institution.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
