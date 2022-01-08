import * as faker from 'faker'
import * as rareItem from 'data-dictionary/dist/dictionaries/rareItems'
import { randomAuctionId } from './CharacterMaker'
import { rareItems } from '../constants'
import { samplesFrom } from '../utils'

const getIdsFromAuctions = (auctions: CharacterObject[]) =>
  samplesFrom(auctions)
    .slice(
      faker.datatype.number({
        min: rareItems.auctions.MIN,
        max: rareItems.auctions.MAX,
      }),
    )
    .map(({ id }) => id)

export const randomItemData = (auctions?: CharacterObject[]): RareItemData => {
  const itemData: RareItemData = {}

  rareItem.tokens.forEach((item) => {
    if (faker.datatype.boolean()) {
      itemData[item] = []
    } else {
      const auctionIds: number[] = auctions
        ? (itemData[item] = getIdsFromAuctions(auctions))
        : Array.from(
            {
              length: faker.datatype.number({
                min: rareItems.auctions.MIN,
                max: rareItems.auctions.MAX,
              }),
            },
            randomAuctionId,
          )

      itemData[item] = auctionIds
    }
  })

  return itemData
}
