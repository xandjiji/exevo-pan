import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ greaterGemCount }): boolean =>
  greaterGemCount <= DEFAULT_FILTER_OPTIONS.greaterGemCount

const filterTest: FilterTest =
  ({ greaterGemCount }) =>
  ({ gems }): boolean =>
    greaterGemCount <= gems.greater

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
