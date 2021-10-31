export interface LazyRenderProps extends React.HTMLAttributes<HTMLDivElement> {
  estimatedHeight: number
  children: React.ReactNode
}
