export interface SortingDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sortModeControl: [number, React.Dispatch<React.SetStateAction<number>>]
  descendingOrderControl: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ]
}
