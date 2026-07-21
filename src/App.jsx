import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Footer } from './components'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ModulesPage from './pages/ModulesPage'
import ContactPage from './pages/ContactPage'

/* ------------------------------------------------------------------ */
/* App shell — Navbar + routed pages + Footer                          */
/* ------------------------------------------------------------------ */
function PlaceholderPage({ title }) {
  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '4rem 2rem',
      }}
    >
      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
        {title}
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
        This page will be built in an upcoming phase.
      </p>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                      element={<HomePage />} />
        <Route path="/courses"               element={<PlaceholderPage title="All Courses" />} />
        <Route path="/courses/:category"     element={<PlaceholderPage title="Course Category" />} />
        <Route path="/programs"              element={<PlaceholderPage title="Programs" />} />
        <Route path="/programs/:type"        element={<PlaceholderPage title="Program" />} />
        <Route path="/instructors"           element={<PlaceholderPage title="Instructors" />} />
        <Route path="/pricing"               element={<PlaceholderPage title="Pricing" />} />
        <Route path="/blog"                  element={<PlaceholderPage title="Blog" />} />
        <Route path="/about"                 element={<AboutPage />} />
        <Route path="/modules"               element={<ModulesPage />} />
        <Route path="/contact"               element={<ContactPage />} />
        <Route path="/help"                  element={<PlaceholderPage title="Help Centre" />} />
        <Route path="/careers"               element={<PlaceholderPage title="Careers" />} />
        <Route path="/demo"                  element={<PlaceholderPage title="Book a Free Demo" />} />
        <Route path="/privacy"               element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="/terms"                 element={<PlaceholderPage title="Terms of Use" />} />
        <Route path="/cookies"               element={<PlaceholderPage title="Cookie Policy" />} />
        <Route path="*"                      element={<PlaceholderPage title="404 — Page Not Found" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
