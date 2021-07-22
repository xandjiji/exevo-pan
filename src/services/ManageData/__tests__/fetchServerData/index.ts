import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { endpoints, SERVER_DATA_PATH, SERVER_DATA_KEY } from 'Constants'
import ManageDataClient from '../..'
import { mockedFetchData, mockedSuccessReturnedValue } from './mock'

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

describe('services/ServerData', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()
    mockedGetFromLocalStorage.mockClear()
    mockedSaveToLocalStorage.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedFetchData,
    } as Response)
  })

  test('on SUCCESS, should fetch data', async () => {
    const result = await ManageDataClient.fetchServerData()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${endpoints.BASE_DATA}${SERVER_DATA_PATH}`,
    )

    expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      SERVER_DATA_KEY,
      mockedSuccessReturnedValue,
    )

    expect(result).toEqual(mockedSuccessReturnedValue)
  })

  test('on ERROR, should get data from localStorage', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)
    mockedGetFromLocalStorage.mockReturnValueOnce([
      ...mockedSuccessReturnedValue,
      ...mockedSuccessReturnedValue,
    ])

    const result = await ManageDataClient.fetchServerData()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(SERVER_DATA_KEY, [])
    expect(result).toEqual([
      ...mockedSuccessReturnedValue,
      ...mockedSuccessReturnedValue,
    ])
  })
})
