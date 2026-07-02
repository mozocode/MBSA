import type { CalendarEvent } from './calendarEvents'

export type ClinicEvent = CalendarEvent

export const CLINICS_HERO =
  '/media/2024/01/Clinics.jpg'

export const CLINICS_INTRO_HEADING = 'MBSA Sponsored Clinics'

export const CLINICS_INTRO_TEXT =
  'View our current clinic flyers below. Check back for additional baseball clinic information as it becomes available.'

/** Softball clinic flyer — replace when an updated flyer is provided. */
export const CLINICS_SOFTBALL_FLYER = '/media/2024/03/Screenshot-2024-03-05-at-12.38.48\u202fPM.png'

/** @deprecated Calendar removed from clinics page; kept for legacy references. */
export const clinicEvents: ClinicEvent[] = []
