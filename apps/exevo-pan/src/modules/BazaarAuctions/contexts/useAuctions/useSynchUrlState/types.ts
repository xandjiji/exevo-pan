import { SchemaCodec } from 'shared-utils/dist/urlSerializer'
import { Action } from '../reducer/types'

export type UseSynchcUrlStateProps = {
  isPro: boolean | undefined
  filterState: FilterOptions
  sortingOptions: SortOptions
  paginationOptions: PaginationOptions
  isHistory: boolean
  dispatch: React.Dispatch<Action>
}

export type UseSynchUrlParamsStateProps<T> = {
  schemaCodec: SchemaCodec<T>
  currentState: T
}
