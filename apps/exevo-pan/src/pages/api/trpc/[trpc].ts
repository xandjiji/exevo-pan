import * as trpcNext from '@trpc/server/adapters/next'
import { router } from 'server/trpc'
import { createContext } from 'server/context'
import { newsletter } from 'server/newsletter'
import { proBosses } from 'server/proBosses'
import { highlightCheckout } from 'server/highlightCheckout'

const appRouter = router({
  newsletter,
  proBosses,
  highlightCheckout,
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
