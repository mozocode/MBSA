import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Sponsor } from '../types'

const COLLECTION = 'sponsors'

export async function listSponsors(): Promise<Sponsor[]> {
  const snap = await getDocs(query(collection(db, COLLECTION), orderBy('order')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Sponsor)
}

export async function createSponsor(input: Omit<Sponsor, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), input)
  return ref.id
}

export async function updateSponsor(
  id: string,
  input: Partial<Omit<Sponsor, 'id'>>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), input)
}

export async function deleteSponsor(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function reorderSponsors(ordered: Sponsor[]): Promise<void> {
  const batch = writeBatch(db)
  ordered.forEach((sponsor, i) => {
    batch.update(doc(db, COLLECTION, sponsor.id), { order: i })
  })
  await batch.commit()
}
