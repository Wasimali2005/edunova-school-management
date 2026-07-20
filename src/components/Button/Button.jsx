import styles from './Button.module.css'

/**
 * Button
 *
 * Props:
 *   variant    — 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger' | 'link'
 *   size       — 'sm' | 'md' | 'lg' | 'xl'
 *   fullWidth  — boolean
 *   loading    — boolean  (shows spinner, disables interaction)
 *   disabled   — boolean
 *   iconLeft   — ReactNode
 *   iconRight  — ReactNode
 *   iconOnly   — boolean (square padding, use aria-label)
 *   as         — 'button' | 'a' | any valid element string (default: 'button')
 *   onClick    — handler
 *   type       — 'button' | 'submit' | 'reset'
 *   className  — additional class override
 *   children   — button label / content
 *   ...rest    — any other native attrs (href, target, aria-*, etc.)
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  as: Tag = 'button',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth  ? styles.fullWidth : '',
    loading    ? styles.loading   : '',
    iconOnly   ? styles.iconOnly  : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const isNativeButton = Tag === 'button'

  return (
    <Tag
      className={classes}
      disabled={isNativeButton ? (disabled || loading) : undefined}
      aria-disabled={!isNativeButton ? (disabled || loading) : undefined}
      type={isNativeButton ? type : undefined}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}

      {!loading && iconLeft && (
        <span className={styles.iconLeft} aria-hidden="true">
          {iconLeft}
        </span>
      )}

      {children && <span>{children}</span>}

      {!loading && iconRight && (
        <span className={styles.iconRight} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Tag>
  )
}
