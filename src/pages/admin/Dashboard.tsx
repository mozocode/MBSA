import { addDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { listAnnouncements } from '../../lib/firestore/announcements'
import { listGalleryPhotos } from '../../lib/firestore/gallery'
import { listSponsors } from '../../lib/firestore/sponsors'
import { listAllEvents } from '../../lib/firestore/events'
import { listTournaments } from '../../lib/firestore/tournaments'
import type { SiteEvent } from '../../lib/types'

interface Stats {
  tournaments: number
  openTournaments: number
  announcements: number
  activeAnnouncements: number
  gallery: number
  sponsors: number
  upcomingEvents: number
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentEvents, setRecentEvents] = useState<SiteEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [tournaments, announcements, gallery, sponsors, events] = await Promise.all([
          listTournaments(),
          listAnnouncements(),
          listGalleryPhotos(),
          listSponsors(),
          listAllEvents(),
        ])
        const now = new Date()
        const in30 = addDays(now, 30)
        const upcoming = events.filter(
          (e) => e.active && e.startDate.toDate() >= now && e.startDate.toDate() <= in30,
        )
        setStats({
          tournaments: tournaments.length,
          openTournaments: tournaments.filter((t) => t.status === 'open').length,
          announcements: announcements.length,
          activeAnnouncements: announcements.filter((a) => a.active).length,
          gallery: gallery.length,
          sponsors: sponsors.length,
          upcomingEvents: upcoming.length,
        })
        setRecentEvents(events.slice(-5).reverse())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="text-gray-500">Loading dashboard…</div>
  }
  if (error || !stats) {
    return <div className="text-red-600">{error ?? 'Failed to load'}</div>
  }

  const cards = [
    { label: 'Tournaments', value: stats.tournaments, sub: `${stats.openTournaments} open`, to: '/admin/tournaments' },
    { label: 'Announcements', value: stats.announcements, sub: `${stats.activeAnnouncements} active`, to: '/admin/announcements' },
    { label: 'Gallery photos', value: stats.gallery, sub: 'Total items', to: '/admin/gallery' },
    { label: 'Sponsors', value: stats.sponsors, sub: 'Active partners', to: '/admin/sponsors' },
    { label: 'Upcoming events', value: stats.upcomingEvents, sub: 'Next 30 days', to: '/admin/events' },
  ]

  return (
    <AdminErrorBoundary title="Dashboard error">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="bg-white rounded-sm border border-gray-200 p-5 shadow-sm hover:border-gold transition-colors focus-ring"
            >
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
                {card.label}
              </p>
              <p className="font-display font-bold text-4xl text-navy mt-1">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </Link>
          ))}
          <div className="bg-navy rounded-sm p-5 text-white">
            <p className="text-sm text-white/70 font-semibold uppercase tracking-wide">
              Quick actions
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/admin/events" className="text-gold hover:underline">
                  + Add event
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gold hover:underline" target="_blank">
                  View public calendar →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-display font-bold text-lg text-navy uppercase">Recent events</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {recentEvents.length === 0 ? (
              <li className="px-5 py-4 text-gray-500 text-sm">No events yet.</li>
            ) : (
              recentEvents.map((event) => (
                <li key={event.id} className="px-5 py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-navy text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {event.startDate.toDate().toLocaleDateString()} · {event.type}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      event.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {event.active ? 'Active' : 'Hidden'}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </AdminErrorBoundary>
  )
}
