import type { VercelRequest } from '@vercel/node'
import { AuctionsClient } from 'services/server'
import { getToken, JWT } from 'next-auth/jwt'
import { FetchAuctionPageArgs } from 'services/server/Auctions/types'
import { from } from 'services/client/Auctions/types'
import { pluckTCInvested } from 'utils'

const isPro = (token: JWT | null) => token && token.proStatus

const checkForAuctionId = (
  args: FetchAuctionPageArgs,
): Promise<{ auction: CharacterObject; isHistory: boolean }> =>
  new Promise((resolve, reject) =>
    AuctionsClient.fetchAuctionPage(args).then(({ page: [auction] }) =>
      auction ? resolve({ auction, isHistory: args.history }) : reject(),
    ),
  )

export default async (request: VercelRequest) => {
  const { method, url } = request
  if (method !== 'GET') {
    return new Response(JSON.stringify({ error: `${method} not allowed` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { searchParams } = new URL(url ?? '')

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
    } else {
      const { auction } = await Promise.any([
        checkForAuctionId({ ...queryArgs, history: false }),
        checkForAuctionId({ ...queryArgs, history: true }),
      ])

      result = auction
    }

    if (!result) throw Error()

    const token = await getToken({ req: request })

    return new Response(
      JSON.stringify(isPro(token) ? result : pluckTCInvested(result)),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const config = {
  runtime: 'experimental-edge',
}
