const filterSkip: FilterSkip = ({ serverSet }): boolean => serverSet.size === 0

const filterTest: FilterTest =
  ({ serverSet }) =>
  ({ serverData }): boolean =>
    serverSet.has(serverData.serverName)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
