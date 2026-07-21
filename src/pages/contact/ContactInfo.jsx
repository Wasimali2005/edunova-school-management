import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Card from '../../components/Card'
import { pageVariants, cardVariants } from '../about/motionVariants'
import styles from './ContactInfo.module.css'

const INFO_ITEMS = [
  {
    id: 'phone',
    icon: Phone,
    iconColor: 'iconBlue',
    label: 'Phone',
    value: '+1 (800) 123-4567',
    href: 'tel:+18001234567',
    description: 'Call us Mon–Fri, 9 AM – 6 PM PST',
  },
  {
    id: 'email',
    icon: Mail,
    iconColor: 'iconViolet',
    label: 'Email',
    value: 'hello@edunova.com',
    href: 'mailto:hello@edunova.com',
    description: 'We respond within 24 hours',
  },
  {
    id: 'address',
    icon: MapPin,
    iconColor: 'iconGreen',
    label: 'Address',
    value: '123 Education Lane, San Francisco, CA 94102',
    href: 'https://maps.google.com',
    description: 'Visit our headquarters by appointment',
  },
  {
    id: 'hours',
    icon: Clock,
    iconColor: 'iconAmber',
    label: 'Working Hours',
    value: 'Mon – Fri, 9:00 AM – 6:00 PM',
    description: 'Closed on weekends and public holidays',
  },
]

export default function ContactInfo() {
  return (
    <motion.section
      className={styles.section}
      aria-label="Contact information"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className={styles.container}>
        <div className={styles.grid} role="list">
          {INFO_ITEMS.map((item) => {
            const Icon = item.icon
            const content = (
              <Card
                as="article"
                padding="none"
                shadow="sm"
                className={styles.card}
                aria-label={`${item.label}: ${item.value}`}
              >
                <div className={styles.cardInner}>
                  <div
                    className={`${styles.iconWrap} ${styles[item.iconColor]}`}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className={styles.textBlock}>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.value}>{item.value}</span>
                    <span className={styles.desc}>{item.description}</span>
                  </div>
                </div>
              </Card>
            )

            return (
              <motion.div key={item.id} role="listitem" variants={cardVariants}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={styles.cardLink}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
