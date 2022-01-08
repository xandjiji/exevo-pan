const filterSkip: FilterSkip = ({ pvp }): boolean => pvp.size === 0

const filterTest: FilterTest =
  ({ pvp }) =>
  ({ serverData }): boolean =>
    pvp.has(serverData.pvpType.type as PvpOptions)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
