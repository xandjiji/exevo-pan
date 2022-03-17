import { setup, randomDataset } from 'utils/test'
import { priceMap as mountPrices } from 'data-dictionary/dist/dictionaries/storeMount'
import { priceMap as outfitPrices } from 'data-dictionary/dist/dictionaries/storeOutfit'
import getHirelingsValue from '../hirelings'
import getStoreItemValue from '../storeItems'
import getCosmeticsValue from '../cosmetics'

const { characterData } = randomDataset()

describe('getHirelingsValue()', () => {
  const mockedFetch = setup.fetch()

  beforeEach(() => {
    mockedFetch.mockClear()
    mockedFetch.mockResolvedValue({} as Response)

    setup.setTimeout()
  })

  describe('getHirelingsValue()', () => {
    test('should calculate all values correctly', () => {
      expect(getHirelingsValue({ count: 0, jobs: 0, outfits: 0 })).toEqual(0)

      expect(getHirelingsValue({ count: 4, jobs: 0, outfits: 0 })).toEqual(600)

      expect(getHirelingsValue({ count: 0, jobs: 1, outfits: 0 })).toEqual(250)
      expect(getHirelingsValue({ count: 0, jobs: 3, outfits: 0 })).toEqual(750)
      expect(getHirelingsValue({ count: 0, jobs: 4, outfits: 0 })).toEqual(1650)

      expect(getHirelingsValue({ count: 0, jobs: 0, outfits: 1 })).toEqual(300)
      expect(getHirelingsValue({ count: 0, jobs: 0, outfits: 2 })).toEqual(800)
      expect(getHirelingsValue({ count: 0, jobs: 0, outfits: 5 })).toEqual(2300)

      expect(getHirelingsValue({ count: 0, jobs: 0, outfits: 6 })).toEqual(3200)
      expect(getHirelingsValue({ count: 0, jobs: 0, outfits: 7 })).toEqual(4100)

      expect(getHirelingsValue({ count: 4, jobs: 4, outfits: 7 })).toEqual(
        600 + 1650 + 4100,
      )
    })
  })

  describe('getCosmeticsValue()', () => {
    test('should calculate all values correctly', () => {
      characterData.forEach((character) => {
        const { storeMounts, storeOutfits } = character
        let sum = 0

        storeMounts.forEach((mountName) => {
          const foundPrice = mountPrices[mountName]
          if (foundPrice) sum += foundPrice
        })

        storeOutfits.forEach(({ name }) => {
          const foundPrice = outfitPrices[name]
          if (foundPrice) sum += foundPrice
        })

        expect(getCosmeticsValue(character, character.id)).toEqual(sum)
      })
    })

    describe("if an item isn't found, it should call NotifyErrorClient", () => {
      test('for mount', async () => {
        const [character] = characterData
        character.storeMounts = ['weird mount']
        getCosmeticsValue(character, character.id)

        await expect(mockedFetch).toHaveBeenCalledTimes(1)
      })

      test('for outfit', async () => {
        const [, character] = characterData
        character.storeOutfits = [{ name: 'weird outfit', type: 3 }]
        getCosmeticsValue(character, character.id)

        await expect(mockedFetch).toHaveBeenCalledTimes(1)
      })
    })
  })
})
