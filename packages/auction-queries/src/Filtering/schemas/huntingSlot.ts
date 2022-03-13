const filterSkip: FilterSkip = ({ huntingSlot }): boolean => !huntingSlot

const filterTest: FilterTest =
  () =>
  ({ huntingSlot }): boolean =>
    huntingSlot

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
