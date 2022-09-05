import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { headers } from './headers'

declare const HIGHLIGHTED: KVNamespace
declare const AUTH_TOKEN: string
const MILLISECONDS_IN_A_MONTH = 2592000000

const LIST_KEY = 'highlighted-auctions'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event: FetchEvent): Promise<Response> {
  const { request } = event
  const { method, url } = request

  if (!url.includes('/api')) {
    const page = await getAssetFromKV(event)
    return new Response(page.body, page)
  }

  if (method === 'POST') {
    const { authToken, ...data } = await request.json()
    const newHighlight = data as HighlightedAuctionData
    if (authToken !== AUTH_TOKEN) {
      return new Response('invalid credentials')
    }

    let highlightedAuctions: HighlightedAuctionData[] = JSON.parse(
      (await HIGHLIGHTED.get(LIST_KEY)) ?? '[]',
    )

    highlightedAuctions = highlightedAuctions.filter(
      ({ timestamp }) => timestamp !== newHighlight.timestamp,
    )
    highlightedAuctions.push(newHighlight)

    highlightedAuctions.sort((a, b) => b.timestamp - a.timestamp)

    const newAuctions = JSON.stringify(
      highlightedAuctions.filter(
        ({ timestamp }) => timestamp >= +new Date() - MILLISECONDS_IN_A_MONTH,
      ),
    )

    await HIGHLIGHTED.put(LIST_KEY, newAuctions, {
      metadata: newAuctions,
    })

    return new Response(`[${newHighlight.nickname}] was updated successfully`, {
      headers,
    })
  }

  if (method === 'GET') {
    const values = (await HIGHLIGHTED.get(LIST_KEY)) ?? '[]'
    return new Response(values, { headers })
  }

  if (method === 'DELETE') {
    const { id, authToken } = await request.json()
    if (authToken !== AUTH_TOKEN) {
      return new Response('invalid credentials')
    }

    const highlightedAuctions: HighlightedAuctionData[] = JSON.parse(
      (await HIGHLIGHTED.get(LIST_KEY)) ?? '[]',
    )

    const newAuctions = JSON.stringify(
      highlightedAuctions.filter(({ timestamp }) => timestamp !== id),
    )

    await HIGHLIGHTED.put(LIST_KEY, newAuctions, {
      metadata: newAuctions,
    })

    return new Response(`[${id}] was deleted successfully`, { headers })
  }

  const response = new Response(JSON.stringify({ result: 'ok' }), { headers })
  return response
}
