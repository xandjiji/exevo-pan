import { routes } from 'Constants'

export const isHistory = (): boolean => {
  if (typeof window === 'undefined') return false

  if (window.location.pathname === routes.BAZAAR_HISTORY) return true
  return false
}
