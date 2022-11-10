import { Timer, coloredText, broadcast } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('TrackBosses', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const { activeServers } = await ScrapServers()

  const wasUpdated = await task.checkForPageUpdates(activeServers)

  const wasUpdated = await task.scrapEachServerKillStatistics(activeServers)

  const bossDistributions = await task.generateBossDistributions()

  await task.calculateBossChances({
    activeServers,
    bossDistributions,
    wasUpdated,
  })

  if (wasUpdated) {
    await task.revalidatePages(activeServers)
  }

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
