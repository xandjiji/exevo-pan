const filterSkip: FilterSkip = ({ vocation }): boolean => vocation.size === 0

const filterTest: FilterTest =
  ({ vocation }) =>
  ({ vocationId }): boolean =>
    vocation.has(vocationId)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
