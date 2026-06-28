import { format } from 'date-fns'
import type { SiteEvent } from './types'

function toGoogleDate(date: Date, allDay: boolean): string {
  if (allDay) return format(date, 'yyyyMMdd')
  return format(date, "yyyyMMdd'T'HHmmss")
}

export function googleCalendarUrl(event: SiteEvent): string {
  const start = event.startDate.toDate()
  const end = event.endDate.toDate()
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toGoogleDate(start, event.allDay)}/${toGoogleDate(end, event.allDay)}`,
  })
  if (event.description) params.set('details', event.description)
  if (event.location) params.set('location', event.location)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadIcs(event: SiteEvent): void {
  const start = event.startDate.toDate()
  const end = event.endDate.toDate()
  const dtStamp = format(new Date(), "yyyyMMdd'T'HHmmss'Z'")
  const dtStart = toGoogleDate(start, event.allDay)
  const dtEnd = toGoogleDate(end, event.allDay)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MBSA Gators//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@mbsagators.com`,
    `DTSTAMP:${dtStamp}`,
    event.allDay ? `DTSTART;VALUE=DATE:${dtStart}` : `DTSTART:${dtStart}`,
    event.allDay ? `DTEND;VALUE=DATE:${dtEnd}` : `DTEND:${dtEnd}`,
    `SUMMARY:${event.title.replace(/[,;\\]/g, '')}`,
  ]
  if (event.description) lines.push(`DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`)
  if (event.location) lines.push(`LOCATION:${event.location}`)
  if (event.registrationUrl) lines.push(`URL:${event.registrationUrl}`)
  lines.push('END:VEVENT', 'END:VCALENDAR')

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export function formatEventDateTime(event: SiteEvent): string {
  const start = event.startDate.toDate()
  const end = event.endDate.toDate()
  if (event.allDay) {
    return start.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }
  return `${start.toLocaleString()} – ${end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
}
