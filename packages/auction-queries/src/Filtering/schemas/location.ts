const filterSkip: FilterSkip = ({ location }): boolean => location.size === 0

const filterTest: FilterTest =
  ({ location }) =>
  ({ server }): boolean =>
    location.has(server.serverLocation)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
