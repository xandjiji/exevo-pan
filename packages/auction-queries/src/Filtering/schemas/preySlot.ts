const filterSkip: FilterSkip = ({ preySlot }): boolean => !preySlot

const filterTest: FilterTest =
  () =>
  ({ preySlot }): boolean =>
    preySlot

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
