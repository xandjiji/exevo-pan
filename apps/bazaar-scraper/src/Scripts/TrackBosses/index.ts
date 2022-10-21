import { Timer, coloredText, broadcast } from 'logging'
import * as task from './tasks'
import { fetch } from './utils'

const SCRIPT_NAME = coloredText('TrackBosses', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const serverList = await fetch.serverNames()
  const wasUpdated = await task.checkForPageUpdates(serverList)

  if (wasUpdated) {
    await task.scrapEachServerKillStatistics(serverList)

    const bossDistributions = await task.generateBossDistributions()

    await task.calculateBossChances({
      serverList,
      bossDistributions,
    })

    await task.revalidatePages(serverList)
  } else {
    broadcast(`No fresh data was found.`, 'control')
  }

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
