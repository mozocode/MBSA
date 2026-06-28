import {
  Calendar,
  Image,
  LayoutDashboard,
  Megaphone,
  Menu,
  ShoppingBag,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/tournaments', label: 'Tournaments', icon: Trophy },
  { to: '/admin/products', label: 'Products', icon: ShoppingBag },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/sponsors', label: 'Sponsors', icon: Users },
  { to: '/admin/events', label: 'Events', icon: Calendar },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          aria-label="Close menu"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-navy text-white flex flex-col transform transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div>
            <p className="font-display font-bold text-gold uppercase text-lg leading-none">MBSA</p>
            <p className="text-white/60 text-xs mt-1">Admin Panel</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1 text-white/70 hover:text-white focus-ring rounded"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {links.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-semibold transition-colors focus-ring ${
                      isActive
                        ? 'bg-gold text-navy'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-5 py-4 border-t border-white/10 text-xs text-white/50">
          <a href="/" className="hover:text-gold transition-colors">
            ← Back to site
          </a>
        </div>
      </aside>
    </>
  )
}

export function AdminMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="lg:hidden p-2 text-navy hover:bg-gray-100 rounded-sm focus-ring"
      aria-label="Open menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  )
}
