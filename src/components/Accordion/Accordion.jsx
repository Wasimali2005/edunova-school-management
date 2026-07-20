import { useState, useId } from 'react'
import styles from './Accordion.module.css'

/* Single accordion item */
function AccordionItem({
  title,
  children,
  icon,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
  triggerId,
  panelId,
  indented,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen       = isControlled ? controlledOpen : internalOpen

  const toggle = () => {
    if (!isControlled) setInternalOpen((o) => !o)
    if (onToggle) onToggle()
  }

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <button
        id={triggerId}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className={styles.triggerLeft}>
          {icon && (
            <span className={styles.triggerIcon} aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{title}</span>
        </span>

        {/* Chevron */}
        <svg
          className={styles.chevron}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.panel}
        style={{ height: isOpen ? 'auto' : 0, overflow: 'hidden' }}
      >
        <div className={`${styles.panelInner} ${indented && icon ? styles.panelIndented : ''}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Accordion
 *
 * Props:
 *   items     — array of { id, title, content, icon?, defaultOpen? }
 *   variant   — 'default' | 'bordered' | 'separated'
 *   multiple  — boolean (allow multiple items open simultaneously)
 *   className
 */
export default function Accordion({
  items = [],
  variant = 'default',
  multiple = false,
  className = '',
}) {
  const baseId = useId()
  const [openItems, setOpenItems] = useState(() => {
    const initial = items
      .filter((item) => item.defaultOpen)
      .map((item) => item.id)
    return multiple ? initial : initial.slice(0, 1)
  })

  const toggle = (id) => {
    setOpenItems((prev) => {
      if (multiple) {
        return prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      }
      return prev.includes(id) ? [] : [id]
    })
  }

  const classes = [
    styles.accordion,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {items.map((item) => {
        const triggerId = `${baseId}-trigger-${item.id}`
        const panelId   = `${baseId}-panel-${item.id}`

        return (
          <AccordionItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            isOpen={openItems.includes(item.id)}
            onToggle={() => toggle(item.id)}
            triggerId={triggerId}
            panelId={panelId}
            indented={Boolean(item.icon)}
          >
            {item.content}
          </AccordionItem>
        )
      })}
    </div>
  )
}
