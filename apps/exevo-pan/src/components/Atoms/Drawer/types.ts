export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface DrawerHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
}
