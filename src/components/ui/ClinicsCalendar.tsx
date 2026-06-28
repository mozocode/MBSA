import { clinicEvents } from '../../lib/clinicEvents'
import { EventCalendar } from './EventCalendar'

export function ClinicsCalendar() {
  return <EventCalendar events={clinicEvents} />
}
