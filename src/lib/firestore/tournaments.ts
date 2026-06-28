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
import type { Tournament } from '../types'

const COLLECTION = 'tournaments'

export async function listTournaments(): Promise<Tournament[]> {
  const snap = await getDocs(query(collection(db, COLLECTION), orderBy('order')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Tournament)
}

export async function createTournament(
  input: Omit<Tournament, 'id'>,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), input)
  return ref.id
}

export async function updateTournament(
  id: string,
  input: Partial<Omit<Tournament, 'id'>>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), input)
}

export async function deleteTournament(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function reorderTournaments(ordered: Tournament[]): Promise<void> {
  const batch = writeBatch(db)
  ordered.forEach((t, i) => {
    batch.update(doc(db, COLLECTION, t.id), { order: i })
  })
  await batch.commit()
}
