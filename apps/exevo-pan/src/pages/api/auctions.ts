/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { endpoints } from 'Constants'

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
    response.status(200).json(parsedResult)
  } catch (error) {
    response.status(400).json(error)
  }
}
