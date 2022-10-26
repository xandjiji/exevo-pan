const filterSkip: FilterSkip = ({ battleye }): boolean => battleye.size === 0

const filterTest: FilterTest =
  ({ battleye }) =>
  ({ server }): boolean =>
    battleye.has(server.battleye)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
