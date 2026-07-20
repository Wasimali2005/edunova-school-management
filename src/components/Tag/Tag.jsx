import styles from './Tag.module.css'

/**
 * Tag — topic / category label
 *
 * Props:
 *   onClick     — makes the tag interactive/clickable
 *   onRemove    — shows an × remove button and calls handler
 *   selected    — boolean, highlights the tag as active
 *   className
 *   children
 */
export default function Tag({
  onClick,
  onRemove,
  selected = false,
  className = '',
  children,
  ...rest
}) {
  const isInteractive = Boolean(onClick)

  const classes = [
    styles.tag,
    isInteractive ? styles.interactive : '',
    selected      ? styles.selected    : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleKeyDown = (e) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick(e)
    }
  }

  return (
    <span
      className={classes}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      aria-pressed={isInteractive ? selected : undefined}
      {...rest}
    >
      {children}

      {onRemove && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={(e) => {
            e.stopPropagation()
            onRemove(e)
          }}
          aria-label={`Remove ${typeof children === 'string' ? children : ''} tag`}
        >
          {/* × icon */}
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7M7 1L1 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  )
}
