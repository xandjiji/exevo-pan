import { randomDataset } from 'utils/test'
import AuctionsClient from '..'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

const { characterData } = randomDataset()

describe('AuctionsClient()', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
  })

  test('fetchHighlightedAuctions() should build server options correctly', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: async () => characterData,
    } as Response)

    const result = await AuctionsClient.fetchHighlightedAuctions()

    const currentTimestamp = +new Date() / 1000
    result.forEach(({ auctionEnd }) => {
      expect(auctionEnd >= currentTimestamp).toBeTruthy()
    })

    const filteredOutAuctions = characterData.reduce(
      (acc, { auctionEnd }) => (auctionEnd < currentTimestamp ? acc + 1 : acc),
      0,
    )

    expect(result).toHaveLength(characterData.length - filteredOutAuctions)
  })
})
