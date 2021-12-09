// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker'
import { rareItem } from 'DataDictionary/dictionaries'
import { randomAuctionId } from './CharacterMaker'
import { samplesFrom } from '../utils'

const getIdsFromAuctions = (auctions: CharacterObject[]) =>
  samplesFrom(auctions)
    .slice(faker.datatype.number({ min: 0, max: 3 }))
    .map(({ id }) => id)

export const randomItemData = (auctions?: CharacterObject[]): RareItemData => {
  const itemData: RareItemData = {}

  rareItem.tokens.forEach((item) => {
    if (faker.datatype.boolean()) {
      itemData[item] = []
    } else {
      const auctionIds: number[] = auctions
        ? (itemData[item] = getIdsFromAuctions(auctions))
        : Array.from({ length: 8 }, randomAuctionId).slice(
            faker.datatype.number({ min: 0, max: 3 }),
          )

      itemData[item] = auctionIds
    }
  })

  return itemData
}
