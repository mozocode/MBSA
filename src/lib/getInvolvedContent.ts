export const GET_INVOLVED_HERO =
  '/media/2024/01/IMG_8377.jpeg'

export const GET_INVOLVED_INTRO =
  'Want to be a part of something special? We\u2019re always looking for great people to help make the best youth sports organization in Western PA ever better. Volunteer today!'

export { STACK_SPORTS_SIGN_IN_URL as GET_INVOLVED_REGISTER_URL } from './portalUrls'
export { PRACTICE_CALENDAR_EMBED } from './practiceScheduleContent'

export interface VolunteerLink {
  label: string
  href?: string
  to?: string
}

export const volunteerLinks: VolunteerLink[] = [
  { label: 'Coaching', to: '/coaches' },
  { label: 'Leadership', to: '/executive-board' },
  { label: 'Business Operations' },
  { label: 'FAQ', to: '/faq' },
]

export const getInvolvedTabs = [
  { id: 'faq', label: 'FAQ' },
  { id: 'schedule', label: 'Schedule of Events' },
  { id: 'practice', label: 'MBSA Practice Schedule' },
] as const

export type GetInvolvedTabId = (typeof getInvolvedTabs)[number]['id']
