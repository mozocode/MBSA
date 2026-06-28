import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { ClinicEvent } from '../../lib/clinicEvents'

interface ClinicEventModalProps {
  event: ClinicEvent
  onClose: () => void
}

function formatEventTime(iso: string) {
  const date = new Date(iso)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function ClinicEventModal({ event, onClose }: ClinicEventModalProps) {
  useEffect(() => {
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clinic-event-title"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-sm max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center text-navy hover:text-gold transition-colors focus-ring rounded-full"
          aria-label="Close event details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 border-b border-[#CFCFDA]">
          <h3 id="clinic-event-title" className="font-display font-bold text-xl md:text-2xl text-navy uppercase pr-10">
            {event.title}
          </h3>
          <p className="mt-2 text-sm text-navy/70">
            {formatEventTime(event.start)} – {formatEventTime(event.end)}
          </p>
        </div>

        {event.description ? (
          <div
            className="clinic-event-content p-6 md:p-8 text-navy/80 text-sm leading-relaxed [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_img]:my-4 [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-navy [&_h3]:mt-4 [&_h5]:font-semibold [&_h5]:text-navy [&_h5]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-navy [&_a]:underline [&_a]:decoration-gold/60 hover:[&_a]:text-gold"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        ) : (
          <p className="p-6 md:p-8 text-navy/70">No additional details for this clinic.</p>
        )}
      </div>
    </div>
  )
}
