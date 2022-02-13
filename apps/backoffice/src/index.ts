import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { headers } from './headers'

declare const HIGHLIGHTED: KVNamespace
declare const AUTH_TOKEN: string
const SECONDS_IN_A_MONTH = 2592000

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
    const { authToken, ...newHighlight } = await request.json()
    if (authToken !== AUTH_TOKEN) {
      return new Response('invalid credentials')
    }

    const value = JSON.stringify(newHighlight)

    await HIGHLIGHTED.put(newHighlight.timestamp.toString(), value, {
      metadata: value,
      expirationTtl: SECONDS_IN_A_MONTH,
    })

    return new Response(`[${newHighlight.nickname}] was updated successfully`, {
      headers,
    })
  }

  if (method === 'GET') {
    const values = await HIGHLIGHTED.list<HighlightedAuctionData>()
    return new Response(JSON.stringify(values.keys), { headers })
  }

  if (method === 'DELETE') {
    const { id, authToken } = await request.json()
    if (authToken !== AUTH_TOKEN) {
      return new Response('invalid credentials')
    }

    await HIGHLIGHTED.delete(id)
    return new Response(`[${id}] was deleted successfully`, { headers })
  }

  const response = new Response(JSON.stringify({ result: 'ok' }), { headers })
  return response
}
