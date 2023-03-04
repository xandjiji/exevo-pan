import * as trpcNext from '@trpc/server/adapters/next'
import { router } from 'server/trpc'
import { routes } from 'server/routes'
import { createContext } from 'server/context'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

const appRouter = router(routes)

export type AppRouter = typeof appRouter

export type TRPCRouteInputs = inferRouterInputs<AppRouter>
export type TRPCRouteOutputs = inferRouterOutputs<AppRouter>

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})

export const caller = appRouter.createCaller({
  token: {
    id: '',
    role: 'ADMIN',
    provider: 'google',
    email: '',
    name: '',
    picture: '',
    proStatus: true,
    sub: '',
  },
})
