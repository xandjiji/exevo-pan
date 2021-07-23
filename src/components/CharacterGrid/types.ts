export interface CharacterGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  itemsPerPage?: number
  characterList: CharacterObject[]
  isLoading?: boolean
}

export type SortingMode =
  | 'Auction End'
  | 'Level'
  | 'Price (bidded only)'
  | 'Price'
