import { useState } from 'react'
import styles from './Avatar.module.css'

/* Deterministic color from a string (name/id) */
const COLOR_PALETTE = ['colorBlue', 'colorViolet', 'colorGreen', 'colorAmber', 'colorRose']

function getColorClass(seed = '') {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length]
}

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Avatar — user picture with initials fallback
 *
 * Props:
 *   src       — image URL
 *   alt       — accessible alt text (also used to derive initials)
 *   name      — full name string (used for initials + color seed)
 *   size      — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
 *   shape     — 'circle' | 'square'
 *   bordered  — boolean
 *   status    — 'online' | 'offline' | 'busy' | 'away'
 *   className
 *
 * Static sub-component:
 *   <Avatar.Group max={n}>{...avatars}</Avatar.Group>
 */
export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  bordered = false,
  status,
  className = '',
  ...rest
}) {
  const [imgError, setImgError] = useState(false)
  const displayName = name || alt || ''
  const initials    = getInitials(displayName)
  const colorClass  = getColorClass(displayName)
  const showImage   = src && !imgError

  const classes = [
    styles.avatar,
    styles[size],
    shape === 'square' ? styles.square   : '',
    bordered           ? styles.bordered : '',
    !showImage         ? styles[colorClass] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role="img"
      aria-label={displayName || 'Avatar'}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={displayName || alt || ''}
          className={styles.img}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        /* Generic person fallback icon */
        <svg
          className={styles.fallbackIcon}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      )}

      {status && (
        <span
          className={`${styles.status} ${styles[status]}`}
          aria-label={`Status: ${status}`}
          role="status"
        />
      )}
    </div>
  )
}

/* ----------------------------------------------------------
   Avatar.Group — stacked avatar list
   ---------------------------------------------------------- */
Avatar.Group = function AvatarGroup({
  children,
  max,
  size = 'md',
  className = '',
  ...rest
}) {
  const childArray = Array.isArray(children) ? children : [children]
  const visible    = max ? childArray.slice(0, max) : childArray
  const overflow   = max ? Math.max(0, childArray.length - max) : 0

  // size → dimension map for overflow bubble
  const sizeMap = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64, xxl: 80 }
  const dim = sizeMap[size] ?? 40

  return (
    <div className={`${styles.group} ${className}`} {...rest}>
      {visible.map((child, i) => (
        <div key={i} style={{ zIndex: visible.length - i }}>
          {child}
        </div>
      ))}

      {overflow > 0 && (
        <div
          className={styles.overflowCount}
          style={{ width: dim, height: dim, fontSize: dim < 36 ? '0.6rem' : 'var(--text-xs)' }}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
