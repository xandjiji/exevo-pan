import { Auctions } from 'Data'
import { AuctionPage } from 'Helpers'
import { HttpClient } from 'services'
import { broadcast, coloredText, TrackETA } from 'logging'
import { batchPromises, retryWrapper } from 'utils'

const AUCTION_PAGE_URL =
  'https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details'

const fetchAuctionPage = retryWrapper(async (auctionId: number) =>
  HttpClient.getHtml(`${AUCTION_PAGE_URL}&auctionid=${auctionId}`),
)

export const fetchNewAuctions = async (
  newAuctionIds: number[],
  auctionData: Auctions,
  fast: boolean,
): Promise<PartialCharacterObject[]> => {
  const batchSize = newAuctionIds.length
  const taskTracking = new TrackETA(
    batchSize,
    coloredText('Scraping new auctions', 'highlight'),
  )

  const helper = new AuctionPage()
  await helper.loadServerData()

  const auctionPageRequests = newAuctionIds.map((auctionId) => async () => {
    taskTracking.incTask()
    broadcast(
      `Scraping auction id: ${coloredText(
        auctionId,
        'highlight',
      )} ${taskTracking.getProgress()}`,
      'neutral',
    )

    const newAuctionHtml = await fetchAuctionPage(auctionId)
    const auction = await helper.partialCharacterObject(newAuctionHtml, {
      requestDelay: fast ? 500 : 1500,
    })
    await auctionData.appendAuctions([auction])

    return auction
  })

  const auctions = await batchPromises(auctionPageRequests, {
    DELAY: fast ? 500 : 1500,
  })
  taskTracking.finish()
  return auctions
}
