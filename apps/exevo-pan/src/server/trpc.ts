import { initTRPC, TRPCError } from '@trpc/server'
import { ZodError } from 'zod'
import { PrismaClientKnownRequestError } from 'db/prisma/generated/client/runtime'
import { Context } from './context'
import { transformer } from './utils'

const t = initTRPC.context<Context>().create({
  transformer,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      prisma:
        error.cause instanceof PrismaClientKnownRequestError ? error : null,
      zodError:
        error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
          ? error.cause.flatten()
          : null,
    },
  }),
})

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
