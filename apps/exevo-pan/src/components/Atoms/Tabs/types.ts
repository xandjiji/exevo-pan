export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex?: number
  initialActive?: number
  children: React.ReactNode
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  children: React.ReactNode
  active?: boolean
}
