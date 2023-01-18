import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create()

export const { middleware, router } = t

export const publicProcedure = t.procedure

export const authedProcedure = t.procedure.use(
  t.middleware(({ next, ctx }) => {
    if (!ctx.token) {
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

export const adminProcedure = t.procedure.use(
  t.middleware(({ next, ctx }) => {
    if (ctx.token?.role !== 'ADMIN') {
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