import { randomDataset } from 'utils/test'
import DrawerFieldsClient from '..'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

const { rawServerData, serverData, itemData } = randomDataset()

describe('DrawerFieldsClient()', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
  })

  test('fetchServerOptions() should build server options correctly', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: async () => rawServerData,
    } as Response)

    const result = await DrawerFieldsClient.fetchServerOptions()

    serverData.forEach(({ serverName }) => {
      expect(
        result.find(
          ({ name, value }) => name === serverName && value === serverName,
        ),
      ).toBeTruthy()
    })

    result.forEach(({ name, value }) => {
      expect(
        serverData.find(
          ({ serverName }) => name === serverName && value === serverName,
        ),
      ).toBeTruthy()
    })

    expect(serverData).toHaveLength(result.length)
  })

  test('fetchAuctionedItemOptions() should build rare item options correctly', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: async () => itemData,
    } as Response)

    const result = await DrawerFieldsClient.fetchAuctionedItemOptions()

    result.forEach(({ name, value }) => {
      expect(name === value).toBeTruthy()
      expect(itemData[name]).not.toHaveLength(0)
    })

    Object.keys(itemData).forEach((itemName) => {
      const auctions = itemData[itemName]

      if (auctions.length > 0) {
        expect(result.some(({ name }) => name === itemName)).toBeTruthy()
      } else {
        expect(result.some(({ name }) => name === itemName)).toBeFalsy()
      }
    })

    const auctionedItemsCount = Object.values(itemData).reduce(
      (acc, auctionArray) => (auctionArray.length ? acc + 1 : acc),
      0,
    )

    expect(result).toHaveLength(auctionedItemsCount)
  })
})
