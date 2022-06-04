import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ minPrice, maxPrice }): boolean =>
  minPrice === DEFAULT_FILTER_OPTIONS.minPrice &&
  maxPrice === DEFAULT_FILTER_OPTIONS.maxPrice

const filterTest: FilterTest =
  ({ minPrice, maxPrice }) =>
  ({ currentBid }): boolean =>
    currentBid >= minPrice && currentBid <= maxPrice

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
