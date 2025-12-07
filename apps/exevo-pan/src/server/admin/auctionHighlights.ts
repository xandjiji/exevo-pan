import { z } from 'zod'
import { db } from 'db'
import { adminProcedure } from 'server/trpc'
import { PageRevalidationClient } from 'services/server'
import { routes } from 'Constants'
import type { HighlightedAuction } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { oneMonthAgo } from './utils'

const revalidateHomepage = () =>
  PageRevalidationClient.revalidatePage(routes.HOME).catch(console.log)

export const listAuctionHighlights = adminProcedure.query(async () => {
  const result = await db
    .selectFrom('HighlightedAuction')
    .selectAll()
    .where('lastUpdated', '>', new Date(oneMonthAgo()))
    .orderBy('lastUpdated', 'desc')
    .execute()

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
    await revalidateHomepage()

    return result
  })

export const deleteAuctionHighlight = adminProcedure
  .input(z.string())
  .mutation(async ({ input: id }) => {
    const result = await prisma.highlightedAuction.delete({ where: { id } })
    await revalidateHomepage()

    return result
  })
