import { SS_UTC_HOUR } from 'shared-utils/dist/time'
import { Auctions, RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import ScrapRareItems from 'Scripts/ScrapRareItems'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('UpdateAuctions', 'highlight')

const pageSize = 25

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  await ScrapServers()

  const auctionData = new Auctions()
  await auctionData.load()

  const pageIndexes = await task.fetchAuctionPageIndexes()

  if (new Date().getUTCHours() === SS_UTC_HOUR) {
    const estimatedAuctionFoundCount = pageIndexes.length * pageSize
    const cancelled =
      auctionData.getAllAuctions().length - estimatedAuctionFoundCount

    if (cancelled > 100) {
      broadcast(
        `High cancelled auctions found (${cancelled}) near SS time. Tibia website is probably partially updated`,
        'fail',
      )
      broadcast('exiting gracefully...', 'control')
      process.exit()
    }
  }

  const auctionBlocks = await task.fetchAllAuctionBlocks(pageIndexes)

  const biddedAuctions = await auctionData.updatePreviousAuctions(auctionBlocks)
  await task.notifyBiddedAuctions(biddedAuctions)

  const newAuctionIds = auctionData.newAuctionIds(auctionBlocks)

  if (newAuctionIds.length) {
    await task.fetchNewAuctions(newAuctionIds, auctionData)
    await ScrapRareItems()
  }

  const itemsData = new RareItems()
  await itemsData.load()
  await itemsData.filterStaleItems(auctionData.getAllAuctions())

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
