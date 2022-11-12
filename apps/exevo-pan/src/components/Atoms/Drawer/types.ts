export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  children: JSX.Element | JSX.Element[]
}

export interface DrawerHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
}
