import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import { executeShell } from 'utils'
import * as task from './tasks'

const DEPLOY_SCRIPT = `${__dirname}/deployStatic.sh`

const main = async (): Promise<void> => {
  const { activeServers } = await ScrapServers()

  const timer = new Timer()
  broadcast(`Manually updating boss statistics`, 'success')

  const bossDistributions = await task.generateBossDistributions()

  await task.calculateBossChances({
    activeServers,
    bossDistributions,
    wasUpdated: true,
    isTomorrow: false,
  })

  await executeShell(DEPLOY_SCRIPT)

  await task.revalidatePages(activeServers)

  broadcast(
    `Manually updated boss chances in ${timer.elapsedTime()}`,
    'success',
  )
}

main()
