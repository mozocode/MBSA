import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import type { FirestoreHookState, Tournament } from '../types'

export function useTournaments(): FirestoreHookState<Tournament[]> {
  const [state, setState] = useState<FirestoreHookState<Tournament[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const q = query(collection(db, 'tournaments'), orderBy('order'))
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setState({
          data: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Tournament),
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
