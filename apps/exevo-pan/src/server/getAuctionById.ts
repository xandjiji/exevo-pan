import { z } from 'zod'
import { AuctionsClient } from 'services/server'
import { FetchAuctionPageArgs } from 'services/server/Auctions/types'
import { publicProcedure } from 'server/trpc'
import { pluckTCInvested } from 'utils'

const checkForAuctionId = (
  args: FetchAuctionPageArgs,
): Promise<{ auction: CharacterObject; isHistory: boolean }> =>
  new Promise((resolve, reject) =>
    AuctionsClient.fetchAuctionPage(args).then(({ page: [auction] }) =>
      auction ? resolve({ auction, isHistory: args.history }) : reject(),
    ),
  )

export const getAuctionById = publicProcedure
  .input(
    z.object({
      id: z.number(),
      from: z
        .union([z.literal('current'), z.literal('history'), z.literal('any')])
        .optional(),
    }),
  )
  .query(async ({ ctx: { token }, input: { id, from = 'any' } }) => {
    const queryArgs = {
      filterOptions: { auctionIds: new Set([id]) },
    }

    let result: CharacterObject | null = null
    if (from !== 'any') {
      const isHistory = from === 'history'

      const {
        page: [firstResult],
      } = await AuctionsClient.fetchAuctionPage({
        ...queryArgs,
        history: isHistory,
      })

      result = firstResult
    } else {
      const { auction } = await Promise.any([
        checkForAuctionId({ ...queryArgs, history: false }),
        checkForAuctionId({ ...queryArgs, history: true }),
      ])

      result = auction
    }

    if (!result) return null

    return token?.proStatus ? result : pluckTCInvested(result)
  })
