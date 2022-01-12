import { deserializeBody } from 'shared-utils/dist/contracts/BlogFilters/utils'
import { filterPosts } from './Filtering'
import posts from './PostData.json'
import { headers } from './headers'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  const serializedBody: SerializedBlogFilterBody = await request.json()
  const { filterOptions, sortOptions, paginationOptions } =
    deserializeBody(serializedBody)

  const filteredPosts = filterPosts({
    posts,
    filters: filterOptions,
  })

  /* const sortedAuctions = applySort(filteredAuctions, sortOptions)

  const paginatedData = paginateData(sortedAuctions, paginationOptions)

  const responseBody = {
    ...paginatedData,
    ...sortOptions,
  }

  const response = new Response(JSON.stringify(responseBody), {
    headers,
  }) */

  const response = new Response(JSON.stringify(filteredPosts), {
    headers,
  })

  return response
}
