import { RawBazaar } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import {
  fetchHighestAuctionId,
  fetchUnscrapedAuctions,
  fetchMaturedAuctions,
} from './tasks'
import { db } from './utils'

const SCRIPT_NAME = coloredText('ScrapRawBazaarData', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const rawData = new RawBazaar()
  await rawData.load()

  const serverList = await db.getAllServers()

  const unscrapedIds = rawData.getUnscrapedIds(await fetchHighestAuctionId())

  if (unscrapedIds.length) {
    await fetchUnscrapedAuctions({ unscrapedIds, rawData, serverList })
  }

  const maturedIds = rawData.getMaturedAuctionIds()
  if (maturedIds.length) {
    await fetchMaturedAuctions({ maturedIds, rawData, serverList })
  }

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
