declare type FilterSkip = (filters: FilterOptions) => boolean

declare type FilterTest = (
  filters: FilterOptions,
) => (character: CharacterObject) => boolean

declare type FilterSchema = {
  filterSkip: FilterSkip
  filterTest: FilterTest
}
