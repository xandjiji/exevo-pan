/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { endpoints } from 'Constants'
import { MILLISECONDS_IN } from 'utils'

const AUCTION_PERIOD = MILLISECONDS_IN.MINUTE * 15

const millisecondsToSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / MILLISECONDS_IN.MINUTE)

const timeUntilNextCacheBust = () =>
  millisecondsToSeconds(AUCTION_PERIOD - (+new Date() % AUCTION_PERIOD))

const CACHE_AGE = {
  current: timeUntilNextCacheBust,
  history: millisecondsToSeconds(MILLISECONDS_IN.HOUR * 4),
}

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, query, url } = request
  if (method !== 'GET') {
    response.status(400).send(`${method} not allowed `)
    return
  }

  try {
    const isHistory = query.history === 'true'

    const endpoint = new URL(
      endpoints[isHistory ? 'HISTORY_AUCTIONS' : 'CURRENT_AUCTIONS'],
    )

    const [, urlParams] = (url ?? '').split('?')
    const currentParams = new URLSearchParams(urlParams)
    currentParams.delete('history')
    endpoint.search = currentParams.toString()

    const result = await fetch(endpoint)
    const parsedResult = await result.json()

    const maxAge = isHistory ? CACHE_AGE.history : CACHE_AGE.current()
    response.setHeader('Cache-Control', `max-age=${maxAge}, s-maxage=${maxAge}`)

    response.status(200).json(parsedResult)
  } catch (error) {
    response.status(400).json(error)
  }
}
