import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { caller } from 'pages/api/trpc/[trpc]'
import { officialAuctionUrl } from 'utils'

export default async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  const { secret } = request.query
  const auth = [process.env.REVALIDATION_AUTH, process.env.BACKOFFICE_TOKEN]

  if (!auth.find((key) => key === secret)) {
    response.status(401).json({ message: 'Invalid token' })
    return
  }

  if (!request.query.auctionId) {
    response.status(401).json({ message: '`auctionId` is required' })
    return
  }

  if (typeof request.query.currentBid !== 'string') {
    response.status(401).json({ message: '`currentBid` is required' })
    return
  }

  const { currentBid } = request.query
  const auctionId = +request.query.auctionId

  try {
    const notifyList = await prisma.auctionNotification.findMany({
      where: { auctionId },
    })

    await Promise.all(
      notifyList.map(({ userId, nickname }) =>
        caller.notifyUser({
          userId,
          title: nickname,
          body: `Current bid: ${currentBid}`,
          url: officialAuctionUrl(auctionId),
        }),
      ),
    )

    response.send('ok')
  } catch (error) {
    response.status(500).json({ error })
  }
}
