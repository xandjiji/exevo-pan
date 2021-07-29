import { BazaarAuctions, Statistics, ErrorPage } from 'modules'

export default [
  {
    key: 'Bazaar Auctions',
    path: ['/', '/bazaar-history'],
    exact: true,
    component: BazaarAuctions,
  },
  {
    key: 'Statistics',
    path: '/statistics',
    exact: true,
    component: Statistics,
  },
  {
    key: 'Error',
    path: undefined,
    component: ErrorPage,
  },
]
