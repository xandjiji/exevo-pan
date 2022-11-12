export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  activeIndex?: number
  initialActive?: number
  children: React.ReactNode
  onChange?: (newIndex: number) => void
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  active?: boolean
}
