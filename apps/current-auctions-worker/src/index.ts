import { applySort, filterCharacters, paginateData } from 'auction-queries'
import {
  deserializeFilter,
  deserializePagination,
  deserializeSort,
  normalizeData,
} from 'shared-utils/dist/contracts/Filters/schemas'
import { auctions } from './Data/auctions'
import { filterOldAuctions } from './utils'

export default {
  async fetch(request: Request): Promise<Response> {
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Access-Control-Allow-Origin', '*')

    if (request.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: `Invalid HTTP method [${request.method}]` }),
        { status: 400, headers },
      )
    }

    const currentAuctions = filterOldAuctions(auctions)

    const { searchParams: currentParams } = new URL(request.url)

    const filterOptions = deserializeFilter({ currentParams })
    const sortOptions = deserializeSort({ currentParams })
    const paginationOptions = deserializePagination({ currentParams })
    const originPaginationOptions = { ...paginationOptions }
    paginationOptions.pageSize = Math.min(paginationOptions.pageSize, 20)

    const filteredAuctions = filterCharacters({
      auctions: currentAuctions,
      filters: filterOptions,
    })

    const sortedAuctions = applySort(filteredAuctions, sortOptions)

    const paginatedData = paginateData(sortedAuctions, paginationOptions)

    const responseBody: FilterResponse = normalizeData(
      { ...paginatedData, ...sortOptions },
      originPaginationOptions,
    )

    return new Response(JSON.stringify(responseBody), { status: 200, headers })
  },
}
