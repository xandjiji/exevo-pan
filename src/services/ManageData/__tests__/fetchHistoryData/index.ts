import { endpoints, paths } from 'Constants'
import ManageDataClient from '../..'
import { checkAndHash, getPercentage } from '../../utils'
import {
  mockedHashData,
  oldAuction,
  normalAuction,
  futureAuction,
  sortedAuctions,
} from './mock'

global.fetch = jest.fn()
global.console.log = jest.fn()

jest.mock('../../utils', () => ({
  checkAndHash: jest.fn(),
  getPercentage: jest.fn(),
}))

const mockedCheckAndHash = checkAndHash as jest.MockedFunction<
  typeof checkAndHash
>

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>
const mockedGetPercentage = getPercentage as jest.MockedFunction<
  typeof getPercentage
>

const mockedLoadProgress = jest.fn()

describe('services/HistoryData', () => {
  test('on SUCCESS, should fetch data', async () => {
    mockedFetch.mockResolvedValue({
      json: async () => mockedHashData,
    } as Response)

    mockedCheckAndHash
      .mockResolvedValueOnce([normalAuction])
      .mockResolvedValueOnce([futureAuction])
      .mockResolvedValueOnce([oldAuction])

    const result = await ManageDataClient.fetchHistoryData(mockedLoadProgress)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${endpoints.BASE_HISTORY_DATA}${paths.HISTORY_HASH}`,
    )

    expect(mockedLoadProgress).toHaveBeenCalledTimes(3)
    expect(mockedGetPercentage).toHaveBeenCalledTimes(3)
    expect(mockedGetPercentage).toHaveBeenNthCalledWith(1, 0, 3)
    expect(mockedGetPercentage).toHaveBeenNthCalledWith(2, 1, 3)
    expect(mockedGetPercentage).toHaveBeenNthCalledWith(3, 2, 3)

    expect(result).toEqual(sortedAuctions)
  })

  test('on ERROR, should return an empty array', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)

    const result = await ManageDataClient.fetchHistoryData(mockedLoadProgress)
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })
})
