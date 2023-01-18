import * as trpcNext from '@trpc/server/adapters/next'
import { router } from 'server/trpc'
import { createContext } from 'server/context'
import { newsletter } from 'server/newsletter'
import { proBosses } from 'server/proBosses'
import { highlightCheckout } from 'server/highlightCheckout'
import { proPayment } from 'server/proPayment'
import { getAuctionById } from 'server/getAuctionById'
import { listProOrders, updateProOrders } from 'server/admin/proOrders'

const appRouter = router({
  getAuctionById,
  proBosses,
  newsletter,
  highlightCheckout,
  proPayment,
  listProOrders,
  updateProOrders,
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
