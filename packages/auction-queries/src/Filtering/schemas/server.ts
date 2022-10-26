const filterSkip: FilterSkip = ({ serverSet }): boolean => serverSet.size === 0

const filterTest: FilterTest =
  ({ serverSet }) =>
  ({ server }): boolean =>
    serverSet.has(server.serverName)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
