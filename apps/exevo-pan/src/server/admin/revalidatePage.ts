import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { PageRevalidationClient } from 'services/server'

export const revalidatePage = adminProcedure
  .input(z.string().optional())
  .mutation(async ({ input }) => {
    try {
      await PageRevalidationClient.revalidatePage(input)
      return true
    } catch (error) {
      return false
    }
  })
