import { motion } from 'framer-motion'
import {
  Users,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Check,
} from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import { pageVariants, fadeUp, gradientTextStyle } from './motionVariants'
import styles from './ManagementBenefits.module.css'

const BENEFITS = [
  {
    id: 'student-records',
    icon: Users,
    title: 'Centralised Student Records',
    description: 'One profile per student with enrolment, attendance, grades, and fee history.',
    highlights: ['Digital enrolment forms', 'Academic history tracking', 'Document storage'],
  },
  {
    id: 'attendance',
    icon: CalendarCheck,
    title: 'Smart Attendance Tracking',
    description: 'Mark attendance in seconds and send automatic absence alerts to parents.',
    highlights: ['Real-time dashboards', 'Automated parent SMS/email', 'Monthly reports'],
  },
  {
    id: 'fee-collection',
    icon: CreditCard,
    title: 'Effortless Fee Collection',
    description: 'Generate invoices, accept online payments, and track overdue balances.',
    highlights: ['Online payment gateway', 'Auto-generated receipts', 'Fee defaulter alerts'],
  },
  {
    id: 'examinations',
    icon: ClipboardList,
    title: 'Exam & Result Management',
    description: 'Schedule exams, enter marks, and publish results with one click.',
    highlights: ['Grade card generation', 'Performance analytics', 'Report card templates'],
  },
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Parent-Teacher Communication',
    description: 'Keep parents informed with announcements, messages, and a dedicated portal.',
    highlights: ['Bulk announcements', 'Direct messaging', 'Event notifications'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Actionable Analytics',
    description: 'Data-driven insights on attendance trends, fee collection, and academic performance.',
    highlights: ['Custom report builder', 'Export to PDF/Excel', 'Visual dashboards'],
  },
]

export default function ManagementBenefits() {
  return (
    <motion.section
      id="management-benefits"
      className={styles.section}
      aria-labelledby="benefits-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="School Management"
            title={
              <>
                Everything your school needs,{' '}
                <span style={gradientTextStyle}>in one place</span>
              </>
            }
            titleAs="h2"
            id="benefits-heading"
            subtitle="From the front office to the classroom, EduNova covers every aspect of school administration with modules designed to work together seamlessly."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        <div className={styles.grid} role="list" aria-label="School management benefits">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.article
                key={benefit.id}
                className={styles.benefitCard}
                role="listitem"
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className={styles.headerText}>
                    <h3 className={styles.cardTitle}>{benefit.title}</h3>
                    <p className={styles.cardDesc}>{benefit.description}</p>
                  </div>
                </div>

                <ul className={styles.checkList} aria-label={`Features of ${benefit.title}`}>
                  {benefit.highlights.map((item) => (
                    <li key={item} className={styles.checkItem}>
                      <span className={styles.checkDot} aria-hidden="true">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
