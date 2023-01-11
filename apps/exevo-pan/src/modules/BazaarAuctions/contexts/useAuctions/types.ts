import { AuctionsContextState, Action } from './reducer/types'
import { Favorites } from './favorites'

export interface AuctionsContextValues extends AuctionsContextState {
  highlightedAuctions: CharacterObject[]
  handlePaginatorFetch: (pageIndex: number) => void
  Favorites: typeof Favorites
  dispatch: React.Dispatch<Action>
}

export interface AuctionsProviderProps {
  highlightedAuctions: CharacterObject[]
  initialPaginatedData: PaginatedData<CharacterObject>
  children: JSX.Element
}
