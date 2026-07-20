import styles from './SectionHeader.module.css'

/**
 * SectionHeader — reusable page-section title block
 *
 * Props:
 *   eyebrow    — string  (small label above title, e.g. "Our Courses")
 *   title      — string | ReactNode  (main heading)
 *   titleAs    — heading element: 'h1' | 'h2' | 'h3' (default 'h2')
 *   subtitle   — string | ReactNode  (description below title)
 *   align      — 'left' | 'center' | 'right'
 *   size       — 'sm' | 'md' | 'lg'
 *   divider    — boolean (show gradient bar under title)
 *   gradient   — boolean (apply gradient to the title text)
 *   action     — ReactNode (button/link placed to the right, triggers headerRow layout)
 *   className
 */
export default function SectionHeader({
  eyebrow,
  title,
  titleAs: TitleTag = 'h2',
  subtitle,
  align = 'left',
  size = 'md',
  divider = false,
  gradient = false,
  action,
  className = '',
}) {
  const sectionClasses = [
    styles.sectionHeader,
    styles[align],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const titleClasses = [
    styles.title,
    styles[`title${size.charAt(0).toUpperCase() + size.slice(1)}`],
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <div className={sectionClasses}>
      {eyebrow && (
        <span className={styles.eyebrow} aria-hidden="true">
          <span className={styles.eyebrowLine} />
          {eyebrow}
        </span>
      )}

      {title && (
        <TitleTag className={titleClasses}>
          {gradient ? (
            <span className={styles.titleGradient}>{title}</span>
          ) : (
            title
          )}
        </TitleTag>
      )}

      {divider && <span className={styles.divider} aria-hidden="true" />}

      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </div>
  )

  /* When an action is passed, wrap in a row layout */
  if (action) {
    return (
      <div className={`${styles.headerRow} ${className}`}>
        <div className={[styles.sectionHeader, styles[align]].filter(Boolean).join(' ')}>
          {eyebrow && (
            <span className={styles.eyebrow} aria-hidden="true">
              <span className={styles.eyebrowLine} />
              {eyebrow}
            </span>
          )}

          {title && (
            <TitleTag className={titleClasses}>
              {gradient ? (
                <span className={styles.titleGradient}>{title}</span>
              ) : (
                title
              )}
            </TitleTag>
          )}

          {divider && <span className={styles.divider} aria-hidden="true" />}

          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>

        <div className={styles.actionSlot}>{action}</div>
      </div>
    )
  }

  return inner
}
