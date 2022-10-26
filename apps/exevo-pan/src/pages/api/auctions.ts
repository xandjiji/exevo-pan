/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { DEFAULT_SORT_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { deserializeUrlParams } from 'hooks/useUrlParamsState/utils'
import { schema as filtersSchema } from 'modules/BazaarAuctions/contexts/useFilters/schema'
import { schema as auctionsSchema } from 'modules/BazaarAuctions/contexts/useAuctions/schema'
import { AuctionsClient } from 'services/server'

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, url, query } = request
  if (method !== 'GET') {
    response.status(400).send(`${method} not allowed `)

    return
  }

  try {
    const history = query.history === 'true'

    const [, searchParams] = (url ?? '').split('?')
    const currentParams = new URLSearchParams(searchParams)

    const filterOptions = deserializeUrlParams({
      schema: filtersSchema,
      currentParams,
    })

    const sortOptions = deserializeUrlParams({
      schema: auctionsSchema.buildSortingSchema(
        DEFAULT_SORT_OPTIONS[history ? 'history' : 'current'],
      ),
      currentParams,
    })

    const paginationOptions = deserializeUrlParams({
      schema: auctionsSchema.pagination,
      currentParams,
    })

    const result = await AuctionsClient.fetchAuctionPage({
      history,
      filterOptions,
      sortOptions,
      paginationOptions,
    })

    response.status(200).json(result)
    return
  } catch (error) {
    response.status(400).json({ error })
  }
}
