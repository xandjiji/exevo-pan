import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import ServerDataClient from '..'
import { BASE_DATA_ENDPOINT, SERVER_DATA_PATH } from '../../../constants'
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

    mockedFetch.mockResolvedValueOnce({
      json: async () => mockedFetchData,
    } as Response)

    await ServerDataClient.fetch()
  })

  test('should call fetch with the right parameters', () => {
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_DATA_ENDPOINT}${SERVER_DATA_PATH}`,
    )
  })

  test('should call saveToLocalStorage with the right parameters', () => {
    expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      'serverData',
      mockedSuccessReturnedValue,
    )
  })

  test('on success, should return with the correct value', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: async () => mockedFetchData,
    } as Response)
    const result = await ServerDataClient.fetch()
    expect(result).toEqual(mockedSuccessReturnedValue)
  })

  test('on error, should get data from localStorage', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)
    mockedGetFromLocalStorage.mockReturnValueOnce([
      ...mockedSuccessReturnedValue,
      ...mockedSuccessReturnedValue,
    ])

    const result = await ServerDataClient.fetch()
    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith('serverData', [])
    expect(result).toEqual([
      ...mockedSuccessReturnedValue,
      ...mockedSuccessReturnedValue,
    ])
  })
})
