import { z } from 'zod'
import { publicProcedure } from 'server/trpc'
import { AuctionsClient } from 'services/server'
import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { pluckPremiumFilters, pluckTCInvested } from 'utils'
import { EstimateAuctionPriceArgs } from 'services/server/Auctions/types'
import {
  FilterOptionsSchema,
  PaginationOptionsSchema,
  SortOptionsSchema,
} from 'types/zod/FilterOptions'

const estimateAuctionPriceInput: z.ZodType<EstimateAuctionPriceArgs> = z.object(
  {
    filterOptions: z.optional(FilterOptionsSchema),
    paginationOptions: z.optional(PaginationOptionsSchema),
    sortOptions: z.optional(SortOptionsSchema),
  },
)

export const estimateAuctionPrice = publicProcedure
  .input(estimateAuctionPriceInput)
  .query(async ({ ctx: { token }, input }) => {
    const isPro = !!token?.proStatus

    const result = await AuctionsClient.estimateAuctionPrice(
      isPro
        ? input
        : {
            ...input,
            filterOptions: pluckPremiumFilters({
              ...DEFAULT_FILTER_OPTIONS,
              ...input.filterOptions,
            }),
          },
    )

    return isPro
      ? result
      : { ...result, page: result.page.map(pluckTCInvested) }
  })
