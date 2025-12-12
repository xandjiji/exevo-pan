/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { History } from 'Data'
import { AuctionPage } from 'Helpers'
import { broadcast, coloredText, TrackETA } from 'logging'
import { arrayPartitions, batchPromises } from 'utils'
import { BUFFER_SIZE, fetchAuctionPage, requestConfig } from '../utils'

export const fetchMaturedAuctions = async (
  maturedIds: number[],
  historyData: History,
): Promise<void> => {
  const batchSize = maturedIds.length

  if (!batchSize) {
    broadcast('There are no new matured auctions ready yet', 'control')
    return
  }

  const taskTracking = new TrackETA(
    batchSize,
    coloredText('Scraping matured history auctions', 'highlight'),
  )

  const helper = new AuctionPage()
  await helper.loadServerData()

  const auctionPageRequests = maturedIds.map((auctionId) => async () => {
    const readableId = coloredText(auctionId, 'highlight')

    const html = await fetchAuctionPage(auctionId)
    taskTracking.incTask()
    const readableProgress = taskTracking.getProgress()

    const checkResult = await helper.checkHistoryAuction(html, {
      requestDelay: 1500,
    })

    if (checkResult.result === 'NOT_FOUND') {
      broadcast(
        `Not found  auction id: ${readableId} ${readableProgress}`,
        'control',
      )
      historyData.appendMaturedId(auctionId)
      return
    }

    if (checkResult.result === 'IS_FINISHED') {
      broadcast(
        `Scraping   auction id: ${readableId} ${readableProgress}`,
        'neutral',
      )
      historyData.appendFinishedBuffer(checkResult.data)
      historyData.appendMaturedId(auctionId)
    }
  })

  const requestQueues = arrayPartitions(auctionPageRequests, BUFFER_SIZE)
  for (const queue of requestQueues) {
    await batchPromises(queue, requestConfig)
    await historyData.saveBuffers()
  }

  taskTracking.finish()
}
