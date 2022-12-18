import { HttpClient } from 'services'
import { retryWrapper } from 'utils'

export const BUFFER_SIZE = 500

export const requestConfig: Partial<RequestsConfig> = {
  DELAY: 1250,
  MAX_CONCURRENT_REQUESTS: 1,
}

const AUCTION_PAGE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details'

export const fetchAuctionPage = retryWrapper(async (auctionId: number) =>
  HttpClient.getHtml(`${AUCTION_PAGE_URL}&auctionid=${auctionId}`),
)
