import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  School,
  MessageSquare,
  Send,
  CheckCircle,
} from 'lucide-react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card from '../../components/Card'
import SectionHeader from '../../components/SectionHeader'
import { pageVariants, fadeUp, gradientTextStyle } from '../about/motionVariants'
import styles from './ContactForm.module.css'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  schoolName: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.section
      id="contact-form"
      className={styles.section}
      aria-labelledby="contact-form-heading"
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeUp}>
          <SectionHeader
            eyebrow="Send a Message"
            title={
              <>
                Do you have a{' '}
                <span style={gradientTextStyle}>question?</span>
              </>
            }
            titleAs="h2"
            id="contact-form-heading"
            subtitle="Fill out the form below and our team will get back to you within one business day."
            align="left"
            size="md"
            divider
          />
        </motion.div>

        <div className={styles.split}>
          {/* Left — decorative illustration */}
          <motion.div
            className={styles.visualCol}
            variants={fadeUp}
            aria-hidden="true"
          >
            <div className={styles.visualPanel}>
              <div className={styles.visualShape1} />
              <div className={styles.visualShape2} />
              <div className={styles.dotPattern} />
              <ContactIllustration />
              <p className={styles.visualCaption}>
                Ready to transform your school?
              </p>
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div variants={fadeUp}>
            <Card
              as="div"
              padding="none"
              shadow="md"
              className={styles.formCard}
            >
              {submitted ? (
                <div className={styles.successState} role="status" aria-live="polite">
                  <CheckCircle size={48} strokeWidth={1.5} className={styles.successIcon} />
                  <h3 className={styles.successTitle}>Message received!</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out. Our team will review your message
                    and respond to <strong>{form.email}</strong> shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setSubmitted(false)
                      setForm(INITIAL_FORM)
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  <div className={styles.formRow}>
                    <Input
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      autoComplete="name"
                      adornmentLeft={<User size={16} strokeWidth={1.75} />}
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={form.email}
                      onChange={handleChange('email')}
                      autoComplete="email"
                      adornmentLeft={<Mail size={16} strokeWidth={1.75} />}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      autoComplete="tel"
                      adornmentLeft={<Phone size={16} strokeWidth={1.75} />}
                    />
                    <Input
                      label="School Name"
                      name="schoolName"
                      type="text"
                      placeholder="Enter your school name"
                      required
                      value={form.schoolName}
                      onChange={handleChange('schoolName')}
                      adornmentLeft={<School size={16} strokeWidth={1.75} />}
                    />
                  </div>

                  <div className={styles.textareaWrap}>
                    <label htmlFor="contact-message" className={styles.textareaLabel}>
                      Your Message
                      <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <div className={styles.textareaGroup}>
                      <span className={styles.textareaIcon} aria-hidden="true">
                        <MessageSquare size={16} strokeWidth={1.75} />
                      </span>
                      <textarea
                        id="contact-message"
                        name="message"
                        className={styles.textarea}
                        placeholder="Tell us how we can help your school..."
                        rows={5}
                        required
                        value={form.message}
                        onChange={handleChange('message')}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    iconRight={<Send size={18} strokeWidth={2} />}
                    className={styles.submitBtn}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function ContactIllustration() {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="160" cy="160" r="100" fill="rgba(59,130,246,0.12)" />
      <rect x="100" y="220" width="120" height="80" rx="12" fill="var(--color-primary-200)" />
      <circle cx="160" cy="130" r="40" fill="#fcd34d" />
      <rect x="130" y="168" width="60" height="55" rx="8" fill="var(--color-brand)" opacity="0.85" />
      <rect x="155" y="90" width="10" height="50" rx="5" fill="#fbbf24" transform="rotate(10 160 115)" />
      <circle cx="162" cy="82" r="18" fill="#fef08a" stroke="#fbbf24" strokeWidth="2" />
      <path d="M152 82 L158 88 L174 72" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="60" y="280" width="200" height="8" rx="4" fill="var(--color-neutral-200)" opacity="0.5" />
    </svg>
  )
}
