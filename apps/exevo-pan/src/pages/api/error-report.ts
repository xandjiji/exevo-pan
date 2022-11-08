/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  const { message } = request.body

  console.log('error detected')
  console.log(message)

  response.status(200).end()
}

export const config = {
  runtime: 'experimental-edge',
}
