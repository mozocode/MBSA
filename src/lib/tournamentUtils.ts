import type { Timestamp } from 'firebase/firestore'
import type { Tournament } from './types'

function toJsDate(value: Timestamp | { seconds: number; nanoseconds?: number }): Date {
  if (value && typeof (value as Timestamp).toDate === 'function') {
    return (value as Timestamp).toDate()
  }
  const seconds = (value as { seconds: number }).seconds
  return new Date(seconds * 1000)
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/** True when the tournament end date is today or in the future. */
export function isUpcomingTournament(tournament: Tournament, now = new Date()): boolean {
  const end = startOfDay(toJsDate(tournament.dateEnd))
  return end >= startOfDay(now)
}

/** Nearest upcoming tournaments by start date, capped at `limit`. */
export function getClosestUpcomingTournaments(
  tournaments: Tournament[],
  limit = 3,
  now = new Date(),
): Tournament[] {
  return tournaments
    .filter((t) => isUpcomingTournament(t, now))
    .sort(
      (a, b) => toJsDate(a.dateStart).getTime() - toJsDate(b.dateStart).getTime(),
    )
    .slice(0, limit)
}
