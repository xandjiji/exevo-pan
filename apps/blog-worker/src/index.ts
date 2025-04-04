import { deserializeBody } from 'shared-utils/dist/contracts/BlogFilters/utils'
import { paginateData } from 'auction-queries/dist/src/Paginating'
import { filterPosts } from './Filtering'
import { applySort } from './Sorting'
import posts from './PostData.json'
import { headers } from './headers'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  const serializedBody: SerializedBlogFilterBody = await request.json()
  const { filterOptions, sortOptions, paginationOptions } =
    deserializeBody(serializedBody)

  const { pathname, searchParams } = new URL(request.url)
  const showHidden = searchParams.get('hidden') === 'true'

  const filteredPosts = filterPosts({
    posts: (posts[pathname as keyof typeof posts] ?? posts['/en']) as any,
    filters: filterOptions,
  })

  const sortedPosts = applySort(filteredPosts, sortOptions)
  const paginatedData = paginateData(
    showHidden ? sortedPosts : sortedPosts.filter(({ hidden }) => !hidden),
    paginationOptions,
  )

  const responseBody = {
    ...paginatedData,
    ...sortOptions,
  }

  const response = new Response(JSON.stringify(responseBody), {
    headers,
  })

  return response
}
