export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number
  initialIndex?: number
  children: React.ReactNode
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  children: React.ReactNode
}
