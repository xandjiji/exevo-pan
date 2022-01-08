import { applySort, paginateData } from 'auction-queries'
import { deserializeBody } from 'shared-utils/dist/contracts/Filters/utils'
import { auctions } from './Data/auctions'
import { filterOldAuctions } from './utils'
import { filterCharacters } from './filterWrapper'
import { headers } from './headers'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  const currentAuctions = filterOldAuctions(auctions, +new Date() / 1000)

  const serializedBody: SerializedFilterBody = await request.json()
  const { filterOptions, sortOptions, paginationOptions } =
    deserializeBody(serializedBody)

  const filteredAuctions = filterCharacters({
    auctions: currentAuctions,
    filters: filterOptions,
  })

  const sortedAuctions = applySort(filteredAuctions, sortOptions)

  const paginatedData = paginateData(sortedAuctions, paginationOptions)

  const responseBody = {
    ...paginatedData,
    ...sortOptions,
  }

  const response = new Response(JSON.stringify(responseBody), {
    headers,
  })

  return response
}
