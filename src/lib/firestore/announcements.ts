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
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Announcement, AnnouncementPageScope } from '../types'

const COLLECTION = 'announcements'

export async function listAnnouncements(): Promise<Announcement[]> {
  const snap = await getDocs(
    query(collection(db, COLLECTION), orderBy('createdAt', 'desc')),
  )
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Announcement)
}

export async function createAnnouncement(input: {
  text: string
  link?: string
  active: boolean
  pages?: AnnouncementPageScope
}): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...input,
    pages: input.pages ?? 'all',
    createdAt: Timestamp.now(),
  })
  return ref.id
}

export async function updateAnnouncement(
  id: string,
  input: Partial<{
    text: string
    link?: string
    active: boolean
    pages: AnnouncementPageScope
  }>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), input)
}

export async function deleteAnnouncement(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}
