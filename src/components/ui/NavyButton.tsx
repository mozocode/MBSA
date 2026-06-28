import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface NavyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: string
}

export function NavyButton({ children, href, className = '', ...props }: NavyButtonProps) {
  const classes = `inline-flex items-center justify-center w-full px-6 py-3 font-display font-bold uppercase tracking-wide text-sm bg-navy text-gold border border-gold transition-all duration-200 hover:bg-navy-light focus-ring ${className}`

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={typeof children === 'string' ? children : undefined}
      >
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
