import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { Timestamp } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary'
import { AdminToggle } from '../../components/admin/AdminToggle'
import {
  EventForm,
  formValuesToEventInput,
  type EventFormValues,
} from '../../components/admin/EventForm'
import { SlideOver } from '../../components/admin/SlideOver'
import {
  isTournamentDerivedEvent,
  mergeTournamentsIntoEvents,
  toFullCalendarEvent,
} from '../../lib/calendarEvents'
import { ALL_EVENT_TYPES, EVENT_TYPE_LABELS } from '../../lib/eventColors'
import {
  createEvent,
  deleteEvent,
  toggleEventActive,
  updateEvent,
} from '../../lib/firestore/events'
import { useEvents } from '../../lib/hooks/useEvents'
import { useTournaments } from '../../lib/hooks/useTournaments'
import type { EventType, SiteEvent } from '../../lib/types'

type ViewMode = 'list' | 'calendar'

export function EventsAdmin() {
  const navigate = useNavigate()
  const { data: events, loading: eventsLoading } = useEvents(false)
  const { data: tournaments, loading: tournamentsLoading } = useTournaments()
  const loading = eventsLoading || tournamentsLoading
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all')
  const [panelOpen, setPanelOpen] = useState(false)
  const [editing, setEditing] = useState<SiteEvent | null>(null)
  const [defaultStart, setDefaultStart] = useState<Date | undefined>()

  const merged = useMemo(
    () => mergeTournamentsIntoEvents(events, tournaments),
    [events, tournaments],
  )

  const filtered = useMemo(
    () => (typeFilter === 'all' ? merged : merged.filter((e) => e.type === typeFilter)),
    [merged, typeFilter],
  )

  const calendarEvents = useMemo(
    () => filtered.map((e) => toFullCalendarEvent(e, { dimInactive: true })),
    [filtered],
  )

  const openCreate = (start?: Date) => {
    setEditing(null)
    setDefaultStart(start)
    setPanelOpen(true)
  }

  const openEdit = (event: SiteEvent) => {
    setEditing(event)
    setDefaultStart(undefined)
    setPanelOpen(true)
  }

  const handleSubmit = async (values: EventFormValues) => {
    const input = formValuesToEventInput(values)
    if (editing) {
      await updateEvent(editing.id, {
        ...input,
        startDate: Timestamp.fromDate(input.startDate),
        endDate: Timestamp.fromDate(input.endDate),
      })
    } else {
      await createEvent({
        ...input,
        startDate: Timestamp.fromDate(input.startDate),
        endDate: Timestamp.fromDate(input.endDate),
      })
    }
    setPanelOpen(false)
  }

  const handleToggle = async (event: SiteEvent, active: boolean) => {
    try {
      await toggleEventActive(event.id, active)
    } catch {
      /* snapshot will revert */
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return
    await deleteEvent(id)
  }

  return (
    <AdminErrorBoundary title="Events error">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-sm ${
                viewMode === 'list' ? 'bg-navy text-white' : 'bg-white border border-gray-200'
              }`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-sm ${
                viewMode === 'calendar' ? 'bg-navy text-white' : 'bg-white border border-gray-200'
              }`}
            >
              Calendar
            </button>
          </div>
          <button
            type="button"
            onClick={() => openCreate()}
            className="px-4 py-2 bg-gold text-navy font-display font-bold uppercase text-sm rounded-sm"
          >
            Add event
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
              typeFilter === 'all' ? 'bg-gold border-gold text-navy' : 'border-gray-200'
            }`}
          >
            All
          </button>
          {ALL_EVENT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
                typeFilter === type ? 'bg-gold border-gold text-navy' : 'border-gray-200'
              }`}
            >
              {EVENT_TYPE_LABELS[type]}
            </button>
          ))}
        </div>

        {viewMode === 'list' && (
          <>
            <div className="bg-white rounded-sm border border-gray-200 overflow-x-auto shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Start</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Active</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-gray-500">
                        Loading…
                      </td>
                    </tr>
                  ) : (
                    filtered.map((event) => {
                      const fromTournament = isTournamentDerivedEvent(event)

                      return (
                      <tr key={event.id} className={!event.active ? 'opacity-60' : ''}>
                        <td className="px-4 py-3 font-medium text-navy">
                          {event.title}
                          {fromTournament && (
                            <span className="block text-[10px] font-normal text-gray-400 uppercase tracking-wide">
                              From tournaments
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-xs font-bold text-navy"
                            style={{ backgroundColor: `${event.color}40` }}
                          >
                            {event.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {event.startDate.toDate().toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-gray-500">{event.location ?? '—'}</td>
                        <td className="px-4 py-3">
                          {fromTournament ? (
                            <span className="text-xs text-gray-500">
                              {event.active ? 'Active' : 'Closed'}
                            </span>
                          ) : (
                            <AdminToggle
                              checked={event.active}
                              onChange={(v) => handleToggle(event, v)}
                              label={`Toggle ${event.title}`}
                            />
                          )}
                        </td>
                        <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                          {fromTournament ? (
                            <Link
                              to="/admin/tournaments"
                              className="text-navy font-semibold text-xs hover:underline"
                            >
                              Manage
                            </Link>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => openEdit(event)}
                                className="text-navy font-semibold text-xs hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(event.id)}
                                className="text-red-600 font-semibold text-xs hover:underline"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {viewMode === 'calendar' && (
          <div className="bg-white rounded-sm border border-gray-200 p-4 shadow-sm fc-mbsa">
            <FullCalendar
              plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              eventClick={({ event }) => {
                const siteEvent = event.extendedProps as SiteEvent
                if (isTournamentDerivedEvent(siteEvent)) {
                  navigate('/admin/tournaments')
                  return
                }
                openEdit(siteEvent)
              }}
              dateClick={({ date }) => openCreate(date)}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listWeek',
              }}
              height="auto"
            />
          </div>
        )}
      </div>

      <SlideOver
        open={panelOpen}
        title={editing ? 'Edit event' : 'Add event'}
        onClose={() => setPanelOpen(false)}
      >
        <EventForm
          key={editing?.id ?? defaultStart?.toISOString() ?? 'new'}
          initial={editing}
          defaultStart={defaultStart}
          onSubmit={handleSubmit}
          onCancel={() => setPanelOpen(false)}
        />
      </SlideOver>
    </AdminErrorBoundary>
  )
}
