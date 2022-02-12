declare const HIGHLIGHTED: KVNamespace
const SECONDS_IN_A_MONTH = 2592000

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  const { method } = request

  if (method === 'POST') {
    const newHighlight: HighlightedAuctionData = await request.json()

    await HIGHLIGHTED.put(
      newHighlight.id.toString(),
      JSON.stringify(newHighlight),
      { expirationTtl: SECONDS_IN_A_MONTH },
    )
  }

  const response = new Response('hello world')
  return response
}
