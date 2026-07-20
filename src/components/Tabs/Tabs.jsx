import { useState, useId, useRef } from 'react'
import styles from './Tabs.module.css'

/**
 * Tabs — keyboard-accessible tabbed interface
 *
 * Props:
 *   tabs      — array of:
 *     { id, label, content, icon?, badge?, disabled? }
 *   variant   — 'underline' | 'pills' | 'bordered'
 *   defaultTab — id of initially active tab (defaults to first)
 *   activeTab  — controlled active tab id
 *   onChange   — (id) => void  (controlled mode)
 *   className
 */
export default function Tabs({
  tabs = [],
  variant = 'underline',
  defaultTab,
  activeTab: controlledTab,
  onChange,
  className = '',
}) {
  const baseId    = useId()
  const listRef   = useRef(null)
  const isControlled = controlledTab !== undefined

  const [internalActive, setInternalActive] = useState(
    defaultTab ?? tabs.find((t) => !t.disabled)?.id ?? tabs[0]?.id
  )

  const active = isControlled ? controlledTab : internalActive

  const setActive = (id) => {
    if (!isControlled) setInternalActive(id)
    if (onChange) onChange(id)
  }

  /* Keyboard navigation — arrow keys move between tabs */
  const handleKeyDown = (e, currentIndex) => {
    const enabledTabs = tabs.filter((t) => !t.disabled)
    const enabledIndex = enabledTabs.findIndex((t) => t.id === tabs[currentIndex]?.id)

    let nextIndex = -1

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (enabledIndex + 1) % enabledTabs.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (enabledIndex - 1 + enabledTabs.length) % enabledTabs.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = enabledTabs.length - 1
    }

    if (nextIndex >= 0) {
      const nextTab = enabledTabs[nextIndex]
      setActive(nextTab.id)
      // Focus the corresponding button
      const btn = listRef.current?.querySelector(
        `[id="${baseId}-tab-${nextTab.id}"]`
      )
      btn?.focus()
    }
  }

  const classes = [
    styles.tabs,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const currentPanel = tabs.find((t) => t.id === active)

  return (
    <div className={classes}>
      {/* Tab list */}
      <div
        ref={listRef}
        role="tablist"
        className={styles.tabList}
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === active

          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              className={`${styles.tab} ${isActive ? styles.active : ''}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              aria-disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span className={styles.tabInner}>
                {tab.icon && (
                  <span className={styles.tabIcon} aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className={styles.tabBadge}>{tab.badge}</span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active panel */}
      {currentPanel && (
        <div
          key={active}
          id={`${baseId}-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          className={styles.tabPanel}
          tabIndex={0}
        >
          {currentPanel.content}
        </div>
      )}
    </div>
  )
}
