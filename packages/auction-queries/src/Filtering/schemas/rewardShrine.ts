const rewardShrineSet = new Set(['reward shrine', 'shiny reward shrine'])

const filterSkip: FilterSkip = ({ rewardShrine }): boolean => !rewardShrine

const filterTest: FilterTest =
  () =>
  ({ storeItems }): boolean =>
    storeItems.some(({ name }) => rewardShrineSet.has(name))

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
