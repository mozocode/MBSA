import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { AdminSidebar } from '../../components/admin/AdminSidebar'

const titles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/announcements': 'Announcements',
  '/admin/tournaments': 'Tournaments',
  '/admin/products': 'Products',
  '/admin/gallery': 'Gallery',
  '/admin/sponsors': 'Sponsors',
  '/admin/events': 'Events',
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const title = titles[pathname] ?? 'Admin'

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
