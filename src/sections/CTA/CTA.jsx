import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import Button from '../../components/Button'
import styles from './CTA.module.css'

/* ----------------------------------------------------------
   Framer Motion variants
   ---------------------------------------------------------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ----------------------------------------------------------
   CTA Section
   ---------------------------------------------------------- */
export default function CTA() {
  return (
    <motion.section
      id="cta"
      className={styles.section}
      aria-labelledby="cta-heading"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div className={styles.panel} variants={panelVariants}>
          {/* Decorative background layers */}
          <div className={styles.gridPattern} aria-hidden="true" />
          <div className={styles.glowOrb} aria-hidden="true" />
          <div className={styles.glowOrbSecondary} aria-hidden="true" />

          <div className={styles.content}>
            <motion.span className={styles.eyebrow} variants={fadeUp}>
              Get Started Today
            </motion.span>

            <motion.h2
              id="cta-heading"
              className={styles.headline}
              variants={fadeUp}
            >
              Ready to transform your school?
            </motion.h2>

            <motion.p className={styles.subtext} variants={fadeUp}>
              Join hundreds of institutions already using EduNova to streamline
              administration, engage parents, and empower educators — all from
              one powerful platform.
            </motion.p>

            <motion.div
              className={styles.actions}
              variants={fadeUp}
              role="group"
              aria-label="Call to action buttons"
            >
              <Button
                as={Link}
                to="/demo"
                variant="primary"
                size="lg"
                className={styles.primaryBtn}
                iconRight={<ArrowRight size={18} strokeWidth={2} />}
                aria-label="Book a free demo"
              >
                Book a Free Demo
              </Button>

              <Button
                as={Link}
                to="/contact"
                variant="secondary"
                size="lg"
                className={styles.secondaryBtn}
                iconLeft={<Mail size={18} strokeWidth={2} />}
                aria-label="Contact us"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
