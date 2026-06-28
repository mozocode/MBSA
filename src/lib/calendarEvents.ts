export interface ClinicCalendarEvent {
  id: number
  title: string
  start: string
  end: string
  description?: string
}

/** @deprecated Use ClinicCalendarEvent — kept for clinic/get-involved calendars */
export type CalendarEvent = ClinicCalendarEvent
