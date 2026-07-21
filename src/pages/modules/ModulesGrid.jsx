import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  Bus,
  ArrowRight,
} from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import SectionHeader from '../../components/SectionHeader'
import {
  pageVariants,
  fadeUp,
  cardVariants,
  gradientTextStyle,
} from '../about/motionVariants'
import styles from './ModulesGrid.module.css'

const MODULES = [
  {
    id: 'student-management',
    icon: Users,
    iconColor: 'iconBlue',
    title: 'Student Management',
    description:
      'Centralise student profiles, enrolment records, academic history, and personal data in one secure, easy-to-navigate dashboard.',
  },
  {
    id: 'attendance-management',
    icon: CalendarCheck,
    iconColor: 'iconViolet',
    title: 'Attendance Management',
    description:
      'Track daily attendance with real-time reports, automated absence alerts, and seamless integration with the parent portal.',
  },
  {
    id: 'fee-management',
    icon: CreditCard,
    iconColor: 'iconGreen',
    title: 'Fee Management',
    description:
      'Automate fee collection, generate invoices, process online payments, and send overdue reminders without manual effort.',
  },
  {
    id: 'examination-results',
    icon: ClipboardList,
    iconColor: 'iconAmber',
    title: 'Examination & Results',
    description:
      'Schedule exams, publish results instantly, generate grade cards, and provide detailed analytics on student performance trends.',
  },
  {
    id: 'teacher-management',
    icon: GraduationCap,
    iconColor: 'iconCyan',
    title: 'Teacher Management',
    description:
      'Manage teacher profiles, timetables, leave requests, payroll, and performance evaluations from a single administration hub.',
  },
  {
    id: 'parent-portal',
    icon: HeartHandshake,
    iconColor: 'iconRose',
    title: 'Parent Portal',
    description:
      'Keep parents informed with a dedicated portal for attendance, grades, fee status, announcements, and direct teacher messaging.',
  },
  {
    id: 'library-management',
    icon: BookOpen,
    iconColor: 'iconIndigo',
    title: 'Library Management',
    description:
      'Catalogue books, track borrowings and returns, manage fines, and give students a searchable digital library catalogue.',
  },
  {
    id: 'transport-management',
    icon: Bus,
    iconColor: 'iconTeal',
    title: 'Transport Management',
    description:
      'Plan bus routes, assign students to vehicles, track live locations, and notify parents of pickup and drop-off schedules.',
  },
]

const cardHover = {
  y: -6,
  transition: { duration: 0.25, ease: 'easeOut' },
}

function ModuleCard({ module, index }) {
  const Icon = module.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover={cardHover}
      id={module.id}
    >
      <Card
        as="article"
        padding="none"
        shadow="sm"
        className={styles.moduleCard}
        aria-labelledby={`module-title-${module.id}`}
      >
        <span className={styles.cardNumber} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={styles.cardInner}>
          <div
            className={`${styles.iconWrap} ${styles[module.iconColor]}`}
            aria-hidden="true"
          >
            <Icon size={24} strokeWidth={1.75} />
          </div>

          <div className={styles.textBlock}>
            <h2 className={styles.cardTitle} id={`module-title-${module.id}`}>
              {module.title}
            </h2>
            <p className={styles.cardDesc}>{module.description}</p>
          </div>

          <Button
            as={Link}
            to="/demo"
            variant="outline"
            size="sm"
            iconRight={<ArrowRight size={14} strokeWidth={2.5} />}
            className={styles.learnMoreBtn}
            aria-label={`Learn more about ${module.title}`}
          >
            Learn More
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function ModulesGrid() {
  return (
    <motion.section
      className={styles.section}
      aria-labelledby="modules-grid-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="All Modules"
            title={
              <>
                Complete school management,{' '}
                <span style={gradientTextStyle}>one platform</span>
              </>
            }
            titleAs="h2"
            id="modules-grid-heading"
            subtitle="Each module is purpose-built for school workflows and integrates natively with every other part of EduNova — no third-party plugins required."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        <motion.div
          className={styles.grid}
          role="list"
          aria-label="School management modules"
        >
          {MODULES.map((mod, index) => (
            <div key={mod.id} role="listitem">
              <ModuleCard module={mod} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
