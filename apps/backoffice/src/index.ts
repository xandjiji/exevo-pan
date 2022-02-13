import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

declare const HIGHLIGHTED: KVNamespace
const SECONDS_IN_A_MONTH = 2592000

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event: FetchEvent): Promise<Response> {
  const { request } = event
  const { method, url } = request

  if (url.includes('admin')) {
    const page = await getAssetFromKV(event, {
      mapRequestToAsset: (req) =>
        new Request(`${new URL(req.url).origin}/index.html`, req),
    })
    return new Response(page.body, page)
  }

  if (method === 'POST') {
    const newHighlight: HighlightedAuctionData = await request.json()
    const value = JSON.stringify(newHighlight)

    await HIGHLIGHTED.put(newHighlight.timestamp.toString(), value, {
      metadata: value,
      expirationTtl: SECONDS_IN_A_MONTH,
    })
  }

  if (method === 'GET') {
    const values = await HIGHLIGHTED.list<HighlightedAuctionData>()
    return new Response(JSON.stringify(values.keys))
  }

  const response = new Response('hello world')
  return response
}
