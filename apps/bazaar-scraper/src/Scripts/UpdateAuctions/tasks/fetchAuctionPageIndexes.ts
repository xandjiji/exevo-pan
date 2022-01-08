import { AuctionList } from 'Helpers'
import { HttpClient } from 'services'
import { broadcast } from 'logging'
import { retryWrapper } from 'utils'

const FIRST_PAGE_AUCTION_LIST =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades'

export const fetchAuctionPageIndexes = retryWrapper(
  async (): Promise<number[]> => {
    broadcast('Fetching for all auction pages indexes...', 'neutral')

    const helper = new AuctionList()
    const html = await HttpClient.getHtml(FIRST_PAGE_AUCTION_LIST)

    const lastPageIndex = helper.lastPageIndex(html)
    return Array.from({ length: lastPageIndex }, (_, index) => index + 1)
  },
)
