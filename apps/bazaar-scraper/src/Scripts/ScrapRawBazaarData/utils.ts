import { HttpClient, prisma } from 'services'
import { retryWrapper } from 'utils'

export const BUFFER_SIZE = 30

const AUCTION_PAGE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details'

export const fetchAuctionPage = retryWrapper(async (auctionId: number) =>
  HttpClient.getHtml(`${AUCTION_PAGE_URL}&auctionid=${auctionId}`),
)

export const db = {
  getAllServers: retryWrapper(() => prisma.server.findMany()),
}
