export interface LazyRenderProps extends React.HTMLAttributes<HTMLDivElement> {
  estimatedHeight: number
  mediaQuery?: string
  children: React.ReactNode
}
