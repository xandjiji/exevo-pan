/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  if (request.query.secret !== process.env.REVALIDATION_AUTH) {
    response.status(401).json({ message: 'Invalid token' })
    return
  }

  try {
    const route = `/${request.query.route ?? ''}`
    // @ts-ignore
    await response.unstable_revalidate(route)
    response.json({ revalidated: true })
  } catch (error) {
    response.status(500).json({ error })
  }
}
