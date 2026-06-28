import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: string
  to?: string
  variant?: 'filled' | 'outline'
  target?: string
  rel?: string
}

export function GoldButton({
  children,
  href,
  to,
  variant = 'filled',
  className = '',
  target,
  rel,
  ...props
}: GoldButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 font-display font-bold uppercase tracking-wide text-sm transition-all duration-200 focus-ring'
  const styles =
    variant === 'filled'
      ? 'bg-gold text-navy hover:bg-gold-light'
      : 'border-2 border-gold text-gold bg-transparent hover:bg-gold hover:text-navy'

  const classes = `${base} ${styles} ${className}`
  const label = typeof children === 'string' ? children : undefined

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={label} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
