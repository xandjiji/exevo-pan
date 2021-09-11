import { get, set } from 'idb-keyval'
import { getFromLocalStorage, saveToLocalStorage } from 'utils'
import { endpoints, localStorageKeys } from 'Constants'
import {
  buildCharacterData,
  filterItemData,
  checkAndHash,
  unminifyGuildData,
} from '../../utils'
import {
  pastMiniAuction,
  futureMiniAuction,
  pastPartialAuction,
  futurePartialAuction,
  mockedMembersData,
} from './mock'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

jest.mock('utils', () => ({
  getFromLocalStorage: jest.fn(),
  saveToLocalStorage: jest.fn(),
}))

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
}))

const mockedGetFromLocalStorage = getFromLocalStorage as jest.MockedFunction<
  typeof getFromLocalStorage
>
const mockedSaveToLocalStorage = saveToLocalStorage as jest.MockedFunction<
  typeof saveToLocalStorage
>

const mockedGet = get as jest.MockedFunction<typeof get>
const mockedSet = set as jest.MockedFunction<typeof set>

describe('utils/', () => {
  test('buildCharacterData()', () => {
    expect(
      buildCharacterData([pastMiniAuction, pastMiniAuction, pastMiniAuction]),
    ).toEqual([])

    expect(
      buildCharacterData([
        pastMiniAuction,
        pastMiniAuction,
        pastMiniAuction,
        futureMiniAuction,
      ]),
    ).toEqual([futurePartialAuction])

    expect(
      buildCharacterData([
        pastMiniAuction,
        futureMiniAuction,
        futureMiniAuction,
      ]),
    ).toEqual([futurePartialAuction, futurePartialAuction])

    expect(buildCharacterData([futureMiniAuction, futureMiniAuction])).toEqual([
      futurePartialAuction,
      futurePartialAuction,
    ])

    expect(buildCharacterData([futureMiniAuction])).toEqual([
      futurePartialAuction,
    ])
  })

  test('filterItemData()', () => {
    expect(
      filterItemData({
        "Test item's": [1233123],
        'Blue Tome': [],
        BlueRobe: [123, 123],
        BallGown: [],
      }),
    ).toEqual({ "Test item's": [1233123], BlueRobe: [123, 123] })

    expect(filterItemData({})).toEqual({})

    expect(
      filterItemData({
        "Test item's": [1233123],
        BlueRobe: [123, 123],
      }),
    ).toEqual({ "Test item's": [1233123], BlueRobe: [123, 123] })

    expect(
      filterItemData({
        'Blue Tome': [],
        BallGown: [],
      }),
    ).toEqual({})
  })

  describe('checkAndHash()', () => {
    beforeEach(() => {
      mockedGetFromLocalStorage.mockClear()
    })

    test('on equal hash, should fetch and return data from DB', async () => {
      mockedGetFromLocalStorage.mockReturnValueOnce(111111)
      mockedGet.mockResolvedValue(
        JSON.stringify([pastMiniAuction, futureMiniAuction]),
      )
      const result = await checkAndHash(111111, 5)

      expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
      expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
        `${localStorageKeys.HISTORY_HASH_PREFIX}${5}`,
        0,
      )
      expect(result).toEqual([pastPartialAuction, futurePartialAuction])
    })

    test('on different hash, should fetch data from endpoint, build DB, save new hash in localStorage and return the data', async () => {
      mockedGetFromLocalStorage.mockReturnValueOnce(22222)
      mockedFetch.mockResolvedValue({
        json: async () => [pastMiniAuction, futureMiniAuction],
      } as Response)

      const result = await checkAndHash(111111, 5)

      expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1)
      expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
        `${localStorageKeys.HISTORY_HASH_PREFIX}${5}`,
        0,
      )

      expect(mockedFetch).toHaveBeenCalledTimes(1)
      expect(mockedFetch).toHaveBeenCalledWith(
        `${endpoints.BASE_HISTORY_DATA}/${
          localStorageKeys.HISTORY_DATA_PREFIX
        }${5}.json`,
      )

      expect(mockedSet).toHaveBeenCalledTimes(1)
      expect(mockedSet).toHaveBeenCalledWith(
        `${localStorageKeys.HISTORY_DATA_PREFIX}${5}`,
        JSON.stringify([pastMiniAuction, futureMiniAuction]),
      )

      expect(mockedSaveToLocalStorage).toHaveBeenCalledTimes(1)
      expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
        `${localStorageKeys.HISTORY_HASH_PREFIX}${5}`,
        111111,
      )

      expect(result).toEqual([pastPartialAuction, futurePartialAuction])
    })
  })

  test('unminifyGuildData()', () => {
    expect(
      unminifyGuildData(
        mockedMembersData.miniPuneMembersData,
        'Libertabra Pune',
        0,
      ),
    ).toEqual(mockedMembersData.puneMembersData)
  })
})
