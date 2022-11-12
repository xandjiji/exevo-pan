import { NextRequest } from 'next/server'
import { endpoints } from 'Constants'
import { MILLISECONDS_IN, SECONDS_IN } from 'utils'

const AUCTION_PERIOD = MILLISECONDS_IN.MINUTE * 15

const millisecondsToSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / MILLISECONDS_IN.SECONDS)

const timeUntilNextCacheBust = () =>
  millisecondsToSeconds(AUCTION_PERIOD - (+new Date() % AUCTION_PERIOD))

const CACHE_AGE = {
  current: timeUntilNextCacheBust,
  history: SECONDS_IN.HOUR * 4,
}

export default async ({ method, url }: NextRequest) => {
  if (method !== 'GET') {
    return new Response(JSON.stringify({ error: `${method} not allowed` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { searchParams } = new URL(url)

  try {
    const isHistory = searchParams.get('history') === 'true'

    const endpoint = new URL(
      endpoints[isHistory ? 'HISTORY_AUCTIONS' : 'CURRENT_AUCTIONS'],
    )

    searchParams.delete('history')
    endpoint.search = searchParams.toString()

    const result = await fetch(endpoint.toString())

    const maxAge = isHistory ? CACHE_AGE.history : CACHE_AGE.current()

    return new Response(result.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${maxAge}, s-maxage=${maxAge}`,
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
