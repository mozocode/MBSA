import { LogOut } from 'lucide-react'
import { useAdminAuth } from '../../lib/hooks/useAdminAuth'
import { AdminMenuButton } from './AdminSidebar'

interface AdminHeaderProps {
  title: string
  onMenuClick: () => void
}

export function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  const { user, signOutAdmin } = useAdminAuth()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <AdminMenuButton onClick={onMenuClick} />
        <h1 className="font-display font-bold text-xl text-navy uppercase truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:block text-sm text-gray-500 truncate max-w-[200px]">
          {user?.email}
        </span>
        <button
          type="button"
          onClick={() => signOutAdmin()}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-navy border border-navy/20 rounded-sm hover:bg-gray-50 focus-ring"
        >
          <LogOut className="w-4 h-4" aria-hidden />
          Sign out
        </button>
      </div>
    </header>
  )
}
