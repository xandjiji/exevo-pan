import { readableCurrentDate } from 'utils'
import ManageDataClient from '../..'
import { mockedHighlightedAuctionData } from './mock'

global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('services/HighlightedAuctions', () => {
  beforeEach(async () => {
    mockedFetch.mockClear()

    mockedFetch.mockResolvedValue({
      json: async () => mockedHighlightedAuctionData,
    } as Response)
  })

  test('on SUCCESS, should return filtered auctions', async () => {
    const result = await ManageDataClient.fetchHighlightedAuctions()

    const currentDate = readableCurrentDate()

    expect(
      result.every((highlightedAuction) =>
        highlightedAuction.days.some((date) => date === currentDate),
      ),
    ).toBeTruthy()
  })

  test('on ERROR, should return an empty array', async () => {
    mockedFetch.mockRejectedValueOnce(undefined)

    const result = await ManageDataClient.fetchHighlightedAuctions()

    expect(result).toEqual([])
  })
})
