const filterSkip: FilterSkip = ({ transferAvailable }): boolean =>
  !transferAvailable

const filterTest: FilterTest =
  () =>
  ({ transfer }): boolean =>
    transfer

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
