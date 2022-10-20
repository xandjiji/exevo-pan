import { Timer, coloredText, broadcast } from 'logging'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('TrackBosses', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const wasUpdated = await task.checkForPageUpdates()

  if (wasUpdated) {
    broadcast('Kill statistics page was updated!', 'highlight')
    const freshKillStatisticsData = await task.scrapFreshBossApparitions()

    const bossDistributions = await task.generateBossDistributions()

    await task.calculateBossChances({
      serverList,
      bossDistributions,
    })

    await task.revalidatePages(serverList)
  }

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
