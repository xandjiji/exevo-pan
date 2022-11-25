import { AuctionsContextState, Action } from './reducer/types'

export interface AuctionsContextValues extends AuctionsContextState {
  highlightedAuctions: CharacterObject[]
  handlePaginatorFetch: (pageIndex: number) => void
  dispatch: React.Dispatch<Action>
}

export interface AuctionsProviderProps {
  highlightedAuctions: CharacterObject[]
  initialPaginatedData: PaginatedData<CharacterObject>
  children: JSX.Element
}
