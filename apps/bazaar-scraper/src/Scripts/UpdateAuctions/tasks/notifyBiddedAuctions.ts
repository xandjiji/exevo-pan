import { broadcast, tabBroadcast } from 'logging'
import { ExevoPanClient } from 'services'
import { retryWrapper } from 'utils'

const notifyAuction = retryWrapper(ExevoPanClient.notifyAuctionBid)

export const notifyBiddedAuctions = async (
  biddedAuctions: BiddedAuctions[],
): Promise<void> => {
  broadcast('Notifying bidded auctions...', 'neutral')
  await Promise.all(biddedAuctions.map(notifyAuction))
  tabBroadcast('Users notified!', 'success')
}
