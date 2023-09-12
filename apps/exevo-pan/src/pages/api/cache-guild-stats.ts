import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
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

  try {
    const t0 = +new Date()
    const guildIds = await prisma.guild.findMany({ select: { id: true } })
    await Promise.all(
      guildIds.map(({ id }) => caller.getCheckStats({ guildId: id })),
    )
    const t1 = +new Date()

    response.send(`took: ${t1 - t0}ms`)
  } catch (error) {
    response.status(500).json({ error })
  }
}
