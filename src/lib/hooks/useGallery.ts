import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import type { FirestoreHookState, GalleryPhoto } from '../types'

export function useGallery(): FirestoreHookState<GalleryPhoto[]> {
  const [state, setState] = useState<FirestoreHookState<GalleryPhoto[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const q = query(
      collection(db, 'gallery'),
      where('active', '==', true),
      orderBy('order'),
    )
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setState({
          data: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryPhoto),
          loading: false,
          error: null,
        })
      },
      (err) => {
        setState({ data: [], loading: false, error: err.message })
      },
    )
    return unsubscribe
  }, [])

  return state
}
