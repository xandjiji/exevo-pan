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

  const upsertedAuctions = await upsertAuctions(auctionBlocks)

  const activeAuctionIds = auctionBlocks.map(({ id }) => id)
  await clearInactiveAuctions(activeAuctionIds)

  if (upsertedAuctions.createdIds.length) {
    await ScrapRareItems()
  }

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
