/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { AuctionList, AuctionPage } from 'Helpers'
import { broadcast, coloredText, coloredDiff, TrackETA } from 'logging'
import { HttpClient } from 'services'
import { retryWrapper, makeRangeArray, sleep } from 'utils'
import { fetchAuctionPage, db, DELAY } from '../utils'

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

  if (newHighestAuctionId <= lastScrapedId) {
    broadcast(
      `Highest auction id found (${coloredText(
        newHighestAuctionId,
        'highlight',
      )}) was already scraped`,
      'control',
    )
    return
  }

  const unscrapedIds = makeRangeArray(lastScrapedId + 1, newHighestAuctionId)

  const serverData = await db.getServers()
  const helper = new AuctionPage(serverData)

  const taskTracking = new TrackETA(
    unscrapedIds.length,
    coloredText('Scraping new history auctions', 'highlight'),
  )

  const auctionsCount = {
    unfinished: 0,
    finished: 0,
  }
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
      await db.insertUnfinishedAuction(data)
      auctionsCount.unfinished += 1
    }

    if (result === 'IS_FINISHED') {
      broadcast(
        `Scraping   auction id: ${readableId} ${readableProgress}`,
        'neutral',
      )
      await db.insertFreshHistoryAuction(data)
      auctionsCount.finished += 1
    }

    await sleep(DELAY)
  }

  taskTracking.finish()

  broadcast(
    `Fresh history auctions (${coloredDiff(
      auctionsCount.finished,
    )}) were scraped`,
    'success',
  )
  broadcast(
    `New unfinished auctions (${coloredDiff(
      auctionsCount.unfinished,
    )}) were found`,
    'success',
  )
}
