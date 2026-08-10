import { Navigate } from 'react-router-dom'
import { readProfile } from '../lib/profileStorage'

export function RootRedirect() {
  return (
    <Navigate to={readProfile() ? '/today' : '/onboarding'} replace />
  )
}
