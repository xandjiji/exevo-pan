import { broadcast } from 'logging'
import { fetchServerNames } from './utils'
import { scrapEachServerKillStatistics } from './tasks'

const main = async (): Promise<void> => {
  broadcast('Fetching server names...', 'neutral')

  const serverList = await fetchServerNames()

  await scrapEachServerKillStatistics(serverList)
}

export default main
