import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import { scrapUnscrapedAuctions, scrapMaturedAuctions } from './tasks'
import { db } from './utils'

const SCRIPT_NAME = coloredText('ScrapHistory', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  await ScrapServers()

  const { lastScrapedId, maturedAuctions } = await db.getScrapHistoryData()

  await scrapUnscrapedAuctions(lastScrapedId)

  await scrapMaturedAuctions(maturedAuctions)

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
