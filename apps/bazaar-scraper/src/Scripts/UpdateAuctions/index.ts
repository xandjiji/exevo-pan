import { Auctions, RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import ScrapRareItems from 'Scripts/ScrapRareItems'
import {
  fetchAuctionPageIndexes,
  fetchAllAuctionBlocks,
  fetchNewAuctions,
} from './tasks'

const SCRIPT_NAME = coloredText('UpdateAuctions', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  await ScrapServers()

  const auctionData = new Auctions()

  const pageIndexes = await fetchAuctionPageIndexes()
  const auctionBlocks = await fetchAllAuctionBlocks(pageIndexes)

  await auctionData.load()
  await auctionData.updatePreviousAuctions(auctionBlocks)

  const newAuctionIds = auctionData.newAuctionIds(auctionBlocks)

  if (newAuctionIds.length) {
    const newAuctions = await fetchNewAuctions(newAuctionIds)
    await auctionData.appendAuctions(newAuctions)
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
