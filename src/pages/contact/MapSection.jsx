import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import Button from '../../components/Button'
import SectionHeader from '../../components/SectionHeader'
import { pageVariants, fadeUp, gradientTextStyle } from '../about/motionVariants'
import styles from './MapSection.module.css'

export default function MapSection() {
  return (
    <motion.section
      className={styles.section}
      aria-labelledby="map-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Our Location"
            title={
              <>
                Find us on the{' '}
                <span style={gradientTextStyle}>map</span>
              </>
            }
            titleAs="h2"
            id="map-heading"
            subtitle="Visit our San Francisco headquarters or schedule a virtual demo from anywhere in the world."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        <motion.div className={styles.mapWrap} variants={fadeUp}>
          <div
            className={styles.mapPlaceholder}
            role="img"
            aria-label="Map placeholder showing EduNova headquarters at 123 Education Lane, San Francisco"
          >
            <div className={styles.mapGrid} aria-hidden="true" />
            <div className={styles.mapRoads} aria-hidden="true" />
            <div className={styles.mapPin} aria-hidden="true">
              <MapPin size={32} strokeWidth={1.75} />
            </div>
            <div className={styles.mapLabel}>
              <span className={styles.mapLabelTitle}>EduNova HQ</span>
              <span className={styles.mapLabelAddr}>
                123 Education Lane, San Francisco, CA
              </span>
            </div>
          </div>

          <div className={styles.mapActions}>
            <Button
              as="a"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
              iconLeft={<Navigation size={16} strokeWidth={2} />}
              aria-label="Get directions to EduNova headquarters on Google Maps"
            >
              Get Directions
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
