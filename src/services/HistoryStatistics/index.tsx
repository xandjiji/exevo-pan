import { endpoints, paths } from 'Constants'
import { EMPTY_STATISTICS } from './schema'

export default class HistoryStatisticsClient {
  static statisticsDataUrl = `${endpoints.STATIC_DATA}${paths.OVERALL_STATISTICS}`

  static async fetchStatisticsData(): Promise<StatisticsData> {
    try {
      const response = await fetch(this.statisticsDataUrl)
      const data: StatisticsData = await response.json()

      return data
    } catch (error: unknown) {
      console.log(error)
      return EMPTY_STATISTICS
    }
  }
}
