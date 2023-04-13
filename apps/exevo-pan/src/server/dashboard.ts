import { z } from 'zod'
import { authedProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'

export const listMyTransactions = authedProcedure.query(
  async ({
    ctx: {
      token: { id },
    },
  }) =>
    prisma.transaction.findMany({
      where: { user: { id } },
      include: { highlightedAuction: true, exevoProPayment: true },
      orderBy: { date: 'desc' },
    }),
)
