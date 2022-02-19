const filterSkip: FilterSkip = ({ hireling }): boolean => !hireling

const filterTest: FilterTest =
  () =>
  ({ hirelings }): boolean =>
    hirelings.count > 0

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
