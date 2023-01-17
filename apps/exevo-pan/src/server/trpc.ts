import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create()

export const { middleware, router } = t
export const publicProcedure = t.procedure
export const premiumProcedure = t.procedure.use(
  t.middleware(({ next, ctx }) => {
    if (!ctx.token?.proStatus) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      })
    }

    return next({
      ctx: {
        token: ctx.token,
      },
    })
  }),
)
