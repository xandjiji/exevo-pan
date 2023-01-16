/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import { procedure, router } from 'server/trpc'

const appRouter = router({
  greeting: procedure
    .input(
      z.object({
        name: z.string().nullish(),
      }),
    )
    .query(({ input }) => ({
      text: `hello ${input?.name ?? 'world'}`,
    })),
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
