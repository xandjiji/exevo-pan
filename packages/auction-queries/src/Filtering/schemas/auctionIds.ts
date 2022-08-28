const filterSkip: FilterSkip = ({ auctionIds }): boolean =>
  auctionIds.size === 0

const filterTest: FilterTest =
  ({ auctionIds }) =>
  ({ id }): boolean =>
    auctionIds.has(id)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
