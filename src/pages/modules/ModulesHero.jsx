import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Badge from '../../components/Badge'
import { fadeUp } from '../about/motionVariants'
import styles from './ModulesHero.module.css'

export default function ModulesHero() {
  return (
    <section className={styles.hero} aria-labelledby="modules-hero-heading">
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
          <span aria-current="page">Modules</span>
        </motion.nav>

        <motion.div
          className={styles.content}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Badge variant="primary" dot className={styles.badge}>
            Platform Modules
          </Badge>

          <h1 id="modules-hero-heading" className={styles.heading}>
            Powerful modules for{' '}
            <span className={styles.highlight}>every school need</span>
          </h1>

          <p className={styles.subtitle}>
            Eight integrated modules that work together seamlessly — from student
            enrolment to transport tracking, all managed from a single dashboard.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
