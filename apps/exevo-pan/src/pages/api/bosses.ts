import type { VercelRequest, VercelResponse } from '@vercel/node'
import { BossesClient } from 'services/server'
import { getToken } from 'next-auth/jwt'
import { premiumBosses } from 'Constants'

export default async (request: VercelRequest, response: VercelResponse) => {
  const {
    method,
    query: { server },
  } = request

  if (method !== 'GET') {
    response.status(405).json({ error: `${method} not allowed` })
    return
  }

  if (!server) {
    response.status(400).json({ error: 'Missing `server` query parameter' })
    return
  }

  try {
    const token = await getToken({ req: request })
    if (!token) {
      response.status(401).send('Unauthorized')
      return
    }

    if (token.proStatus) {
      const { bosses } = await BossesClient.fetchServerBossChances(
        server as string,
      )
      const premiumBossStats: BossStats[] = bosses.filter(({ name }) =>
        premiumBosses.set.has(name),
      )

      response.status(200).json(premiumBossStats)
    } else {
      response.status(403).send('Forbidden')
    }
  } catch (error) {
    response.json(error).status(400)
  }
}
