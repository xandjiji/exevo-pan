import { broadcast } from 'logging'
import { fetchServerNames } from './utils'
import {
  scrapEachServerKillStatistics,
  generateBossDistributions,
  calculateBossChances,
} from './tasks'

const main = async (): Promise<void> => {
  broadcast('Fetching server names...', 'neutral')

  const serverList = await fetchServerNames()

  await scrapEachServerKillStatistics(serverList)

  const bossDistributions = await generateBossDistributions()

  await calculateBossChances(serverList, bossDistributions)
}

export default main
