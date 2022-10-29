import { prisma } from '../../prisma'
import { EMPTY_STATISTICS } from './schema'

export default class HistoryStatisticsClient {
  static async fetchStatisticsData(): Promise<StatisticsData> {
    try {
      const response = await prisma.historyStatistics.findFirst()

      if (!response) throw Error('No history statistics were found')

      return JSON.parse(response.jsonData)
    } catch (error) {
      return EMPTY_STATISTICS
    }
  }
}
