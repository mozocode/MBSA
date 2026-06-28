import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Product } from '../types'

const COLLECTION = 'products'

function normalizeProduct(id: string, data: Record<string, unknown>): Product {
  const p = { id, ...data } as Product
  p.registrationFields = p.registrationFields ?? []
  p.active = p.active ?? true
  p.order = p.order ?? 0
  return p
}

export async function listProducts(): Promise<Product[]> {
  const snap = await getDocs(query(collection(db, COLLECTION), orderBy('order')))
  return snap.docs.map((d) => normalizeProduct(d.id, d.data()))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const snap = await getDocs(
    query(collection(db, COLLECTION), where('slug', '==', slug), limit(1)),
  )
  if (snap.empty) return null
  const d = snap.docs[0]
  return normalizeProduct(d.id, d.data())
}

export async function createProduct(input: Omit<Product, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), input)
  return ref.id
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<Product, 'id'>>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), input)
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id))
}
