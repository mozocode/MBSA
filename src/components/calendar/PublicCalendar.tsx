import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useMemo, useState } from 'react'
import { mergeTournamentsIntoEvents, toFullCalendarEvent } from '../../lib/calendarEvents'
import { ALL_EVENT_TYPES, EVENT_TYPE_LABELS } from '../../lib/eventColors'
import { useEvents } from '../../lib/hooks/useEvents'
import { useTournaments } from '../../lib/hooks/useTournaments'
import type { EventType, SiteEvent } from '../../lib/types'
import { EventPopover } from './EventPopover'

export function PublicCalendar() {
  const { data: events, loading: eventsLoading, error } = useEvents(true)
  const { data: tournaments, loading: tournamentsLoading } = useTournaments()
  const loading = eventsLoading || tournamentsLoading
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all')
  const [selectedEvent, setSelectedEvent] = useState<SiteEvent | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const merged = useMemo(
    () => mergeTournamentsIntoEvents(events, tournaments),
    [events, tournaments],
  )

  const filtered = useMemo(
    () => (typeFilter === 'all' ? merged : merged.filter((e) => e.type === typeFilter)),
    [merged, typeFilter],
  )

  const calendarEvents = useMemo(
    () => filtered.map((e) => toFullCalendarEvent(e)),
    [filtered],
  )

  if (loading) {
    return (
      <div className="bg-white rounded-sm border border-[#CFCFDA] p-12 text-center text-navy/60">
        Loading events…
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-sm border border-red-200 p-8 text-center text-red-700">
        Unable to load events: {error}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTypeFilter('all')}
          className={`px-3 py-1.5 text-xs font-display font-bold uppercase rounded-full border transition-colors ${
            typeFilter === 'all'
              ? 'bg-gold border-gold text-navy'
              : 'bg-white border-navy/20 text-navy hover:border-gold'
          }`}
        >
          All
        </button>
        {ALL_EVENT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTypeFilter(type)}
            className={`px-3 py-1.5 text-xs font-display font-bold uppercase rounded-full border transition-colors ${
              typeFilter === type
                ? 'bg-gold border-gold text-navy'
                : 'bg-white border-navy/20 text-navy hover:border-gold'
            }`}
          >
            {EVENT_TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-sm border border-[#CFCFDA] p-4 shadow-sm fc-mbsa">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView={isMobile ? 'listWeek' : 'dayGridMonth'}
          events={calendarEvents}
          eventClick={({ event }) => setSelectedEvent(event.extendedProps as SiteEvent)}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listWeek',
          }}
          height="auto"
          noEventsContent="No upcoming events scheduled."
        />
      </div>

      {selectedEvent && (
        <EventPopover event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  )
}
