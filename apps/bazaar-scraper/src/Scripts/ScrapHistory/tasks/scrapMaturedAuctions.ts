/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { AuctionPage } from 'Helpers'
import { broadcast, coloredText, coloredDiff, TrackETA } from 'logging'
import { sleep } from 'utils'
import { fetchAuctionPage, db, DELAY } from '../utils'

export const scrapMaturedAuctions = async (
  maturedAuctions: UnfinishedAuction[],
): Promise<void> => {
  if (!maturedAuctions.length) return

  const serverData = await db.getServers()
  const helper = new AuctionPage(serverData)

  const taskTracking = new TrackETA(
    maturedAuctions.length,
    coloredText('Scraping new history auctions', 'highlight'),
  )

  for (const { id } of maturedAuctions) {
    const readableId = coloredText(id, 'highlight')

    const html = await fetchAuctionPage(id)
    taskTracking.incTask()
    const readableProgress = taskTracking.getProgress()

    const { result, data } = await helper.checkHistoryAuction(html)

    if (result === 'NOT_FOUND') {
      broadcast(
        `Not found  auction id: ${readableId} ${readableProgress}`,
        'control',
      )
    }

    if (result === 'IS_FINISHED') {
      broadcast(
        `Scraping   auction id: ${readableId} ${readableProgress}`,
        'neutral',
      )
      await db.insertHistoryAuction(data, true)
    }

    await sleep(DELAY)
  }

  taskTracking.finish()

  broadcast(
    `Matured history auctions (${coloredDiff(
      maturedAuctions.length,
    )}) were scraped`,
    'success',
  )
}
