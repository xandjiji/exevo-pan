import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import type { HighlightedAuction } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { oneMonthAgo } from './utils'

export const listAuctionHighlights = adminProcedure.query(async () => {
  const result = await prisma.highlightedAuction.findMany({
    where: { lastUpdated: { gt: oneMonthAgo() } },
    orderBy: { lastUpdated: 'desc' },
  })

  return result
})

type PatchableAttributes = Partial<
  Pick<HighlightedAuction, 'active' | 'confirmed' | 'days'>
>

const PatchSchema: z.ZodType<PatchableAttributes & { id: string }> = z.object({
  id: z.string(),
  active: z.boolean().optional(),
  confirmed: z.boolean().optional(),
  days: z.string().optional(),
})

export const patchAuctionHighlights = adminProcedure
  .input(PatchSchema)
  .mutation(async ({ input: { id, ...data } }) => {
    const result = await prisma.highlightedAuction.update({
      where: { id },
      data,
    })

    return result
  })

export const deleteAuctionHighlight = adminProcedure
  .input(z.string())
  .mutation(async ({ input: id }) => {
    const result = await prisma.highlightedAuction.delete({ where: { id } })

    return result
  })
