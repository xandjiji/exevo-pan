import { z } from 'zod'
import { adminProcedure } from 'server/trpc'
import { links, endpoints } from 'Constants'

export const revalidatePage = adminProcedure
  .input(z.string().optional())
  .mutation(async ({ input }) => {
    const endpoint = new URL(`${links.CANONICAL}${endpoints.REVALIDATE_PAGE}`)
    endpoint.search = new URLSearchParams().toString()
    endpoint.searchParams.set('route', input ?? '')
    endpoint.searchParams.set('secret', process.env.REVALIDATION_AUTH as string)

    try {
      await fetch(endpoint.toString())
      return true
    } catch (error) {
      return false
    }
  })
