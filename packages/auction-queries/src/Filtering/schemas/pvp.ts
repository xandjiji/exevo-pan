const filterSkip: FilterSkip = ({ pvp }): boolean => pvp.size === 0

const filterTest: FilterTest =
  ({ pvp }) =>
  ({ server }): boolean =>
    pvp.has(server.pvpType)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
