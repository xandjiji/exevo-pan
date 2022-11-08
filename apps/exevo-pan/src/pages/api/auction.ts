/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { MILLISECONDS_IN } from 'utils'
import { AuctionsClient } from 'services/server'
import { from } from 'services/client/Auctions/types'

const CACHE_AGE = {
  current: MILLISECONDS_IN.MINUTE * 3,
  history: MILLISECONDS_IN.HOUR * 4,
}

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, query } = request
  if (method !== 'GET') {
    response.status(400).send(`${method} not allowed `)
    return
  }

  try {
    const queryArgs = { filterOptions: { auctionIds: new Set([+query.id]) } }

    let result: CharacterObject | null = null
    let maxAge = CACHE_AGE.current

    if (query.from !== from.ANY) {
      const isHistory = query.from === from.HISTORY

      const {
        page: [firstResult],
      } = await AuctionsClient.fetchAuctionPage({
        ...queryArgs,
        history: isHistory,
      })

      result = firstResult
      maxAge = CACHE_AGE[isHistory ? 'history' : 'current']
    } else {
      const [
        {
          page: [currentResult],
        },
        {
          page: [historyResult],
        },
      ] = await Promise.all([
        AuctionsClient.fetchAuctionPage({
          ...queryArgs,
          history: false,
        }),
        AuctionsClient.fetchAuctionPage({
          ...queryArgs,
          history: true,
        }),
      ])

      result = currentResult ?? historyResult
      maxAge = CACHE_AGE[historyResult ? 'history' : 'current']
    }

    response.setHeader('Cache-Control', `max-age=${maxAge}, s-maxage=${maxAge}`)
    response.status(200).json(result)
  } catch (error) {
    response.status(400).json(error)
  }
}

export const config = {
  runtime: 'experimental-edge',
}
