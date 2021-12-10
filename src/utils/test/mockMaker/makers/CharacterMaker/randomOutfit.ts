// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { outfit, storeOutfit } from 'DataDictionary/dictionaries'
import { auctions } from '../../constants'
import { singleSampleFrom, samplesFrom } from '../../utils'

const allOutfits = [...outfit.outfits, ...storeOutfit.outfits]

export const randomOutfitId = (sex: boolean): string =>
  `${
    singleSampleFrom(allOutfits).id[sex ? 'female' : 'male']
  }_${faker.datatype.number({
    min: auctions.outfit.addon.MIN,
    max: auctions.outfit.addon.MAX,
  })}`

export const randomOutfits = (): Outfit[] =>
  samplesFrom(
    outfit.outfits,
    faker.datatype.number({
      min: auctions.outfit.regular.MIN,
      max: auctions.outfit.regular.MAX,
    }),
  ).map(({ name }) => ({
    name,
    type: faker.datatype.number({
      min: auctions.outfit.addon.MIN,
      max: auctions.outfit.addon.MAX,
    }),
  }))

export const randomStoreOutfits = (): Outfit[] =>
  samplesFrom(
    storeOutfit.outfits,
    faker.datatype.number({
      min: auctions.outfit.store.MIN,
      max: auctions.outfit.store.MAX,
    }),
  ).map(({ name }) => ({ name, type: auctions.outfit.addon.MAX }))
