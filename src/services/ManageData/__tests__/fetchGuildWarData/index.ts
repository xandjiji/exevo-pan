import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { endpoints, paths, localStorageKeys } from 'Constants'
import ManageDataClient from '../..'
import { mockedMiniPuneMembers, mockedPuneMembers } from './mock'

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

describe('services/fetchGuildWarData', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()
    mockedGetFromLocalStorage.mockClear()
    mockedSaveToLocalStorage.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedMiniPuneMembers,
    } as Response)
  })

  test('on SUCCESS, should fetch data', async () => {
    const result = await ManageDataClient.fetchGuildWarData('Libertabra Pune')

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      `${endpoints.WAR_DATA}${paths.PUNE_DATA}`,
    )

    expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      localStorageKeys.PUNE_GUILD_DATA,
      mockedPuneMembers,
    )

    expect(result).toEqual(mockedPuneMembers)
  })

  test('on ERROR, should get data from localStorage', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)
    mockedGetFromLocalStorage.mockReturnValueOnce(mockedPuneMembers)

    const result = await ManageDataClient.fetchGuildWarData('Libertabra Pune')
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
      localStorageKeys.PUNE_GUILD_DATA,
      [],
    )
    expect(result).toEqual(mockedPuneMembers)
  })
})
