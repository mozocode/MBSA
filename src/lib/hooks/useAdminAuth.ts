import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import { auth } from '../firebase'

interface AdminAuthState {
  user: User | null
  isAdmin: boolean
  loading: boolean
  error: string | null
}

export function useAdminAuth(): AdminAuthState & { signOutAdmin: () => Promise<void> } {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false, error: null })
        return
      }
      try {
        const token = await user.getIdTokenResult(true)
        setState({
          user,
          isAdmin: token.claims.admin === true,
          loading: false,
          error: null,
        })
      } catch (err) {
        setState({
          user,
          isAdmin: false,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to verify admin status',
        })
      }
    })
    return unsubscribe
  }, [])

  const signOutAdmin = useCallback(async () => {
    await signOut(auth)
  }, [])

  return { ...state, signOutAdmin }
}
