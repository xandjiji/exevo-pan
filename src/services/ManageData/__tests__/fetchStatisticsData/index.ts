import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { endpoints, paths, localStorageKeys } from 'Constants'
import ManageDataClient from '../..'
import { mockedStatisticsData } from './mock'

global.fetch = jest.fn()
global.console.log = jest.fn()
jest.mock('utils', () => ({
  getFromLocalStorage: jest.fn(),
  saveToLocalStorage: jest.fn(),
}))

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>
const mockedGetFromLocalStorage = getFromLocalStorage as jest.MockedFunction<
  typeof getFromLocalStorage
>
const mockedSaveToLocalStorage = saveToLocalStorage as jest.MockedFunction<
  typeof saveToLocalStorage
>

describe('services/StatisticsData', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()
    mockedGetFromLocalStorage.mockClear()
    mockedSaveToLocalStorage.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedStatisticsData,
    } as Response)
  })

  test('on SUCCESS, should fetch data', async () => {
    const result = await ManageDataClient.fetchStatisticsData()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${endpoints.BASE_HISTORY_DATA}${paths.OVERALL_STATISTICS}`,
    )

    expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      localStorageKeys.STATISTICS_DATA,
      mockedStatisticsData,
    )

    expect(result).toEqual(mockedStatisticsData)
  })

  test('on ERROR, should get data from localStorage', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)
    mockedGetFromLocalStorage.mockReturnValueOnce(mockedStatisticsData)

    const result = await ManageDataClient.fetchStatisticsData()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
      localStorageKeys.STATISTICS_DATA,
      {},
    )
    expect(result).toEqual(mockedStatisticsData)
  })
})
