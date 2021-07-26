export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface WrapperProps {
  isOpen: boolean
}

export interface BackdropProps {
  isOpen: boolean
}
