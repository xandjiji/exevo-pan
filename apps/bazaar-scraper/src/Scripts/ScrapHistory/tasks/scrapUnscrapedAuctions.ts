/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { AuctionList, AuctionPage } from 'Helpers'
import { broadcast, coloredText, TrackETA } from 'logging'
import { HttpClient } from 'services'
import { retryWrapper, makeRangeArray } from 'utils'
import { fetchAuctionPage, db } from '../utils'

const SORTED_NEWEST_HISTORY_URL =
  'https://www.tibia.com/charactertrade/?subtopic=pastcharactertrades&order_column=103&order_direction=0'

export const fetchHighestAuctionId = retryWrapper(async (): Promise<number> => {
  broadcast('Scraping new highest auction id...', 'neutral')

  const helper = new AuctionList()
  const html = await HttpClient.getHtml(SORTED_NEWEST_HISTORY_URL)
  const auctionBlocks = helper.auctionBlocks(html)

  return Math.max(...auctionBlocks.map(({ id }) => id))
})

export const scrapUnscrapedAuctions = async (
  lastScrapedId: number,
): Promise<void> => {
  const newHighestAuctionId = await fetchHighestAuctionId()
  const unscrapedIds = makeRangeArray(lastScrapedId + 1, newHighestAuctionId)

  const serverData = await db.getServers()
  const helper = new AuctionPage(serverData)

  const taskTracking = new TrackETA(
    unscrapedIds.length,
    coloredText('Scraping new history auctions', 'highlight'),
  )

  for (const auctionId of unscrapedIds) {
    const readableId = coloredText(auctionId, 'highlight')

    const html = await fetchAuctionPage(auctionId)
    taskTracking.incTask()
    const readableProgress = taskTracking.getProgress()

    const { result, data } = await helper.checkHistoryAuction(html)

    if (result === 'NOT_FOUND') {
      broadcast(
        `Not found  auction id: ${readableId} ${readableProgress}`,
        'control',
      )
    }

    if (result === 'NOT_FINISHED') {
      broadcast(
        `Unfinished auction id: ${readableId} ${readableProgress}`,
        'neutral',
      )
      await db.insertUnfinishedAuction({ data })
      return
    }

    if (result === 'IS_FINISHED') {
      broadcast(
        `Scraping   auction id: ${readableId} ${readableProgress}`,
        'neutral',
      )
      await db.insertHistoryAuction(data, false)
    }
  }

  taskTracking.finish()
}
