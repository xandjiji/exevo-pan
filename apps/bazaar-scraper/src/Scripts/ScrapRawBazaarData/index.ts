import { RawBazaar } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('ScrapRawBazaarData', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const rawData = new RawBazaar()
  await rawData.load()

  const unscrapedIds = rawData.getUnscrapedIds(
    await task.fetchHighestAuctionId(),
  )

  if (unscrapedIds.length) {
    await task.fetchUnscrapedAuctions(unscrapedIds, rawData)
  }

  const maturedIds = rawData.getMaturedAuctionIds()
  if (maturedIds.length) {
    await task.fetchMaturedAuctions(maturedIds, rawData)
  }

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
