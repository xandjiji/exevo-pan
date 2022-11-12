import { NextRequest } from 'next/server'
import { SECONDS_IN } from 'utils'
import { AuctionsClient } from 'services/server'
import { FetchAuctionPageArgs } from 'services/server/Auctions/types'
import { from } from 'services/client/Auctions/types'

const CACHE_AGE = {
  current: SECONDS_IN.MINUTE * 3,
  history: SECONDS_IN.HOUR * 4,
}

const checkForAuctionId = (
  args: FetchAuctionPageArgs,
): Promise<{ auction: CharacterObject; isHistory: boolean }> =>
  new Promise((resolve, reject) =>
    AuctionsClient.fetchAuctionPage(args).then(({ page: [auction] }) =>
      auction ? resolve({ auction, isHistory: args.history }) : reject(),
    ),
  )

export default async ({ method, url }: NextRequest) => {
  if (method !== 'GET') {
    return new Response(JSON.stringify({ error: `${method} not allowed` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { searchParams } = new URL(url)

  let maxAge = CACHE_AGE.current

  const id = searchParams.get('id')
  const fromQuery = searchParams.get('from')

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Missing `id` query parameter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  try {
    const queryArgs = {
      filterOptions: { auctionIds: new Set([+id]) },
    }

    let result: CharacterObject | null = null

    if (fromQuery !== from.ANY) {
      const isHistory = fromQuery === from.HISTORY

      const {
        page: [firstResult],
      } = await AuctionsClient.fetchAuctionPage({
        ...queryArgs,
        history: isHistory,
      })

      result = firstResult
      maxAge = CACHE_AGE[isHistory ? 'history' : 'current']
    } else {
      const { auction, isHistory } = await Promise.any([
        checkForAuctionId({ ...queryArgs, history: false }),
        checkForAuctionId({ ...queryArgs, history: true }),
      ])

      result = auction
      maxAge = CACHE_AGE[isHistory ? 'history' : 'current']
    }

    if (!result) throw Error()

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${maxAge}, s-maxage=${maxAge}`,
      },
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${maxAge}, s-maxage=${maxAge}`,
      },
    })
  }
}

export const config = {
  runtime: 'experimental-edge',
}
