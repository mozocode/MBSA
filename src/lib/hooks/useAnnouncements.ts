import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import type { Announcement, FirestoreHookState } from '../types'

export function useAnnouncements(): FirestoreHookState<Announcement[]> {
  const [state, setState] = useState<FirestoreHookState<Announcement[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const q = query(
      collection(db, 'announcements'),
      where('active', '==', true),
      orderBy('createdAt', 'desc'),
      limit(3),
    )
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setState({
          data: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Announcement),
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
