import type { VercelRequest } from '@vercel/node'
import { getToken, JWT } from 'next-auth/jwt'
import { filterSchema } from 'shared-utils/dist/contracts/Filters/schemas'
import { dictionary as tags } from 'data-dictionary/dist/dictionaries/characterTags'
import { endpoints } from 'Constants'
import { pluckTCInvested } from 'utils'

const isPro = (token: JWT | null) => token && token.proStatus

const pluckPremiumParameters = (searchParams: URLSearchParams) => {
  searchParams.delete(filterSchema.addon.urlKey)
  searchParams.delete(filterSchema.sex.urlKey)

  searchParams.delete(filterSchema.outfitSet.urlKey)
  searchParams.delete(filterSchema.storeOutfitSet.urlKey)
  searchParams.delete(filterSchema.mountSet.urlKey)
  searchParams.delete(filterSchema.storeMountSet.urlKey)

  searchParams.delete(filterSchema.tcInvested.urlKey)
  searchParams.delete(filterSchema.auctionIds.urlKey)

  const tagParams = searchParams.get(filterSchema.tags.urlKey)
  if (tagParams) {
    const filteredTagParams = tagParams
      .split(',')
      .filter((param) => param !== tags.soulwarAvailable)

    if (filteredTagParams.length === 0) {
      searchParams.delete(filterSchema.tags.urlKey)
    } else {
      searchParams.set(filterSchema.tags.urlKey, filteredTagParams.join(','))
    }
  }
}

export default async (request: VercelRequest) => {
  const { method, url } = request

  if (method !== 'GET') {
    return new Response(JSON.stringify({ error: `${method} not allowed` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { searchParams } = new URL(url ?? '')

  try {
    const isHistory = searchParams.get('history') === 'true'

    const endpoint = new URL(
      endpoints[isHistory ? 'HISTORY_AUCTIONS' : 'CURRENT_AUCTIONS'],
    )

    const token = await getToken({ req: request })
    const userIsPro = isPro(token)

    searchParams.delete('history')
    if (!userIsPro) pluckPremiumParameters(searchParams)
    endpoint.search = searchParams.toString()

    const result = await fetch(endpoint.toString())

    if (userIsPro) {
      return new Response(result.body, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const parsedResult: PaginatedData<CharacterObject> = await result.json()
    parsedResult.page = parsedResult.page.map(pluckTCInvested)

    return new Response(JSON.stringify(parsedResult), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = {
  runtime: 'experimental-edge',
}
