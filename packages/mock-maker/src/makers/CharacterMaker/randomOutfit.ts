import * as outfit from 'data-dictionary/dist/dictionaries/outfit'
import * as storeOutfit from 'data-dictionary/dist/dictionaries/storeOutfit'
import { auctions } from '../../constants'
import { singleSampleFrom, samplesFrom, randomRange } from '../../utils'

const allOutfits = [...outfit.outfits, ...storeOutfit.outfits]

export const randomOutfitId = (sex: boolean): string =>
  `${singleSampleFrom(allOutfits).id[sex ? 'female' : 'male']}_${randomRange(
    auctions.outfit.addon,
  )})}`

export const randomOutfits = (): Outfit[] =>
  samplesFrom(outfit.outfits, randomRange(auctions.outfit.regular)).map(
    ({ name }) => ({
      name,
      type: randomRange(auctions.outfit.addon),
    }),
  )

export const randomStoreOutfits = (): Outfit[] =>
  samplesFrom(storeOutfit.outfits, randomRange(auctions.outfit.store)).map(
    ({ name }) => ({ name, type: auctions.outfit.addon.max }),
  )
