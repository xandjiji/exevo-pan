import { buildCharacterData, filterItemData } from '../../utils'
import {
  pastMiniAuction,
  futureMiniAuction,
  futurePartialAuction,
} from './mock'

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
})
