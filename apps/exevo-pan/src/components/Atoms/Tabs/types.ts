export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  activeIndex?: number
  initialActive?: number
  children: JSX.Element &
    React.ReactElement<{
      id?: string
      'aria-labeledby'?: string
      active?: boolean
    }>
  onChange?: (newIndex: number) => void
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  active?: boolean
}
