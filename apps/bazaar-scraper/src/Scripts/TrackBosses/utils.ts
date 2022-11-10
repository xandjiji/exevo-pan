import { HttpClient } from 'services'
import { retryWrapper } from 'utils'

export const KILL_STATISTICS_BASE_URL =
  'https://www.tibia.com/community/?subtopic=killstatistics'

export const fetch = {
  killStatisticsPage: retryWrapper((serverName: string) =>
    HttpClient.getHtml(`${KILL_STATISTICS_BASE_URL}&world=${serverName}`),
  ),
}
