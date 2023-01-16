import * as trpcNext from '@trpc/server/adapters/next'
import { router } from 'server/trpc'
import { newsletter } from 'server/newsletter'

const appRouter = router({
  newsletter,
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
