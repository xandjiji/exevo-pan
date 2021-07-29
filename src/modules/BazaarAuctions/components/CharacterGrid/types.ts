export interface CharacterGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  itemsPerPage?: number
  characterList: CharacterObject[]
  isLoading?: boolean
  defaultSortMode?: number
  defaultDescendingOrder?: boolean
}
