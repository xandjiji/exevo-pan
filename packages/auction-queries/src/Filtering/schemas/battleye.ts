const filterSkip: FilterSkip = ({ battleye }): boolean => battleye.size === 0

const filterTest: FilterTest =
  ({ battleye }) =>
  ({ serverData }): boolean =>
    battleye.has(serverData.battleye)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
