import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { prisma } from 'lib/prisma'
import { oneMonthAgo } from './utils'

export const listAuctionHighlights = adminProcedure.query(async () => {
  const result = await prisma.highlightedAuction.findMany({
    where: { lastUpdated: { gt: oneMonthAgo() } },
    orderBy: { lastUpdated: 'desc' },
  })

  return result
})
