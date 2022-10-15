import { prisma } from 'services'
import { broadcast, tabBroadcast, coloredText } from 'logging'
import { retryWrapper } from 'utils'

export const clearInactiveAuctions = retryWrapper(
  async (currentAuctionIds: number[]): Promise<void> => {
    broadcast('Checking for inactive auctions...', 'control')

    const removedAuctions = await prisma.currentAuction.deleteMany({
      where: { id: { notIn: currentAuctionIds } },
    })

    if (removedAuctions.count) {
      tabBroadcast(
        `Inactive auctions (${coloredText(
          removedAuctions.count,
          'fail',
        )}) were removed from database`,
        'control',
      )
    }
  },
)
