/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { randomDataset } from 'utils/test'
import { applySort } from '../applySort'

const { characterData } = randomDataset()

describe('applySort()', () => {
  describe('ascending', () => {
    test('should order by Auction End', () => {
      const result = applySort(characterData, 0, false)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.auctionEnd <= next.auctionEnd).toBeTruthy()
        }
      })
    })

    test('should order by Level', () => {
      const result = applySort(characterData, 1, false)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.level <= next.level).toBeTruthy()
        }
      })
    })

    test('should order by Price', () => {
      const result = applySort(characterData, 2, false)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.currentBid <= next.currentBid).toBeTruthy()
        }
      })
    })

    test('should order by Price (bidded only)', () => {
      const result = applySort(characterData, 3, false)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.currentBid <= next.currentBid).toBeTruthy()
        }
        expect(character.hasBeenBidded).toBeTruthy()
      })
    })
  })

  describe('descending', () => {
    test('should order by Auction End', () => {
      const result = applySort(characterData, 0, true)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.auctionEnd >= next.auctionEnd).toBeTruthy()
        }
      })
    })

    test('should order by Level', () => {
      const result = applySort(characterData, 1, true)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.level >= next.level).toBeTruthy()
        }
      })
    })

    test('should order by Price', () => {
      const result = applySort(characterData, 2, true)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.currentBid >= next.currentBid).toBeTruthy()
        }
      })
    })

    test('should order by Price (bidded only)', () => {
      const result = applySort(characterData, 3, true)

      result.forEach((character, index) => {
        const next = result[index + 1]
        if (next) {
          expect(character.currentBid >= next.currentBid).toBeTruthy()
        }
        expect(character.hasBeenBidded).toBeTruthy()
      })
    })
  })
})
