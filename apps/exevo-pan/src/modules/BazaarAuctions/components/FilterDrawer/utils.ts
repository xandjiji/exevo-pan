import { isServer } from 'utils'
import { routes } from 'Constants'

export const isHistory = (): boolean => {
  if (isServer()) return false

  if (window.location.pathname.includes(routes.BAZAAR_HISTORY)) return true
  return false
}
