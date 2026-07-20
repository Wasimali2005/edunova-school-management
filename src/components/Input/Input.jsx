import { useState, useId } from 'react'
import styles from './Input.module.css'

/**
 * Input — text input with label, adornments, validation states
 *
 * Props:
 *   label        — string
 *   id           — string (auto-generated if omitted)
 *   size         — 'sm' | 'md' | 'lg'
 *   error        — string (error message, sets error state)
 *   helperText   — string (hint below the field)
 *   required     — boolean
 *   disabled     — boolean
 *   adornmentLeft  — ReactNode (icon/element on the left)
 *   adornmentRight — ReactNode (icon/element on the right)
 *   onAdornmentRightClick — handler (makes right adornment clickable, e.g. password toggle)
 *   ariaLabelRight — accessible label for right adornment button
 *   maxLength    — number (shows character counter when set)
 *   status       — 'error' | 'success' | undefined
 *   className
 *   ...rest      — passed to the <input> element
 */
export default function Input({
  label,
  id: idProp,
  size = 'md',
  error,
  helperText,
  required = false,
  disabled = false,
  adornmentLeft,
  adornmentRight,
  onAdornmentRightClick,
  ariaLabelRight = 'Toggle',
  maxLength,
  status,
  className = '',
  value,
  defaultValue,
  onChange,
  ...rest
}) {
  const autoId = useId()
  const fieldId = idProp || autoId
  const errorId = `${fieldId}-error`
  const helperId = `${fieldId}-helper`

  // track value length for character counter
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue
  const charCount = typeof currentValue === 'string' ? currentValue.length : 0

  const handleChange = (e) => {
    if (!controlled) setInternalValue(e.target.value)
    if (onChange) onChange(e)
  }

  // Resolve state
  const hasError   = Boolean(error) || status === 'error'
  const hasSuccess = !hasError && status === 'success'

  const wrapperClasses = [
    styles.wrapper,
    styles[size],
    adornmentLeft  ? styles.hasLeft  : '',
    adornmentRight || onAdornmentRightClick ? styles.hasRight : '',
  ]
    .filter(Boolean)
    .join(' ')

  const inputClasses = [
    styles.input,
    hasError   ? styles.inputError   : '',
    hasSuccess ? styles.inputSuccess : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const describedBy = [
    hasError   ? errorId  : '',
    helperText ? helperId : '',
  ]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">*</span>
          )}
        </label>
      )}

      <div className={styles.inputGroup}>
        {adornmentLeft && (
          <span className={`${styles.adornment} ${styles.adornmentLeft}`}>
            {adornmentLeft}
          </span>
        )}

        <input
          id={fieldId}
          className={inputClasses}
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-required={required ? 'true' : undefined}
          maxLength={maxLength}
          value={controlled ? value : internalValue}
          onChange={handleChange}
          {...rest}
        />

        {(adornmentRight || onAdornmentRightClick) && (
          <span className={`${styles.adornment} ${styles.adornmentRight}`}>
            {onAdornmentRightClick ? (
              <button
                type="button"
                className={styles.adornmentBtn}
                onClick={onAdornmentRightClick}
                aria-label={ariaLabelRight}
                tabIndex={0}
              >
                {adornmentRight}
              </button>
            ) : (
              adornmentRight
            )}
          </span>
        )}
      </div>

      {/* Error message */}
      {hasError && error && (
        <p id={errorId} className={styles.errorText} role="alert">
          {error}
        </p>
      )}

      {/* Helper text */}
      {helperText && !hasError && (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      )}

      {/* Character counter */}
      {maxLength && (
        <p
          className={`${styles.charCount} ${charCount > maxLength ? styles.charCountOver : ''}`}
          aria-live="polite"
        >
          {charCount}/{maxLength}
        </p>
      )}
    </div>
  )
}
