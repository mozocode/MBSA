import { Timestamp } from 'firebase/firestore'
import { colorForType } from './eventColors'
import { formatPrice, tournamentRegisterPath } from './productUtils'
import type { SiteEvent, Tournament } from './types'

export interface ClinicCalendarEvent {
  id: number
  title: string
  start: string
  end: string
  description?: string
}

/** @deprecated Use ClinicCalendarEvent — kept for clinic/get-involved calendars */
export type CalendarEvent = ClinicCalendarEvent

export const TOURNAMENT_EVENT_ID_PREFIX = 'tournament-'

export function isTournamentDerivedEvent(event: Pick<SiteEvent, 'id'>): boolean {
  return event.id.startsWith(TOURNAMENT_EVENT_ID_PREFIX)
}

function tournamentMatchesEvent(event: SiteEvent, tournament: Tournament): boolean {
  if (event.type !== 'tournament') return false
  const registerPath = tournamentRegisterPath(tournament)
  if (
    event.registrationUrl &&
    (event.registrationUrl === registerPath || event.registrationUrl.includes(registerPath))
  ) {
    return true
  }
  return event.title.trim().toLowerCase() === tournament.name.trim().toLowerCase()
}

export function tournamentToSiteEvent(tournament: Tournament): SiteEvent {
  const now = Timestamp.now()
  return {
    id: `${TOURNAMENT_EVENT_ID_PREFIX}${tournament.id}`,
    title: tournament.name,
    type: 'tournament',
    startDate: tournament.dateStart,
    endDate: tournament.dateEnd,
    allDay: true,
    description: `${tournament.sport} · ${tournament.ages} · ${tournament.level} · ${formatPrice(tournament.price)}`,
    registrationUrl: tournamentRegisterPath(tournament),
    color: colorForType('tournament'),
    active: tournament.status !== 'closed',
    createdAt: now,
    updatedAt: now,
  }
}

/** Merge Firestore events with tournaments not already represented as calendar events. */
export function mergeTournamentsIntoEvents(
  events: SiteEvent[],
  tournaments: Tournament[],
): SiteEvent[] {
  const derived = tournaments
    .filter((t) => !events.some((e) => tournamentMatchesEvent(e, t)))
    .map(tournamentToSiteEvent)

  return [...events, ...derived].sort(
    (a, b) => a.startDate.toDate().getTime() - b.startDate.toDate().getTime(),
  )
}

export function toFullCalendarEvent(event: SiteEvent, { dimInactive = false } = {}) {
  return {
    id: event.id,
    title: event.title,
    start: event.startDate.toDate(),
    end: event.endDate.toDate(),
    allDay: event.allDay,
    backgroundColor: dimInactive && !event.active ? `${event.color}66` : event.color,
    borderColor: event.color,
    extendedProps: event,
  }
}
