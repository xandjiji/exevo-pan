import { randomDataset, setup } from 'utils/test'
import { DrawerFieldsClient } from '..'

const mockedFetch = setup.fetch()

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

    const keys = Object.keys(result)

    keys.forEach((name) => {
      expect(itemData[name]).not.toHaveLength(0)
    })

    Object.keys(itemData).forEach((itemName) => {
      const auctions = itemData[itemName]

      if (auctions.length > 0) {
        expect(keys.some((name) => name === itemName)).toBeTruthy()
      } else {
        expect(keys.some((name) => name === itemName)).toBeFalsy()
      }
    })

    const auctionedItemsCount = Object.values(itemData).reduce(
      (acc, auctionArray) => (auctionArray.length ? acc + 1 : acc),
      0,
    )

    expect(keys).toHaveLength(auctionedItemsCount)
  })
})
