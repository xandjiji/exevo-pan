import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ minBid, maxBid }): boolean =>
  minBid === DEFAULT_FILTER_OPTIONS.minBid &&
  maxBid === DEFAULT_FILTER_OPTIONS.maxBid

const filterTest: FilterTest =
  ({ minBid, maxBid }) =>
  ({ currentBid }): boolean =>
    currentBid >= minBid && currentBid <= maxBid

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
