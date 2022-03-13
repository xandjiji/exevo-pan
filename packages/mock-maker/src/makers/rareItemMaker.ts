import * as faker from 'faker'
import * as rareItem from 'data-dictionary/dist/dictionaries/rareItems'
import { randomAuctionId } from './CharacterMaker'
import { rareItems } from '../constants'
import { samplesFrom, randomRange, randomArrayFrom } from '../utils'

const getIdsFromAuctions = (auctions: CharacterObject[]) =>
  samplesFrom(auctions)
    .slice(randomRange(rareItems.auctions))
    .map(({ id }) => id)

export const randomItemData = (auctions?: CharacterObject[]): RareItemData => {
  const itemData: RareItemData = {}

  rareItem.tokens.forEach((item) => {
    if (faker.datatype.boolean()) {
      itemData[item] = []
    } else {
      const auctionIds: number[] = auctions
        ? (itemData[item] = getIdsFromAuctions(auctions))
        : randomArrayFrom(rareItems.auctions, randomAuctionId)

      itemData[item] = auctionIds
    }
  })

  return itemData
}
