import type { Timestamp } from 'firebase/firestore'

export type RegistrationFieldType = 'text' | 'textarea' | 'select' | 'phone' | 'email'

export interface RegistrationField {
  id: string
  label: string
  type: RegistrationFieldType
  required: boolean
  options?: string[]
  order: number
}

export interface Tournament {
  id: string
  name: string
  shortName: string
  slug: string
  dateStart: Timestamp
  dateEnd: Timestamp
  dateLabel: string
  sport: string
  ages: string
  level: string
  price: number
  artworkUrl: string
  /** @deprecated Use slug + /register/:slug */
  registrationUrl?: string
  registrationFields: RegistrationField[]
  paymentRequired: boolean
  status: 'open' | 'closed' | 'upcoming'
  order: number
}

export type ProductType = 'tournament' | 'donation' | 'registration' | 'other'

export interface Product {
  id: string
  slug: string
  name: string
  description?: string
  price: number
  /** When true, buyer enters custom amount (donations) */
  allowCustomAmount?: boolean
  type: ProductType
  registrationFields: RegistrationField[]
  active: boolean
  artworkUrl?: string
  order: number
}

export interface OrderRecord {
  id: string
  productType: ProductType
  productId: string
  productSlug: string
  productName: string
  amount: number
  fieldResponses: Record<string, string>
  payerEmail?: string
  payerName?: string
  transactionId?: string
  status: 'pending' | 'paid' | 'failed'
  createdAt: Timestamp
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
