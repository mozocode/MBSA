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
import type { GalleryPhoto } from '../types'

const COLLECTION = 'gallery'

export async function listGalleryPhotos(): Promise<GalleryPhoto[]> {
  const snap = await getDocs(query(collection(db, COLLECTION), orderBy('order')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryPhoto)
}

export async function createGalleryPhoto(
  input: Omit<GalleryPhoto, 'id'>,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), input)
  return ref.id
}

export async function updateGalleryPhoto(
  id: string,
  input: Partial<Omit<GalleryPhoto, 'id'>>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), input)
}

export async function deleteGalleryPhoto(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function reorderGalleryPhotos(ordered: GalleryPhoto[]): Promise<void> {
  const batch = writeBatch(db)
  ordered.forEach((photo, i) => {
    batch.update(doc(db, COLLECTION, photo.id), { order: i })
  })
  await batch.commit()
}
