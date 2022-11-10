import { Timer, coloredText, broadcast } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('TrackBosses', 'highlight')

const main = async (): Promise<void> => {
  const { activeServers } = await ScrapServers()
  broadcast('Checking for kill statistics page update...', 'neutral')
  const wasUpdated = await task.checkForPageUpdates(activeServers)

  if (wasUpdated) {
    const timer = new Timer()
    broadcast(
      `Fresh data was found! Starting ${SCRIPT_NAME} script routine`,
      'success',
    )
    await task.scrapEachServerKillStatistics(activeServers)

    const bossDistributions = await task.generateBossDistributions()

    await task.calculateBossChances({
      activeServers,
      bossDistributions,
      wasUpdated,
    })

    broadcast(
      `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
      'success',
    )
  } else {
    broadcast(`No fresh data was found.`, 'control')
  }

  /* if (wasUpdated) {
    await task.revalidatePages(activeServers)
  } */
}

export default main
