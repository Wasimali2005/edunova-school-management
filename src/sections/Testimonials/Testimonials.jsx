import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Card from '../../components/Card'
import Avatar from '../../components/Avatar'
import SectionHeader from '../../components/SectionHeader'
import styles from './Testimonials.module.css'

/* ----------------------------------------------------------
   Testimonial data
   ---------------------------------------------------------- */
const TESTIMONIALS = [
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    designation: 'Principal',
    school: 'Greenfield Academy',
    review:
      'EduNova transformed how we run our school. Attendance, fees, and parent communication are now seamless — our admin team saves hours every single week.',
    rating: 5,
  },
  {
    id: 'james-okafor',
    name: 'James Okafor',
    designation: 'Teacher',
    school: 'Riverside High School',
    review:
      'The teacher dashboard is incredibly intuitive. I can mark attendance, upload grades, and message parents without juggling three different apps.',
    rating: 5,
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    designation: 'Administrator',
    school: 'Oakwood International School',
    review:
      'We migrated from spreadsheets in a single afternoon. The CSV import and guided setup made onboarding our entire staff painless and stress-free.',
    rating: 5,
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    designation: 'Principal',
    school: 'Summit Preparatory School',
    review:
      'Parents love the portal — they check attendance and fee status on their phones. Our support calls dropped by 40% within the first term.',
    rating: 5,
  },
]

/* ----------------------------------------------------------
   Breakpoint hook
   ---------------------------------------------------------- */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/* ----------------------------------------------------------
   Framer Motion variants
   ---------------------------------------------------------- */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
}

/* ----------------------------------------------------------
   StarRating
   ---------------------------------------------------------- */
function StarRating({ rating }) {
  return (
    <div
      className={styles.stars}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          strokeWidth={1.5}
          className={i < rating ? styles.starFilled : styles.starEmpty}
          fill={i < rating ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/* ----------------------------------------------------------
   TestimonialCard
   ---------------------------------------------------------- */
function TestimonialCard({ testimonial, index, animated = true }) {
  const content = (
    <Card
      as="blockquote"
      padding="none"
      shadow="sm"
      className={styles.testimonialCard}
      cite={`#testimonial-${testimonial.id}`}
    >
      <div className={styles.cardInner}>
        <Quote
          size={28}
          strokeWidth={1.5}
          className={styles.quoteIcon}
          aria-hidden="true"
        />

        <p className={styles.reviewText} id={`testimonial-${testimonial.id}`}>
          &ldquo;{testimonial.review}&rdquo;
        </p>

        <StarRating rating={testimonial.rating} />

        <footer className={styles.author}>
          <Avatar
            name={testimonial.name}
            alt={`Photo of ${testimonial.name}`}
            size="lg"
            bordered
            className={styles.avatar}
          />
          <div className={styles.authorInfo}>
            <cite className={styles.authorName}>{testimonial.name}</cite>
            <span className={styles.authorRole}>
              {testimonial.designation}
              <span className={styles.roleDivider} aria-hidden="true">
                ·
              </span>
              {testimonial.school}
            </span>
          </div>
        </footer>

        <span className={styles.cardIndex} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </Card>
  )

  if (!animated) {
    return <div className={styles.cardWrap}>{content}</div>
  }

  return (
    <motion.div variants={cardVariants} className={styles.cardWrap}>
      {content}
    </motion.div>
  )
}

/* ----------------------------------------------------------
   Carousel (mobile / tablet)
   ---------------------------------------------------------- */
function TestimonialCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const trackRef = useRef(null)

  const goTo = useCallback(
    (index) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current],
  )

  const goPrev = useCallback(() => {
    const next = current === 0 ? testimonials.length - 1 : current - 1
    setDirection(-1)
    setCurrent(next)
  }, [current, testimonials.length])

  const goNext = useCallback(() => {
    const next = current === testimonials.length - 1 ? 0 : current + 1
    setDirection(1)
    setCurrent(next)
  }, [current, testimonials.length])

  useEffect(() => {
    const handler = (e) => {
      if (!trackRef.current?.contains(document.activeElement)) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goPrev, goNext])

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      ref={trackRef}
      tabIndex={0}
    >
      <div className={styles.carouselViewport} aria-live="polite">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={testimonials[current].id}
            className={styles.carouselSlide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${current + 1} of ${testimonials.length}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <TestimonialCard
              testimonial={testimonials[current]}
              index={current}
              animated={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.carouselBtn}
          onClick={goPrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className={styles.dots} role="tablist" aria-label="Select testimonial">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              aria-label={`Testimonial ${i + 1}: ${t.name}`}
              aria-selected={i === current}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.carouselBtn}
          onClick={goNext}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------
   Testimonials Section
   ---------------------------------------------------------- */
export default function Testimonials() {
  const isCarousel = useMediaQuery('(max-width: 1023px)')

  return (
    <motion.section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-heading"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Testimonials"
            title={
              <>
                Loved by educators{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(120deg, var(--color-brand) 0%, var(--color-accent-brand) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  worldwide
                </span>
              </>
            }
            titleAs="h2"
            id="testimonials-heading"
            subtitle="Hear from principals, teachers, and administrators who switched to EduNova and never looked back."
            align="center"
            size="md"
            divider
          />
        </motion.div>

        {isCarousel ? (
          <motion.div variants={fadeUp}>
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </motion.div>
        ) : (
          <motion.div
            className={styles.grid}
            role="list"
            aria-label="Customer testimonials"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={testimonial.id} role="listitem">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
