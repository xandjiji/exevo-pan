import { Auctions, RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import ScrapRareItems from 'Scripts/ScrapRareItems'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('UpdateAuctions', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  await ScrapServers()

  const auctionData = new Auctions()

  const pageIndexes = await task.fetchAuctionPageIndexes()
  const auctionBlocks = await task.fetchAllAuctionBlocks(pageIndexes)

  await auctionData.load()
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
