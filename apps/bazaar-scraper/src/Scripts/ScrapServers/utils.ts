import { HttpClient } from 'services'
import { KillStatistics } from 'Helpers'
import { retryWrapper } from 'utils'

const SERVER_LIST_URL = 'https://www.tibia.com/community/?subtopic=worlds'

export const fetchServerPage = retryWrapper(() =>
  HttpClient.getHtml(SERVER_LIST_URL),
)

export const KILL_STATISTICS_BASE_URL =
  'https://www.tibia.com/community/?subtopic=killstatistics'

export const fetchActiveServers = retryWrapper(async () => {
  const helper = new KillStatistics()
  return helper.servers(await HttpClient.getHtml(KILL_STATISTICS_BASE_URL))
})
