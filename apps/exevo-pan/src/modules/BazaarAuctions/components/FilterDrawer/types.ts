export interface FilterDrawerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
}
