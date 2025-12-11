import { AuctionList } from 'Helpers'
import { HttpClient } from 'services'
import { broadcast, coloredText, TrackETA } from 'logging'
import { batchPromises, retryWrapper } from 'utils'

const AUCTION_LIST_URL = 'https://www.tibia.com/charactertrade'

const fetchAuctionsFromPage = retryWrapper(async (pageIndex) => {
  const helper = new AuctionList()
  const html = await HttpClient.getHtml(
    `${AUCTION_LIST_URL}/?currentpage=${pageIndex}`,
  )
  return helper.auctionBlocks(html)
})

export const fetchAllAuctionBlocks = async (
  pageIndexes: number[],
): Promise<AuctionBlock[]> => {
  const lastIndex = pageIndexes[pageIndexes.length - 1]
  const taskTracking = new TrackETA(
    lastIndex,
    coloredText('Scraping auction blocks', 'highlight'),
  )

  const auctionBlocksRequests = pageIndexes.map((currentIndex) => async () => {
    taskTracking.incTask()
    broadcast(`Scraping auction page ${taskTracking.getProgress()}`, 'neutral')

    const auctionBlock = await fetchAuctionsFromPage(currentIndex)
    return auctionBlock
  })

  const auctionBlocks = await batchPromises(auctionBlocksRequests, {
    DELAY: 1000,
  })
  taskTracking.finish()
  return auctionBlocks.flat()
}
