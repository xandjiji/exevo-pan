/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { MILLISECONDS_IN } from 'utils'
import { AuctionsClient } from 'services/server'
import { FetchAuctionPageArgs } from 'services/server/Auctions/types'
import { from } from 'services/client/Auctions/types'

const CACHE_AGE = {
  current: MILLISECONDS_IN.MINUTE * 3,
  history: MILLISECONDS_IN.HOUR * 4,
}

const checkForAuctionId = (
  args: FetchAuctionPageArgs,
): Promise<{ auction: CharacterObject; isHistory: boolean }> =>
  new Promise((resolve, reject) =>
    AuctionsClient.fetchAuctionPage(args).then(({ page: [auction] }) =>
      auction ? resolve({ auction, isHistory: args.history }) : reject(),
    ),
  )

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { method, query } = request
  if (method !== 'GET') {
    response.status(400).send(`${method} not allowed `)
    return
  }

  let maxAge = CACHE_AGE.current

  try {
    const queryArgs = { filterOptions: { auctionIds: new Set([+query.id]) } }

    let result: CharacterObject | null = null

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
      const { auction, isHistory } = await Promise.any([
        checkForAuctionId({ ...queryArgs, history: false }),
        checkForAuctionId({ ...queryArgs, history: true }),
      ])

      result = auction
      maxAge = CACHE_AGE[isHistory ? 'history' : 'current']
    }

    if (!result) throw Error()

    response.setHeader('Cache-Control', `max-age=${maxAge}, s-maxage=${maxAge}`)
    response.status(200).json(result)
  } catch (error) {
    response.setHeader('Cache-Control', `max-age=${maxAge}, s-maxage=${maxAge}`)
    response.status(400).json(error)
  }
}
