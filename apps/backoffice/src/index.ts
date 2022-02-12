declare const HIGHLIGHTED: KVNamespace
const SECONDS_IN_A_MONTH = 2592000

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  const { method } = request

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
