import { BazaarAuctions, Statistics, ErrorPage } from 'modules'

export default [
  {
    path: ['/', '/bazaar-history'],
    exact: true,
    component: BazaarAuctions,
  },
  {
    path: '/statistics',
    exact: true,
    component: Statistics,
  },
  {
    path: undefined,
    component: ErrorPage,
  },
]
