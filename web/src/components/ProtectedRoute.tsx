import { Navigate, Outlet } from 'react-router-dom'
import { readProfile } from '../lib/profileStorage'

export function ProtectedRoute() {
  const profile = readProfile()
  if (!profile) {
    return <Navigate to="/onboarding" replace />
  }
  return <Outlet />
}
