const filterSkip: FilterSkip = ({ location }): boolean => location.size === 0

const filterTest: FilterTest =
  ({ location }) =>
  ({ serverData }): boolean =>
    location.has(serverData.serverLocation.type)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
