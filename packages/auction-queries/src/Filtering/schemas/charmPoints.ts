import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ minCharmPoints, maxCharmPoints }): boolean =>
  minCharmPoints === DEFAULT_FILTER_OPTIONS.minCharmPoints &&
  maxCharmPoints === DEFAULT_FILTER_OPTIONS.maxCharmPoints

const filterTest: FilterTest =
  ({ minCharmPoints, maxCharmPoints }) =>
  ({ charmInfo }): boolean =>
    charmInfo.total >= minCharmPoints && charmInfo.total <= maxCharmPoints

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
