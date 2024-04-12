import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'db'
import { caller } from 'pages/api/trpc/[trpc]'
import { MILLISECONDS_IN, officialAuctionUrl } from 'utils'

const offsetCurrentDateByMinutes = (minutesOffset: number) =>
  new Date(+new Date() + MILLISECONDS_IN.MINUTE * minutesOffset)

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
    const notifyList = await db
      .selectFrom('AuctionNotification')
      .where((eb) =>
        eb.and([
          eb('scheduleCompleted', '=', false),
          eb('notifyAt', '<=', offsetCurrentDateByMinutes(2)),
          eb('notifyAt', '>=', offsetCurrentDateByMinutes(-10)),
        ]),
      )
      .select(['id', 'userId', 'nickname', 'auctionId'])
      .execute()

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

    await db
      .updateTable('AuctionNotification')
      .where(
        'id',
        'in',
        notifyList.map(({ id }) => id),
      )
      .set('scheduleCompleted', true)
      .execute()

    response.send('ok')
  } catch (error) {
    response.status(500).json({ error })
  }
}
