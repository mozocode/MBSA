import type { Timestamp } from 'firebase/firestore'

export interface Tournament {
  id: string
  name: string
  shortName: string
  dateStart: Timestamp
  dateEnd: Timestamp
  dateLabel: string
  sport: string
  ages: string
  level: string
  price: number
  artworkUrl: string
  registrationUrl: string
  status: 'open' | 'closed' | 'upcoming'
  order: number
}

export interface Announcement {
  id: string
  text: string
  link?: string
  active: boolean
  createdAt: Timestamp
}

export interface Sponsor {
  id: string
  name: string
  logoUrl: string
  websiteUrl?: string
  tier: 'gold' | 'silver' | 'bronze'
  order: number
}

export interface GalleryPhoto {
  id: string
  imageUrl: string
  caption?: string
  instagramUrl?: string
  order: number
  active: boolean
}

export interface HomePageContent {
  heroHeadline: string
  heroHeadlineAccent: string
  heroSubline: string
  heroSubtext: string
  missionTitle: string
  missionBody: string
  missionEmail: string
  videoUrl?: string
  statsBar: Array<{ label: string; value: string }>
}

export interface FirestoreHookState<T> {
  data: T
  loading: boolean
  error: string | null
}

export type EventType =
  | 'tournament'
  | 'registration'
  | 'tryout'
  | 'meeting'
  | 'practice'
  | 'other'

export interface SiteEvent {
  id: string
  title: string
  type: EventType
  startDate: Timestamp
  endDate: Timestamp
  allDay: boolean
  location?: string
  description?: string
  registrationUrl?: string
  color: string
  active: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type SiteEventInput = Omit<SiteEvent, 'id' | 'createdAt' | 'updatedAt'>
