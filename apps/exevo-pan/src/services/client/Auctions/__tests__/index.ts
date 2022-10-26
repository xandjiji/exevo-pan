import { filterActiveHighlights } from '../utils'
import { activeAuctions, inactiveAuctions } from './mock'

describe('filterActiveHighlights()', () => {
  test('should filter out inactive and repeated auctions', async () => {
    const result = filterActiveHighlights([
      ...activeAuctions,
      ...inactiveAuctions,
      ...activeAuctions,
    ])

    const expectedResult = new Set(activeAuctions.map(({ id }) => id))

    expect(result).toEqual(expectedResult)
  })
})
