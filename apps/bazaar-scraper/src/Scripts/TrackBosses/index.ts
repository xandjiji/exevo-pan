import ScrapServers from 'Scripts/ScrapServers'
import * as task from './tasks'

const main = async (): Promise<void> => {
  const { activeServers } = await ScrapServers()

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
}

export default main
