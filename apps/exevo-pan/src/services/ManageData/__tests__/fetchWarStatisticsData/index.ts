import { setup } from 'utils/test'
import { endpoints, paths, localStorageKeys } from 'Constants'
import ManageDataClient from '../..'
import { mockedWarStatistics } from './mock'

global.console.log = jest.fn()

const mockedFetch = setup.fetch()
const mockedGetFromLocalStorage = setup.getFromLocalStorage()
const mockedSaveToLocalStorage = setup.saveToLocalStorage()

describe('services/fetchWarStatisticsData', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()
    mockedGetFromLocalStorage.mockClear()
    mockedSaveToLocalStorage.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedWarStatistics,
    } as Response)
  })

  test('on SUCCESS, should fetch data', async () => {
    const result = await ManageDataClient.fetchWarStatisticsData()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${endpoints.WAR_DATA}${paths.WAR_STATISTICS}`,
    )

    expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      localStorageKeys.WAR_STATISTICS_DATA,
      mockedWarStatistics,
    )

    expect(result).toEqual(mockedWarStatistics)
  })

  test('on ERROR, should get data from localStorage', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)
    mockedGetFromLocalStorage.mockReturnValueOnce(mockedWarStatistics)

    const result = await ManageDataClient.fetchWarStatisticsData()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
      localStorageKeys.WAR_STATISTICS_DATA,
      {},
    )
    expect(result).toEqual(mockedWarStatistics)
  })
})
