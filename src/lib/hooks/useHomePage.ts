import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { defaultHomePageContent } from '../defaults'
import { db } from '../firebase'
import type { FirestoreHookState, HomePageContent } from '../types'

export function useHomePage(): FirestoreHookState<HomePageContent> {
  const [state, setState] = useState<FirestoreHookState<HomePageContent>>({
    data: defaultHomePageContent,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const ref = doc(db, 'pages', 'home')
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setState({
            data: { ...defaultHomePageContent, ...snap.data() } as HomePageContent,
            loading: false,
            error: null,
          })
        } else {
          setState({ data: defaultHomePageContent, loading: false, error: null })
        }
      },
      (err) => {
        setState({ data: defaultHomePageContent, loading: false, error: err.message })
      },
    )
    return unsubscribe
  }, [])

  return state
}
