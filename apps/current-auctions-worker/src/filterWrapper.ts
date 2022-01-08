import { filterCharacters as baseFilterCharacters } from 'auction-queries'
import { items } from './Data/items'

const filterAuctionsByRareItem = (
  auctions: CharacterObject[],
  itemSet: Set<string>,
) => {
  const rareItemKeys = [...itemSet]
  const auctionsWithRareItems = rareItemKeys
    .map((itemKey) => items[itemKey])
    .flat()

  const rareItemAuctionsIdSet = new Set<number>(auctionsWithRareItems)

  return auctions.filter(({ id }) => rareItemAuctionsIdSet.has(id))
}

export const filterCharacters: typeof baseFilterCharacters = ({
  auctions,
  filters,
}) => {
  try {
    if (filters.itemSet.size > 0) {
      const filteredByItem = filterAuctionsByRareItem(auctions, filters.itemSet)
      return baseFilterCharacters({ auctions: filteredByItem, filters })
    }

    return baseFilterCharacters({ auctions, filters })
  } catch {
    return []
  }
}
