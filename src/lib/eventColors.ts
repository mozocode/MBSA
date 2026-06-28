import type { EventType } from './types'

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  tournament: '#F4C430',
  registration: '#22C55E',
  tryout: '#3B82F6',
  meeting: '#8B5CF6',
  practice: '#F97316',
  other: '#6B7280',
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  tournament: 'Tournament',
  registration: 'Registration',
  tryout: 'Tryout',
  meeting: 'Meeting',
  practice: 'Practice',
  other: 'Other',
}

export function colorForType(type: EventType): string {
  return EVENT_TYPE_COLORS[type]
}

export const ALL_EVENT_TYPES = Object.keys(EVENT_TYPE_COLORS) as EventType[]
