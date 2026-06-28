import { useEffect, useState } from 'react'
import { getInstagramFeed, type InstagramPost } from '../instagram'
import type { FirestoreHookState } from '../types'

export function useInstagramFeed(limit = 8): FirestoreHookState<InstagramPost[]> {
  const [state, setState] = useState<FirestoreHookState<InstagramPost[]>>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      try {
        const posts = await getInstagramFeed(limit)
        if (!cancelled) {
          setState({ data: posts, loading: false, error: null })
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load Instagram feed',
          })
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [limit])

  return state
}
