import styles from './Badge.module.css'

/**
 * Badge — compact status/count label
 *
 * Props:
 *   variant  — 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'solid'
 *   size     — 'sm' | 'md' | 'lg'
 *   dot      — boolean (prepend a colored status dot)
 *   className
 *   children
 */
export default function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}
