import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { endpoints, paths, AUCTION_CHARACTER_DATA_KEY } from 'Constants'
import ManageDataClient from '../..'
import { mockedMinifiedData, mockedBuildedData } from './mock'

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

jest
  .spyOn(global, 'Date')
  .mockImplementationOnce(() => new Date('1999-1-1').toDateString())

describe('services/CharacterData', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()
    mockedGetFromLocalStorage.mockClear()
    mockedSaveToLocalStorage.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedMinifiedData,
    } as Response)
  })

  test('on SUCCESS, should fetch data', async () => {
    const result = await ManageDataClient.fetchCharacterData()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${endpoints.BASE_DATA}${paths.CHARACTER_DATA}`,
    )

    expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      AUCTION_CHARACTER_DATA_KEY,
      mockedBuildedData,
    )

    expect(result).toEqual(mockedBuildedData)
  })

  test('on ERROR, should get data from localStorage', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)
    mockedGetFromLocalStorage.mockReturnValueOnce(mockedBuildedData)

    const result = await ManageDataClient.fetchCharacterData()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
      AUCTION_CHARACTER_DATA_KEY,
      [],
    )
    expect(result).toEqual(mockedBuildedData)
  })
})
