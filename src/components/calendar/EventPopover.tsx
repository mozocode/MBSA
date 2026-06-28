import { X } from 'lucide-react'
import { EVENT_TYPE_LABELS } from '../../lib/eventColors'
import { downloadIcs, formatEventDateTime, googleCalendarUrl } from '../../lib/calendarUtils'
import type { SiteEvent } from '../../lib/types'
import { GoldButton } from '../ui/GoldButton'

interface EventPopoverProps {
  event: SiteEvent
  onClose: () => void
}

export function EventPopover({ event, onClose }: EventPopoverProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-popover-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy/70"
        aria-label="Close event details"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-sm shadow-xl max-w-md w-full p-6 z-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-navy/60 hover:text-navy focus-ring rounded"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <span
          className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase mb-3"
          style={{ backgroundColor: `${event.color}30`, color: event.color }}
        >
          {EVENT_TYPE_LABELS[event.type]}
        </span>

        <h2 id="event-popover-title" className="font-display font-bold text-2xl text-navy uppercase pr-8">
          {event.title}
        </h2>

        <p className="text-sm text-navy/70 mt-2">{formatEventDateTime(event)}</p>

        {event.location && (
          <p className="text-sm text-navy mt-3">
            <span className="font-semibold">Location:</span> {event.location}
          </p>
        )}

        {event.description && (
          <p className="text-sm text-navy/80 mt-3 leading-relaxed whitespace-pre-wrap">
            {event.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {event.registrationUrl && (
            <GoldButton href={event.registrationUrl} className="flex-1 text-center">
              Register
            </GoldButton>
          )}
          <a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2.5 border-2 border-navy text-navy font-display font-bold uppercase text-sm rounded-sm hover:bg-navy hover:text-white transition-colors"
          >
            Add to Google Calendar
          </a>
        </div>

        <button
          type="button"
          onClick={() => downloadIcs(event)}
          className="w-full mt-3 text-sm font-semibold text-navy/70 hover:text-gold transition-colors underline"
        >
          Download .ics file
        </button>
      </div>
    </div>
  )
}
