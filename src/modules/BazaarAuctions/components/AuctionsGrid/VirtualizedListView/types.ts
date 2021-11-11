export interface ListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  estimatedHeight: number
  overScan?: number
}

export type OnScrollEvent = React.UIEvent<HTMLDivElement>
