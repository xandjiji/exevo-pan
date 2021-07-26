export interface DrawerHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  children: React.ReactNode
}
