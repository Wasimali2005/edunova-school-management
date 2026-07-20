import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

/* ----------------------------------------------------------
   Navigation structure
   ---------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'Courses',
    to: '/courses',
    children: [
      { label: 'All Courses',    to: '/courses' },
      { label: 'Development',    to: '/courses/development' },
      { label: 'Design',         to: '/courses/design' },
      { label: 'Business',       to: '/courses/business' },
      { label: 'Data Science',   to: '/courses/data-science' },
    ],
  },
  {
    label: 'Programs',
    to: '/programs',
    children: [
      { label: 'Bootcamps',      to: '/programs/bootcamps' },
      { label: 'Certifications', to: '/programs/certifications' },
      { label: 'Degrees',        to: '/programs/degrees' },
    ],
  },
  { label: 'Instructors', to: '/instructors' },
  { label: 'Pricing',     to: '/pricing' },
  { label: 'Blog',        to: '/blog' },
]

/* ----------------------------------------------------------
   Framer Motion variants
   ---------------------------------------------------------- */
const dropdownVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.18, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.12, ease: 'easeIn'  } },
}

const drawerVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0,     transition: { type: 'spring', stiffness: 320, damping: 32 } },
  exit:    { x: '100%',transition: { duration: 0.22, ease: 'easeIn' } },
}

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}

/* ----------------------------------------------------------
   NavItem with optional dropdown
   ---------------------------------------------------------- */
function NavItem({ link }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  if (!link.children) {
    return (
      <div className={styles.navItem}>
        <NavLink
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          {link.label}
        </NavLink>
      </div>
    )
  }

  return (
    <div
      className={`${styles.navItem} ${open ? styles.navItemOpen : ''}`}
      ref={ref}
    >
      <button
        type="button"
        className={styles.navLink}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
      >
        {link.label}
        <ChevronIcon className={styles.chevron} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdown}
            role="menu"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseLeave={() => setOpen(false)}
          >
            {link.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                end
                role="menuitem"
                className={({ isActive }) =>
                  `${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ''}`
                }
                onClick={() => setOpen(false)}
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ----------------------------------------------------------
   Mobile nav item (with collapsible children)
   ---------------------------------------------------------- */
function MobileNavItem({ link, onClose }) {
  const [open, setOpen] = useState(false)

  if (!link.children) {
    return (
      <NavLink
        to={link.to}
        end={link.to === '/'}
        className={({ isActive }) =>
          `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
        }
        onClick={onClose}
      >
        {link.label}
      </NavLink>
    )
  }

  return (
    <div>
      <button
        type="button"
        className={`${styles.mobileNavLink}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {link.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronIcon className={styles.chevron} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileSubNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {link.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                end
                className={({ isActive }) =>
                  `${styles.mobileSubLink} ${isActive ? styles.mobileSubLinkActive : ''}`
                }
                onClick={onClose}
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ----------------------------------------------------------
   Main Navbar
   ---------------------------------------------------------- */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={styles.inner}>
          {/* Logo */}
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

          {/* Desktop navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.to} link={link} />
            ))}
          </nav>

          {/* Right section */}
          <div className={styles.rightSection}>
            {/* Search */}
            <div className={styles.searchBar} role="search">
              <SearchIcon className={styles.searchIcon} aria-hidden="true" />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search courses…"
                aria-label="Search courses"
              />
            </div>

            {/* CTA — Book a Free Demo */}
            <Link to="/demo" className={styles.ctaBtn} aria-label="Book a free demo session">
              Book a Free Demo
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              className={styles.hamburger}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileOverlay}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className={styles.mobileMenu}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Drawer header */}
              <div className={styles.mobileHeader}>
                <Link to="/" className={styles.logo} onClick={closeMobile} aria-label="EduNova home">
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

                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={closeMobile}
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Mobile search */}
              <div className={styles.mobileSearch}>
                <div className={styles.mobileSearchField} role="search">
                  <SearchIcon className={styles.searchIcon} aria-hidden="true" />
                  <input
                    type="search"
                    className={styles.mobileSearchInput}
                    placeholder="Search courses…"
                    aria-label="Search courses"
                  />
                </div>
              </div>

              {/* Mobile nav links */}
              <nav className={styles.mobileNav} aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <MobileNavItem key={link.to} link={link} onClose={closeMobile} />
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className={styles.mobileCta}>
                <Link
                  to="/demo"
                  className={styles.mobileCtaBtn}
                  onClick={closeMobile}
                  aria-label="Book a free demo session"
                >
                  Book a Free Demo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ----------------------------------------------------------
   Inline SVG icons (no external dependency)
   ---------------------------------------------------------- */
function LogoSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3L2 8l10 5 10-5-10-5z" fill="currentColor" opacity="0.9" />
      <path d="M2 16l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.75" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}
