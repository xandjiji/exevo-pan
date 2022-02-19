const imbuementShrineSet = new Set(['imbuing shrine', 'gilded imbuing shrine'])

const filterSkip: FilterSkip = ({ imbuementShrine }): boolean =>
  !imbuementShrine

const filterTest: FilterTest =
  () =>
  ({ storeItems }): boolean =>
    storeItems.some(({ name }) => imbuementShrineSet.has(name))

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
