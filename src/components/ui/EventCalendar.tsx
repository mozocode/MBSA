import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CalendarEvent } from '../../lib/calendarEvents'
import { CalendarEventModal } from './CalendarEventModal'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const EVENT_LIMIT = 3

interface EventCalendarProps {
  events: CalendarEvent[]
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function eventDateKey(iso: string) {
  return iso.slice(0, 10)
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildCalendarDays(month: Date) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const startOffset = firstDay.getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const cells: Array<{ day: number; inMonth: boolean; date: Date }> = []

  for (let i = 0; i < startOffset; i += 1) {
    const date = new Date(year, monthIndex, i - startOffset + 1)
    cells.push({ day: date.getDate(), inMonth: false, date })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, inMonth: true, date: new Date(year, monthIndex, day) })
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date
    const date = new Date(last)
    date.setDate(date.getDate() + 1)
    cells.push({ day: date.getDate(), inMonth: false, date })
  }

  return cells
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const today = useMemo(() => new Date(), [])

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const event of events) {
      const key = eventDateKey(event.start)
      const existing = map.get(key) ?? []
      existing.push(event)
      map.set(key, existing)
    }
    return map
  }, [events])

  const calendarDays = useMemo(() => buildCalendarDays(currentMonth), [currentMonth])
  const monthLabel = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const shiftMonth = (delta: number) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1))
  }

  return (
    <>
      <div className="bg-white rounded-sm border border-[#CFCFDA] overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[#CFCFDA] bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-sm text-navy hover:bg-gold hover:text-navy transition-colors focus-ring"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="w-9 h-9 flex items-center justify-center rounded-sm text-navy hover:bg-gold hover:text-navy transition-colors focus-ring"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date())}
              className="px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-navy border border-[#CFCFDA] rounded-sm hover:bg-gold hover:border-gold transition-colors focus-ring"
            >
              Today
            </button>
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-navy uppercase">{monthLabel}</h3>
        </div>

        <div className="grid grid-cols-7 border-b border-[#CFCFDA] bg-[#f1edf8]">
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday}
              className="py-2 text-center text-xs font-bold uppercase tracking-wide text-navy/70 border-r border-[#CFCFDA] last:border-r-0"
            >
              {weekday}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map(({ day, inMonth, date }) => {
            const key = dateKey(date.getFullYear(), date.getMonth(), date.getDate())
            const dayEvents = eventsByDate.get(key) ?? []
            const visibleEvents = dayEvents.slice(0, EVENT_LIMIT)
            const hiddenCount = dayEvents.length - visibleEvents.length
            const isToday = isSameDay(date, today)

            return (
              <div
                key={key}
                className={`min-h-[100px] md:min-h-[120px] p-1 border-r border-b border-[#CFCFDA] last:border-r-0 ${
                  inMonth ? 'bg-white' : 'bg-gray-50/80'
                }`}
              >
                <div className="text-center mb-1">
                  <span
                    className={`inline-flex w-7 h-7 items-center justify-center text-sm font-semibold rounded-full ${
                      isToday && inMonth ? 'text-blue-700' : inMonth ? 'text-navy' : 'text-navy/30'
                    }`}
                  >
                    {day}
                  </span>
                </div>

                <div className="space-y-0.5">
                  {visibleEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="w-full text-left px-1.5 py-0.5 text-[10px] md:text-xs leading-tight bg-[#F6F6F6] text-navy rounded-sm hover:bg-gold/30 transition-colors focus-ring truncate"
                      title={event.title}
                    >
                      {event.title}
                    </button>
                  ))}
                  {hiddenCount > 0 && (
                    <p className="text-[10px] text-navy/60 px-1">+{hiddenCount} more</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedEvent && (
        <CalendarEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  )
}
