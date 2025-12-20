import { MILLISECONDS_IN, SS_UTC_HOUR } from 'shared-utils/dist/time'
import { Auctions, RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import ScrapRareItems from 'Scripts/ScrapRareItems'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('UpdateAuctions', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const ssTimestamp = new Date(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
  )
  ssTimestamp.setUTCHours(SS_UTC_HOUR)

  const ssMinRange = +ssTimestamp - MILLISECONDS_IN.MINUTE * 15
  const ssMaxRange = +ssTimestamp + MILLISECONDS_IN.MINUTE * 5
  const now = Date.now()

  if (now > ssMinRange && now < ssMaxRange) {
    broadcast(`Server save update`, 'fail')
    broadcast('exiting gracefully...', 'control')
    process.exit()
  }

  const { onlineCount } = await ScrapServers()

  if (onlineCount.find((data) => data.onlineCount === null)) {
    broadcast(`Offline servers found`, 'fail')
    broadcast('exiting gracefully...', 'control')
    process.exit()
  }

  const auctionData = new Auctions()
  await auctionData.load()

  const pageIndexes = await task.fetchAuctionPageIndexes()

  const auctionBlocks = await task.fetchAllAuctionBlocks(pageIndexes)

  const biddedAuctions = await auctionData.updatePreviousAuctions(auctionBlocks)
  await task.notifyBiddedAuctions(biddedAuctions)

  const newAuctionIds = auctionData.newAuctionIds(auctionBlocks)

  if (newAuctionIds.length) {
    await task.fetchNewAuctions(
      newAuctionIds,
      auctionData,
      new Date().getUTCHours() === SS_UTC_HOUR,
    )
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
