import { AuctionList } from 'Helpers'
import { HttpClient } from 'services'
import { broadcast } from 'logging'
import { retryWrapper } from 'utils'

const SORTED_NEWEST_HISTORY_URL =
  'https://www.tibia.com/charactertrade/?subtopic=pastcharactertrades&order_column=103&order_direction=0'

export const fetchHighestAuctionId = retryWrapper(async (): Promise<number> => {
  broadcast('Scraping new highest auction id...', 'neutral')

  const helper = new AuctionList()
  const html = await HttpClient.getHtml(SORTED_NEWEST_HISTORY_URL)
  const auctionBlocks = helper.auctionBlocks(html)

  return Math.max(...auctionBlocks.map(({ id }) => id))
})
