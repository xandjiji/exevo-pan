export interface FilterDrawerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
}

export interface StatusStyleProps {
  color: 'battleGreen' | 'battleYellow'
}
