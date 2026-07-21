import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import { pageVariants, fadeUp, cardVariants, gradientTextStyle } from './motionVariants'
import styles from './MissionVision.module.css'

const PILLARS = [
  {
    id: 'mission',
    icon: Target,
    iconColor: 'iconBlue',
    title: 'Our Mission',
    text: 'To simplify school administration so educators can dedicate more time to teaching, mentoring, and inspiring students — not wrestling with paperwork and disconnected systems.',
  },
  {
    id: 'vision',
    icon: Eye,
    iconColor: 'iconViolet',
    title: 'Our Vision',
    text: 'A world where every school — regardless of size or budget — has access to powerful, affordable technology that connects teachers, students, parents, and administrators seamlessly.',
  },
]

export default function MissionVision() {
  return (
    <motion.section
      id="mission-vision"
      className={styles.section}
      aria-labelledby="mission-vision-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Mission & Vision"
            title={
              <>
                What drives us{' '}
                <span style={gradientTextStyle}>every day</span>
              </>
            }
            titleAs="h2"
            id="mission-vision-heading"
            subtitle="Our mission and vision guide every feature we build and every partnership we form with schools around the world."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        <div className={styles.grid} role="list" aria-label="Mission and vision statements">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.div key={pillar.id} role="listitem" variants={cardVariants}>
                <Card
                  as="article"
                  padding="none"
                  shadow="sm"
                  accentBar
                  className={styles.card}
                  aria-label={pillar.title}
                >
                  <div className={styles.cardInner}>
                    <div
                      className={`${styles.iconWrap} ${styles[pillar.iconColor]}`}
                      aria-hidden="true"
                    >
                      <Icon size={28} strokeWidth={1.75} />
                    </div>
                    <h3 className={styles.cardTitle}>{pillar.title}</h3>
                    <p className={styles.cardText}>{pillar.text}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
