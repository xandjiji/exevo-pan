/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { AuctionPage } from 'Helpers'
import { broadcast, coloredText, TrackETA } from 'logging'
import { prisma } from 'services'
import { fetchAuctionPage, db } from '../utils'

export const scrapMaturedAuctions = async (
  maturedAuctions: UnfinishedAuction[],
): Promise<void> => {
  const serverData = await prisma.server.findMany()
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
      await db.insertHistoryAuction(data, true)
    }
  }

  taskTracking.finish()
}
