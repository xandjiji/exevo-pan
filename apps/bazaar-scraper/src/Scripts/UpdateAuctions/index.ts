import { RareItems } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import ScrapRareItems from 'Scripts/ScrapRareItems'
import {
  scrapAuctionPageIndexes,
  scrapAuctionBlocks,
  upsertAuctions,
  clearInactiveAuctions,
} from './tasks'

const SCRIPT_NAME = coloredText('UpdateAuctions', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  await ScrapServers()

  const pageIndexes = await scrapAuctionPageIndexes()
  const auctionBlocks = await scrapAuctionBlocks(pageIndexes)

  await upsertAuctions(auctionBlocks)

  const activeAuctionIds = auctionBlocks.map(({ id }) => id)
  await clearInactiveAuctions(activeAuctionIds)

  if (newAuctionIds.length) {
    const newAuctions = await fetchNewAuctions(newAuctionIds)
    await auctionData.appendAuctions(newAuctions)

    // scrap items
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
