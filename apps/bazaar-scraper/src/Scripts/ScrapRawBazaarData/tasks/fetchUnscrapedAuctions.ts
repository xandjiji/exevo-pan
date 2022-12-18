/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { RawBazaar } from 'Data'
import { AuctionPage } from 'Helpers'
import { broadcast, coloredText, TrackETA } from 'logging'
import { batchPromises, arrayPartitions } from 'utils'
import { BUFFER_SIZE, requestConfig, fetchAuctionPage } from '../utils'

export const fetchUnscrapedAuctions = async (
  unscrapedIds: number[],
  rawData: RawBazaar,
): Promise<void> => {
  const batchSize = unscrapedIds.length
  const taskTracking = new TrackETA(
    batchSize,
    coloredText('Scraping new history auctions', 'highlight'),
  )

  const helper = new AuctionPage()

  const auctionPageRequests = unscrapedIds.map((auctionId) => async () => {
    const readableId = coloredText(auctionId, 'highlight')

    const html = await fetchAuctionPage(auctionId)
    taskTracking.incTask()
    const readableProgress = taskTracking.getProgress()

    const checkResult = await helper.checkRawAuction(html)

    if (checkResult.result === 'NOT_FOUND') {
      broadcast(
        `Not found  auction id: ${readableId} ${readableProgress}`,
        'control',
      )
      return
    }

    if (checkResult.result === 'NOT_FINISHED') {
      broadcast(
        `Unfinished auction id: ${readableId} ${readableProgress}`,
        'neutral',
      )
      rawData.appendUnfinishedBuffer(checkResult.data)
      return
    }

    broadcast(
      `Scraping   auction id: ${readableId} ${readableProgress}`,
      'neutral',
    )
    rawData.appendRawBuffer(checkResult.data)
  })

  const requestQueues = arrayPartitions(auctionPageRequests, BUFFER_SIZE)
  for (const queue of requestQueues) {
    await batchPromises(queue, requestConfig)
    await rawData.saveBuffers()
  }

  taskTracking.finish()
}
