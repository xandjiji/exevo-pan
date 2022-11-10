import { broadcast } from 'logging'
import { fetchServerNames } from './utils'
import * as task from './tasks'

const main = async (): Promise<void> => {
  broadcast('Fetching server names...', 'neutral')

  const serverList = await fetchServerNames()

  const wasUpdated = await task.scrapEachServerKillStatistics(serverList)

  const bossDistributions = await task.generateBossDistributions()

  await task.calculateBossChances({ serverList, bossDistributions, wasUpdated })

  if (wasUpdated) {
    await task.revalidatePages(serverList)
  }
}

export default main
