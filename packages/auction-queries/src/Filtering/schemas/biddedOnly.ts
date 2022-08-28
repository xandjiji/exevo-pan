const filterSkip: FilterSkip = ({ biddedOnly }): boolean => !biddedOnly

const filterTest: FilterTest =
  () =>
  ({ hasBeenBidded }): boolean =>
    hasBeenBidded

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
