import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import {
  BASE_DATA_ENDPOINT,
  ITEMS_DATA_PATH,
  RARE_ITEM_DATA_KEY,
} from 'Constants'
import ManageDataClient from '../..'
import { mockedRareItemData, filteredRareItemData } from './mock'

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

describe('services/fetchItemData', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()
    mockedGetFromLocalStorage.mockClear()
    mockedSaveToLocalStorage.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedRareItemData,
    } as Response)
  })

  test('on SUCCESS, should fetch and filter data', async () => {
    const result = await ManageDataClient.fetchItemData()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_DATA_ENDPOINT}${ITEMS_DATA_PATH}`,
    )

    expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      RARE_ITEM_DATA_KEY,
      filteredRareItemData,
    )

    expect(result).toEqual(filteredRareItemData)
  })

  test('on ERROR, should get data from localStorage', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)
    mockedGetFromLocalStorage.mockReturnValueOnce(filteredRareItemData)

    const result = await ManageDataClient.fetchItemData()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
      RARE_ITEM_DATA_KEY,
      {},
    )
    expect(result).toEqual(filteredRareItemData)
  })
})
