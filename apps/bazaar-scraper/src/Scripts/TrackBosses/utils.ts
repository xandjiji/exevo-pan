import { HttpClient } from 'services'
import { KillStatistics } from 'Helpers'
import { retryWrapper } from 'utils'

export const KILL_STATISTICS_BASE_URL =
  'https://www.tibia.com/community/?subtopic=killstatistics'

export const fetchServerNames = retryWrapper(async () => {
  const helper = new KillStatistics()
  return helper.servers(await HttpClient.getHtml(KILL_STATISTICS_BASE_URL))
})
