import { buildCharacterData } from '../../utils'
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
})
