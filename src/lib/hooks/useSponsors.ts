import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import type { FirestoreHookState, Sponsor } from '../types'

const tierOrder: Record<Sponsor['tier'], number> = {
  gold: 0,
  silver: 1,
  bronze: 2,
}

export function useSponsors(): FirestoreHookState<Sponsor[]> {
  const [state, setState] = useState<FirestoreHookState<Sponsor[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const q = query(collection(db, 'sponsors'), orderBy('order'))
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const sponsors = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Sponsor)
        sponsors.sort((a, b) => {
          const tierDiff = tierOrder[a.tier] - tierOrder[b.tier]
          return tierDiff !== 0 ? tierDiff : a.order - b.order
        })
        setState({ data: sponsors, loading: false, error: null })
      },
      (err) => {
        setState({ data: [], loading: false, error: err.message })
      },
    )
    return unsubscribe
  }, [])

  return state
}
