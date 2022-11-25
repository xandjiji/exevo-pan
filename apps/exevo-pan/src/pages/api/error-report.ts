import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  console.log('error detected')
  console.log(request.body)

  response.status(200).end()
}
