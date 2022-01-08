import { endpoints, paths } from 'Constants'
import HistoryStatisticsClient from '..'
import { EMPTY_STATISTICS } from '../schema'
import { mockedStatisticsData } from './mock'

global.fetch = jest.fn()
global.console.log = jest.fn()

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('services/StatisticsData', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedStatisticsData,
    } as Response)
  })

  test('on SUCCESS, should fetch data', async () => {
    const result = await HistoryStatisticsClient.fetchStatisticsData()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${endpoints.STATIC_DATA}${paths.OVERALL_STATISTICS}`,
    )

    expect(result).toEqual(mockedStatisticsData)
  })

  test('on ERROR, should return empty values', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)

    const result = await HistoryStatisticsClient.fetchStatisticsData()
    expect(global.console.log).toHaveBeenCalledTimes(1)

    expect(result).toEqual(EMPTY_STATISTICS)
  })
})
