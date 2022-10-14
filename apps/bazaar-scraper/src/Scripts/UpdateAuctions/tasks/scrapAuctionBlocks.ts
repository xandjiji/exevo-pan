import { AuctionList } from 'Helpers'
import { HttpClient } from 'services'
import { broadcast, TrackETA, coloredText } from 'logging'
import { retryWrapper, batchPromises } from 'utils'

const AUCTION_LIST_URL = 'https://www.tibia.com/charactertrade'

const scrapAuctionsFromPage = retryWrapper(async (pageIndex) => {
  const helper = new AuctionList()
  const html = await HttpClient.getHtml(
    `${AUCTION_LIST_URL}/?currentpage=${pageIndex}`,
  )
  return helper.auctionBlocks(html)
})

export const scrapAuctionBlocks = async (
  pageIndexes: number[],
): Promise<AuctionBlock[]> => {
  const lastIndex = pageIndexes[pageIndexes.length - 1]
  const taskTracking = new TrackETA(
    lastIndex,
    coloredText('Scraping auction blocks', 'highlight'),
  )

  const tasks = pageIndexes.map((currentIndex) => async () => {
    taskTracking.incTask()
    broadcast(`Scraping auction page ${taskTracking.getProgress()}`, 'neutral')

    return scrapAuctionsFromPage(currentIndex)
  })

  const auctionBlocks = await batchPromises(tasks)
  taskTracking.finish()
  return auctionBlocks.flat()
}
