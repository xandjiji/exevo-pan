import { DEFAULT_FILTER_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'

const filterSkip: FilterSkip = ({ tcInvested }): boolean =>
  tcInvested === DEFAULT_FILTER_OPTIONS.tcInvested

const filterTest: FilterTest =
  ({ tcInvested: minTcInvested }) =>
  ({ tcInvested }): boolean =>
    tcInvested >= minTcInvested

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
