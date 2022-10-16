import { prisma } from 'services'
import { retryWrapper } from 'utils'

export const db = {
  getServers: retryWrapper(prisma.server.findMany),
  getDbAuctionBlocks: retryWrapper(async () => {
    const auctionBlocks = await prisma.currentAuction.findMany({
      select: {
        id: true,
        hasBeenBidded: true,
        currentBid: true,
      },
    })

    const auctionBlockMap = new Map<
      AuctionBlock['id'],
      Pick<AuctionBlock, 'currentBid' | 'hasBeenBidded'>
    >()
    auctionBlocks.forEach(({ id, ...blockData }) =>
      auctionBlockMap.set(id, blockData),
    )

    return auctionBlockMap
  }),
}
