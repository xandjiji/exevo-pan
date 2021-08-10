import { BazaarAuctions, Statistics, ErrorPage } from 'modules'
import { routes } from 'Constants'

export default [
  {
    key: 'Bazaar Auctions',
    path: [routes.HOME, routes.BAZAAR_HISTORY],
    exact: true,
    component: BazaarAuctions,
  },
  {
    key: 'Statistics',
    path: routes.STATISTICS,
    component: Statistics,
  },
  {
    key: 'Error',
    path: undefined,
    component: ErrorPage,
  },
]
