import { AuctionsContextState, Action } from './reducer/types'
import { useFavorites } from './useFavorites'

export interface AuctionsContextValues extends AuctionsContextState {
  highlightedAuctions: CharacterObject[]
  handlePaginatorFetch: (pageIndex: number) => void
  Favorites: ReturnType<typeof useFavorites>
  dispatch: React.Dispatch<Action>
}

export interface AuctionsProviderProps {
  highlightedAuctions: CharacterObject[]
  initialPaginatedData: PaginatedData<CharacterObject>
  children: JSX.Element
}
