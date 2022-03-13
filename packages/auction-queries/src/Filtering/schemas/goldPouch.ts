const GOLD_POUCH = 'gold pouch'

const filterSkip: FilterSkip = ({ goldPouch }): boolean => !goldPouch

const filterTest: FilterTest =
  () =>
  ({ storeItems }): boolean =>
    storeItems.some(({ name }) => name === GOLD_POUCH)

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
