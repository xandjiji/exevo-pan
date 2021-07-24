export interface SortingDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sortMode: number
  setSortMode: React.Dispatch<React.SetStateAction<number>>
  descendingOrder: boolean
  setDescendingOrder: React.Dispatch<React.SetStateAction<boolean>>
}
