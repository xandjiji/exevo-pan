/* import { randomDataset } from 'mock-maker/dist/index' */
import getHirelingsValue from '../hirelings'
import getStoreItemValue from '../storeItems'
import getCosmeticsValue from '../cosmetics'

/* const { characterData } = randomDataset() */

describe('getHirelingsValue()', () => {
  test('getHirelingsValue() should calculate all values correctly', () => {
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
