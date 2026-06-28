import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../../lib/hooks/useAdminAuth'
import { FullPageSpinner } from './FullPageSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAdmin, loading } = useAdminAuth()

  if (loading) return <FullPageSpinner />
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}
