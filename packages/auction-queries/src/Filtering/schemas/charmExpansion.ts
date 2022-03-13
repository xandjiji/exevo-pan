const filterSkip: FilterSkip = ({ charmExpansion }): boolean => !charmExpansion

const filterTest: FilterTest =
  () =>
  ({ charmInfo }): boolean =>
    charmInfo.expansion

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
