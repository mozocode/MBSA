import { ChevronRight, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { announcementMatchesPage } from '../../lib/announcementPages'
import { useAnnouncements } from '../../lib/hooks/useAnnouncements'

const DISMISS_KEY = 'mbsa-announcement-dismissed'

export function AnnouncementBar() {
  const { pathname } = useLocation()
  const { data: announcements, loading } = useAnnouncements()
  const [dismissed, setDismissed] = useState(false)
  const [index, setIndex] = useState(0)

  const items = useMemo(
    () =>
      announcements.filter(
        (item) => item.active && announcementMatchesPage(item.pages, pathname),
      ),
    [announcements, pathname],
  )

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === 'true')
  }, [])

  useEffect(() => {
    setIndex(0)
  }, [pathname, items.length])

  useEffect(() => {
    if (items.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [items.length])

  if (loading || dismissed || items.length === 0) return null

  const current = items[index % items.length]

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true')
    setDismissed(true)
  }

  return (
    <div
      className="bg-gold text-navy text-sm font-semibold relative z-50"
      role="region"
      aria-label="Site announcements"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
        <p className="text-center flex-1">
          {current.text}
          {current.link && (
            <a
              href={current.link}
              className="inline-flex items-center ml-2 underline hover:no-underline focus-ring rounded"
              aria-label="Learn more about announcement"
            >
              Learn more <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 hover:bg-gold-dark/20 rounded focus-ring shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
