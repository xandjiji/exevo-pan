export type ListViewProps = React.HTMLAttributes<HTMLDivElement>

export type VirtualizedState = {
  minIndex: number
  maxIndex: number
}

export type OnScrollEvent = React.UIEvent<HTMLDivElement>
