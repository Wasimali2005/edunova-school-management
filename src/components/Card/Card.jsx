import styles from './Card.module.css'

/**
 * Card — surface container with optional sub-components
 *
 * Root props:
 *   padding   — 'none' | 'sm' | 'md' | 'lg'
 *   shadow    — 'none' | 'sm' | 'md' | 'lg'
 *   variant   — 'default' | 'flat' | 'outlined'
 *   hoverable — boolean (lift + scale on hover)
 *   accentBar — boolean (gradient top stripe)
 *   as        — element tag (default 'div', use 'article', 'section', etc.)
 *   className
 *   children
 *
 * Sub-components (named exports):
 *   <Card.Media>   — image / media slot
 *   <Card.Header>  — title / meta area
 *   <Card.Body>    — main content
 *   <Card.Footer>  — actions / footer
 */
function Card({
  padding = 'md',
  shadow = 'sm',
  variant = 'default',
  hoverable = false,
  accentBar = false,
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    styles.card,
    styles[`shadow-${shadow}`],
    variant !== 'default' ? styles[variant] : '',
    hoverable  ? styles.hoverable  : '',
    accentBar  ? styles.accentBar  : '',
    // only apply root padding when not using sub-parts
    styles[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={classes}
      tabIndex={hoverable ? 0 : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* Sub-components */
Card.Media = function CardMedia({ children, className = '', style, ...rest }) {
  return (
    <div className={`${styles.media} ${className}`} style={style} {...rest}>
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ children, className = '', ...rest }) {
  return (
    <div className={`${styles.header} ${className}`} {...rest}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ children, className = '', ...rest }) {
  return (
    <div className={`${styles.body} ${className}`} {...rest}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ children, className = '', ...rest }) {
  return (
    <div className={`${styles.footer} ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default Card
