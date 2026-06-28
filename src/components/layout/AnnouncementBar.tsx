import { ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAnnouncements } from '../../lib/hooks/useAnnouncements'
import type { Announcement } from '../../lib/types'

const DISMISS_KEY = 'mbsa-announcement-dismissed'

export function AnnouncementBar() {
  const { data: announcements, loading } = useAnnouncements()
  const [dismissed, setDismissed] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === 'true')
  }, [])

  const items: Announcement[] =
    announcements.length > 0
      ? announcements
      : [
          {
            id: 'fallback',
            text: '2026 Spring Registration is CLOSED',
            link: 'https://mbsagators.com/register/',
            active: true,
            createdAt: { seconds: 0, nanoseconds: 0 } as Announcement['createdAt'],
          },
        ]

  useEffect(() => {
    if (items.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [items.length])

  if (loading) return null
  if (dismissed) return null

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
