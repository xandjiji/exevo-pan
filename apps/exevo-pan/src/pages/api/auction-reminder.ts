import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { caller } from 'pages/api/trpc/[trpc]'
import { MILLISECONDS_IN, officialAuctionUrl } from 'utils'

const offsetCurrentDateByMinutes = (minutesOffset: number) =>
  new Date(+new Date() + MILLISECONDS_IN.MINUTE * minutesOffset)

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

  try {
    const notifyList = await prisma.auctionNotification.findMany({
      where: {
        notifyAt: {
          gte: offsetCurrentDateByMinutes(-10),
          lte: offsetCurrentDateByMinutes(2),
        },
        scheduleCompleted: false,
      },
    })

    await Promise.all(
      notifyList.map(({ userId, nickname, auctionId }) =>
        caller.notifyUser({
          userId,
          title: 'Auction reminder',
          body: nickname,
          url: officialAuctionUrl(auctionId),
        }),
      ),
    )

    await prisma.auctionNotification.updateMany({
      where: { id: { in: notifyList.map(({ id }) => id) } },
      data: { scheduleCompleted: true },
    })

    response.send('ok')
  } catch (error) {
    response.status(500).json({ error })
  }
}
