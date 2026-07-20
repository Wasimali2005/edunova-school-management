import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Footer.module.css'

/* ----------------------------------------------------------
   Footer link data
   ---------------------------------------------------------- */
const CAMPUS_LINKS = [
  { label: 'About Us',    to: '/about' },
  { label: 'Courses',     to: '/courses' },
  { label: 'Help Centre', to: '/help' },
  { label: 'News',        to: '/blog' },
  { label: 'Contact',     to: '/contact' },
  { label: 'Careers',     to: '/careers' },
]

const ACADEMICS_LINKS = [
  { label: 'Programming',  to: '/courses/development' },
  { label: 'Art & Design', to: '/courses/design' },
  { label: 'Business',     to: '/courses/business' },
  { label: 'Engineering',  to: '/courses/engineering' },
  { label: 'Photography',  to: '/courses/photography' },
  { label: 'Data Science', to: '/courses/data-science' },
]

const SOCIAL_LINKS = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: <TwitterIcon />,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: <FacebookIcon />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <LinkedInIcon />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: <YouTubeIcon />,
  },
]

const BOTTOM_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use',   to: '/terms' },
  { label: 'Cookie Policy',  to: '/cookies' },
]

const CURRENT_YEAR = new Date().getFullYear()

/* ----------------------------------------------------------
   Newsletter form
   ---------------------------------------------------------- */
function NewsletterForm() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    // Simulate async submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.p
            key="success"
            className={styles.successMsg}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="status"
            aria-live="polite"
          >
            <CheckIcon />
            You're subscribed! Check your inbox.
          </motion.p>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
          >
            <input
              type="email"
              className={styles.newsletterInput}
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address for newsletter"
              required
              autoComplete="email"
            />
            <button
              type="submit"
              className={styles.newsletterBtn}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Subscribing…' : 'Get Newsletter'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

/* ----------------------------------------------------------
   Main Footer
   ---------------------------------------------------------- */
export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Top grid */}
      <div className={styles.top}>

        {/* Brand + contact */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label="EduNova home">
            <div className={styles.logoIcon} aria-hidden="true">
              <LogoSvg />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoLabel}>School</span>
              <span className={styles.logoName}>
                Edu<span>Nova</span>
              </span>
            </div>
          </Link>

          <p className={styles.tagline}>
            Empowering learners worldwide with world-class online education and certifications.
          </p>

          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <PhoneIcon className={styles.contactIcon} aria-hidden="true" />
              <a href="tel:+18812345654" style={{ color: 'inherit', textDecoration: 'none' }}>
                +1 (881) 234-5654
              </a>
            </li>
            <li className={styles.contactItem}>
              <MailIcon className={styles.contactIcon} aria-hidden="true" />
              <a href="mailto:hello@edunova.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                hello@edunova.com
              </a>
            </li>
            <li className={styles.contactItem}>
              <LocationIcon className={styles.contactIcon} aria-hidden="true" />
              <span>681 Pompton Ave, Cedar Grove, NJ 5479 United States</span>
            </li>
          </ul>

          {/* Social icons */}
          <ul className={styles.socialList}>
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Campus */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Our Campus</h3>
          <ul className={styles.linkList}>
            {CAMPUS_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={styles.footerLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Academics */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Academics</h3>
          <ul className={styles.linkList}>
            {ACADEMICS_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={styles.footerLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>Newsletter</h3>
          <p className={styles.newsletterDesc}>
            Register now to get the latest updates on promotions &amp; coupons.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} aria-hidden="true">
        <div className={styles.dividerLine} />
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          Copyright &copy; {CURRENT_YEAR} All Rights Reserved by{' '}
          <Link to="/">EduNova</Link>
        </p>

        <nav aria-label="Legal links">
          <ul className={styles.bottomLinks}>
            {BOTTOM_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={styles.bottomLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------
   Inline SVG Icons
   ---------------------------------------------------------- */
function LogoSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3L2 8l10 5 10-5-10-5z" fill="currentColor" opacity="0.9" />
      <path d="M2 16l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )
}

function LocationIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 10l4.5 4.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
