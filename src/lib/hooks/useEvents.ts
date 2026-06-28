import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import type { FirestoreHookState, SiteEvent } from '../types'

export function useEvents(activeOnly = true): FirestoreHookState<SiteEvent[]> {
  const [state, setState] = useState<FirestoreHookState<SiteEvent[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const constraints = activeOnly
      ? [where('active', '==', true), orderBy('startDate', 'asc')]
      : [orderBy('startDate', 'asc')]

    const q = query(collection(db, 'events'), ...constraints)
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setState({
          data: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as SiteEvent),
          loading: false,
          error: null,
        })
      },
      (err) => setState({ data: [], loading: false, error: err.message }),
    )
    return unsubscribe
  }, [activeOnly])

  return state
}
