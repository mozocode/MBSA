import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
  type QueryConstraint,
} from 'firebase/firestore'
import { startOfMonth } from 'date-fns'
import { db } from '../firebase'
import { colorForType } from '../eventColors'
import type { EventType, SiteEvent, SiteEventInput } from '../types'

const COLLECTION = 'events'

function docToEvent(id: string, data: Record<string, unknown>): SiteEvent {
  return { id, ...data } as SiteEvent
}

export async function listEvents(constraints: QueryConstraint[] = []): Promise<SiteEvent[]> {
  const q = query(collection(db, COLLECTION), ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map((d) => docToEvent(d.id, d.data()))
}

export async function listActiveEventsFromMonth(month: Date = new Date()): Promise<SiteEvent[]> {
  return listEvents([
    where('active', '==', true),
    where('startDate', '>=', Timestamp.fromDate(startOfMonth(month))),
    orderBy('startDate', 'asc'),
  ])
}

export async function listAllEvents(): Promise<SiteEvent[]> {
  return listEvents([orderBy('startDate', 'asc')])
}

export async function createEvent(
  input: Omit<SiteEventInput, 'color' | 'createdAt' | 'updatedAt'> & {
    color?: string
  },
): Promise<string> {
  const now = Timestamp.now()
  const ref = await addDoc(collection(db, COLLECTION), {
    ...input,
    color: input.color ?? colorForType(input.type),
    createdAt: now,
    updatedAt: now,
  })
  return ref.id
}

export async function updateEvent(
  id: string,
  input: Partial<Omit<SiteEventInput, 'createdAt' | 'updatedAt'>> & { type?: EventType },
): Promise<void> {
  const payload: Record<string, unknown> = { ...input, updatedAt: Timestamp.now() }
  if (input.type && !input.color) {
    payload.color = colorForType(input.type)
  }
  await updateDoc(doc(db, COLLECTION, id), payload)
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function toggleEventActive(id: string, active: boolean): Promise<void> {
  await updateEvent(id, { active })
}
