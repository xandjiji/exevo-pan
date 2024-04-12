/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'db'
import { caller } from 'pages/api/trpc/[trpc]'

export default async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  const { secret } = request.query
  const auth = [process.env.REVALIDATION_AUTH]

  if (!auth.find((key) => key === secret)) {
    response.status(401).json({ message: 'Invalid token' })
    return
  }

  const cachedIds: string[] = []
  let uncachedIds = new Set<string>([])

  try {
    const t0 = +new Date()
    const guildIds = await db.selectFrom('Guild').select('id').execute()

    uncachedIds = new Set(guildIds.map(({ id }) => id))

    for (const { id } of guildIds) {
      await caller.getCheckStats({ guildId: id })
      cachedIds.push(id)
      uncachedIds.delete(id)
    }
    const t1 = +new Date()

    response.send(`took: ${t1 - t0}ms`)
  } catch (error) {
    response.status(500).json({ cachedIds, uncachedIds: [...uncachedIds] })
  }
}
