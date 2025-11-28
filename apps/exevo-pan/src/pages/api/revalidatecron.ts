import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const authHeader = request.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    response.status(401).json({ message: 'Invalid token' })
    return
  }

  try {
    await response.revalidate('/')
    await response.revalidate('/pt')
    await response.revalidate('/es')
    await response.revalidate('/pl')
    response.json({ revalidated: true })
  } catch (error) {
    response.status(500).json({ error })
  }
}
