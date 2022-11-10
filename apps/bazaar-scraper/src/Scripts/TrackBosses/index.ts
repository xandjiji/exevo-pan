import { Timer, coloredText, broadcast } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import { executeShell } from 'utils'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('TrackBosses', 'highlight')
const DEPLOY_SCRIPT = `${__dirname}/deployStatic.sh`

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

    await executeShell(DEPLOY_SCRIPT)

    await task.revalidatePages(activeServers)

    broadcast(
      `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
      'success',
    )
  } else {
    broadcast(`No fresh data was found.`, 'control')
  }
}

export default main
