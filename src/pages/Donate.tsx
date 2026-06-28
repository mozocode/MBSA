import { Navigate } from 'react-router-dom'

/** Redirect legacy /donate path to the donation product registration page. */
export function Donate() {
  return <Navigate to="/register/donate" replace />
}
