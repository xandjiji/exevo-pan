import { RawBazaar } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import {
  fetchHighestAuctionId,
  /* fetchUnscrapedAuctions,
  fetchMaturedAuctions, */
} from './tasks'

const SCRIPT_NAME = coloredText('ScrapRawBazaarData', 'highlight')

/*
@ ToDo:   
    - save data
        html
        post html data
*/

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const rawData = new RawBazaar()
  await rawData.load()

  const unscrapedIds = rawData.getUnscrapedIds(await fetchHighestAuctionId())

  /*
  if (unscrapedIds.length) {
    await fetchUnscrapedAuctions(unscrapedIds, rawData)
  }

  const maturedIds = rawData.getMaturedAuctionIds()
  if (maturedIds.length) {
    await fetchMaturedAuctions(maturedIds, rawData)
  } */

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
