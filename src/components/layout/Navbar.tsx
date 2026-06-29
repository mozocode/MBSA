import { ChevronDown, Menu, ShoppingCart, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, type NavItem, type NavLink } from '../../lib/navigation'
import { STACK_SPORTS_SIGN_IN_URL } from '../../lib/portalUrls'
import { GoldButton } from '../ui/GoldButton'

function NavChildLink({
  child,
  onNavigate,
}: {
  child: NavLink
  onNavigate?: () => void
}) {
  const location = useLocation()
  const isActive = child.to ? location.pathname === child.to : false
  const classes = `block px-5 py-3 font-display font-bold uppercase text-xs tracking-wide transition-colors focus-ring ${
    isActive ? 'bg-gold text-navy' : 'text-navy hover:bg-gold hover:text-navy'
  }`

  if (child.to) {
    return (
      <Link to={child.to} className={classes} role="menuitem" onClick={onNavigate}>
        {child.label}
      </Link>
    )
  }

  return (
    <a
      href={child.href}
      className={classes}
      role="menuitem"
      onClick={onNavigate}
      {...(child.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {child.label}
    </a>
  )
}

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isAboutActive = item.children?.some(
    (c) => c.to && location.pathname.startsWith(c.to),
  )

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`flex items-center gap-1.5 text-sm font-display font-bold tracking-wide uppercase transition-colors focus-ring rounded px-2 py-1 ${
          isAboutActive ? 'text-gold' : 'text-white/90 hover:text-gold'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown className="w-4 h-4" aria-hidden="true" />
      </button>
      {open && item.children && (
        <ul className="absolute top-full left-0 mt-0 min-w-[220px] bg-white shadow-xl py-1 z-50" role="menu">
          {item.children.map((child) => (
            <li key={child.label} role="none">
              <NavChildLink child={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function NavTopLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const classes =
    'text-white/90 hover:text-gold text-sm font-display font-bold tracking-wide uppercase transition-colors focus-ring rounded px-2 py-1'

  if (item.to) {
    return (
      <Link to={item.to} className={classes} onClick={onNavigate}>
        {item.label}
      </Link>
    )
  }

  return (
    <a
      href={item.href}
      className={classes}
      onClick={onNavigate}
      {...(item.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {item.label}
    </a>
  )
}

interface NavbarProps {
  overlay?: boolean
}

export function Navbar({ overlay = false }: NavbarProps) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'
  const overlayStickyInFlow = overlay && (isHome || pathname === '/tournaments')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const headerClass = overlay
    ? scrolled || mobileOpen
      ? 'sticky top-0 z-40 bg-navy shadow-lg'
      : overlayStickyInFlow
        ? 'sticky top-0 z-40 bg-transparent'
        : 'absolute top-0 left-0 right-0 z-40 bg-transparent'
    : scrolled
      ? 'sticky top-0 z-40 bg-navy shadow-lg'
      : 'sticky top-0 z-40 bg-navy'

  return (
    <header className={`transition-all duration-300 safe-top ${headerClass}`}>
      <nav
        className="max-w-7xl mx-auto px-4 py-2.5 md:py-4 flex items-center justify-between gap-3 md:gap-4"
        aria-label="Main navigation"
      >
        <Link to="/" className="shrink-0 focus-ring rounded" aria-label="MBSA Gators home">
          <img
            src="/MBSA-logo-vector.svg"
            alt="MBSA Gators logo"
            className="h-20 sm:h-[5.25rem] md:h-24 xl:h-28 w-auto"
            width={200}
            height={112}
            decoding="async"
          />
        </Link>

        <ul className="hidden xl:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <NavDropdown item={item} />
              ) : (
                <NavTopLink item={item} />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-3">
          <a
            href="https://mbsagators.com/cart/"
            className="relative text-gold hover:text-gold-light transition-colors focus-ring rounded p-1 border border-gold/50 px-2"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </a>
          <GoldButton
            href={STACK_SPORTS_SIGN_IN_URL}
            variant="outline"
            className="!py-2 !px-4 !text-xs !text-white !border-white hover:!bg-white hover:!text-navy"
          >
            Sign In
          </GoldButton>
        </div>

        <button
          type="button"
          className="xl:hidden text-white touch-target flex items-center justify-center focus-ring rounded -mr-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="xl:hidden bg-navy-dark border-t border-gold/20 max-h-[calc(100dvh-var(--nav-height))] overflow-y-auto overscroll-contain">
          <ul className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex items-center justify-between py-3 text-white font-display font-bold text-sm uppercase cursor-pointer list-none focus-ring rounded px-2">
                      {item.label}
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <ul className="pb-2">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavChildLink child={child} onNavigate={() => setMobileOpen(false)} />
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <div className="px-2">
                    <NavTopLink item={item} onNavigate={() => setMobileOpen(false)} />
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="px-4 pb-6 flex flex-col gap-3">
            <GoldButton href={STACK_SPORTS_SIGN_IN_URL} variant="outline" className="w-full">
              Sign In
            </GoldButton>
          </div>
        </div>
      )}
    </header>
  )
}
