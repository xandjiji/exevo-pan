import * as schema from './schemas'
import { AuctionTest, FilterCharactersOptions } from './types'

const filterSchema = Object.values(schema).filter(
  (item) => typeof item !== 'boolean',
)

const buildFilters = (filters: FilterOptions): AuctionTest => {
  const filterTests = filterSchema
    .filter(({ filterSkip }) => !filterSkip(filters))
    .map(({ filterTest }) => filterTest(filters))

  return (auction: CharacterObject) =>
    filterTests.every((test) => test(auction))
}

export const filterCharacters = ({
  auctions,
  filters,
}: FilterCharactersOptions): CharacterObject[] => {
  try {
    const builtFilters = buildFilters(filters)
    return auctions.filter(builtFilters)
  } catch {
    return []
  }
}
